<script>
    import { createDateField } from '@melt-ui/svelte';
    const {
        elements: { field, segment, label },
        states: { segmentContents },
        options: { locale },
    } = createDateField();
</script>
    
    <article class="w-full h-mobile flex flex-col lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md">
      <div class="lg:h-fit flex flex-col gap-1 mb-2">
        <label for="name" class="mb-1 text-md text-primary">Event date</label>
        <div class="w-full lg:w-[200px]" {...$field} use:field>
          {#key $locale}
            {#each $segmentContents as seg}
              <div {...$segment(seg.part)} use:segment>
                {seg.value}
              </div>
            {/each}
          {/key}
        </div>
      </div>
      <div class="lg:h-fit flex flex-col gap-1 mb-3">
        <label for="start-hour" class="mb-1 text-md text-primary">Event starts at</label>
        <input type="time" name="start-hour" placeholder="Enter hour event starts" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
      </div>
      <div class="lg:h-fit flex flex-col gap-1 mb-3">
        <label for="end-hour" class="mb-1 text-md text-primary">Event ends at</label>
        <input type="time" name="end-hour" placeholder="Enter hour event ends" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"/>
      </div>
    </article>
    <style lang="postcss">
        [data-melt-datefield-field] {
          @apply mt-0.5 flex items-center rounded-md border-2 border-gray-100 bg-white p-2 text-primary;
        }
      
        [data-melt-datefield-field][data-invalid] {
          @apply border-red-400;
        }
      
        [data-melt-datefield-segment][data-invalid] {
          @apply text-red-500;
        }
      
        [data-melt-datefield-segment]{
          @apply text-[14px];
        }
      
        [data-melt-datefield-segment]:not([data-segment='literal']) {
          @apply px-0.5;
        }
      
        [data-melt-datefield-validation] {
          @apply self-start text-red-500;
        }
      </style>