<script>
    import { createDialog, melt } from "@melt-ui/svelte";
    import { afterUpdate } from "svelte";
    import { fade } from "svelte/transition";
    import UserTypeDialog from "./UserTypeDialog.svelte";
    import { IconX } from "@tabler/icons-svelte";
    import { currentUserData, USER_TYPES } from "../stores/userDataStore";
    import WelcomeDialog from "./WelcomeDialog.svelte";

    export let isOpen;
    let isUserTypeDialog = true;

    let welcomeDialogStep = 0;
    let welcomeDialogUserType = 0;

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

    const handleClose = () => {
        isOpen = false;
    };

    const handleUserTypeSelection = (event) => {
        const userType = event.detail.userType;

        welcomeDialogUserType = userType === USER_TYPES.host ? 1 : 0;

        currentUserData.update((userData) => {
            isUserTypeDialog = false;
            return {
                ...userData,
                userType,
            };
        });
    };

    const handleContinue = () => {
        if (welcomeDialogStep > 1) isOpen = false;
        welcomeDialogStep += 1;
    };
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
            class="h-full lg:h-auto w-full lg:w-auto fixed lg:left-1/2 lg:top-1/2 z-50 lg:-translate-x-1/2 lg:-translate-y-1/2 flex flex-col justify-between lg:justify-start rounded-xl bg-white-normal
            p-6 shadow-lg"
        >
            {#if !isUserTypeDialog}
                <button
                    class="w-full flex items-center justify-end"
                    use:melt={$close}
                    on:click={handleClose}
                >
                    <IconX style="color:#373941" />
                </button>
                <WelcomeDialog
                    dialogStep={welcomeDialogStep}
                    dialogUserType={welcomeDialogUserType}
                />
                <div class="w-full flex items-center justify-between">
                    <button
                        on:click={handleClose}
                        class="p-4 text-sm text-black-dark">Skip</button
                    >
                    <button
                        on:click={handleContinue}
                        class="p-4 bg-purple-normal text-sm text-white-normal rounded-md"
                        >{welcomeDialogStep < 2 ? "Continue" : "Finish"}</button
                    >
                </div>
            {:else}
                <UserTypeDialog on:selectUserType={handleUserTypeSelection} />
            {/if}
        </div>
    </div>
{/if}
