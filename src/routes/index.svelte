<script context="module" lang="ts">
	import type { Load } from './index.d';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/people');
		const people = await res.json();

		return {
			props: {
				data: people
			}
		};
	};
</script>

<script lang="ts">
	import { get, writable } from 'svelte/store';
	import type { PersonJSON } from '$lib/models/person';

	export let data: PersonJSON[];

	// "Living" store of people -- added to when creating a new person
	const people = writable(data);

	// Store for the `name` input field
	const nameStore = writable('');
</script>

<form
	on:submit|preventDefault={async () => {
		const name = get(nameStore);

		// POST the data up to the server
		const res = await fetch('/people', {
			method: 'POST',
			body: JSON.stringify({ name })
		});

		if (res.ok) {
			// Add the new record to the local data
			const newRecord = await res.json();
			people.update((people) => [...people, newRecord]);

			// Clear the input field
			nameStore.set('');
		}
	}}
>
	<label>
		Name
		<input type="text" placeholder="Alex" bind:value={$nameStore} required />
	</label>

	<button>Add Person</button>
</form>

<hr />

{#if $people.length}
	<ul>
		{#each $people as person}
			<li>{person.id}: {person.name}</li>
		{/each}
	</ul>
{:else}
	<p><i>No people added</i></p>
{/if}
