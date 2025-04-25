<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import SubmitButton from '$lib/ui/molecules/Buttons/SubmitButton.svelte';
	import ProductCard from '$lib/ui/molecules/Cards/ProductCard.svelte';
	import { fade } from 'svelte/transition';

	const TRANSITION_DURATION = 300;

	let { data, form }: PageProps = $props();

	let isSubmitting = $state(false);

	let previewProduct = $state({
		name: '',
		description: '',
		price: '',
		qty: '',
		imageUrl: ''
	});

	let imageVisible = $state(false);

	$effect(() => {
		if (form) {
			isSubmitting = false;
			previewProduct = { name: '', description: '', price: '', qty: '', imageUrl: '' };
		}
	});

	function handleSubmit() {
		isSubmitting = true;
	}

	function handleImageChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const newUrl = e.target?.result as string;

			imageVisible = false;

			setTimeout(() => {
				previewProduct.imageUrl = newUrl;

				imageVisible = true;
			}, TRANSITION_DURATION);
		};

		reader.readAsDataURL(file);
	}
</script>

<!-- PAGE WRAPPER -->
<div class="mx-auto max-w-7xl space-y-10 px-4 py-8">
	<!-- COMPACT FORM + LIVE PREVIEW -->
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-3">
		<!-- FORM -->
		<form
			method="POST"
			enctype="multipart/form-data"
			use:enhance
			onsubmit={handleSubmit}
			class="col-span-2 grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-md sm:grid-cols-2"
		>
			<div class="col-span-full">
				<h2 class="mb-2 text-xl font-semibold text-gray-800">Add New Product</h2>
			</div>

			<!-- NAME -->
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700">Name *</label>
				<input
					name="name"
					placeholder="Product Name"
					required
					bind:value={previewProduct.name}
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-200"
				/>
			</div>

			<!-- PRICE -->
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700">Price (฿) *</label>
				<input
					type="number"
					name="price"
					placeholder="0.00"
					step="any"
					min="1"
					required
					bind:value={previewProduct.price}
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-200"
				/>
			</div>

			<!-- DESCRIPTION -->
			<div class="sm:col-span-2">
				<label class="mb-1 block text-sm font-medium text-gray-700">Description</label>
				<input
					name="description"
					placeholder="Product Description"
					bind:value={previewProduct.description}
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-200"
				/>
			</div>

			<!-- QTY -->
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700">Quantity *</label>
				<input
					type="number"
					name="qty"
					placeholder="0"
					step="1"
					min="1"
					required
					bind:value={previewProduct.qty}
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-200"
				/>
			</div>

			<!-- IMAGE UPLOAD -->
			<div>
				<label class="mb-1 block text-sm font-medium text-gray-700">Image *</label>
				<input
					type="file"
					name="image"
					accept="image/*"
					required
					onchange={handleImageChange}
					class="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
				/>
			</div>

			<!-- SUBMIT BUTTON -->
			<div class="col-span-full flex justify-center pt-2">
				<SubmitButton label="Add Product" disabled={false} loading={isSubmitting} />
			</div>
		</form>

		<!-- LIVE PREVIEW CARD -->
		<div class="flex flex-col">
			<h3 class="mb-3 text-sm font-semibold text-gray-800">Live Preview</h3>

			<div class="relative flex flex-col rounded bg-gray-50 p-4 text-sm shadow">
				<!-- Simulated image or real preview -->
				{#if previewProduct.imageUrl}
					<img
						src={previewProduct.imageUrl}
						alt="Preview"
						class={`mb-3 h-24 w-full rounded object-cover transition-opacity duration-${TRANSITION_DURATION}`}
						class:opacity-0={!imageVisible}
						class:opacity-100={imageVisible}
						class:scale-95={!imageVisible}
						class:scale-100={imageVisible}
						class:blur-sm={!imageVisible}
						class:blur-0={imageVisible}
						transition:fade
					/>
				{:else}
					<div
						class="mb-3 flex h-24 w-full items-center justify-center rounded bg-gray-200 text-xs text-gray-500"
					>
						Image preview
					</div>
				{/if}

				<p class="font-semibold text-gray-800">{previewProduct.name || 'Product name'}</p>
				<p class="truncate text-xs text-gray-500">
					{previewProduct.description || 'Product description'}
				</p>
				<p class="mt-1 font-medium text-blue-600">฿{previewProduct.price || '0.00'}</p>
				<span class="absolute top-2 right-2 rounded border bg-white px-2 py-0.5 text-xs shadow">
					x{previewProduct.qty || '0'}
				</span>
			</div>
		</div>
	</div>

	<!-- FULL PRODUCT LIST -->
	<div class="p-8">
		<h2 class="text-md mb-4 font-semibold text-gray-800">All Products</h2>

		<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
			{#each data.products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</div>
