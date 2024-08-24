import { storage } from "../../../declarations/storage";

export function generateAssetId(type) {
    const uuid = crypto.randomUUID();
    return `${type}:${uuid}`;
}

export function getAssetTypeFromId(assetId) {
    return assetId.split(':')[0];
}

export async function uploadAsset(file) {
    return uploadAssetWithId(file, generateAssetId(file.type));
}

export async function uploadAssetWithId(file, id) {
    console.log('Insert asset function triggered.');
    console.log('Key for insertion:', id);

    try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        console.log('File converted to Uint8Array. Length:', uint8Array.length);

        console.log('Inserting data into storage...');
        const previousValue = await storage.insert(id, uint8Array);
        console.log('Data inserted. Previous value:', previousValue);

        return id;
    } catch (error) {
        throw `Error: ${error.message}`;
    }
}

export async function getAsset(id) {
    console.log('Get asset function triggered.');
    console.log('Key for retrieval:', id);

    try {
        const assetType = getAssetTypeFromId(id);
        console.log('Asset type: ' + assetType);

        console.log('Retrieving data from storage...');
        const retrievedValue = await storage.get(id);
        console.log('Data retrieved from storage. Length:', retrievedValue ? retrievedValue.length : 'No data');

        if (retrievedValue) {
            const blob = new Blob(retrievedValue, { type: assetType });
            console.log('Blob created. Size:', blob.size, 'Type:', blob.type);

            const retrievedImage = URL.createObjectURL(blob);
            console.log('Blob URL created:', retrievedImage);
            return retrievedImage
        } else {
            throw "No image found for this key.";
        }
    } catch (error) {
        throw `Error: ${error.message}`;
    }
}
