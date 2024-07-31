<script>
    import { createEventDispatcher } from 'svelte';
    import { currentEvent } from '../stores/events';
    import {IconShare, IconMapPin} from '@tabler/icons-svelte';
    export let id;
    export let title;
    export let ticketsAmount;
    export let date;
    export let location;
    export let description;
    export let thumbnail;

    const dispatch = createEventDispatcher();

    

    function handleClick() {
        currentEvent.set({
            id,
            title,
            ticketsAmount,
            date,
            location,
            description,
            thumbnail
        });

        dispatch('navigate', { slug: id });
    }
</script>

<article on:click={handleClick} class="w-full lg:w-[24%] h-fit bg-primary flex flex-col rounded-xl shadow-xl cursor-pointer">
    <img class="w-full object-cover" src={thumbnail} alt="chuj"/>
    <div class="p-3">
        <div class="flex items-center justify-between">
            <h1 class="text-lg font-md text-background">{title}</h1>
            <IconShare style="color:#fff; opacity: 80%"/>
        </div>
        <h4 class="text-sm text-background opacity-80 mb-6">Tickets amount: {ticketsAmount}</h4>
        <h2 class="text-background font-md mb-2">{date}</h2>
        <p class="text-xs leading-5 text-background font-extralight mb-6">{description}</p>
        <div class="flex items-center gap-1">
            <IconMapPin style="color:#fff;"/>
            <h3 class="text-sm text-background">{location}</h3>
        </div>
    </div>
</article>