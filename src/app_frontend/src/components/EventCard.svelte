<script>
    import { createEventDispatcher } from 'svelte';
    import { currentEvent } from '../stores/events';
    import { IconPhone, IconShare, IconMapPin, IconX, IconMailUp, IconUserSearch } from '@tabler/icons-svelte';
    import { createDialog, melt } from '@melt-ui/svelte';
    import { fade } from 'svelte/transition';
    import QrCode from './QrCode.svelte';
    import QrCodeScanner from "./QrCodeScanner.svelte"
    import { onMount } from "svelte";
    import { auth } from "../lib/auth";





    export let id;
    export let name;
    export let date;
    export let address;
    export let eventDescription;
    export let userType;
    export let phone;
    export let email;
    export let media;
    export let participants;


    let ticketsAmount = Math.floor(Math.random() * 40);

    const dispatch = createEventDispatcher();

    const handleClick = () => {
        currentEvent.set({
            id,
            name,
            ticketsAmount,
            date,
            address,
            description,
            thumbnail 
        });

        dispatch('navigate', { slug: id });
    }

    const postalCodeRegex = /^\d{2}-\d{3}$/;

    const isPostalCode = (element) => {
        return postalCodeRegex.test(element);
    }

    const findPostalCode = (arr) => {
        let foundPostalCode = "";
        arr.forEach(element => {
            if (isPostalCode(element)) {
                foundPostalCode = element;
            }
        });
        return foundPostalCode;
    }
   
    const getStreetAndNumber = () => {
        let fullAddressArr = address.split(',');
        return fullAddressArr[0] + ", " + fullAddressArr[3] + ", " + findPostalCode(fullAddressArr);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    const getThumbnail = () => {
        const randomNumber = Math.floor(Math.random() * 3);
        return "/eventCardImg" + String(randomNumber + 1) + ".png";
    }

    let thumbnail = getThumbnail();

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
    } = createDialog({
        forceVisible: true,
    });


    let showTicket = false;

    const handleShowTicket = () => {
        showTicket = !showTicket;
    }
</script>

<article class="w-full lg:w-[24%] h-fit bg-primary flex flex-col rounded-xl shadow-xl cursor-pointer">
    <img class="w-full object-cover" src={thumbnail} alt="chuj"/>
    <div class="p-3">
        <div class="flex items-center justify-between">
            <h1 class="text-lg font-md text-background">{name}</h1>
            <IconShare style="color:#fff; opacity: 80%"/>
        </div>
        <h4 class="text-sm text-background opacity-80 mb-6">Tickets amount{userType === "Attendee" ? "" : " left"}: {ticketsAmount}</h4>
        {#if userType === "attendee"}
            <h2 class="text-background font-md mb-2">{formatDate(date)}</h2>
            <p class="text-xs leading-5 text-background font-extralight mb-6">{eventDescription}</p>
        {/if}
        <ul class="flex flex-col gap-2">
            <li class="text-sm text-background opacity-80 mb-6">Number of participants: {participants.length}</li>
            {#if userType === "host"}
                {#each participants as participant}
                    <li class="text-sm text-background opacity-80 mb-6">{participant}</li>
                {/each}
            {/if}
        </ul>
        <div class="flex gap-2 items-center mb-2">
            {#if userType === "attendee"}
                <button on:click={handleShowTicket} class="p-2 bg-background border-2 border-background text-primary font-medium rounded-lg">  {showTicket ? 'Hide Ticket' : 'Show Ticket'}</button>
                <button use:melt={$trigger} class="p-2 bg-primary border-2 border-background text-background font-medium rounded-lg">Contact Host</button>
            {/if}
            {#if userType === "host"}
               
                <button use:melt={$trigger} class="mt-4 p-2 bg-primary border-2 border-background text-background font-medium rounded-lg">Check ticket</button>
            {/if}
        </div>
        {#if $open}
            <div class="flex flex-col" use:melt={$portalled}>
                <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" transition:fade={{ duration: 150 }}></div>
                <div use:melt={$content} class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
                    <div class="flex justify-between items-center">
                        <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
                            {userType === "Attendee" ? "Organiser contact information" : " Scan QR code"}:
                        </h2>
                        <button use:melt={$close}>
                            <IconX style="color:#5B2784" />
                        </button>
                    </div>
                    {#if userType === "attendee"}
                        <p use:melt={$description} class="mb-4 mt-1 leading-normal text-zinc-600">Contact event host by provided details</p>
                        <div class="flex items-center gap-2 mb-2">
                            <IconPhone style="color:#5B2784"/>
                            <a class="font-medium text-primary300" href="tel:123456789">{phone}</a>
                        </div>
                        <div class="flex items-center gap-2 mb-2">
                            <IconMailUp style="color:#5B2784"/>
                            <a class="font-medium text-primary300" href="mailto:hostmail@gmail.com">{email}</a>
                        </div>
                        <div class="flex items-center gap-2 mb-2">
                            <IconUserSearch style="color:#5B2784"/>
                            <a class="font-medium text-primary300 truncate" href={media}>{media}</a>
                        </div>
                    {/if}
                    {#if userType === "host"}
                        <QrCodeScanner participants={participants}/>
                    {/if}
                </div>
            </div>
        {/if}
        {#if showTicket && userType === "attendee"}
            <QrCode eventId={parseInt(id)}/>
        {/if}
        {#if userType === "attendee"}
            <div class="mt-4 flex items-center gap-1">
                <IconMapPin style="color:#fff;"/>
                <h3 class="text-sm text-background">{getStreetAndNumber()}</h3>
            </div>
        {/if}
    </div>
</article>