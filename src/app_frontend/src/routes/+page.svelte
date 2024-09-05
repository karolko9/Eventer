<script>
  import Map from "../components/Map.svelte";
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte"
  import { currentUserType } from "../stores/userTypeStore";

  onMount(() => {
    $auth.init();
    currentUserType.set(null);
  });

</script>

<section class="w-[100%] h-[100%] flex">
  <div class="hidden lg:w-1/2 lg:flex items-center justify-center">
    <img src="undraw_partying.svg" alt="party" class="lg:w-[400px]">
  </div>
  <div class="w-full lg:w-1/2 flex flex-col items-center justify-center bg-primary">
    <h1 class="text-6xl lg:text-8xl text-background">Eventer</h1>
    <h2 class="mt-2 text-lg lg:text-2xl text-background opacity-[80%]">Best events at your fingertips</h2>
    <img class="w-[200px] mt-8"src="undraw_having_fun_white.svg" alt="party"/>
    <h3 class="mt-8 text-md text-background opacity-[80%]">Choose what's Your role in our app</h3>
    <div class="flex gap-4 mt-4">
      <a href="/map" on:click={() => currentUserType.set("attendee")} class="p-3 bg-background text-primary border-2 border-background rounded-lg">Attendee</a>
      <a href="/my-events/host" on:click={() => currentUserType.set("host")} class="p-3 bg-primary text-background border-2 border-background rounded-lg">Host</a>
    </div>
  </div>
</section>
