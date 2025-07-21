<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;
	export let baseUrl = '/productos';

	$: queryParams = new URLSearchParams(window.location.search);

	function getPageUrl(page: number): string {
		queryParams.set('page', page.toString());
		return `${baseUrl}?${queryParams.toString()}`;
	}
</script>

{#if totalPages > 1}
	<div class="flex justify-center items-center space-x-4 mt-8">
		<a
			href={getPageUrl(currentPage - 1)}
			class="px-4 py-2 border rounded-md"
			class:disabled={currentPage === 1}
			aria-disabled={currentPage === 1}>Anterior</a
		>

		<span>
			Página {currentPage} de {totalPages}
		</span>

		<a
			href={getPageUrl(currentPage + 1)}
			class="px-4 py-2 border rounded-md"
			class:disabled={currentPage === totalPages}
			aria-disabled={currentPage === totalPages}>Siguiente</a
		>
	</div>
{/if}

<style>
	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
