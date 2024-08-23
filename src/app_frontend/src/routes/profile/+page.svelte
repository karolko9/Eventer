<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation'
    import { IconInfoCircle, IconMapSearch, IconX } from '@tabler/icons-svelte'; 
    import { createTagsInput, melt } from '@melt-ui/svelte';
    import { auth } from "../../lib/auth.js";
    import { addToast } from "../../components/Toast.svelte";

    onMount(() => {
        $auth.init()
    });

    
    let name;
    let searchQuery;
    let searchResults = [];
    let userLocationLat = "";
    let userLocationLong = "";

    const {
        elements: { root, input, tag, deleteTrigger, edit },
        states: { tags },
    } = createTagsInput({
        defaultTags: [],
        unique: true,
        add(tag) {
            return { id: tag, value: tag };
        },
        addOnPaste: true,
    });

    const selectLocation = (result) => {
        const { lat, lon } = result;
        userLocationLat = lat;
        userLocationLong = lon;
        searchResults = [];
    }

    const  handleKeydown = (event, result) => {
        if (event.key === 'Enter' || event.key === ' ') {
            selectLocation(result);
        }
    }

    const searchLocation = async() => {
        if (!searchQuery) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
            const data = await response.json();
            if (data.length > 0) {
                searchResults = data;
            } else {
                searchResults = [];
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }

    let nameError = false;
    let locationError = false;
    let tagsError = false;

    const submitHandler = async () => {
        nameError = !name;
        locationError  = !searchQuery;
        tagsError = !tags.get().length > 0;

        if (nameError || locationError) return;
        const user_tags = tags.get().map((tag) => tag.value.trim());

        const userDTO = {
                name,
                location: [parseFloat(userLocationLat), parseFloat(userLocationLong)],
                tags: user_tags,
                job: "",
                role: "",
                bio: ""
        };
        
        try{
            if ($auth.isReady && $auth.isAuthenticated) {
                const result = await $auth.whoamiActor.register_user(userDTO);
                if(result){
                    localStorage.setItem("updated_profile", true)
                    addToast({data: {title: 'Success',description: 'Updated profile successfully!', color: 'bg-green'}})
                    setTimeout(() => {
                        goto('/');
                    }, 2000)
                } else{
                    addToast({data: {title: 'Error', description: 'Login in order to update profile', color: 'bg-red-500'}})
                }
            } else {
                addToast({data: {title: 'Error', description: 'Login in order to update profile', color: 'bg-red-500'}})
            }
        }catch(error){
            addToast({data: { title: 'Error', description: 'Something went wrong!', color: 'bg-red-500'}})
            console.log(error.message);
        }
    }

</script>

<header class="relative p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Profile</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<form class="w-full h-mobile lg:h-desktop px-4 pb-4 overflow-y-hidden flex flex-col">
    <article class="w-full h-mobile flex flex-col lg:p-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
        <div class="lg:h-fit flex flex-col gap-1 mb-3">
            <label for="name" class="mb-1 text-md text-primary">Name</label>
            <input bind:value={name} name="name" placeholder="Enter Your name or nickname" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
            {#if nameError}
                <p class="text-sm text-accent">Entering your name is required</p>
            {/if}
        </div>
        <div class="relative lg:h-fit flex flex-col gap-1 mb-3">
            <label for="name" class="mb-1 text-md text-primary">Location</label>
            <div class="lg:w-[40vw] relative lg:h-fit flex gap-1 mb-3">
                <input name="name" id="searchQuery" bind:value={searchQuery} placeholder="Enter Your city of residence" class="w-full p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
                <button on:click={searchLocation} class="flex items-center bg-primary px-2 py-0.5 rounded-md">
                    <IconMapSearch style="height:18px; width:18px; color:#fff;"/>
                </button>
            </div>
            {#if searchResults.length > 0}
                <ul class="w-full lg:w-[40vw] h-fit absolute top-[75px] z-50 overflow-auto p-3 flex flex-col gap-4 bg-background border-2  border-color lg:rounded-md">
                    {#each searchResults as result}
                        <li class="whitespace-nowrap">
                        <button
                        type="button"
                        on:click={() => selectLocation(result)}
                        on:keydown={(event) => handleKeydown(event, result)}
                        tabindex="0"
                        >
                            {result.display_name}
                        </button>
                        </li>
                    {/each}
                </ul>
            {/if}
            {#if locationError}
                <p class="text-sm text-accent">Entering location is required</p>
            {/if}
        </div>
        <div class="lg:h-fit flex flex-col gap-1 mb-3">
            <label for="tags" class="mb-1 text-md text-primary">Your intrests</label>
            <div class="lg:h-fit lg:w-[40vw] flex flex-col items-start justify-center gap-2 border-2 border-color rounded-md focus:border-primary">
                <div use:melt={$root} class="flex flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700 focus-within:ring focus-within:ring-magnum-400">
                    {#each $tags as t}
                        <div use:melt={$tag(t)}
                            class="flex items-center overflow-hidden rounded-md bg-primary300 text-background [word-break:break-word]
                            data-[disabled]:bg-magnum-300 data-[selected]:bg-primary data-[disabled]:hover:cursor-default
                            data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0 ">
                            <span class="flex items-center border-r border-white/10 px-1.5"
                            >{t.value}</span
                            >
                            <button {...$deleteTrigger(t)} use:melt={$deleteTrigger(t)} class="flex h-full items-center px-1 enabled:hover:bg-primary500">
                            <IconX class="height:12px; width:12px"/>
                            </button>
                        </div>
                        <div use:melt={$edit(t)} class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"/>
                    {/each}
                    <input use:melt={$input} type="text" name="tags" placeholder="Enter tags..." class="min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500 placeholder-primary500"/>
                </div>
            </div>
            {#if tagsError}
                <p class="text-sm text-accent">Entering tags is required</p>
            {/if}
        </div>
    </article>
    <div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3">
        <button on:click={submitHandler} class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Save</button>
    </div>
</form>

