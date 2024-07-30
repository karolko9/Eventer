<script>
    import {IconInfoCircle} from '@tabler/icons-svelte'; 
    import EventCard from "../../components/EventCard.svelte";

  export const DUMMY_EVENTS = [
    {
        title: "ICP: Roadmap for devs",
        ticketsAmount: 1,
        date: "Fri, 26 June 2024, 20:00",
        location: "AGH University Of Cracow, Kraków",
        description: "ICP: Roadmap for Devs is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.",
        thumbnail: "/eventCardImg.png"
    },
    {
        title: "ICP basics - workshops",
        ticketsAmount: 2,
        date: "Fri, 22 June 2024, 12:00",
        location: "AGH University Of Cracow, Kraków",
        description: "ICP: Roadmap for Devs is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.",
        thumbnail: "/eventCardImg2.png"
    },
    {
        title: "New Blockchain in Town!",
        ticketsAmount: 1,
        date: "Sun, 14 June 2024, 14:00",
        location: "AGH University Of Cracow, Kraków",
        description: "ICP: Roadmap for Devs is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.",
        thumbnail: "/eventCardImg3.png"
    },
  ]
</script>

<header class="p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Your Events</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<section class="w-full h-mobile lg:h-desktop m-auto p-4 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap gap-4">
    {#each DUMMY_EVENTS as event}
        <EventCard title={event.title} ticketsAmount={event.ticketsAmount} date={event.date} location={event.location} description={event.description}
         thumbnail={event.thumbnail}/>
    {/each}
</section>