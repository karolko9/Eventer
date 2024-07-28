<script>
    import { auth } from "../../lib/auth";
    let eventName = "";
    let eventTags = "";
    let eventLocationLat = "";
    let eventLocationLong = "";
    let eventStartTime = "";
    let eventEndTime = "";
    
    let creationStatus = "";
    let validationErrors = {};

    function validateFields() {
        validationErrors = {};
        if (!eventName) validationErrors.eventName = "Event Name is required.";
        if (!eventLocationLat) validationErrors.eventLocationLat = "Location Latitude is required.";
        if (!eventLocationLong) validationErrors.eventLocationLong = "Location Longitude is required.";
        if (!eventStartTime) validationErrors.eventStartTime = "Start Time is required.";
        if (!eventEndTime) validationErrors.eventEndTime = "End Time is required.";
        return Object.keys(validationErrors).length === 0;
    }
  
    async function handleCreateEvent() {
        if (!validateFields()) {
            creationStatus = "Please fill in all required fields.";
            return;
        }

        try {
            const eventDTO = {
                name: eventName,
                tags: eventTags.split(',').map(tag => tag.trim()), 
                location: { 
                    0: parseFloat(eventLocationLat), 
                    1: parseFloat(eventLocationLong) 
                },
                time_start: eventStartTime,
                time_end: eventEndTime
            };
    
            const result = await $auth.whoamiActor?.create_event(eventDTO);  // send to backend to create event and wait for response
    
            creationStatus = result ? "Event created successfully!" : "Failed to create event.";
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
    <button type="button" id="createEventButton" on:click={handleCreateEvent}>Create Event</button>
    <p id="creationStatus">{creationStatus}</p>
</div>

<style>
    .error {
        color: red;
    }
</style>