<script>
    import Menu from "../components/Menu.svelte";
    import "../app.css";
    import Toast from "../components/Toast.svelte";

</script>

<div class="fixed inset-0 flex flex-col-reverse lg:flex-row">
    <Menu />
    <Toast />
    <main class="flex-1 h-full relative">
        <slot />
    </main>
</div>