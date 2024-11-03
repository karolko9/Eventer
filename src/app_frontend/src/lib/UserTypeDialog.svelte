<script>
    import { createEventDispatcher } from 'svelte';

    const USER_TYPES = [
        {
            src: "undraw_social_networking.svg",
            alt: "Men and woman icons texting",
            name: "attendee",
            description: "Browse events, buy tickets and attend conferences"
        },
        {
            src: "undraw_business_decisions.svg",
            alt: "Men in suit",
            name: "host",
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
        <article class="w-full lg:w-[300px] p-6 flex flex-col justify-center gap-4 lg:gap-6 items-center p-4 border border-gray-userTypeBorder rounded-md cursor-pointer" >
            <div class="w-[60%] lg:w-[100%]">
                <img src={userTypeData.src} alt={userTypeData.alt}/> 
            </div>
            <h3 class="text-lg font-medium text-black-normal">{userTypeData.name}</h3>
            <p class="text-sm text-center text-black-normal">{userTypeData.description}</p>
        </article>
    </button>
{/snippet}


<div class="flex flex-col gap-8">
    <header class="w-full flex justify-center">
        <h2 class="text-purple-normal text-xl font-semibold">Choose your role</h2>
    </header>
    <section class="w-full flex flex-col lg:flex-row items-center gap-4">
        {#each USER_TYPES as userType}
            {@render userTypeCard(userType)}
        {/each}
    </section>
</div>
