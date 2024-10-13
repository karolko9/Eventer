<script>
    import { IconSearch } from '@tabler/icons-svelte';
    import { onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    let searchQuery = "";
    let searchResults = [];
    let creationStatus = "";
    let searchInputElement;
  
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

    function emitLocationSelectEvent(location) {
        dispatch('location', {
			location: location
		});
    }

    function handleSearchButtonClick() {
        searchInputElement.focus();
        searchLocation();
    }
  
    function handleLocationSelect(result) {
      const { lat, lon } = result;
      emitLocationSelectEvent([lon, lat]);
    }
  
    function handleKeydown(event, result) {
      if (event.key === 'Enter' || event.key === ' ') {
        handleLocationSelect(result);
      }
    }

    let timeoutId;

    function handleInput(event) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            searchLocation()
        }, 500);
    }

    onDestroy(() => {
        clearTimeout(timeoutId);
    });

    function onBlur() {
        setTimeout(() => {
            searchResults = [];
        }, 100);
    }

</script>
<div class="lg:w-full flex flex-col relative">
    <div class="search-bar">
        <input type="text"
            id="searchQuery"
            bind:value={searchQuery}
            bind:this={searchInputElement}
            on:input={handleInput}
            on:blur={onBlur}
            on:focus={searchLocation}
            placeholder="Enter location"
            class=""
            />
        <button type="button" on:click={handleSearchButtonClick}><IconSearch style="color:#5B278480"/></button>
    </div>
    
    {#if searchResults.length > 0}
        <ul class="w-full h-fit absolute top-[60px] z-50 overflow-auto p-3 flex flex-col gap-4 bg-background border-2 border-color rounded-[14px]">
            {#each searchResults as result}
            <li class="whitespace-nowrap"> 
                <button
                type="button"
                on:click={() => handleLocationSelect(result)}
                on:keydown={(event) => handleKeydown(event, result)}
                tabindex="0"
                >
                {result.display_name}
                </button>
            </li>
            {/each}
        </ul>
    {/if}
</div>
  
<style>
    .search-bar {
        height: fit-content;
        width:100%;
        display: flex;
        justify-content: space-between;
        border-radius: 14px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        background-color: white;
        padding: 8px;
        position: relative;
        z-index: 1000;
    }
    .search-bar input {
        display: block;
        border: none;
        width: 260px;
        background: none;
    }
    .search-bar input::placeholder {
        color: #5B278480;
    }
    .search-bar input:focus {
        outline: none;
        background: none;
    }
    .search-bar button {
        display: block;
        border: none;
        width: 24px;
        margin: 4px;
        transition: transform 0.1s;
    }
    .search-bar button:active {
        transform: scale(0.95);
    }
    .search-results {
        min-height: 40px;
        border-radius: 14px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-top: none;
        background-color: white;
        display: none;
        z-index: 50;
    }
    .search-results.expanded {
        display: block;
    }

    .search-results button {
        background: none;
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
  