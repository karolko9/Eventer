import { writable } from 'svelte/store';

function createUserTypeStore() {
    let initialValue = null;

    if (typeof localStorage !== 'undefined') {
        const storedValue = localStorage.getItem('userType');
        initialValue = storedValue ? JSON.parse(storedValue) : null;
    }

    const { subscribe, set, update } = writable(initialValue);

    if (typeof localStorage !== 'undefined') {
        subscribe((value) => {
            const currentStoredValue = localStorage.getItem('userType');
            const parsedStoredValue = currentStoredValue ? JSON.parse(currentStoredValue) : null;

            if (value !== parsedStoredValue) {
                if (value !== null) {
                    localStorage.setItem('userType', JSON.stringify(value));
                } else {
                    localStorage.removeItem('userType');
                }
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
