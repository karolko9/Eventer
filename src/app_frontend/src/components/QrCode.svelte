<script>
    import { Html5QrcodeScanner } from "html5-qrcode";
    import  qrcode  from "qrcode-generator"
    import { AuthClient } from "@dfinity/auth-client";
    import { onMount } from "svelte";
  import { auth } from "$lib/auth";

    // new Html5QrcodeScanner('reader', {})

    let Principal = "";

    onMount(() => {
        setPrincipal();
    });

    async function setPrincipal() {
        const authClient = await AuthClient.create();
        Principal = await authClient.getIdentity()?.getPrincipal();
    }

    
    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(Principal);
    qr.make();
    let qrImageTag = qr.createImgTag(6).replace('<img', '<img style="border-radius:14px;"');
</script>


<div class="w-[160px] h-[160px] flex flex-col mt-6 mb-4">
    {@html qrImageTag}
</div>