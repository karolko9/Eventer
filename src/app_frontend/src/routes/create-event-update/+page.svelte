<script>
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import { createProgress, createTagsInput, melt } from '@melt-ui/svelte';
    import { IconInfoCircle, IconX, IconPhotoPlus } from '@tabler/icons-svelte'; 

    import { auth } from "../../lib/auth";

    const step = writable(0);
    const value = writable(4);

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

    const {
        elements: { tagsRoot, input, tag, deleteTrigger, edit },
        states: { tags },
    } = createTagsInput({
        defaultTags: ['Svelte', 'Typescript'],
        unique: true,
        add(tag) {
        return { id: tag, value: tag };
        },
        addOnPaste: true,
    });

    let  thumbnail, fileinput;
	
    const onFileSelected =(e)=>{
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            thumbnail = e.target.result
        };    
    }

    let buttonText = "Continue";
  
    let eventName = "";
    let eventDescription = "";
    let eventTags = "";

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
    <!-- progres bar -->
    <div {...$root} use:root class="h-6 w-full mb-3 overflow-hidden rounded-[99999px] border-2 border-color bg-background">
        <div class="h-full w-full bg-primary transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]" style={`transform: translateX(-${ 100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}/>
    </div>

    <h2 class="mb-3 text-lg text-primary font-medium">{formHeaders[$step]}</h2>
    
    <!-- step 1 -->
    <article class="w-full h-mobile flex flex-col lg:flex-row lg:flex-wrap lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
        <div class="lg:h-fit flex flex-col gap-1 order-1">
            <label for="name" class="mb-1 text-md text-primary">Event name</label>
            <input value={eventName} name="name" placeholder="Enter event name" class="lg:w-[40vw] mb-3 p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
        </div>
        <div class="lg:h-fit flex flex-col gap-1 order-3">
            <label for="description" class="mb-1 text-md text-primary">Event description</label>
            <textarea value={eventDescription} name="description" placeholder="Enter detailed description of your event" class="lg:w-[40vw] min-h-[200px] mb-3 p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"></textarea>
        </div>
        <!-- tags  -->
        <div class="lg:h-fit flex flex-col gap-1 order-2">
            <label for="description" class="mb-1 text-md text-primary">Event tags</label>
            <div class="lg:h-fit lg:w-[40vw] mb-3 flex flex-col items-start justify-center gap-2 border-2 border-color rounded-md focus:border-primary">
                <div {...$tagsRoot} use:tagsRoot class="flex flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700 focus-within:ring focus-within:ring-magnum-400">
                    {#each $tags as t}
                        <div {...$tag(t)} use:tag
                            class="flex items-center overflow-hidden rounded-md bg-primary300 text-background [word-break:break-word]
                        data-[disabled]:bg-magnum-300 data-[selected]:bg-primary data-[disabled]:hover:cursor-default
                            data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0 ">
                            <span class="flex items-center border-r border-white/10 px-1.5"
                            >{t.value}</span
                            >
                            <button {...$deleteTrigger(t)} use:deleteTrigger class="flex h-full items-center px-1 enabled:hover:bg-primary500">
                            <IconX class="height:12px; width:12px"/>
                            </button>
                        </div>
                        <div {...$edit(t)} use:edit class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"/>
                    {/each}
                    <input {...$input} use:input type="text" placeholder="Enter tags..." class="min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500 placeholder-primary500"
                    />
                </div>
            </div>
        </div>
        <div class="lg:h-fit flex flex-col gap-1 order-4">
            <label for="thumbnail" class="mb-1 text-md text-primary">Event thumbnail</label>
            {#if !thumbnail}
                <a href="#" class="lg:w-[40vw] lg:min-h-[200px] mb-4 p-3 flex flex-col items-center justify-center gap-2 border-2 border-color rounded-md" on:click={()=>{fileinput.click();}}>
                    <IconPhotoPlus style="height: 40px; width: 40px; color: #5B2784"/>
                    <p class="text-sm text-primary font-medium">Upload event's thumbnail</p>
                    <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
                </a>
            {:else}
                <img class="lg:w-[40vw] mb-4 object-cover rounded-md" src="{thumbnail}" alt="thumbnail" />
            {/if}
        </div>
    </article>
    <button class="w-full lg:w-[200px] mt-3 p-3 bg-primary text-background self-end lg:self-start rounded-md">{buttonText}</button>
</section>