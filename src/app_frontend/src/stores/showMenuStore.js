import { derived } from 'svelte/store';
import { currentUserType } from './userTypeStore';
import { page } from '$app/stores';

export const showMenu = derived(
    [currentUserType, page],
    ([$currentUserType, $page]) => {
        return $currentUserType !== null && $page.url.pathname !== '/';
    }
);
