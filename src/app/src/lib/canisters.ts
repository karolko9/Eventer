import { createActor, canisterId } from '../../../declarations/contract';
import { canisterId as identityCanisterId } from '../../../declarations/internet_identity';
import { AuthClient } from '@dfinity/auth-client';


const host = `http://localhost:4943`

export const anonymousBackend = createActor(canisterId, { agentOptions: { host } });

export const connect = async () => {
	let authClient = await AuthClient.create();

	await new Promise((resolve) => {
		authClient.login({
			identityProvider: `http://${identityCanisterId}.localhost:4943/`, // 'https://identity.ic0.app'
			onSuccess: () => resolve(undefined)
		});
	});

	const identity = authClient.getIdentity();
	const actor = createActor(canisterId, {
		agentOptions: {
			identity, host
		}
	});

	return { actor, identity };
};
