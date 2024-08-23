<script>
  import { MapLibre, Marker, Popup } from 'svelte-maplibre';
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import { goto } from '$app/navigation'
  import { writable } from 'svelte/store';
  import EventDetailsModal from './EventDetailsModal.svelte';
  import Searchbox from './Searchbox.svelte';
  import Loader from './Loader.svelte';
  import { IconLogin, IconConfetti, IconX } from '@tabler/icons-svelte';
  import { addToast } from "../components/Toast.svelte";
  import { createDialog, melt } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';

  let showUpdateModal = false;
  let showUpdateModalButton;

  onMount(() => {
    $auth.init().then(() => {
      fetchEvents();
      if(localStorage.getItem("updated_profile")){
        zoomToUserLocation();
      } else{
        showUpdateModal = true;
      }
    });
  });

  const triggerUpdateModal = () => {
      showUpdateModalButton.click();
  }

  const handleUpdateProfile = () => {
      showUpdateModal = false;
      goto("/profile");
  }

  $: if (showUpdateModal) {
      triggerUpdateModal();
    }

    const {
        elements: {
          trigger,
          overlay,
          content,
          title,
          description,
          close,
          portalled,
        },
    states: { open },
  } = createDialog ({
    forceVisible: true,
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

  async function fetchEvents() {
    try {
      if ($auth.isReady) {
        const eventsList = await $auth.whoamiActor.get_all_events();
        events.set(eventsList);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  const zoomToUserLocation = async () => {
    try{
      if($auth.isReady){
        const result = await $auth.whoamiActor.get_user();
        map.flyTo({
          center: [result[0].location[1], result[0].location[0]],
          zoom: 9,
        });
      }
    }catch(error){
      console.error(error);
      addToast({data: { title: 'Error', description: 'Something went wrong!', color: 'bg-red-500'}})
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
    {#each $events[0] as event}
      <Marker lngLat={[event.location[1], event.location[0]]} on:click={() => selectEvent(event)} class="h-8 w-8 flex p-1 items-center justify-center rounded-full bg-primary border-4 border-primary-10">
        <IconConfetti style="height:24px; with:24px; color:#fff"/>
      </Marker>
    {/each}
  </MapLibre>
  <EventDetailsModal event={selectedEvent} openModal={eventDetailsModalOpen} />
  <div class="searchbox-wrapper" class:shifted={eventDetailsModalOpen}>
    <Searchbox on:location={handleSearchboxLocationSelect}/>
  </div>
  <button bind:this={showUpdateModalButton} use:melt={$trigger} class=""></button>
  {#if $open}
    <div class="flex flex-col outline-none" use:melt={$portalled}>
        <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" transition:fade={{ duration: 150 }}></div>
        <div use:melt={$content} class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <div class="flex justify-between items-center">
            <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">Hi, thank you for choosing Eventer!</h2>
            <button use:melt={$close}>
                <IconX style="color:#5B2784" />
            </button>
          </div>
          <p use:melt={$description} class="mb-4 mt-1 leading-normal text-zinc-600">Before you start looking for event for todays's evening, let us help you. Please, complete Your profile after clicking button below.</p>
          <img src="undraw_partying.svg" alt="people with baloons" class="h-[140px]"/>
          <button on:click={handleUpdateProfile} class="mt-2 p-2 bg-primary text-background rounded-lg text-center">Complete profile</button>
        </div>
    </div>
  {/if}
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