<script>
    import Menu from "../components/Menu.svelte";
    import "../app.css";
</script>

<div class="fixed inset-0 flex flex-col-reverse lg:flex-row">
    <Menu />
    <main class="flex-1 h-full">
        <slot />
    </main>
</div>