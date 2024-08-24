<script>
    import { onMount } from "svelte";
    import { Html5QrcodeScanner } from "html5-qrcode";

    let scanResult = null;
    let isScanning = true;

    onMount(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            if (isScanning) {
                scanner.clear();
                scanResult = result;
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
        <div>Success: <a href={"http://" + scanResult}>{scanResult}</a></div>
    {:else}
        <div id="reader" style="display:flex; flex-direction:column; align-items:center; padding: 8px; margin-top:8px;"></div>
    {/if}
</div>

