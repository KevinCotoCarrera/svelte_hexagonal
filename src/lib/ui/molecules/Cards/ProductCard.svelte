<script lang="ts">
	import type { Product } from '$lib/core/domain/entities/Product';

	const { product } = $props<{ product: ReturnType<Product['toPrimitives']> }>();
</script>

<div
	class="relative flex flex-col rounded-md border-[1px] border-amber-200/40 bg-white p-3 text-sm shadow-sm transition-all duration-150 hover:translate-y-2.5 hover:border-[1.5px] hover:border-amber-200 hover:shadow-lg"
>
	{#if product.imageUrl}
		<img src={product.imageUrl} alt={product.name} class="mb-2 h-24 w-full rounded object-cover" />
	{/if}

	<p class="font-semibold text-gray-800">{product.name}</p>
	<p class="truncate text-xs text-gray-500">{product.description}</p>
	<p class="mt-1 font-medium text-blue-600">฿{product.price}</p>

	<span class="absolute top-2 right-2 rounded border bg-white px-2 py-0.5 text-xs shadow">
		x{product.qty}
	</span>
</div>
