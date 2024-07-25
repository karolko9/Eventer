<script>
  import Map from "../components/Map.svelte";
  import LoggedIn from "../components/LoggedIn.svelte";
  import LoggedOut from "../components/LoggedOut.svelte";
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";

  onMount(() => {
    $auth.init();
  });
</script>

<main>
  <div>
    {#if $auth.isReady}
      {#if $auth.isAuthenticated} 
        <div>
          <!-- 
          lista komponentów na pasku narzędzi/opcji. Do zrobienia poprzez Routes?
          przejście do każdego routa albo spowoduje pojawienie się okienka elementu albo  stworzymy całkiem nowy widok, aczkolwiek 1 opcja efektowniejsza
          

          mapa - root - przejście do głównego widoku
          your events
          create event
          settings
          profile - będziemy chcieli żeby zawierał w środku component LoggedIn
          searchbar
          online events 
          -->
          <LoggedIn />
        </div>
        <div>
          <Map />
        </div>
      {:else}
        <LoggedOut />
      {/if}
    {/if}
  </div>
  <div>
    <!-- odnośnik do projektu - link do githuba? -->
  </div>
</main>
