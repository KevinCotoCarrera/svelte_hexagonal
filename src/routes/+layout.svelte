<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>
<div class="bg-gray-100/30">
	{@render children()}

</div>
