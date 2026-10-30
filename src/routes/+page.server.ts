// src/routes/+page.server.ts
import { db } from '$lib/firebase-admin';
import { featuredUrl, leadOutcome } from '$lib/projects';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import {EMAIL, APP_PASSWORD} from '$env/static/private'


/**
 * Incremental Static Regeneration: Vercel serves a cached HTML response and
 * refreshes it in the background at most once an hour, so a visit no longer
 * costs a Firestore round trip. Full prerendering is not an option here - the
 * project list is edited from /dashboard at runtime, so a build-time snapshot
 * would go stale until the next deploy.
 */
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load: PageServerLoad = async () => {
  try {
    const snapshot = await db.collection("projects")
  .select("name", "slug", "category", "featured", "year", "client", "sortOrder", "outcomes")
  .get();

    const projects = snapshot.docs.map(doc => ({
      name: doc.data().name,
      slug: doc.data().slug,
      category: doc.data().category,
      featured: featuredUrl(doc.data().featured),
      year: doc.data().year ?? null,
      client: doc.data().client ?? null,
      sortOrder: doc.data().sortOrder ?? 0,
      outcome: leadOutcome(doc.data().outcomes)
    }));


    projects.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

    return { projects };

  } catch (error) {
    console.error('Failed to load projects:', error);
    return { projects: [] };
  }
};




  
// Basic per-instance throttle. Fluid Compute reuses instances, so this blunts
// a script hammering the form; it is not a substitute for a real limiter.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
  default: async ({ request, getClientAddress }) => {
    const formData = await request.formData();

    // Honeypot: hidden from people, filled in by bots. Pretend it worked so
    // the bot has nothing to learn from.
    if (formData.get('website')?.toString()) {
      return { success: true, status: 200 };
    }

    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!email || !message || !EMAIL_PATTERN.test(email) || email.length > 254 || message.length > 5000) {
      return fail(400, {
        success: false,
        status: 400,
        error: 'Missing required fields.'
      });
    }

    if (throttled(getClientAddress())) {
      return fail(429, {
        success: false,
        status: 429,
        error: 'Too many messages. Please try again later.'
      });
    }

    // Format date string for Firestore
    const now = new Date();
    const dateString = now.toISOString()
  .replace(/T/, '_')
  .replace(/:/g, '-')
  .replace(/\..+/, '');
    const username = email.split('@')[0].replace(/[^\w.-]/g, '');
    const customId = `${username}_${dateString}`;

    try {
      await db.collection('contacts').doc(customId).set({
        email,
        message,
        createdAt: dateString
      });
    } catch (err) {
      console.error('Failed to save contact:', err);
      return fail(500, {
        success: false,
        status: 500,
        error: 'Failed to process your request. Please try again later.'
      });
    }

    // The message is saved and visible in /dashboard/contacts, so a mail
    // failure is logged rather than reported to the sender as a failure.
    // There is deliberately no auto-reply: sending mail to whatever address
    // the form was given turns the Gmail account into a relay for strangers.
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: APP_PASSWORD
        }
      });

      await transporter.sendMail({
        from: `"Website Contact Form" <${EMAIL}>`,
        to: 'nahusenaytadesse75@gmail.com',
        replyTo: email,
        subject: 'New Contact Form Submission',
        text: `You received a new message from: ${email}\n\nMessage:\n${message}\n\nSaved to Firestore as: ${customId}`
      });
    } catch (err) {
      console.error('Failed to send contact notification:', err);
    }

    return { success: true, status: 200 };
  }
};
