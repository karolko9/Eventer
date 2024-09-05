<script>
    import {IconInfoCircle} from '@tabler/icons-svelte'; 

    let isHost = false;
</script>

<header class="p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-primary">Your Events</h1>
    <IconInfoCircle style="color: #5B2784; width:30px; height:30px;"/>
</header>
<!-- <div class="w-fit ml-4 flex bg-primary border border-2 border-primary rounded-md">
    <a href="/my-events/attendee" on:click={() => isHost = false} class="w-[100px] text-center p-2 text-md {!isHost ? 'text-primary font-medium bg-background' : 'text-background bg-primary'} rounded-md">Attendee</a>
    <a href="/my-events/host" on:click={() => isHost = true} class="w-[100px] text-center p-2 text-md {isHost ? 'text-primary font-medium bg-background' : 'text-background bg-primary'} rounded-md">Host</a>
</div> -->
<slot/>