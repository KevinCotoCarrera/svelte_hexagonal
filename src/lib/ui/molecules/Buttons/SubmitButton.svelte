<script lang="ts">
	//Doc: In form effect reset loading(isRequestingApi) to false add a onsubmit={handleSubmit} to form. it just sets loading to true
	import { fade } from 'svelte/transition';

	// Use Svelte 5's $prop rune to declare bindable props with type safety.
	let {
		loading = $bindable(false),
		disabled = $bindable(false),
		label = 'Submit'
	}: {
		loading: boolean;
		disabled: boolean;
		label: string;
	} = $props();
</script>

<button
	type="submit"
	class="w-full max-w-xs rounded-lg bg-[#0a2c48] p-3 font-bold text-white transition-colors hover:bg-[#0d3a5a] disabled:bg-slate-500 disabled:text-gray-300 sm:p-4"
	in:fade={{ duration: 800 }}
	disabled={disabled || loading}
>
	{#if loading}
		<!-- Spinner element; adjust styling as needed -->
		<span class="spinner"></span>
	{:else}
		{label}
	{/if}
</button>

<style>
	.spinner {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
