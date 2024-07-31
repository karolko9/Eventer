<script>
  import { MapLibre, DefaultMarker, Popup } from 'svelte-maplibre';
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import EventDetailsModal from './EventDetailsModal.svelte';
  import Button from './Button.svelte';
  import Searchbox from './Searchbox.svelte';

  let events = writable([{name: "Hello", time_start: Date(), tags: ["music", "games"], location: [50, 20]}]);
  let selectedEvent;

  let mapCenter = [50, 20];

  async function fetchEvents() {
    try {
      if ($auth.isReady && $auth.isAuthenticated) {
        const eventsList = await $auth.whoamiActor.get_all_events_with_details();
        console.log(eventsList);
        events.set(eventsList);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  onMount(() => {
    $auth.init().then(() => {
      fetchEvents();
    });
  });

  function selectEvent(event) {
    selectedEvent = event;
  }

  function handleSearchboxLocationSelect(event) {
    const location = event.detail.location;
  }

</script>

<section class="map-wrapper">
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    class="map"
    zoom={1}
    center={mapCenter}
    attributionControl={false}     
    zoomOnDoubleClick={true}     
  >
    {#each $events as event}
      <DefaultMarker lngLat={[event.location[1], event.location[0]]}>
        <Popup offset={[0, -10]} on:close={() => selectEvent(null)}>
          <div class="popup-wrapper">
            <div class="event-name">{event.name}</div>
            <!-- <div class="event-address">{event.address}</div> -->
            {#if event.tags.length > 0}
              <div class="event-description-item">Tags: {event.tags.join(', ')}</div>
            {/if}
            <div class="event-description-item">Date: {event.time_start}</div>
            <Button click={() => selectEvent(event)}>More info</Button>
          </div>
        </Popup>
      </DefaultMarker>
    {/each}
  </MapLibre>
  <EventDetailsModal event={selectedEvent} />
  <div class="searchbox-wrapper" class:shifted={selectedEvent != null}>
    <Searchbox on:location={(event) => console.log(event.detail)} />
  </div>
</section>

<style>
  .map-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #aaa;
    position: relative;
  }
  .popup-wrapper {
    width: 200px;
    min-height: 50px;
    border-radius: 10px;
    border: 2px solid #5b2784;
    padding: 10px;
  }
  .event-name {
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 2px solid #5b2784;
  }
  .event-description-item {
    margin-top: 5px;
    margin-left: 10px;
  }
  :global(.map) {
    flex: 1;
  }
  .searchbox-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    margin: 20px;
    transition: left 0.3s ease-in-out;
    z-index: 1000;
  }
  .searchbox-wrapper.shifted{
    left: 200px;
  }
  @media (min-width:1024px){
    .searchbox-wrapper.shifted{
      left: 400px;
    }
  }
</style>
