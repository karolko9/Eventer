<script>
  import { MapLibre, DefaultMarker, Popup } from 'svelte-maplibre';
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import EventDetailsModal from './EventDetailsModal.svelte';
  import Button from './Button.svelte';
  import Searchbox from './Searchbox.svelte';
  import { IconWallet, IconLogout } from '@tabler/icons-svelte';

  let isAuthenticated = $auth.isAuthenticated;
  console.log(isAuthenticated)

  let events = writable([]); //writable([{name: "Hello", time_start: Date(), tags: ["music", "games"], location: [50, 20]}]);
  let selectedEvent;
  let eventDetailsModalOpen = false;

  let mapCenter = [50, 20];

  let map;

  async function fetchEvents() {
    try {
      if ($auth.isReady && isAuthenticated) {
        const eventsList = await $auth.whoamiActor.get_all_events_with_details();
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

  function closeEventDetailsModal() {
    eventDetailsModalOpen = false;
  }

  function openEventDetailsModal() {
    eventDetailsModalOpen = true;
  }

  function extractEventLocation(event) {
    return [event.location[1], event.location[0]];
  }

  function selectEvent(event) {
    selectedEvent = event;
    openEventDetailsModal();
    map.flyTo({
      center: extractEventLocation(event),
      zoom: 9,
    });
  }

  function handleSearchboxLocationSelect(event) {
    const location = event.detail.location;
    map.flyTo({
      center: location,
      zoom: 9,
    });
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
    bind:map={map}
  >
    {#each $events as event}
      <DefaultMarker lngLat={[event.location[1], event.location[0]]}>
        <Popup offset={[0, -10]} on:close={closeEventDetailsModal}>
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
  <EventDetailsModal event={selectedEvent} open={eventDetailsModalOpen} />
  <div class="searchbox-wrapper" class:shifted={eventDetailsModalOpen}>
    <Searchbox on:location={handleSearchboxLocationSelect}/>
  </div>
  <button on:click={isAuthenticated ? $auth.login : $auth.logout} class="hidden absolute right-[20px] top-[20px] lg:flex items-center justify-center w-[50px] h-[50px] border-[1px] border-color bg-background rounded-xl">
    {#if isAuthenticated}
      <IconLogout style="color:#5B2784"/> 
    {:else}
      <IconWallet style="color:#5B2784"/>
    {/if}
  </button>
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
    width:100%;
    position: absolute;
    left: 0;
    top: 20px;
    z-index: 50;
    transition: left 0.3s ease-in-out;
    display:flex;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    .searchbox-wrapper{
      left:20px;
      width:400px;
    }
  }
  .searchbox-wrapper.shifted{
    left: 0;
  }
  @media (min-width:1024px){
    .searchbox-wrapper.shifted{
      left: 420px;
    }
  }
</style>
    <!-- <div class="w-full mb-4 flex items-center justify-between border p-2 rounded">
      <input placeholder="Find event" class="flex-1 text-md text-primary  focus:outline-none" />
      <IconSearch style="color: #5B2784; width:30px; height:30px;"/>
  </div> -->