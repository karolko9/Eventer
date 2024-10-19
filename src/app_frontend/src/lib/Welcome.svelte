<script>
  import { currentUserType } from "../stores/userTypeStore";

</script>

<section class="w-[100%] h-[100%] flex items-center">
    <article class="hidden lg:w-1/2 lg:flex items-center justify-center">
        <img src="splash.png" alt="party" class="w-full h-full object-cover">
    </article>
    <article class="w-full lg:w-1/2 h-[90vh] flex flex-col items-center justify-between bg-background">
        <div class="flex flex-col items-center gap-2">
            <h1 class="text-6xl lg:text-6xl text-orange-normal">Eventer</h1>
            <h2 class="mt-2 text-lg lg:text-xl text-black-normal">Best events at your fingertips</h2>
        </div>
        
        <img src="splash-calendar.svg" class="w-[80%] lg:w-[50%]" alt="party"/>

        <a href="/my-events/host" on:click={() => currentUserType.set("host")} class="p-3 bg-orange-normal text-background border-2 border-background rounded-lg">Choose your role</a>
    </article>
  </section>