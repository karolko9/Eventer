<script>
    import { Html5QrcodeScanner } from "html5-qrcode";
    import  qrcode  from "qrcode-generator"
    import { AuthClient } from "@dfinity/auth-client";
    import { onMount } from "svelte";
    import { auth } from "$lib/auth";

    let principal = "";
    let qrImageTag = "";
    
    onMount(() => {
        $auth.init();
        setPrincipal();
    });

    async function setPrincipal() {
        principal = await $auth.authClient.getIdentity()?.getPrincipal();
        console.log(principal);

        let typeNumber = 4;
        let errorCorrectionLevel = 'L';
        let qr = qrcode(typeNumber, errorCorrectionLevel);
        console.log(principal.toText());
        qr.addData(principal.toText());
        qr.make();
        qrImageTag = qr.createImgTag(6).replace('<img', '<img style="border-radius:14px;"');
    }
</script>


<div class="w-[160px] h-[160px] flex flex-col mt-6 mb-4">
    {@html qrImageTag}
</div>