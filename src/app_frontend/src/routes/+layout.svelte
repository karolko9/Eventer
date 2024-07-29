<script>
    import Menu from "../components/Menu.svelte";
    import "../app.css";
</script>

<div class="container">
    <Menu />
    <main class="page-content-wrapper">
        <slot />
    </main>
</div>

<style>
    .container{
        position:fixed;
        top: 0;
        right:0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column-reverse;
    }

    @media (min-width:1024px){
        .container{
            flex-direction: row;
        }
    }

    .page-content-wrapper{
        flex: 1;
        height:100%;
    }
</style>

