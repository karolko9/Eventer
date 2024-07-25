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

<main>
  <div>
    {#if $auth.isReady}
      {#if $auth.isAuthenticated} 
        <div>
          <!-- 
          lista komponentów na pasku narzędzi/opcji. Do zrobienia poprzez Routes?
          przejście do każdego routa albo spowoduje pojawienie się okienka elementu albo  stworzymy całkiem nowy widok, aczkolwiek 1 opcja efektowniejsza

          Router: NavBar

          Routes:
          mapa - root - przejście do głównego widoku
          your events
          create event
          settings
          profile - będziemy chcieli żeby zawierał w środku component LoggedIn
          searchbar for events
          online events - do tego myślę że spoko jednak było by zrobić całkiem nowy widok i zastąpić nim element Map, aczkolwiek to na przyszłość
          -->
          <Profile /> 
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
