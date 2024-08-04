<script>
    import { createEventDispatcher } from 'svelte';
    import { currentEvent } from '../stores/events';
    import {IconShare, IconMapPin} from '@tabler/icons-svelte';

    export let id;
    export let name;
    export let date;
    export let address;
     
    let ticketsAmount = Math.floor(Math.random() * 40);
    let description = "ICP: Roadmap for Devs is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.";

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
   
    const getStreetAndNumber = () => {
        let fullAddressArr = address.split(',')
        return fullAddressArr[2] + ", " + fullAddressArr[1];
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

</script>

<article on:click={handleClick} class="w-full lg:w-[24%] h-fit bg-primary flex flex-col rounded-xl shadow-xl cursor-pointer">
    <img class="w-full object-cover" src={thumbnail} alt="chuj"/>
    <div class="p-3">
        <div class="flex items-center justify-between">
            <h1 class="text-lg font-md text-background">{name}</h1>
            <IconShare style="color:#fff; opacity: 80%"/>
        </div>
        <h4 class="text-sm text-background opacity-80 mb-6">Tickets amount: {ticketsAmount}</h4>
        <h2 class="text-background font-md mb-2">{formatDate(date)}</h2>
        <p class="text-xs leading-5 text-background font-extralight mb-6">{description}</p>
        <div class="flex items-center gap-1">
            <IconMapPin style="color:#fff;"/>
            <h3 class="text-sm text-background">{getStreetAndNumber()}</h3>
        </div>
    </div>
</article>