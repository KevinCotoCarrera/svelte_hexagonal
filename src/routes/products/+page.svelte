<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	let { data, form }: PageProps = $props();
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
	<input 
    name="name" 
    placeholder="Name" 
    required />
	<input 
    name="description" 
    placeholder="Description" 
    />
	<input 
    type="number" 
    name="price" 
    placeholder="Price" 
    step="any"
    min="1" 
    required />
	<input
		type="number"
		name="qty"
		placeholder="Quantity"
    step="1"
    min="1"
		required
		class=""
	/>
	<input 
    type="file" 
    name="image" 
    accept="image/*" 
    required />
	<button type="submit">Add Product</button>
</form>

<h2 class="mt-10 mb-2 text-xl font-bold">Products</h2>

<div class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
	{#each data.products as product}
		<div class="flex flex-col rounded bg-white p-2 shadow text-center relative">
			<img
				src={product.imageUrl}
				alt={product.name}
				class="mb-2 h-32 w-full rounded object-cover"
			/>
			<p class="text-sm font-semibold">{product.name}</p>
			<p class="text-xs break-all text-gray-500">{product.description}</p>

			<!-- Centered Price -->
			<p class="mt-1 text-sm font-medium text-blue-600 text-center">
				฿{product.price}
			</p>

			<!-- Top-right Quantity -->
			<span class="absolute top-2 right-2 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
				x{product.qty}
			</span>
		</div>
	{/each}
</div>


