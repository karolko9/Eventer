import { writable } from 'svelte/store';

export const formProgress = writable(33);
export const formStep = writable(0);
export const formData = writable(
    {
        name: "",
        event_tags: [],
        description: "",
        thumbnail: "",
        location: [],
        address: "",
        date: "",
        start_hour: "",
        end_hour: ""
    }
)