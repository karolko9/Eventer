<script>
  import { auth } from "../lib/auth";
  let principal = "";
  function handleWhoami() {
    $auth.whoamiActor?.greet("karol").then((p) => {
      principal = p.toString();
    });
  }
</script>

<div class="container">
  <h1>Internet Identity Client</h1>
  <h2>You are authenticated!</h2>
  <p>To see how a canister views you, click this button!</p>
  <button type="button" id="whoamiButton" class="primary" on:click={handleWhoami}>Who am I?</button>
  <input type="text" readonly id="whoami" placeholder="your Identity" bind:value={principal}/>
  <button id="logout" on:click={$auth.logout}>log out</button>
</div>

<style>
  #whoami {
    border: 1px solid #1a1a1a;
    margin-bottom: 1rem;
  }
</style>