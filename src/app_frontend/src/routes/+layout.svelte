<script>
    import Menu from "../components/Menu.svelte";
    import "../app.css";
    import Toast from "../components/Toast.svelte";
    import { currentUserType } from "../stores/userTypeStore";
    import { page } from '$app/stores'; 

    let currentPath = $page.url.pathname;
</script>

<div class="fixed inset-0 flex flex-col-reverse lg:flex-row">
    {#if $currentUserType && currentPath !== '/'}
        <Menu />
    {/if}
    <Toast />
    <main class="flex-1 h-full relative">
        <slot />
    </main>
</div>