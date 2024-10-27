import { derived } from 'svelte/store';
import { currentUserData } from './userDataStore';
import { page } from '$app/stores';

export const showMenu = derived(
    [currentUserData, page],
    ([$currentUserData, $page]) => {
        return $currentUserData.userType !== null && $page.url.pathname !== '/';
    }
);
