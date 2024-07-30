<script>
  import { MapLibre, DefaultMarker, Popup } from 'svelte-maplibre';
  import { auth } from "../lib/auth";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import EventDetailsModal from './EventDetailsModal.svelte';

  let events = writable([]);

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

  function extractEventLocation(event) {
    console.log(event);
    console.log([event.location[1], event.location[0]]);
    return [event.location[1], event.location[0]];
  }

  let selectedEvent;

  function selectEvent(event) {
    console.log("Event selected");
    console.log(event);
    selectedEvent = event;
  }
</script>

<section class="map-wrapper">
  <MapLibre
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="map"
  standardControls
  zoom={1}
  center={[-20, 0]}
>
  {#each $events as event}
    <!-- Unlike the custom marker example, default markers do not have mouse events,
    and popups only support the default openOn="click" behavior -->
    <DefaultMarker lngLat={extractEventLocation(event)}>
      <Popup offset={[0, -10]} on:close={() => selectEvent(null)}>
        <div class="popup-wrapper">
          <div class="event-name">{event.name}</div>
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
<EventDetailsModal event={selectedEvent}/>
</section>

<style>
  .map-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #aaa;
    position: relative;
  }
  .popup-wrapper{
    width: 200px;
    min-height: 50px;
    border-radius: 10px;
    border: 2px solid #5b2784;
    padding: 10px;
  }
  .event-name{
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 2px solid #5b2784;
  }
  .event-description-item {
    margin-top: 5px;
    margin-left: 10px;
  }
  button{
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
  button:hover{
    filter: brightness(130%);
  }
  button:active{
    transform: scale(0.95);
  }
  :global(.map) {
    flex:1;
  }
</style>