<script>
    import { formProgress, formStep } from '../../stores/createEvent.js';
    import { createProgress } from '@melt-ui/svelte';
    import { IconInfoCircle, IconX } from '@tabler/icons-svelte'; 
    import FormDateStep from "./FormDateStep.svelte";
    import FormDetailsStep from "./FormDetailsStep.svelte";
    import FormLocationStep from "./FormLocationStep.svelte";
    import FormTicketsStep from "./FormTicketsStep.svelte";
    import FormHostContactStep from "./FormHostContactStep.svelte";
    import { auth } from "../../lib/auth";
    import { createDialog, melt } from '@melt-ui/svelte';
    import { fade } from 'svelte/transition';
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let showLoginModal = false;
    let closeLoginModalButton;
    let showLoginModalButton;

    onMount(() => {
        $auth.init().then(() => {
            if(!$auth.isAuthenticated){
                showLoginModal = true;
            }
        })
    });

    const triggerOpenLoginModal = () => {
      showLoginModalButton.click();
    }
    const closeLoginModal = () => {
        closeLoginModalButton.click();
    }

  $: if (showLoginModal) {
        triggerOpenLoginModal()
    }

    const {
        elements: {
          trigger,
          overlay,
          content,
          title,
          description,
          close,
          portalled,
        },
    states: { open },
  } = createDialog ({
    forceVisible: true,
    closeOnOutsideClick: false
  });

  const loginHandler = () => {
    $auth.login();
    closeLoginModal();
  }
    
    // progress bar
    const {
        elements: { root },
        options: { max },
    } = createProgress({
        formProgress,
        max: 100,
    })

    const formHeaders = ["Event details", "Event time", "Event location", "Tickets details", "Contact with host"];
</script>

<header class="relative p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Create Event</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<form class="w-full h-mobile lg:h-desktop px-4 pb-4 overflow-y-hidden flex flex-col">
    <div {...$root} use:root class="h-6 w-full mb-3 overflow-hidden rounded-[99999px] border-2 border-color bg-background">
        <div class="h-full w-full bg-primary transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]" style={`transform: translateX(-${ 100 - (100 * ($formProgress ?? 0)) / ($max ?? 1)}%)`}></div>
    </div>
    <button bind:this={showLoginModalButton} use:melt={$trigger} class=""></button>
    <button bind:this={closeLoginModalButton} use:melt={$close} class=""></button>
    {#if $open}
    <div class="flex flex-col outline-none" use:melt={$portalled}>
        <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" transition:fade={{ duration: 150 }}></div>
        <div use:melt={$content} class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
        <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">Log in in to create an event </h2>
        <p use:melt={$description} class="mb-4 mt-1 leading-normal text-zinc-600">We know you can't wait to create amazing event but, it's possible only for logged in users.</p>
        <img src="undraw_secure_login.svg" alt="people with baloons" class="h-[140px]"/>
        <button on:click={loginHandler} class="mt-2 p-2 bg-primary text-background rounded-lg text-center">Log in to create event</button>
        </div>
    </div>
  {/if}

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
