<script>
	/** @type {import('./$types').PageData} */

	import Head from '$lib/components/Head.svelte';

	let email = '';

	const handleSubmit = async () => {
		const zapierUrl = 'https://hooks.zapier.com/hooks/catch/1152094/37errja/';

		const res = await fetch('/api/zapier', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email, zapierUrl })
		});

		if (res.ok) {
			// goto('/thank-you-page-you-need-to-create');
			alert(
				'You submitted the email: ' +
					email +
					'. This could totally go to a Zapier webhook and to your ESP--or you could just drop an embedded form here.'
			);
			email = '';
		} else {
			console.error('Failed to submit email');
			alert('Failed to submit email');
		}
	};
</script>

<Head title="Landing Page Template" />

<!-- header -->
<div class="px-4 lg:px-48 py-6 lg:py-20 text-center m-4">
	<h1 class="mb-4 md:mb-8 font-black text-3xl lg:text-5xl">
		Enter your email below, you amazing person you.
	</h1>

	<h2 class="mb-4 md:mb-8 text-lg text-primary">
		Don't worry. There's no sales funnel attached to this. 😘
	</h2>
	<form class="my-8 md:w-1/2 md:mx-auto">
		<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
			<input
				type="email"
				placeholder="Enter your email"
				bind:value={email}
				class="input input-bordered text-neutral md:flex-auto"
			/>
			<button type="submit" class="btn btn-secondary md:flex-initial" on:click={handleSubmit}>
				Sign me up!
			</button>
		</div>
	</form>
</div>
