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
    let searchQuery = "";
    let mapCenter = [50, 20];
    let searchResults = [];

    async function fetchLocationName(lat, lon) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`);
            const data = await response.json();
            return data.display_name || "Unknown location";
        } catch (error) {
            console.error("Error fetching location name:", error);
            return "Error fetching location name";
        }
    }

    function addMarker(e) {
        marker = { lngLat: e.detail.lngLat };
        eventLocationLat = e.detail.lngLat.lat;
        eventLocationLong = e.detail.lngLat.lng;
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
        marker = { lngLat: { lat, lng: lon } };
        eventLocationLat = lat;
        eventLocationLong = lon;
        searchResults = []; 
    }

    function handleKeydown(event, result) {
        if (event.key === 'Enter' || event.key === ' ') {
            selectLocation(result);
        }
    }

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
            const adress = await fetchLocationName(eventLocationLat, eventLocationLong);
            console.log(adress)
            const eventDTO = {
                name: eventName,
                tags: eventTags.split(' ').map(tag => tag.trim()),
                location: [parseFloat(eventLocationLat), parseFloat(eventLocationLong)],
                // adress: adress,  // Add location name to eventDTO
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

    onMount(() => {
        $auth.init();
    });
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
        <label for="eventTags">Event Tags (blank-space-separated):</label>
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
            center={mapCenter}
            zoom={10}
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
                            Latitude: {result.lat}<br>
                            Longitude: {result.lon}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

</div>

<style>
    .error {
        color: red;
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
    .map-wrapper {
        width: 100%;
        height: 400px;
        display: flex;
        background-color: #aaa;
    }
    :global(.map) {
        flex: 1;
    }
</style>
