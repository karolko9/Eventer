<script>
  import { MapLibre } from 'svelte-maplibre';
</script>

<section class="map-wrapper">
    <MapLibre 
    center={[50,20]}
    zoom={1}
    class="map"
    standardControls
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
</section>


<style>
   .map-wrapper{
      width:100%;
      height:100%;
      display: flex;
      background-color: #aaa;
  }
  :global(.map) {
    flex:1;
  }
</style>