<script>
    import { storage } from "../../../declarations/storage";

    let key = "";
    let file = null;
    let result = "";
    let retrievedImage = "";

    function handleFileUpload(event) {
        const selectedFile = event.target.files[0];
        console.log('File upload event triggered.');
        console.log('Selected file:', selectedFile);

        if (selectedFile) {
            file = selectedFile;
            console.log('File set to:', file.name, 'Size:', file.size, 'Type:', file.type);
        } else {
            console.log('No file selected.');
        }
    }

    async function insertAsset() {
        console.log('Insert asset function triggered.');
        console.log('Key for insertion:', key);

        try {
            if (!file) {
                result = "Please select a file first.";
                console.log('No file selected for insertion.');
                return;
            }

            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            console.log('File converted to Uint8Array. Length:', uint8Array.length);

            console.log('Inserting data into storage...');
            const previousValue = await storage.insert(key, uint8Array);
            console.log('Data inserted. Previous value:', previousValue);

            if (previousValue) {
                result = "Image updated successfully.";
                console.log('Image updated successfully.');
            } else {
                result = "New image inserted successfully!";
                console.log('New image inserted successfully!');
            }
        } catch (error) {
            result = `Error: ${error.message}`;
            console.error('Error during insertion:', error);
        }
    }

    async function getAsset() {
        console.log('Get asset function triggered.');
        console.log('Key for retrieval:', key);

        try {
            console.log('Retrieving data from storage...');
            const retrievedValue = await storage.get(key);
            console.log('Data retrieved from storage. Length:', retrievedValue ? retrievedValue.length : 'No data');

            if (retrievedValue) {
                const blob = new Blob(retrievedValue, { type: 'image/jpeg' });
                console.log('Blob created. Size:', blob.size, 'Type:', blob.type);

                retrievedImage = URL.createObjectURL(blob);
                console.log('Blob URL created:', retrievedImage);
            } else {
                result = "No image found for this key.";
                console.log('No image found for key:', key);
            }
        } catch (error) {
            result = `Error: ${error.message}`;
            console.error('Error during retrieval:', error);
        }
    }
</script>

<div>
    <h2>Asset Storage</h2>
    <input bind:value={key} placeholder="Enter key" />
    <input type="file" accept="image/*" on:change={handleFileUpload} />
    <button on:click={insertAsset}>Insert</button>
    <button on:click={getAsset}>Get</button>
    <p>{result}</p>

    {#if retrievedImage}
        <h3>Retrieved Image:</h3>
        <img src={retrievedImage} alt="Retrieved Image" />
        <p>Retrieved Image URL: {retrievedImage}</p>
    {/if}
</div>

<style>
    div * {
        border: 1px solid black;
        padding: 5px;
        margin: 5px;
    }
</style>




<!-- <script>
    import { onMount } from 'svelte';
    let selectedFile;
    let imageUrl;
    let imageId;

    const uploadImage = async () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const imageData = new Uint8Array(event.target.result);
            const response = await fetch('http://127.0.0.1:4943/?canisterId=asrmz-lmaaa-aaaaa-qaaeq-cai&id=aax3a-h4aaa-aaaaa-qaahq-cai/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: Array.from(imageData),
                    order: 0 // Możesz ustawić numer porządkowy
                })
            });

            const result = await response.json();
            console.log('Upload result:', result);
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    const fetchImage = async (id) => {
        const response = await fetch(`http://localhost:8000/?canisterId=your_canister_id&method=read_image&id=${id}`);
        const imageData = await response.json();

        // Przekształć dane na format Blob i wyświetl obraz
        const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
        imageUrl = URL.createObjectURL(blob);
    };
</script>

<main>
    <h1>Upload Image</h1>
    <input type="file" accept="image/*" on:change="{(e) => selectedFile = e.target.files[0]}" />
    <button on:click={uploadImage}>Upload</button>

    <h2>Fetch Image</h2>
    <input type="number" placeholder="Enter image ID" bind:this={imageId} />
    <button on:click={() => fetchImage(imageId)}>Fetch Image</button>

    {#if imageUrl}
        <h2>Image Preview</h2>
        <img src={imageUrl} alt="Fetched Image" />
    {/if}
</main> -->
