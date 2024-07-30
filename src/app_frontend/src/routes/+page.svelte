<script>
  import Map from "../components/Map.svelte";
  import Profile from "../components/Profile.svelte";
  import LoggedOut from "../components/LoggedOut.svelte";
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";

  onMount(() => {
    $auth.init();
  });
</script>


{#if $auth.isReady}
  {#if $auth.isAuthenticated}
      <Map />
  {:else}
    <LoggedOut />
  {/if}
{/if}


