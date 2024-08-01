<script>
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import { createProgress } from '@melt-ui/svelte';
    import { IconInfoCircle } from '@tabler/icons-svelte'; 
    import FormDateStep from "./FormDateStep.svelte";
    import FormDetailsStep from "./FormDetailsStep.svelte";
    import FormLocationStep from "./FormLocationStep.svelte";
    import { auth } from "../../lib/auth";

    const step = writable(0);
    const value = writable(4);

    // progress bar
    const {
        elements: { root },
        options: { max },
    } = createProgress({
        value,
        max: 100,
    })

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));
        sleep(1000).then(() => {
        value.set(75);
    });

    const formHeaders = ["Event details", "Event time", "Event location"];

  

    // date input


    let buttonText = "Continue";
  


    let eventLocationLat = "";
    let eventLocationLong = "";
    let eventStartTime = "";
    let eventEndTime = "";
  
    onMount(() => {
        $auth.init();
    });
</script>

<header class="relative p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Create Event</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<section class="w-full h-mobile lg:h-desktop px-4 pb-4 overflow-y-hidden flex flex-col">
    <div {...$root} use:root class="h-6 w-full mb-3 overflow-hidden rounded-[99999px] border-2 border-color bg-background">
        <div class="h-full w-full bg-primary transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]" style={`transform: translateX(-${ 100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}/>
    </div>

    <h2 class="mb-3 text-lg text-primary font-medium">{formHeaders[$step]}</h2>
    <!-- <FormDetailsStep /> -->
    <!-- <FormDateStep /> -->
    <FormLocationStep />
    <button class="w-full lg:w-[200px] mt-3 p-3 bg-primary text-background self-end lg:self-start rounded-md">{buttonText}</button>
</section>
