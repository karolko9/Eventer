<script>
  import { onMount, onDestroy } from "svelte";
  import { MapLibre, Marker } from "svelte-maplibre";
  import { auth } from "$lib/auth";
  import { writable } from "svelte/store";
  import EventDetailsModal from "$lib/EventDetailsModal.svelte";
  import Searchbox from "$lib/Searchbox.svelte";
  import Loader from "$lib/Loader.svelte";
  import { IconLogin, IconConfetti, IconHeart } from "@tabler/icons-svelte";
  import { currentUserData } from "../../stores/userDataStore";

  import Dialog from "$lib/SimpleDialog.svelte";

  const handleAuth = () => {
    if ($auth.isAuthenticated) {
      $auth.logout();
    } else {
      $auth.login();
    }
  };

  let showWelcomeModal = true;

  let unsubscribe;
  let userData = {};

  onMount(() => {
    unsubscribe = currentUserData.subscribe((value) => {
      userData = value;
      showWelcomeModal = userData.firstEntrance;
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  let events = writable([]); //writable([{name: "Hello", time_start: Date(), tags: ["music", "games"], location: [50, 20]}]);
  let selectedEvent;
  let eventDetailsModalOpen = false;

  let mapCenter = [50, 20];

  let map = null;
  let showLoader = true;

  const handleMapLoad = () => {
    showLoader = false;
  };

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
    try {
      if ($auth.isReady) {
        const result = await $auth.whoamiActor.get_user();
        map.flyTo({
          center: [result[0].location[1], result[0].location[0]],
          zoom: 9,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    bind:map
    on:load={handleMapLoad}
    on:click={closeEventDetailsModal}
  >
    {#each $events[0] as event}
      <Marker
        lngLat={[event.location[1], event.location[0]]}
        on:click={() => selectEvent(event)}
        class="h-8 w-8 flex p-1 items-center justify-center rounded-full bg-primary border-4 border-primary-10"
      >
        <IconConfetti style="height:24px; with:24px; color:#fff" />
      </Marker>
    {/each}
  </MapLibre>
  <EventDetailsModal event={selectedEvent} openModal={eventDetailsModalOpen} />
  <div class="searchbox-wrapper" class:shifted={eventDetailsModalOpen}>
    <Searchbox on:location={handleSearchboxLocationSelect} />
  </div>

  {#if showWelcomeModal}
    <Dialog bind:isOpen={showWelcomeModal} welcomeDialog={true} />
  {/if}

  {#if !$auth.isAuthenticated}
    <button
      on:click={handleAuth}
      class="absolute right-[20px] top-unset bottom-[20px] lg:bottom-unset lg:top-[20px] w-fit h-fit p-2 flex flex-col items-center justify-center border-[1px] border-color bg-background rounded-xl"
    >
      <IconLogin style="color:#5B2784" />
      <p class="text-xs text-primary300 font-medium">Sign In</p>
    </button>
  {/if}
  <button
    on:click={handleAuth}
    class="absolute left-[20px] bottom-[20px] w-fit h-fit p-2 flex flex-col items-center justify-center border-[1px] border-color bg-background rounded-xl"
  >
    <IconHeart style="color:#5B2784" />
  </button>
  {#if showLoader}
    <Loader imageSrc="undraw_world_re.svg" description="Preparing map" />
  {/if}
</section>

<style>
  :global(.map) {
    flex: 1;
  }

  .searchbox-wrapper {
    width: 100%;
    position: absolute;
    left: 0;
    top: 20px;
    z-index: 50;
    transition: left 0.3s ease-in-out;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    .searchbox-wrapper {
      left: 20px;
      width: 400px;
    }
  }
  .searchbox-wrapper.shifted {
    left: 0;
  }
  @media (min-width: 1024px) {
    .searchbox-wrapper.shifted {
      left: 420px;
    }
  }
</style>
