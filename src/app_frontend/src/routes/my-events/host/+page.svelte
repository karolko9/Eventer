<script>
    import { onMount } from "svelte";
   import { goto } from '$app/navigation'
   import { auth } from "$lib/auth";
   import EventCard from "$lib/EventCard.svelte";
   import { createDialog, melt } from '@melt-ui/svelte';
   import { fade } from 'svelte/transition';
   import { IconLogin } from '@tabler/icons-svelte';
   

   let events = [];

    onMount(() => {
        $auth.init().then(() => {
            if(!$auth.isAuthenticated){
                showLoginModal = true;
            }
            fetchEvents();
        });
    });
    

    const handleAuth = () => {
      if ($auth.isAuthenticated) {
        $auth.logout();
      } else {
        $auth.login();
      }
    }


   async function fetchEvents() {
       try {
           if ($auth.isReady && $auth.isAuthenticated) {
               const eventsList = await $auth.whoamiActor.get_user_hosted_events();
               if(eventsList.length > 0) {
                    events = eventsList[0].map((event) => event);
               }
               console.log("events fetched succesfully")
       }
       } catch (error) {
           console.error("Error fetching events:", error);
       }
   }

   function handleNavigate(event) {
       const { slug } = event.detail;
       goto(`/events/${slug}`);
   }
</script>

<section class="w-full h-mobile lg:h-desktop m-auto p-4 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap gap-4">
    {#if events.length > 0}
        {#each events as event}
            <EventCard id={event.id} userType="host" name={event.name} participants={event.hash_map_of_declared} date={event.time_start} address={event.address} eventDescription={event.description} on:navigate={handleNavigate}/>
        {/each}
    {:else}
    <div class="flex flex-col items-center mx-auto self-center">
        <img src="/undraw_void.svg" alt="void" class="h-[200px] w-[200px]"/>
        <h1 class="mt-4 text-xl font-medium text-primary">Events not found</h1>
    </div>
    {/if}
    {#if !$auth.isAuthenticated}
        <button on:click={handleAuth} class="absolute right-[20px]  bottom-[20px] w-fit h-fit p-2 flex flex-col items-center justify-center border-[1px] border-color bg-primary rounded-xl">
            <IconLogin style="color:#fff"/>
            <p class="text-xs text-background font-medium">Sign In</p>
        </button>
    {/if}

</section>