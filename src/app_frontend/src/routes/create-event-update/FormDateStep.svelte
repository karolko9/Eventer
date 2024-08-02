<script>
    import { get } from 'svelte/store';

    import { formProgress, formStep, formData } from '../../stores/createEvent.js';

    let formDataStore = get(formData);
    
    let { time_start, time_end } = formDataStore;

    let date = '';
    let startHour = '';
    let endHour = '';

    if (time_start) {
        let startDate = new Date(time_start);
        date = startDate.toISOString().split('T')[0];
        startHour = startDate.toTimeString().split(' ')[0].slice(0, 5);
    }

    if (time_end) {
        let endDate = new Date(time_end);
        endHour = endDate.toTimeString().split(' ')[0].slice(0, 5);
    }

    let dateError = false;
    let startHourError = false;
    let endHourError = false;

    const changeStep = () => {
        dateError = !date;
        startHourError = !startHour;
        endHourError = !endHourError;

        if (dateError || startHourError || endHourError) return;

        let startDateTime = new Date(`${date}T${startHour}:00`);
        let endDateTime = new Date(`${date}T${endHour}:00`);

        formData.update(data => ({
            ...data,
            time_start: startDateTime,
            time_end: endDateTime
        }));

        formStep.set(2);
        formProgress.set(100);
    }
</script>
    
<article class="w-full h-mobile flex flex-col lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
  <div class="lg:h-fit flex flex-col gap-1 mb-2">
    <label form="date" class="mb-1 text-md text-primary">Event date</label>
    <input type="date" bind:value={date}  name="date" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md"/>
  </div>
  <div class="lg:h-fit flex flex-col gap-1 mb-3">
    <label for="start-hour" class="mb-1 text-md text-primary">Event starts at</label>
    <input type="time" bind:value={startHour} name="start-hour" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md"/>
    {#if dateError}
      <p class="text-sm text-accent">Event date is required</p>
    {/if}
  </div>
  <div class="lg:h-fit flex flex-col gap-1 mb-3">
    <label for="end-hour" class="mb-1 text-md text-primary">Event ends at</label>
    <input type="time" bind:value={endHour} name="end-hour" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md"/>
    {#if startHourError}
      <p class="text-sm text-accent">Event start time is required</p>
    {/if}
  </div>
</article>
<div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3">
  <button type="submit" on:click={() => changeStep(2,100)} class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button>
  <a href="#" on:click={() => changeStep(0,33)} class="lg:hidden text-center text-primary500 text-md underline">Go back</a>
  <button  on:click={() => changeStep(0,33)} class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button>
</div>