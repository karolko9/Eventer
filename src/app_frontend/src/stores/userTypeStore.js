import { writable } from 'svelte/store';

function createUserTypeStore() {
    let initialValue = null;

    // Check if we're in a browser environment (so localStorage is available)
    if (typeof localStorage !== 'undefined') {
        const storedValue = localStorage.getItem('userType');
        initialValue = storedValue ? JSON.parse(storedValue) : null;
    }

    const { subscribe, set, update } = writable(initialValue);

    // Only write to localStorage if we're in the browser
    if (typeof localStorage !== 'undefined') {
        subscribe((value) => {
            if (value !== null) {
                localStorage.setItem('userType', JSON.stringify(value));
            } else {
                localStorage.removeItem('userType');
            }
        });
    }

    return {
        subscribe,
        set,
        update
    };
}

export const currentUserType = createUserTypeStore();
