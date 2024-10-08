<script>
    import { onMount } from "svelte";
    import { createDialog, melt } from '@melt-ui/svelte';
    import { fade } from 'svelte/transition';
    import { auth } from "../lib/auth";
    import { IconMapPin, IconUserSearch, IconCalendarEvent, IconUsers, IconTicket,  IconMail, IconX, IconPhone, IconMailUp } from '@tabler/icons-svelte';
    import { getAsset } from "../lib/uploader";

    export let event;
    export let openModal;

    let eventDetails;
    let thumbnailBlob;
    let joinedEvent = false;

    onMount(() => {
        $auth.init();
    });

    $: if(event){
        fetchEventDetails();
    }

    const fetchEventDetails = async () => {
        try {
            if ($auth.isReady) {
            const details = await $auth.whoamiActor.get_event(parseInt(event.id));
            eventDetails = details[0];
            thumbnailBlob = await getAsset(eventDetails.thumbnail);
        }
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    }

    if(openModal){
        fetchEventDetails();
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

    const getStreetAndNumber = (address) => {
        let fullAddressArr = address.split(',');
        return fullAddressArr[0] + ", " + fullAddressArr[3] + ", " + findPostalCode(fullAddressArr);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    const saveEventInStorage = (id, name, principal, signature) => {
        const eventObject = {
            event_id: id.toString(),
            event_name: name,
            principal: principal,
            signature_hex: signature
        };

        let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

        const eventExists = storedEvents.some(event => event.event_id === eventObject.event_id);

        if (!eventExists) {
            // If it doesn't exist, push the new event to the storedEvents array
            storedEvents.push(eventObject);

            // Store the updated array back in localStorage
            localStorage.setItem('events', JSON.stringify(storedEvents));

            console.log("Event saved to local storage.");
        }else {
            console.log("Event already exists in local storage.");
        }
    }

    const joinEvent = async (id) => {
        if ($auth.isReady && $auth.isAuthenticated) {
            try{
                const response = await $auth.whoamiActor.join_event(parseInt(id));
                console.log("JoinEvent Response:" , response);
                if(response){
                    saveEventInStorage(event.id, eventDetails.name, $auth.identity.getPrincipal().toString(), response)
                }
            }catch(error){
                console.error(error)
            } 
        }
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
  } = createDialog({
    forceVisible: true,
  });
</script>

<main class:open={openModal} class="h-[50vh] lg:h-full w-full lg:w-[400px] bottom-[-50vh] lg:left-[-500px] lg:bottom-0 p-4 bg-white overflow-y-scroll absolute z-10 duration-300 ease-in-out border-r-2 border-gray-200 rounded-md ">
    {#if eventDetails != null} 
        <h1 class="mb-2 text-lg font-semibold">{eventDetails.name}</h1>
        <div class="flex items-center gap-3 mb-2">
            <IconCalendarEvent />
            <p style="text-md">{formatDate(eventDetails.time_start)}</p>
        </div>
        <div class="flex gap-3 mb-2">
            <IconMapPin />
            <p style="text-md">{getStreetAndNumber(eventDetails.address)}</p>
        </div>
        <div class="flex gap-3 mb-2">
            <IconTicket />
            <p style="text-md">Tickets available from {eventDetails.price}zł</p>
        </div>
        <div class="w-full flex gap-2  mb-4">
            <button on:click={() => joinEvent(eventDetails.id)} class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">
                <IconTicket style="color: #fff"/>
                <p class="text-background">Buy ticket</p>
            </button>
            <button use:melt={$trigger} class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">
                <IconMail style="color: #fff"/>
                <p class="text-background">Contact</p>
            </button>
        </div>
        <img src={thumbnailBlob} class="w-full object-cover mb-4 rounded-md" alt="thumbnail"/>
        {#if $open}
            <div class="flex flex-col" use:melt={$portalled}>
                <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" transition:fade={{ duration: 150 }}></div>
                <div use:melt={$content} class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
                    <div class="flex justify-between items-center">
                        <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
                            Organizer contact information
                        </h2>
                        <button use:melt={$close}>
                            <IconX style="color:#5B2784" />
                        </button>
                    </div>
                    <p use:melt={$description} class="mb-4 mt-1 leading-normal text-zinc-600">Contact event host by provided details</p>
                    <div class="flex items-center gap-2 mb-2">
                        <IconPhone style="color:#5B2784"/>
                        <a class="font-medium text-primary300" href="tel:123456789">{eventDetails.contact.phone}</a>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <IconMailUp style="color:#5B2784"/>
                        <a class="font-medium text-primary300 truncate" href="mailto:hostmail@gmail.com">{eventDetails.contact.email}</a>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <IconUserSearch style="color:#5B2784"/>
                        <a class="font-medium text-primary300 truncate" href={eventDetails.media}>{eventDetails.contact.media}</a>
                    </div>
                </div>
            </div>
        {/if}
        <p class="text-sm font-light mb-4 break-words">{eventDetails.description}</p>
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
