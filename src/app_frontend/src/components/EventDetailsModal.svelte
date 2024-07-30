<script>
    import Button from "./Button.svelte";
    import { IconCirclePlus} from '@tabler/icons-svelte';

    export let event;
</script>
  
<main class:open={event != null}>
    <section class="poster"></section>
    <Button><IconCirclePlus/>Click me</Button>
</main>
  
<style>
    main{
        width: 200px;
        height: 100%;
        background-color: white;
        overflow: auto;
        position: absolute;
        z-index: 1000;
        left: -200px;
        top: 0;
        transition: left 0.3s ease-in-out;
        border-right:2px solid rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        padding: 5px;
        padding-top: 50px;
    }
    main.open{
        left: 0px;
    }
    @media (min-width:1024px){
        main{
            width: 400px;
            left: -400px;
            padding-top: 100px;
        }
    }
    .poster {
        width: 100%;
        aspect-ratio: 3/2;
        border: 2px solid #5b2784;
        border-radius: 10px;
    }
</style>