<script>
  import { MapLibre, DefaultMarker, Popup } from 'svelte-maplibre';
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import EventDetailsModal from './EventDetailsModal.svelte';

  let events = writable([]);
  let selectedEvent;

  let searchQuery = "";
  let searchResults = [];
  let mapCenter = [50, 20];
  let creationStatus = "";

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

  async function searchLocation() {
    if (!searchQuery) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await response.json();

      if (data.length > 0) {
        searchResults = data;
        creationStatus = "";
      } else {
        searchResults = [];
        creationStatus = "No results found.";
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      creationStatus = "Error fetching location.";
    }
  }

  function selectLocation(result) {
    const { lat, lon } = result;
    mapCenter = [lon, lat];
    searchResults = [];
  }

  function handleKeydown(event, result) {
    if (event.key === 'Enter' || event.key === ' ') {
      selectLocation(result);
    }
  }
</script>

<section class="map-wrapper">
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    class="map"
    standardControls
    zoom={1}
    center={mapCenter}
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
            <button on:click={() => selectEvent(event)}>More info</button>
          </div>
        </Popup>
      </DefaultMarker>
    {/each}
  </MapLibre>
  <EventDetailsModal event={selectedEvent} />
</section>

<div>
  <label for="searchQuery">Search Location:</label>
  <input type="text" id="searchQuery" bind:value={searchQuery} placeholder="Search for a location" />
  <button type="button" on:click={searchLocation}>Search</button>
  {#if creationStatus}
    <p class="status">{creationStatus}</p>
  {/if}
</div>

{#if searchResults.length > 0}
  <div class="search-results">
    <h2>Search Results:</h2>
    <ul>
      {#each searchResults as result}
        <li>
          <button
            type="button"
            on:click={() => selectLocation(result)}
            on:keydown={(event) => handleKeydown(event, result)}
            tabindex="0"
          >
            <strong>{result.display_name}</strong><br>
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

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
  button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    border: none;
    border-radius: 20px;
    min-height: 30px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #5b2784;
    color: white;
    transition: filter 0.3s;
    transition: transform 0.1s;
  }
  button:hover {
    filter: brightness(130%);
  }
  button:active {
    transform: scale(0.95);
  }
  :global(.map) {
    flex: 1;
  }
  .status {
    color: green;
  }
  .search-results {
    margin-top: 20px;
  }
  .search-results ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .search-results li {
    margin-bottom: 10px;
  }
  .search-results button {
    background: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: block;
  }
  .search-results button:hover {
    background-color: #f0f0f0;
  }
</style>
