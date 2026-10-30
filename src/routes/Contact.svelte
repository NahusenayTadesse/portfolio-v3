<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { primary, h2, eyebrow, body } from '$lib/global.svelte';
	import { reveal } from '$lib/reveal';
	import { CheckCircleSolid, ExclamationCircleSolid, EnvelopeSolid, WhatsappSolid, LinkedinSolid } from 'flowbite-svelte-icons';

	let { success, status }: { success?: boolean; status?: number } = $props();

	let submitting = $state(false);

	// Drive the spinner from the actual request lifecycle rather than from a
	// prop, which we cannot write back to.
	const submit: SubmitFunction = () => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	};

	const errors: Record<number, string> = {
		400: 'Please check your email address and message, then try again.',
		429: 'You have sent several messages already. Please try again a little later.',
		500: 'Something went wrong sending your message. Please try again, or email me directly.'
	};

	const channels = [
		{ label: 'Email', value: 'nahusenaytadesse75@gmail.com', href: 'mailto:nahusenaytadesse75@gmail.com', icon: EnvelopeSolid },
		{ label: 'WhatsApp', value: '+251 94 734 0602', href: 'https://wa.me/+251947340602', icon: WhatsappSolid },
		{ label: 'LinkedIn', value: 'Nahusenay Tadesse', href: 'https://www.linkedin.com/in/nahusenay-tadesse-ba0375233', icon: LinkedinSolid }
	];

	const field = `w-full rounded-lg border border-line bg-canvas px-4 py-3 text-ink placeholder:text-muted/70
		focus:border-background-2 focus:outline-none focus:ring-2 focus:ring-background-2/40
		dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-gray-500`;
	const label = `font-head text-sm font-semibold text-ink dark:text-gray-200`;
</script>

<!-- The last section on the page, so it is a closing pitch rather than a bare
     form: what to send, how else to reach me, then the form itself. -->
<section aria-labelledby="contact-heading" class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 lg:grid-cols-5 lg:gap-16 lg:py-20">
	<div class="flex flex-col gap-5 lg:col-span-2" data-reveal="left" use:reveal>
		<p class={eyebrow}>04 · Contact</p>
		<h2 id="contact-heading" class={h2}>Have a system that needs building?</h2>
		<p class={body}>
			Tell me what the business does and where the current tools fall short. I take on freelance
			and contract work, working remotely from Addis Ababa (UTC+3).
		</p>

		<ul class="mt-2 flex flex-col gap-3">
			{#each channels as channel}
				{@const Icon = channel.icon}
				<li>
					<a
						href={channel.href}
						target={channel.href.startsWith('http') ? '_blank' : undefined}
						rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
						class="group flex items-center gap-4 rounded-xl border border-line bg-surface p-3 transition-colors
						       hover:border-background-2 dark:border-white/10 dark:bg-surface/85 dark:hover:border-background-2/50"
					>
						<span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background-2/40 text-ink dark:bg-background-2/10 dark:text-background-2">
							<Icon class="h-5 w-5" />
						</span>
						<span class="flex min-w-0 flex-col">
							<span class="text-xs text-muted dark:text-gray-400">{channel.label}</span>
							<span class="truncate font-head text-ink group-hover:underline group-hover:underline-offset-4 dark:text-white">{channel.value}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<form
		method="POST"
		use:enhance={submit}
		class="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 shadow-sm lg:col-span-3 lg:self-start lg:p-8
		       dark:border-white/10 dark:bg-surface/85 dark:shadow-none"
		data-reveal="right"
		use:reveal={{ delay: 120 }}
	>
		<!-- Honeypot: off screen and out of the tab order, so only bots fill it. -->
		<div class="absolute -left-[9999px]" aria-hidden="true">
			<label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
		</div>

		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
			<div class="flex flex-col gap-2">
				<label for="contact-name" class={label}>Name <span class="font-normal text-muted dark:text-gray-500">(optional)</span></label>
				<input id="contact-name" type="text" name="name" maxlength="100" autocomplete="name" placeholder="Your name" class={field} />
			</div>
			<div class="flex flex-col gap-2">
				<label for="contact-email" class={label}>Email</label>
				<input id="contact-email" type="email" name="email" maxlength="254" autocomplete="email" placeholder="you@company.com" class={field} required />
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<label for="contact-message" class={label}>What are you building?</label>
			<textarea
				id="contact-message"
				name="message"
				maxlength="5000"
				rows="6"
				placeholder="A few lines on the business, the problem, and any timeline."
				class="{field} resize-y"
				required
			></textarea>
		</div>

		<div aria-live="polite">
			{#if success}
				<p class="flex items-start gap-3 rounded-lg border border-green-600/30 bg-green-500/10 p-3 text-sm text-green-800 dark:text-green-300">
					<CheckCircleSolid class="h-5 w-5 shrink-0" />
					Thanks, your message is in. I will reply by email.
				</p>
			{:else if status && errors[status]}
				<p class="flex items-start gap-3 rounded-lg border border-red-600/30 bg-red-500/10 p-3 text-sm text-red-800 dark:text-red-300">
					<ExclamationCircleSolid class="h-5 w-5 shrink-0" />
					{errors[status]}
				</p>
			{/if}
		</div>

		<button type="submit" disabled={submitting} aria-busy={submitting} class="{primary} self-stretch disabled:opacity-70 sm:self-end">
			{#if submitting}
				<span class="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>
				Sending…
			{:else}
				Send message
			{/if}
		</button>
	</form>
</section>
