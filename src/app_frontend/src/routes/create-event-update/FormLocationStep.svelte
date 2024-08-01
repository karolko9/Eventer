<script>
    import { auth } from "../../lib/auth";
    import { onMount } from "svelte";
    import { MapLibre, MapEvents, DefaultMarker } from 'svelte-maplibre';

    onMount(() => {
        $auth.init();
    });

    let marker = null;
    let eventLocationLat = "";
    let eventLocationLong = "";

    function addMarker(e) {
        marker = { lngLat: e.detail.lngLat };
        eventLocationLat = e.detail.lngLat.lat;
        eventLocationLong = e.detail.lngLat.lng;
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
<style>
     :global(.map) {
    flex:1;
  }
</style>