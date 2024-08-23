<script>
    import { onMount } from "svelte";
    import { formProgress, formStep } from '../../stores/createEvent.js';
    import { createProgress } from '@melt-ui/svelte';
    import { IconInfoCircle } from '@tabler/icons-svelte'; 
    import FormDateStep from "./FormDateStep.svelte";
    import FormDetailsStep from "./FormDetailsStep.svelte";
    import FormLocationStep from "./FormLocationStep.svelte";
    import FormTicketsStep from "./FormTicketsStep.svelte";
    import FormHostContactStep from "./FormHostContactStep.svelte";
    import { auth } from "../../lib/auth";
    
    // progress bar
    const {
        elements: { root },
        options: { max },
    } = createProgress({
        formProgress,
        max: 100,
    })

    const formHeaders = ["Event details", "Event time", "Event location", "Tickets details", "Contact with host"];

    onMount(() => {
        $auth.init();
    });
</script>

<header class="relative p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Create Event</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<form class="w-full h-mobile lg:h-desktop px-4 pb-4 overflow-y-hidden flex flex-col">
    <div {...$root} use:root class="h-6 w-full mb-3 overflow-hidden rounded-[99999px] border-2 border-color bg-background">
        <div class="h-full w-full bg-primary transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]" style={`transform: translateX(-${ 100 - (100 * ($formProgress ?? 0)) / ($max ?? 1)}%)`}/>
    </div>

    <h2 class="mb-3 text-lg text-primary font-medium">{formHeaders[$formStep]}</h2>
        {#if $formStep === 0}
            <FormDetailsStep />
        {/if}
        {#if $formStep === 1}
            <FormDateStep />
        {/if}
        {#if $formStep === 2}
            <FormLocationStep />
        {/if}
        {#if $formStep === 3}
            <FormTicketsStep />
        {/if}
        {#if $formStep === 4}
            <FormHostContactStep />
        {/if}
</form>
