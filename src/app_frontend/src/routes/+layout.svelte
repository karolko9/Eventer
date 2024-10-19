<script>
    import Menu from "$lib/Menu.svelte";
    import "../app.css";
    import Toast from "$lib/Toast.svelte";
    import { currentUserType } from "../stores/userTypeStore";
    import { page } from '$app/stores';
</script>

<div class="fixed inset-0 flex flex-col-reverse lg:flex-row">
    {#if $currentUserType && $page.url.pathname !== '/'}
        <Menu />
    {/if}
    <Toast />
    <main class="flex-1 h-full relative">
        <slot />
    </main>
</div>