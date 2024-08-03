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
  
<main>
    <div class="search-bar" class:focused={searchResults.length > 0}>
        <input type="text"
            id="searchQuery"
            bind:value={searchQuery}
            bind:this={searchInputElement}
            on:input={handleInput}
            on:blur={onBlur}
            on:focus={searchLocation}
            placeholder="Find event"
            />
        <button type="button" on:click={handleSearchButtonClick}><IconSearch /></button>
    </div>
    <div class="search-results" class:expanded={searchResults.length > 0}>
        {#if searchResults.length > 0}
            <ul>
                {#each searchResults as result}
                <li>
                    <button
                    type="button"
                    on:click={() => handleLocationSelect(result)}
                    on:keydown={(event) => handleKeydown(event, result)}
                    tabindex="0"
                    >
                    <strong>{result.display_name}</strong><br>
                    </button>
                </li>
                {/each}
            </ul>
        {/if}
    </div>
</main>
  
<style>
    .search-bar {
        display: flex;
        border-radius: 14px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        background-color: white;
        padding: 8px;
        position: relative;
        z-index: 1000;
    }
    .search-bar.focused {
        border-radius: 14px 14px 0px 0px;
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
        border-bottom: 2px solid #5B278480;
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
        width: 310px;
        min-height: 40px;
        border-radius: 0px 0px 14px 14px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-top: none;
        background-color: white;
        display: none;
    }
    .search-results.expanded {
        display: block;
    }
    .search-results ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .search-results li {
        margin-bottom: 10px;
        overflow: hidden;
        white-space: nowrap;
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
  