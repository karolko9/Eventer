<script>
    import { Html5QrcodeScanner } from "html5-qrcode";
    import  qrcode  from "qrcode-generator"
    import { AuthClient } from "@dfinity/auth-client";
    import { onMount } from "svelte";
    import { auth } from "$lib/auth";

    export let eventId;
    let principal = "";
    let qrImageTag = "";

    onMount(() => {
        $auth.init();
        generateQrCode();
    });

    const getStoredEventById = (id) => {
        let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

        const event = storedEvents.find(event => parseInt(event.event_id) === id);

        if (event) {
            if (event.signature_hex && event.signature_hex.Ok && event.signature_hex.Ok.signature_hex) {
                event.signature_hex = event.signature_hex.Ok.signature_hex;
            }
            console.log("Event found:", event);
            return event;
        } else {
            console.log("Event not found.");
            return null;
        }
    }

    async function generateQrCode() {
       
        const ticketData = getStoredEventById(eventId);

        let typeNumber = 4;
        let errorCorrectionLevel = 'L';
        let qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(ticketData);
        qr.make();
        qrImageTag = qr.createImgTag(6).replace('<img', '<img style="border-radius:14px;"');
    }
</script>


<div class="w-[160px] h-[160px] flex flex-col mt-6 mb-4">
    {@html qrImageTag}
</div>