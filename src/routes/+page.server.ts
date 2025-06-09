// src/routes/+page.server.ts
import { db } from '$lib/firebase-admin';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import {EMAIL, APP_PASSWORD} from '$env/static/private'


export const load: PageServerLoad = async () => {
  try {
    const snapshot = await db.collection("projects")
  .select("name", "slug", "category", "featured", "technologies")
  .get();

    const projects = snapshot.docs.map(doc => ({
      name: doc.data().name,
      slug: doc.data().slug,
      category: doc.data().category,
      featured: doc.data().featured,
      technologies: doc.data().technologies
    }));

    return { projects };

  } catch (error) {
    console.error('Failed to load projects:', error);
    return { projects: [] };
  }
};




  
export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const email = formData.get('email')?.toString();
    const message = formData.get('message')?.toString();

    if (!email || !message) {
      return {
        success: false,
        error: 'Missing required fields.'
      };
    }

    // Format date string for Firestore
    const now = new Date();
    const dateString = now.toISOString()
  .replace(/T/, '_')    
  .replace(/:/g, '-')  
  .replace(/\..+/, ''); 
    const username = email.split('@')[0];
    const customId = `${username}_${dateString}`;

    try {
      // Save to Firestore
      await db.collection('contacts').doc(customId).set({
        email,
        message,
        createdAt: dateString
      });

      // Setup Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL, // your Gmail
          pass: APP_PASSWORD // App password
        }
      });
      const htmlContent = `
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; color: #333;">
    <h2 style="color: #1e88e5;">Thank You for Your Message</h2>
    <p style="font-size: 16px;">Hi,</p>
    <p style="font-size: 16px;">
      Thank you for reaching out. I have received your message:
    </p>
    <blockquote style="margin: 20px 0; padding: 15px; background-color: #fff; border-left: 4px solid #1e88e5; font-style: italic;">
      ${message}
    </blockquote>
    <p style="font-size: 16px;">
      I'll get back to you as soon as possible.
    </p>
    <p style="font-size: 16px; margin-top: 30px;">
      Best regards,<br/>
      <strong>Nahusenay Tadesse</strong>
    </p>
  </div>
`;


      // 1. Thank You Email to the User
      await transporter.sendMail({
        from: `<${EMAIL}>`,
        to: email,
        subject: 'Thanks for contacting me!',
        text: `Hi,\n\nThank you for reaching out. I have received your message:\n\n"${message}"\n\nI'll get back to you as soon as possible.\n\n- Nahusenay Tadesse`,
        html: htmlContent
      });

      // 2. Notification Email to Me
      await transporter.sendMail({
        from: `"Website Contact Form" <${EMAIL}>`,
        to: 'nahusenaytadesse75@gmail.com', // replace with your own email
        subject: '📩 New Contact Form Submission',
        text: `You received a new message from: ${email}\n\nMessage:\n${message}\n\nSaved to Firestore as: ${customId}`
      });

      return { success: true,
        loading: false,
        status: 303
       };

    } catch (err) {
      console.error('Server error:', err);
      return {
        success: false,
        error: 'Failed to process your request. Please try again later.'
      };
    }
  }
};