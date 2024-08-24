<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation'
    import { auth } from "../../lib/auth";
    import EventCard from "../../components/EventCard.svelte"; 
    import { IconInfoCircle } from '@tabler/icons-svelte';

    let events = [];

    onMount(() => {
        $auth.init().then(() => {
            fetchEvents();
        });
    });

    async function fetchEvents() {
    try {
      if ($auth.isReady && $auth.isAuthenticated) {
        const eventsList = await $auth.whoamiActor.get_all_events_with_details();
        events = eventsList.map((event) => event);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  const handleNavigate = (event) =>{
        const { slug } = event.detail;
        goto(`/events/${slug}`);
    }
</script>

<header class="p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Events</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<section class="w-full h-mobile lg:h-desktop m-auto p-4 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap gap-4">
    {#if events.length > 0}
        {#each events as event}
            <EventCard id={event.id} participants={event.hash_map_of_declared} name={event.name} date={event.time_start} address={event.address} on:navigate={handleNavigate}/>
        {/each}
    {/if}
</section>