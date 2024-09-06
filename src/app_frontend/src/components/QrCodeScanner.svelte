<script>
    import { onMount } from "svelte";
    import { Html5QrcodeScanner } from "html5-qrcode";
    import { auth } from "$lib/auth";

    let scanResult = null;
    let isScanning = true;

    export let participants;
    
    const verifySignature = async (text, ticket ) => {
        if ($auth.isReady && $auth.isAuthenticated) {
            try{
                const response = await $auth.whoamiActor.verify_ticket_signature_by_admin(text, ticket);
                console.log(response)
                if(response === undefined){
                    return "Ticket not found";
                }
                if(response.Ok === null){
                    return "Ticket is verified correctly";
                }else{
                    return "Ticket is verified correctly";
                }
            }catch(error){
                console.error(error)
                return "Ticket was already used."
            } 
        }
    }

    onMount(() => {
        $auth.init();

        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        async function success(result) {
            if (isScanning) {
                scanner.clear();
                const convertedResult = JSON.parse(result);

                const { principal, event_name, event_id, signature_hex} = convertedResult;
            
                const ticket = {
                    event_id: parseInt(event_id),
                    user: principal,
                    event_name: event_name
                }

                scanResult = await verifySignature(signature_hex, ticket);
                
                console.log(scanResult);
               
                isScanning = false; 
            }
        }

        function error(err) {
            console.warn(err);
        }

        setTimeout(() => {
            const scanRegion = document.getElementById("reader__scan_region");
            if (scanRegion) {
                const imgElement = scanRegion.querySelector("img");
                imgElement.style.margin = "0 auto";
            }
        }, 500); 
        
        return () => {
            scanner.clear();
        };
    });


</script>

<div class="">
    {#if scanResult}
        <div>{scanResult}</div>
    {:else}
        <div id="reader" style="display:flex; flex-direction:column; align-items:center; padding: 8px; margin-top:8px;"></div>
    {/if}
</div>

