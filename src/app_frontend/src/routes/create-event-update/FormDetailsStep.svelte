<script>
     import { IconX, IconPhotoPlus, } from '@tabler/icons-svelte'; 
     import { createTagsInput } from '@melt-ui/svelte';
       
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

    let eventName = "";
    let eventDescription = "";
    let eventTags = "";
</script>

<article class="w-full h-mobile flex flex-col lg:flex-row lg:flex-wrap lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
    <div class="lg:h-fit flex flex-col gap-1 order-1 mb-3">
        <label for="name" class="mb-1 text-md text-primary">Event name</label>
        <input value={eventName} name="name" placeholder="Enter event name" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
    </div>
    <div class="lg:h-fit flex flex-col gap-1 order-3 mb-3">
        <label for="description" class="mb-1 text-md text-primary">Event description</label>
        <textarea value={eventDescription} name="description" placeholder="Enter detailed description of your event" class="lg:w-[40vw] min-h-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"></textarea>
    </div>

    <div class="lg:h-fit flex flex-col gap-1 order-2 mb-3">
        <label for="description" class="mb-1 text-md text-primary">Event tags</label>
        <div class="lg:h-fit lg:w-[40vw] flex flex-col items-start justify-center gap-2 border-2 border-color rounded-md focus:border-primary">
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
    <div class="lg:h-fit flex flex-col gap-1 order-4 mb-3">
        <label for="thumbnail" class="mb-1 text-md text-primary">Event thumbnail</label>
        {#if !thumbnail}
            <div class="lg:w-[40vw] lg:min-h-[200px] p-3 flex flex-col items-center justify-center gap-2 border-2 border-color rounded-md" on:click={()=>{fileinput.click();}}>
                <IconPhotoPlus style="height: 40px; width: 40px; color: #5B2784"/>
                <p class="text-sm text-primary font-medium">Upload event's thumbnail</p>
                <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            </div>
        {:else}
            <img class="lg:w-[40vw] object-cover rounded-md" src="{thumbnail}" alt="thumbnail" />
        {/if}
    </div>
</article> 