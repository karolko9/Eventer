<script>
    import { createDialog, melt } from "@melt-ui/svelte";
    import { afterUpdate } from "svelte";
    import { fade } from "svelte/transition";
    import UserTypeDialog from "./UserTypeDialog.svelte";
    import { IconX } from "@tabler/icons-svelte";
    import { currentUserData } from "../stores/userDataStore";

    export let isOpen;
    export let welcomeDialog = true;

    let welcomeDialogStep = 0;

    const {
        elements: {
            trigger,
            portalled,
            overlay,
            content,
            title,
            description,
            close,
        },
        states: { open },
    } = createDialog();

    afterUpdate(() => {
        open.set(isOpen);
    });

    function handleClose() {
        isOpen = false;
    }

    function handleUserTypeSelection(event) {
        const userType = event.detail.userType;

        currentUserData.update((userData) => {
            return {
                ...userData,
                userType,
                firstEntrance: false,
            };
        });

        welcomeDialogStep++;
    }
</script>

{#if $open}
    <div use:melt={$portalled}>
        <div
            use:melt={$overlay}
            class="fixed inset-0 z-50 bg-black"
            transition:fade={{ duration: 150 }}
        ></div>
        <div
            use:melt={$content}
            class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white
            p-6 shadow-lg"
        >
            {#if welcomeDialogStep !== 0}
                <button
                    class="w-full flex items-center justify-end"
                    use:melt={$close}
                    on:click={handleClose}
                >
                    <IconX style="color:#373941" />
                </button>
            {/if}
            {#if welcomeDialogStep === 0}
                <UserTypeDialog on:selectUserType={handleUserTypeSelection} />
            {/if}
        </div>
    </div>
{/if}
