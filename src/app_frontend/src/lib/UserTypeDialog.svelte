<script>
    import { createEventDispatcher } from 'svelte';

    const USER_TYPES = [
        {
            src: "undraw_social_networking.svg",
            alt: "Men and woman icons texting",
            name: "Attendee",
            description: "Browse events, buy tickets and attend conferences"
        },
        {
            src: "undraw_business_decisions.svg",
            alt: "Men in suit",
            name: "Host",
            description: "Create, market and track your Events"
        }
    ]

    const dispatch = createEventDispatcher();

    function handleUserTypeSelect(userType) {
        dispatch('selectUserType', { userType });
    }
</script>

{#snippet userTypeCard(userTypeData)}
    <button on:click={() => handleUserTypeSelect(userTypeData.name)}>
        <article class="w-[300px] p-6 flex flex-col justify-center gap-6 items-center p-4 border border-gray-userTypeBorder rounded-md cursor-pointer" >
            <img src={userTypeData.src} alt={userTypeData.alt}/> 
            <h3 class="text-lg font-medium text-black-normal">{userTypeData.name}</h3>
            <p class="text-sm text-center text-black-normal">{userTypeData.description}</p>
        </article>
    </button>
{/snippet}


<div class="flex flex-col gap-8">
    <header class="w-full flex justify-center">
        <h2 class="text-purple-normal text-xl font-semibold">Choose your role</h2>
    </header>
    <section class="flex gap-4">
        {#each USER_TYPES as userType}
            {@render userTypeCard(userType)}
        {/each}
    </section>
</div>
