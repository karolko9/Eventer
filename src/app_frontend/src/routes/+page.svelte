<script>
  import Map from "../components/Map.svelte";
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";

  onMount(() => {
    $auth.init();
  });
</script>

{#if $auth.isReady}
    <Map />
{/if}

