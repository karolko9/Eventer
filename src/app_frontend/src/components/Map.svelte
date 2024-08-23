<script>
  import { MapLibre, Marker, Popup } from 'svelte-maplibre';
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import EventDetailsModal from './EventDetailsModal.svelte';
  import Button from './Button.svelte';
  import Searchbox from './Searchbox.svelte';
  import Loader from './Loader.svelte';
  import { IconLogin, IconConfetti } from '@tabler/icons-svelte';

  onMount(() => {
    $auth.init().then(() => {
      fetchEvents();
    });
  });

  const handleAuth = () => {
    if ($auth.isAuthenticated) {
      $auth.logout();
    } else {
      $auth.login();
    }
  }

  let events = writable([]); //writable([{name: "Hello", time_start: Date(), tags: ["music", "games"], location: [50, 20]}]);
  let selectedEvent;
  let eventDetailsModalOpen = false;

  let mapCenter = [50, 20];

  let map = null;
  let showLoader = true;

  const handleMapLoad  = () => {
    showLoader = false;
  }

  async function fetchEvents(tag) {
    try {
      if ($auth.isReady) {
        const eventsList = await $auth.whoamiActor.get_event_by_tag_user();
        events.set(eventsList);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

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

<section class="w-[100%] h-[100%] flex relative">
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    class="map"
    zoom={1}
    center={mapCenter}
    attributionControl={false}     
    zoomOnDoubleClick={true}
    bind:map={map}
    on:load={handleMapLoad}
    on:click={closeEventDetailsModal}
  >
    {#each $events as event}
      <Marker lngLat={[event.location[1], event.location[0]]} on:click={() => selectEvent(event)} class="h-8 w-8 flex p-1 items-center justify-center rounded-full bg-primary border-4 border-primary-10">
        <IconConfetti style="height:24px; with:24px; color:#fff"/>
      </Marker>
    {/each}
  </MapLibre>
  <EventDetailsModal event={selectedEvent} openModal={eventDetailsModalOpen} />
  <div class="searchbox-wrapper" class:shifted={eventDetailsModalOpen}>
    <Searchbox on:location={handleSearchboxLocationSelect}/>
  </div>

  {#if !$auth.isAuthenticated}
    <button on:click={handleAuth} class="absolute right-[20px] top-unset bottom-[20px] lg:bottom-unset lg:top-[20px] w-fit h-fit p-2 flex flex-col items-center justify-center border-[1px] border-color bg-background rounded-xl">
      <IconLogin style="color:#5B2784"/>
      <p class="text-xs text-primary300 font-medium">Sign In</p>
    </button>
  {/if}
  {#if showLoader}
    <Loader imageSrc="undraw_world_re.svg" description="Preparing map"/>
  {/if}
</section>

<style>
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