<script>
    export let imageSrc;
    export let description;
</script>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 justify-center items-center">
    <img class="w-[240px] h-[240px]"src={imageSrc} alt="person placing markers on globe"/>
    <div class="relative inline-flex">
        <div class="w-8 h-8 bg-primary/80 rounded-full"></div>
        <div class="w-8 h-8 bg-primary/80 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div class="w-8 h-8 bg-primary/80 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
    <p class="text-primary">{description}...</p>
</div>