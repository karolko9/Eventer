<script>
    import { onMount } from "svelte";
    import { get } from 'svelte/store';
    import { MapLibre, MapEvents, DefaultMarker } from 'svelte-maplibre';

    import { formProgress, formStep, formData } from '../../stores/createEvent.js';
    import { auth } from "../../lib/auth";

    onMount(() => {
        $auth.init();
    });

    let marker = null;
    let eventLocationLat = "";
    let eventLocationLong = "";

    const addMarker = (e) => {
        marker = { lngLat: e.detail.lngLat };
        eventLocationLat = e.detail.lngLat.lat;
        eventLocationLong = e.detail.lngLat.lng;
    }

    let formDataStore = get(formData);
     
    const changeStep = (step, progress) => {
        formStep.set(step);
        formProgress.set(progress);
    }

    const submitHandler = () => {
        console.log(formDataStore);
    }

</script>
<article class="relative w-full h-mobile flex lg:border-2 lg:border-color lg:rounded-md">
    <MapLibre 
        center={[50,20]}
        zoom={1}
        class="map"
        standardControls
        style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" 
    >
        <MapEvents on:click={addMarker} />
        {#if marker}
            <DefaultMarker lngLat={marker.lngLat} />
        {/if}
    </MapLibre>
</article>
<div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3">
    <button on:click={submitHandler} class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button>
    <a href="#" on:click={() => changeStep(1, 66)} class="lg:hidden text-center text-primary500 text-md underline">Go back</a>
    <button  on:click={() => changeStep(1, 66)} class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button>
</div>
<style>
     :global(.map) {
    flex:1;
  }
</style>