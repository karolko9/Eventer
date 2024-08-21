<script>
    import { onMount } from "svelte";
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation'
    import { MapLibre, MapEvents, DefaultMarker } from 'svelte-maplibre';
    import { IconMapSearch } from '@tabler/icons-svelte'
    import { formProgress, formStep, formData } from '../../stores/createEvent.js';
    import { auth } from "../../lib/auth";

    onMount(() => {
        $auth.init();
    });

    let formDataStore = get(formData);
    let {name, event_tags, description, location, address, date, start_hour, end_hour} = formDataStore;
    let locationError = ""

    let eventLocationLat = "";
    let eventLocationLong = "";
    let marker = null;
    let searchQuery = "";
    let creationStatus = "";
    let mapCenter = [50, 20];
    let searchResults = [];

    const  fetchLocationName = async(lat, lon) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`);
            const data = await response.json();
            return data.display_name || "Unknown location";
        } catch (error) {
            console.error("Error fetching location name:", error);
            return "Error fetching location name";
        }
    }

    const searchLocation = async() => {
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

    const selectLocation = (result) => {
        const { lat, lon } = result;
        mapCenter = [lon, lat];
        marker = { lngLat: { lat, lng: lon } };
        eventLocationLat = lat;
        eventLocationLong = lon;
        searchResults = []; 
    }

    const  handleKeydown = (event, result) => {
        if (event.key === 'Enter' || event.key === ' ') {
            selectLocation(result);
        }
    }

    const addMarker = (e) => {
        marker = { lngLat: e.detail.lngLat };
        eventLocationLat = e.detail.lngLat.lat;
        eventLocationLong = e.detail.lngLat.lng;
    }
     
    const changeStep = (step, progress) => {
        formStep.set(step);
        formProgress.set(progress);
    }

    const handleCreateEvent = async (locationData) => {
        console.log("Creating event...");
        try {
            const eventDTO = {
                name,
                tags: event_tags,
                location: locationData[0],
                address: locationData[1],  
                time_start:  new Date(`${date}T${start_hour}:00`).toISOString(),
                time_end: new Date(`${date}T${end_hour}:00`).toISOString()
            };

            if ($auth.isReady && $auth.isAuthenticated) {
                const result = await $auth.whoamiActor.create_event(eventDTO);
                creationStatus = result ? "Event created successfully!" : "Failed to create event.";
                setTimeout(() =>{
                    goto('/');
                }, 2000)
            } else {
                creationStatus = "Authentication is not ready or not authenticated.";
            }
        } catch (error) {
            console.error("Error creating event:", error);
            creationStatus = "Error creating event.";
        }
    }

    const submitHandler = () => {
        locationError = !eventLocationLat;

        if (locationError) return;
        
        const location = [parseFloat(eventLocationLat), parseFloat(eventLocationLong)];
        
        fetchLocationName(eventLocationLat, eventLocationLong).then((res) => {
            formData.update(data => ({
                ...data,
                location,
                address:res
            }));
            return [location, res];
        }).then((res) => {
            handleCreateEvent(res);
        })
    }

</script>
<div class="relative w-full lg:h-fit flex gap-1 mb-3">
    <input name="name" id="searchQuery" bind:value={searchQuery} placeholder="Enter event location" class="w-full p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
    <button on:click={searchLocation} class="flex items-center bg-primary px-2 py-0.5 rounded-md">
        <IconMapSearch style="height:18px; width:18px; color:#fff;"/>
    </button>
</div>
<article class="relative w-full h-mobile flex flex-col lg:border-2 lg:border-color lg:rounded-md">
    {#if locationError}
        <p class="mb-3 text-sm text-accent">Event location is required</p>
    {/if}   
    {#if searchResults.length > 0}
        <ul class="w-full h-fit absolute top-[0] z-50 overflow-auto p-3 flex flex-col gap-4 bg-background border-2 lg:border-none lg:border-b-2 border-color lg:rounded-md">
            {#each searchResults as result}
                <li class="whitespace-nowrap">
                    <button
                        type="button"
                        on:click={() => selectLocation(result)}
                        on:keydown={(event) => handleKeydown(event, result)}
                        tabindex="0"
                    >
                        {result.display_name}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
    {#if creationStatus}
        <p class="text-sm mb-3 {creationStatus === 'Event created successfully!' ? 'text-green': 'text-accent'}">{creationStatus}</p>
    {/if}
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
</article>
<div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3">
    <button on:click={submitHandler} class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button>
    <a href="#" on:click={() => changeStep(1, 66)} class="lg:hidden text-center text-primary500 text-md underline">Go back</a>
    <button  on:click={() => changeStep(1, 66)} class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button>
</div>
<style>
     :global(.map) {
    flex:1;
  }
</style>