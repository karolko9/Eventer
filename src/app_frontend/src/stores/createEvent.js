import { writable } from 'svelte/store';

export const formProgress = writable(33);
export const formStep = writable(0);
export const formData = writable(
    {
        name: "",
        tags: [],
        event_description: "",
        event_thumbnail: "",
        location: [],
        adress: "",
        time_start: "",
        time_end: ""
    }
)