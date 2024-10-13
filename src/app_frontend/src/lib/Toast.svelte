<script lang="ts" context="module">
    import { IconX } from '@tabler/icons-svelte';
    export type ToastData = {
      title: string
      description: string
      color: string
    }
   
    const {
      elements: { content, title, description, close },
      helpers,
      states: { toasts },
      actions: { portal }
    } = createToaster<ToastData>()
   
    export const addToast = helpers.addToast
  </script>
   
  <script lang="ts">
    import { createToaster, melt } from '@melt-ui/svelte'
  </script>
   
  <div use:portal   class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto">
    {#each $toasts as { id, data } (id)}
      <div use:melt={$content(id)} class="rounded-lg bg-background text-prmiary shadow-md border-2 border-primary">
        <div class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5">
          <div>
            <h3 use:melt={$title(id)} class="flex items-center gap-2 font-semibold">
              {data.title}
              <span class="w-2 h-2 rounded-full {data.color}" />
            </h3>
            <div use:melt={$description(id)}>
              {data.description}
            </div>
          </div>
          <button use:melt={$close(id)} aria-label="close notification" class="absolute right-4 top-4 grid size-6 place-items-center rounded-full text-magnum-500"> 
            <IconX style="color:#5B2784"/>
          </button>
        </div>
      </div>
    {/each}
  </div>