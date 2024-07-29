<script>
    import { auth } from "../../lib/auth";
    import { onMount } from "svelte";
    import { MapLibre, MapEvents, DefaultMarker } from 'svelte-maplibre';

    let eventName = "";
    let eventTags = "";
    let eventLocationLat = "";
    let eventLocationLong = "";
    let eventStartTime = "";
    let eventEndTime = "";

    let creationStatus = "";
    let validationErrors = {};

    let marker = null;

    function addMarker(e) {
        marker = { lngLat: e.detail.lngLat };
        eventLocationLat = e.detail.lngLat.lat;
        eventLocationLong = e.detail.lngLat.lng;
    }

    onMount(() => {
        $auth.init();
    });

    function validateFields() {
    validationErrors = {};

    if (!eventName) validationErrors.eventName = "Event Name is required.";
    if (!eventLocationLat) validationErrors.eventLocationLat = "Location Latitude is required.";
    if (!eventLocationLong) validationErrors.eventLocationLong = "Location Longitude is required.";
    if (!eventStartTime) validationErrors.eventStartTime = "Start Time is required.";
    if (!eventEndTime) validationErrors.eventEndTime = "End Time is required.";

    if (eventStartTime && eventEndTime) {
        const startTime = new Date(eventStartTime);
        const endTime = new Date(eventEndTime);
        
        if (endTime <= startTime) {
            validationErrors.eventEndTime = "End Time must be after Start Time.";
        }
    }

    return Object.keys(validationErrors).length === 0;
}


    async function handleCreateEvent() {
        console.log("Creating event...");
        if (!validateFields()) {
        creationStatus = "Please fill in all required fields correctly.";
        return;
    }
        try {
            const eventDTO = {
                name: eventName,
                tags: eventTags.split(',').map(tag => tag.trim()),
                location: [parseFloat(eventLocationLat), parseFloat(eventLocationLong)],
                time_start: new Date(eventStartTime).toISOString(),
                time_end: new Date(eventEndTime).toISOString()
            };

            if ($auth.isReady && $auth.isAuthenticated) {
                console.log("Auth is ready and authenticated");
                const result = await $auth.whoamiActor.create_event(eventDTO);
                creationStatus = result ? "Event created successfully!" : "Failed to create event.";
            } else {
                creationStatus = "Authentication is not ready or not authenticated.";
            }
        } catch (error) {
            console.error("Error creating event:", error);
            creationStatus = "Error creating event.";
        }
    }
</script>

<div>
    <h1>Create New Event</h1>
    <div>
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" bind:value={eventName} />
        {#if validationErrors.eventName}
            <p class="error">{validationErrors.eventName}</p>
        {/if}
    </div>
    <div>
        <label for="eventTags">Event Tags (comma-separated):</label>
        <input type="text" id="eventTags" bind:value={eventTags} />
    </div>
    <div>
        <label for="eventLocationLat">Location Latitude:</label>
        <input type="number" id="eventLocationLat" step="any" bind:value={eventLocationLat} />
        {#if validationErrors.eventLocationLat}
            <p class="error">{validationErrors.eventLocationLat}</p>
        {/if}
    </div>
    <div>
        <label for="eventLocationLong">Location Longitude:</label>
        <input type="number" id="eventLocationLong" step="any" bind:value={eventLocationLong} />
        {#if validationErrors.eventLocationLong}
            <p class="error">{validationErrors.eventLocationLong}</p>
        {/if}
    </div>
    <div>
        <label for="eventStartTime">Start Time:</label>
        <input type="datetime-local" id="eventStartTime" bind:value={eventStartTime} />
        {#if validationErrors.eventStartTime}
            <p class="error">{validationErrors.eventStartTime}</p>
        {/if}
    </div>
    <div>
        <label for="eventEndTime">End Time:</label>
        <input type="datetime-local" id="eventEndTime" bind:value={eventEndTime} />
        {#if validationErrors.eventEndTime}
            <p class="error">{validationErrors.eventEndTime}</p>
        {/if}
    </div>
    <section class="map-wrapper">
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
    </section>
    
    <button type="button" id="createEventButton" on:click={handleCreateEvent}>Create Event</button>
    <p id="creationStatus">{creationStatus}</p>
</div>

<style>
    .error {
        color: red;
    }
    .map-wrapper{
        width:100%;
        height: 400px;
        display: flex;
        background-color: #aaa;
    }
    :global(.map) {
        flex:1;
    }
</style>

