<script>
    import {IconInfoCircle} from '@tabler/icons-svelte'; 
    import EventCard from "../../components/EventCard.svelte";

  const DUMMY_EVENTS = [
    {title: "ICP: Roadmap for devs"},
    {title: "ICP basics - workshops"},
    {title: "New Blockchain in Town!"},
    {title: "ICP basics - workshops"},
    {title: "New Blockchain in Town!"},
  ]
</script>

<header class="p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Your Events</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<section class="w-full m-auto p-4 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap gap-4" style="height: calc(100vh - 130px);">
    <EventCard />
    <EventCard />
    <EventCard />
    <EventCard />
    <EventCard />
</section>

<style>
    @media (min-height: 1024px) {
        section {
            height: calc(100vh - 64px) !important;
        }
    }
</style>