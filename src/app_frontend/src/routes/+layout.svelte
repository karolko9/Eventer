<script>
    import { showMenu } from "../stores/showMenuStore";

    import Toast from "$lib/Toast.svelte";

    import "../app.css";

    let Menu = null;

    $: if ($showMenu && !Menu) {
        import("$lib/Menu.svelte").then((module) => {
            Menu = module.default;
        });
    }
</script>

<div class="fixed inset-0 flex flex-col-reverse lg:flex-row">
    {#if $showMenu && Menu}
        <svelte:component this={Menu} />
    {/if}
    <Toast />
    <main class="flex-1 h-full relative">
        <slot />
    </main>
</div>
