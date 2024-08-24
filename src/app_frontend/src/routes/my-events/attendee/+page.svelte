<script>
    import { onMount } from "svelte";
   import { goto } from '$app/navigation'
   import { auth } from "../../../lib/auth";
   import EventCard from "../../../components/EventCard.svelte";
  
   let events = [];

   onMount(() => {
       $auth.init().then(() => {
           fetchEvents();
       });
   });

   async function fetchEvents() {
       try {
           if ($auth.isReady && $auth.isAuthenticated) {
               const eventsList = await $auth.whoamiActor.get_user_events();
               if(eventsList.length > 0) {
                    events = eventsList[0].map((event) => event);
               }
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
            <EventCard id={event.id} userType="attendee" name={event.name} date={event.time_start} address={event.address} participants={event.hash_map_of_declared} eventDescription={event.description} phone={event.contact.phone} email={event.contact.email} media={event.contact.media} on:navigate={handleNavigate}/>
        {/each}
    {:else}
    <div class="flex flex-col items-center mx-auto self-center">
        <img src="/undraw_void.svg" alt="void" class="h-[200px] w-[200px]"/>
        <h1 class="mt-4 text-xl font-medium text-primary">Events not found</h1>
    </div>
    {/if}
</section>