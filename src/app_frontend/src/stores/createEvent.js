import { writable } from 'svelte/store';

const defaultFormData = {
    name: "",
    event_tags: [],
    description: "",
    thumbnail: "",
    location: [],
    address: "",
    date: "",
    start_hour: "",
    end_hour: "",
    media: "",
    phone: "",
    email: "",
    price: 0
};

const formData = writable(defaultFormData)
const formStep = writable(0);
const formProgress = writable(0);

const  resetFormData = () => {
    formData.set(defaultFormData);
}


export { formData, resetFormData, formStep, formProgress}