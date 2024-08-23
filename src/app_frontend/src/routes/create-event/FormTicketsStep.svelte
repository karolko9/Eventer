<script>
    import { get } from 'svelte/store';
    import { formProgress, formStep, formData } from '../../stores/createEvent.js';

    let formDataStore = get(formData);
    let { price } = formDataStore;

    let priceError = false;

    const goBack = () => {
        formStep.set(2);
        formProgress.set(60);
    }

    const changeStep = () => {
        priceError = !price;

        if (priceError) return;

        const convertedPrice = parseFloat(price);

        formStep.set(4);
        formProgress.set(80);

        formData.update(data => ({ ...data, price: convertedPrice}));
    }
</script>
<article class="w-full h-mobile flex flex-col lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
    <div class="lg:h-fit flex flex-col gap-1 order-1 mb-3">
        <label for="price" class="mb-1 text-md text-primary">Single ticket price</label>
        <input bind:value={price} name="price" placeholder="Enter ticket price" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
        {#if priceError}
            <p class="text-sm text-accent">Price is required</p>
        {/if}
    </div>
</article>
<div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3">
    <a href="#" on:click={goBack} class="lg:hidden text-center text-primary500 text-md underline">Go back</a>
    <button  on:click={goBack} class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button>
    <button type="submit" on:click={changeStep} class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button>
</div>