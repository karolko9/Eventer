<script>
    import { onMount } from "svelte";
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation'
    import { formProgress, formStep, formData } from '../../stores/createEvent.js';
    import { auth } from "../../lib/auth.js";
    import { addToast } from "../../components/Toast.svelte";

    onMount(() => {
        $auth.init();
    });

    let formDataStore = get(formData);
    let { name, event_tags, description,date, start_hour, end_hour, location, address, price, media, phone, email, resetFormData} = formDataStore;

    let emailError = false;
    let phoneError = false;
    let mediaError = false;

    const handleCreateEvent = async () => {
        emailError = !email;
        phoneError = !phone;
        mediaError  = !media;

        if (emailError || phoneError || mediaError) return;
        
        try {
            const eventDTO = {
                name,
                tags: event_tags,
                description,
                location,
                address,
                time_start:  new Date(`${date}T${start_hour}:00`).toISOString(),
                time_end: new Date(`${date}T${end_hour}:00`).toISOString(),
                email,
                phone,
                media,
                price
            };

            if ($auth.isReady && $auth.isAuthenticated) {
                const result = await $auth.whoamiActor.create_event(eventDTO);
                if(result){
                    formProgress.set(100);
                    addToast({ data: { title: 'Success', description: 'The event was created!', color: 'bg-green'}})
                    setTimeout(() => {
                        goto('/');
                    }, 2000)
                }else{
                    addToast({ data: { title: 'Error', description: 'Something went wrong!', color: 'bg-red-500'}})
                } 
            } else {
                addToast({data: {title: 'Error', description: 'Login in order to create event', color: 'bg-red-500'}})
            }
        } catch (error) {
            console.error("Error creating event:", error);
            addToast({ data: { title: 'Error', description: 'Something went wrong!', color: 'bg-red-500'}})
        }
    }

    const goBack = () => {
        formStep.set(3);
        formProgress.set(80);
    }
</script>
<article class="w-full h-mobile flex flex-col lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
    <div class="lg:h-fit flex flex-col gap-1 order-1 mb-3">
        <label for="email" class="mb-1 text-md text-primary">Host contact email</label>
        <input bind:value={email} name="email" placeholder="Enter email" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
        {#if emailError}
            <p class="text-sm text-accent">Email is required</p>
        {/if}
    </div>
    <div class="lg:h-fit flex flex-col gap-1 order-3 mb-3">
        <label for="phoneNumber" class="mb-1 text-md text-primary">Host phone number</label>
        <input bind:value={phone} name="phoneNumber" placeholder="Enter phone number" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
        {#if phoneError}
            <p class="text-sm text-accent">Phone number is required</p>
        {/if}
    </div>
    <div class="lg:h-fit flex flex-col gap-1 order-3 mb-3">
        <label for="media" class="mb-1 text-md text-primary">Enter link to host's media profile</label>
        <input bind:value={media} name="media" placeholder="Enter link to any social media platform" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500">
        {#if mediaError}
            <p class="text-sm text-accent">Link to social media platform is required</p>
        {/if}
    </div>
</article>
<div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3">
    <a href="#" on:click={goBack} class="lg:hidden text-center text-primary500 text-md underline">Go back</a>
    <button  on:click={goBack} class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button>
    <button type="submit" on:click={handleCreateEvent} class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button>
</div>