import { writable } from "svelte/store";
import { connect } from "./canisters";
import type { ActorSubclass, Identity } from "@dfinity/agent";
import type { _SERVICE } from '../../../declarations/contract/contract.did';

export const wallet = createWallet()

interface Wallet {
    connected: true,
    actor: ActorSubclass<_SERVICE>,
    identity: Identity
}

function createWallet() {
    const { subscribe, set, update } = writable<{ connected: false } | Wallet>({
        connected: false,
    });

    return {
        subscribe,
        connect: async () => {
            const { actor, identity } = await connect()
            set({ connected: true, actor, identity })
        },
    };
}