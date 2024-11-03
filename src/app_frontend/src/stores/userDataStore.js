import { writable } from 'svelte/store';

export const USER_TYPES = {
    attendee: 'attendee',
    host: 'host'
}

function userDataStore() {
    let initialValues = {
        userType: USER_TYPES.attendee,
        firstEntrance: true,
    };

    const { subscribe, set, update } = writable(initialValues);

    if (typeof localStorage !== 'undefined') {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedStoredValue = JSON.parse(storedUserData);
            initialValues = {
                ...initialValues,
                ...parsedStoredValue,
                firstEntrance: false
            };
            set(initialValues);
        }

        subscribe((value) => {
            const currentStoredValue = localStorage.getItem('userData');
            const parsedStoredValue = currentStoredValue ? JSON.parse(currentStoredValue) : null;
            if (value !== parsedStoredValue) {
                if (value !== null) {
                    localStorage.setItem('userData', JSON.stringify(value));
                } else {
                    localStorage.removeItem('userData');
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

export const currentUserData = userDataStore();
