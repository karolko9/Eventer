<script>
  import Map from "../components/Map.svelte";
  // import LoggedIn from "../components/LoggedIn.svelte";
  // import LoggedOut from "../components/LoggedOut.svelte";
  // import { auth } from "../lib/auth";
  // import { onMount } from "svelte";

  // onMount(() => {
  //   $auth.init();
  // });
</script>

<main>
  <Map/>

  <!-- {#if $auth.isReady}
    {#if $auth.isAuthenticated}
      <LoggedIn />
    {:else}
      <LoggedOut />
    {/if}
  {/if} -->
</main>