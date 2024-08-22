<script>
  import Map from "../components/Map.svelte";
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte"

  onMount(() => {
    $auth.init();
  });

</script>

{#if $auth.isReady}
  <Map/>
{:else}
  <Loader imageSrc="undraw_having_fun.svg" description="Loading events" />
{/if}