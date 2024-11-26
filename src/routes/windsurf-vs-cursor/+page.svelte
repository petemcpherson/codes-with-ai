<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { db } from '$lib/firebase';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { enhance } from '$app/forms';
	import Head from '$lib/components/Head.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let pollData = data.pollData;
	let hasVoted = false;
	const title = 'Windsurf or Cursor? A Detailed Breakdown of AI Code Editors That Actually Work';

	// Subscribe to real-time updates
	onMount(() => {
		if (browser) {
			// Check if user has already voted
			hasVoted = localStorage.getItem('voted-windsurf-vs-cursor') === 'true';

			// Set up real-time listener
			const unsubscribe = onSnapshot(doc(db, 'polls', 'windsurf-vs-cursor'), (doc) => {
				if (doc.exists()) {
					pollData = doc.data();
				}
			});

			return () => unsubscribe();
		}
	});

	function handleVoteSuccess() {
		hasVoted = true;
		localStorage.setItem('voted-windsurf-vs-cursor', 'true');
	}

	$: totalVotes = pollData?.totalVotes || 0;
	$: cursorPercentage = totalVotes ? (pollData?.cursor / totalVotes) * 100 : 0;
	$: windsurfPercentage = totalVotes ? (pollData?.windsurf / totalVotes) * 100 : 0;

	// ideas
	// add a poll to the top!

	const aspects = [
		{
			aspect: 'Price',
			description:
				'The cost of using the editor, including any subscription tiers or free options.',
			cursor: '$20/mo',
			windsurf: '$10/mo',
			winner: 'Windsurf'
		},
		{
			aspect: 'Setup Process',
			description:
				'The ease and steps involved in setting up the editor, including installation and configuration (and migration!).',
			cursor: 'Stupid easy',
			windsurf: "Stupid easy, includes 'Import from Cursor' now",
			winner: 'Tie'
		},
		{
			aspect: 'UI/UX',
			description: "The design, layout, and user experience of the editor's interface.",
			cursor:
				"Fine once you get used to it. Chat & Composer are SEPARATE, and I don't like the design of composer (no border for the pane).",
			windsurf: 'Simple! Less things to think about/worry about.',
			winner: 'Windsurf'
		},
		{
			aspect: 'Understanding Codebase Context',
			description:
				"How well the editor's AI understands the structure and context of your entire codebase.",
			cursor: 'Works well I think--but one NEEDS to specific files/folders a lot of times.',
			windsurf:
				'Less consistent, but tends to "automatically" search for files/folders it needs. I ***think*** it tends to have better "deep context".',
			winner: 'Tie'
		},
		{
			aspect: 'Overall Code Quality',
			description:
				"The reliability and correctness of the AI's suggestions and outputs. NOTE: Much of this depends on the AI models being used, as well as your programming language.",
			cursor: "Best in class across any editor I've used.",
			windsurf:
				"MOSTLY great--but the 'tab/prediction/supercomplete' code is almost never what I want. The Cascade agent is much better.",
			winner: 'Cursor'
		},
		{
			aspect: 'AI Agent',
			description:
				"The 'code for you' feature that takes prompts, analyzes, and implements changes. Called 'Cascade' in Windsurf, and 'Composer' in Cursor.",
			cursor:
				"Composer works well, and the '@ context' is more robust (image, URL, etc). But the UI/UX is annoying, and it seems less intuitive overall. It's also faster than Windsurf, for sure (not necessarily a good thing).",
			windsurf:
				'Cascade is a bit slower, but is "more careful" and more accurate--especially on "larger chunks" of code. It also defaults to a "deep context" (searches for files/folders).',
			winner: 'Windsurf'
		},
		{
			aspect: 'Autocomplete, Tab, Prediction, Supercomplete',
			description:
				"Code completions, tab completion, and AI predictions for what you're going to code next.",
			cursor: "Really, really, really good. Intuitive, multi-line works well, and it's HYPER fast.",
			windsurf:
				"The predictions are straight-up bad most of the time. Other times, it just won't do anything.",
			winner: 'Cursor'
		},
		{
			aspect: 'Overall Feel',
			description:
				'My subjective experience of using the editor, including responsiveness, accuracy, engagement.',
			cursor:
				"The 'chat and AI agent' in Composer is super clunky, but manual coding + autocomplete feels amazing. Also, definitely more BUGGY.",
			windsurf:
				'The chat & agent AI feel REALLY good, but working with tab/autocomplete does more harm than good.',
			winner: 'Tie. Windsurf for chat/agent, Composer for autocomplete.'
		},
		{
			aspect: 'Understanding New Frameworks or Changes',
			description:
				'How well do the AIs understand new frameworks, languages, recent changes, etc.? This SHOULD be based on the AI model as well.',
			cursor: 'Less understanding overall, but way easier to ADD context, documentation, etc.',
			windsurf: "Surprised me with it's implementation of Svelte 5. I'd say good!",
			winner: 'Tie'
		},
		{
			aspect: 'Speed',
			description:
				'The performance and response time of the editor and its AI features. Also depends on AI model!',
			cursor: "Blazing fast, except when it's buggy.",
			windsurf: 'Slower (not always a bad thing).',
			winner: 'Cursor'
		},
		{
			aspect: 'Learning Curve',
			description: 'The difficulty level for new users to become proficient with the editor.',
			cursor: 'Bigger learning curve for the more advanced features.',
			windsurf: 'Very intuitive. Feels more "non-developer" friendly.',
			winner: 'Windsurf'
		},
		{
			aspect: "Who's It For",
			description:
				'The target audience or ideal users for the editor, such as solo developers or teams.',
			cursor: 'More seasonded developers.',
			windsurf:
				'Developers can still get great use out of this--but the AI agent features is where Windsurf shines. Good for non-developers',
			winner: 'Tie'
		}
	];
</script>

<Head {title} />

<div class="max-w-7xl mx-auto px-4 py-8">
	<div class="w-full md:w-1/2 md:mx-auto space-y-8">
		<h1 class="text-2xl md:text-6xl text-center font-bold mb-8">{title}</h1>
	</div>
	<!-- Poll Section -->
	<div class="mb-12 p-6 bg-primary text-primary-content rounded-lg my-2 md:my-8">
		<div class="text-center mb-4 space-y-2 p-2 md:p-4">
			<h2 class="text-2xl md:text-4xl font-semibold">POLL: Which editor do you prefer?</h2>
			<p class="text-lg">Vote to see results!</p>
		</div>
		<div class="space-y-4">
			<!-- Voting Buttons -->
			{#if !hasVoted}
				<div class="flex gap-4">
					<form
						method="POST"
						action="?/vote"
						class="flex-1"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									handleVoteSuccess();
								}
							};
						}}
					>
						<input type="hidden" name="choice" value="cursor" />
						<button class="btn btn-success w-full" type="submit"> Cursor </button>
					</form>

					<form
						method="POST"
						action="?/vote"
						class="flex-1"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									handleVoteSuccess();
								}
							};
						}}
					>
						<input type="hidden" name="choice" value="windsurf" />
						<button class="btn btn-error w-full" type="submit"> Windsurf </button>
					</form>
				</div>
			{/if}

			<!-- Results -->
			{#if hasVoted}
				<div class="space-y-2">
					<div class="w-full bg-base-300 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-success"
							style="width: {cursorPercentage}%; transition: width 0.3s ease;"
						/>
					</div>
					<div class="flex justify-between text-sm">
						<span>Cursor: {cursorPercentage.toFixed(1)}% ({pollData?.cursor || 0} votes)</span>
						<span>Total Votes: {totalVotes}</span>
					</div>

					<div class="w-full bg-base-300 rounded-full h-4 overflow-hidden">
						<div
							class="h-full bg-error"
							style="width: {windsurfPercentage}%; transition: width 0.3s ease;"
						/>
					</div>
					<div class="flex justify-between text-sm">
						<span>Windsurf: {windsurfPercentage.toFixed(1)}% ({pollData?.windsurf || 0} votes)</span
						>
						{#if hasVoted}
							<span class="text-base-content/70">Thanks for voting!</span>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
	<!-- intro -->
	<div class="w-full md:w-1/2 md:mx-auto space-y-8">
		<p class="text-lg">
			Code editors are like a&&holes: everyone has one, and they all do the same thing.
		</p>

		<p class="text-lg">But as we all know--some are more efficient than others.</p>
		<p class="text-lg"><i>super awkward...</i></p>

		<p class="text-lg">
			Anywho, Cursor & Windsurf are the two AI code editors making <i>waves</i> right now (get it??).
			And since I've used both extensively to pump out mediocre code, I'd say that makes me an expert.
		</p>
		<iframe
			src="https://www.youtube.com/embed/GU-QDyZDX2o?si=eNkAtO_wIuvKjVQ_"
			title="YouTube video"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			class="h-full w-full aspect-video"
		></iframe>
	</div>

	<!-- Comparison content -->
	<div class="w-full md:w-1/2 md:mx-auto space-y-8 my-4 md:my-12">
		<h2 class="text-2xl md:text-4xl font-semibold">Detailed Comparison: Windsurf vs Cursor:</h2>
		<p class="text-lg">Let's examine each aspect, one by one.</p>
	</div>
	<div class="space-y-6">
		{#each aspects as { aspect, description, cursor, windsurf, winner }}
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg bg-base-100 shadow-sm">
				<!-- Column 1: Aspect & Description -->
				<div class="space-y-2">
					<h3 class="text-xl md:text-3xl font-semibold">{aspect}</h3>
					<p class="text-sm text-base-content/70">{description}</p>
				</div>

				<!-- Column 2: Cursor -->
				<div class="bg-base-200 p-3 rounded">
					<h4 class="font-medium mb-2 text-success">Cursor</h4>
					<p class="text-sm">{cursor}</p>
				</div>

				<!-- Column 3: Windsurf -->
				<div class="bg-base-200 p-3 rounded">
					<h4 class="font-medium mb-2 text-error">Windsurf</h4>
					<p class="text-sm">{windsurf}</p>
				</div>

				<!-- Column 4: Winner with inline ternary -->
				<div
					class="flex items-center justify-center p-3 rounded
					{winner.includes('Tie')
						? 'bg-warning/20 text-warning-600'
						: winner.includes('Windsurf')
							? 'bg-error/20 text-error-600'
							: 'bg-success/20 text-success-600'}"
				>
					<span class="font-medium">{winner}</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- blog post content 2 -->
	<div class="w-full md:w-1/2 md:mx-auto space-y-8">
		<h2 class="text-2xl md:text-4xl font-semibold">
			Which Editor Is Right for You? (Because Context Matters!)
		</h2>
		<p class="text-lg">It’s like asking, “Should I get a dog or a cat?”</p>
		<p class="text-lg">The answer is always "dog."</p>
		<p class="text-lg">
			Just kidding. The real question is, <b class="text-primary"
				>what do you need to accomplish your goals??</b
			>
		</p>

		<h3 class="text-xl md:text-3xl">Are You a New Developer or Non-Developer?</h3>
		<p class="text-lg">If you’re newer to coding—or not a coder at all—Windsurf is your friend.</p>
		<p class="text-lg">
			Its intuitive setup and simpler design make it less intimidating, and the AI agent feels more
			approachable for beginners (and arguably more complete!).
		</p>
		<p class="text-lg">
			Plus, Windsurf is new--it's only a matter of time before it releases some of those "missing"
			features (like image analysis and more @ functionality).
		</p>

		<h3 class="text-xl md:text-3xl">Are You a Hardcore Dev Who Lives in the Matrix?</h3>
		<p class="text-lg">
			For the seasoned coders who could TECHNICALLY code all their stuff manually...
		</p>
		<p class="text-lg">(<i>or copy/paste from Stack Overflow let's be real</i>)</p>
		<p class="text-lg">
			Cursor’s autocomplete / "code completion" is unmatched. It’s more of a “power user’s tool”
			that rewards those willing to put in the time to learn its quirks (and quickly forgo the
			occasional bugs).
		</p>
		<p class="text-lg">
			But don’t write off Windsurf entirely—it still packs a punch for veteran devs, especially if
			you’re looking for something that can adapt to your workflow without requiring a three-hour
			crash course. Plus, its accuracy on larger-scale changes is impressive.
		</p>
		<p>And again, all of these tools will eventually be exactly the same. #truth.</p>

		<h2 class="text-2xl md:text-4xl">Final Verdict: Pick Your Poison</h2>
		<p class="text-lg">
			If you’re all about speed and precision (and can tolerate a few quirks), Cursor might be your
			soulmate. But if you want a tool that feels more thoughtful, intuitive, and beginner-friendly,
			Windsurf has your back. Honestly, either one beats manually hunting through Stack Overflow for
			the same bug you Googled last week.
		</p>
		<p class="text-lg font-bold text-primary">The real winner here? OpenAI & Anthropic.</p>
		<p class="text-lg">Because no matter which editor you choose, you're funding them. 😉</p>
	</div>
</div>
