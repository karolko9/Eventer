<script>
    import Button from "./Button.svelte";
    import { IconMapPin, IconSearch, IconCalendarEvent, IconUsers, IconTicket, IconInfoCircle, IconLocation, IconMail } from '@tabler/icons-svelte';

    export let event;
    console.log(event)
    export let open;
</script>

<main class:open={open} class="h-[500px] lg:h-full w-full lg:w-[400px] bottom-[-500px] lg:left-[-500px] lg:bottom-0 p-4 bg-white overflow-y-scroll absolute z-10 duration-300 ease-in-out   border-r-2 border-gray-200 rounded-md ">
    {#if event != null} 
        <img src="/eventCardImg.png" class="w-full object-cover mb-4 rounded-md" alt="thumbnail"/>
        <h1 class="mb-2 text-lg font-medium">ICP: Roadmap for devs</h1>
        <div class="flex items-center gap-3 mb-2">
            <IconCalendarEvent />
            <p style="text-md">Fri, 26 June 2024 17:00 </p>
        </div>
        <div class="flex gap-3 mb-2">
            <IconMapPin />
            <p style="text-md">AGH University of Cracow</p>
        </div>
        <div class="flex gap-3 mb-4">
            <IconUsers />
            <p style="text-md">Bilety: <span class="text-green">dostępne</span></p>
        </div> 
        <div class="w-full overflow-hidden mb-4">
            <div class="flex gap-2 overflow-x-scroll">
                <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">
                    <IconTicket style="color: #fff"/>
                    <p class="text-background">Get ticket</p>
                </div>
                <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">
                    <IconInfoCircle style="color: #fff"/>
                    <p class="text-background">More info</p>
           
                </div>
                <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">
                    <IconLocation style="color: #fff"/>
                    <p class="text-background">Location</p>
                </div>
                <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">
                    <IconMail style="color: #fff"/>
                    <p class="text-background">Contact</p>
                </div>
            </div>
        </div>
        <p class="text-sm font-light mb-4">"ICP: Roadmap for Devs" is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.</p>
        <div class="flex gap-2 mb-2">
            <IconTicket style="color: #000"/>
            <div class="flex flex-col">
                <p class="text-md">Form: 100zł</p>
                <p class="text-sm opacity-80">Price includes 4zł service fee</p>
            </div>
        </div>
        <button class="py-3 px-10 text-md font-medium bg-primary text-background rounded-[20px]">Buy Ticket</button>
    {/if}
</main>

<style>
    main.open{
        bottom: 0;
    }
    @media (min-width: 1024px){
        main.open{
            left:0;
        }
    }
</style>
