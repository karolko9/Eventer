<script>
    import { onMount } from 'svelte';
    import { currentEvent } from '../../../stores/events';
    let event;

    onMount(() => {
        currentEvent.subscribe(value => {
            event = value;
        });
    });

</script>
{#if event}
    <header class="p-4 flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-primary">{event.name}</h1>
    </header>
{/if}