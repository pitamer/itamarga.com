<script>
	import Item from './Item.svelte';

	let isTilted = false;
	const toggleTilt = () => isTilted = !isTilted;
</script>

<main>
	<div class="App" onClick={toggleTilt}>
		<div class={`line top-line ${isTilted ? 'tilted' : ''}`}>
		</div>
		<div class="title-container">
			<div class="title-logo">
				Logo
			</div>
			<div class="title-text">
				<h1 class="title-text-top-row">
					I'm Itamar Galili,
				</h1>
				<h2 class="title-text-bottom-row">
					a software developer
				</h2>
			</div>
		</div>
		<div class="items-container">
			<div class="items-container-row top-row">
				<Item name={'About me'}/>
				<Item name={'Experience'}/>
				<Item name={'Blog'}/>
				<Item name={'Contact'}/>
<!--				Or just "Email"?-->
			</div>
			<div class={'items-container-row bottom-row'}>
				<Item name={'LinkedIn'}/>
				<Item name={'Twitter'}/>
				<Item name={'StackOverflow'}/>
				<Item name={'Github'}/>
			</div>
		</div>
		<div class={`line bottom-line ${isTilted ? 'tilted' : ''}`}>
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
