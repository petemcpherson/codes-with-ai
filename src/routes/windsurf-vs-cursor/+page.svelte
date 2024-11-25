<script>
	/** @type {{ data: import('./$types').PageData }} */
	// let { data } = $props();

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
			windsurf: '',
			winner: 'Windsurf'
		},
		{
			aspect: 'Understanding Codebase Context',
			description:
				"How well the editor's AI understands the structure and context of your entire codebase.",
			cursor: 'Works well I think--but one NEEDS to specific files/folders a lot of times.',
			windsurf:
				'Tends to "automatically" search for files/folders it needs. I ***think*** it tends to have better "deep context".',
			winner: 'Windsurf'
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

<div></div>
