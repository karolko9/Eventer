import { HttpAgent, Actor } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { r as readable } from './index-DfWoi3jB.js';

const idlFactory = ({ IDL }) => {
  const EventDTO = IDL.Record({
    "name": IDL.Text,
    "tags": IDL.Vec(IDL.Text),
    "address": IDL.Text,
    "location": IDL.Tuple(IDL.Float64, IDL.Float64),
    "time_start": IDL.Text,
    "time_end": IDL.Text
  });
  const EventDetailsResponse = IDL.Record({
    "id": IDL.Nat,
    "name": IDL.Text,
    "tags": IDL.Vec(IDL.Text),
    "address": IDL.Text,
    "location": IDL.Tuple(IDL.Float64, IDL.Float64),
    "time_start": IDL.Text,
    "time_end": IDL.Text
  });
  const EventResponse = IDL.Record({
    "id": IDL.Nat,
    "location": IDL.Tuple(IDL.Float64, IDL.Float64)
  });
  const UserDataModel = IDL.Record({
    "bio": IDL.Text,
    "job": IDL.Text,
    "name": IDL.Text,
    "role": IDL.Text,
    "list_of_events": IDL.Vec(IDL.Nat),
    "tags": IDL.Vec(IDL.Text),
    "location": IDL.Tuple(IDL.Float64, IDL.Float64)
  });
  const UserDTO = IDL.Record({
    "bio": IDL.Text,
    "job": IDL.Text,
    "name": IDL.Text,
    "role": IDL.Text,
    "tags": IDL.Vec(IDL.Text),
    "location": IDL.Tuple(IDL.Float64, IDL.Float64)
  });
  return IDL.Service({
    "create_event": IDL.Func([EventDTO], [IDL.Bool], []),
    "get_all_events_with_details": IDL.Func(
      [],
      [IDL.Vec(EventDetailsResponse)],
      ["query"]
    ),
    "get_event": IDL.Func(
      [IDL.Nat],
      [IDL.Opt(EventDetailsResponse)],
      ["query"]
    ),
    "get_event_by_tags": IDL.Func(
      [IDL.Vec(IDL.Text)],
      [IDL.Vec(EventResponse)],
      ["query"]
    ),
    "get_event_by_tags_user": IDL.Func(
      [],
      [IDL.Vec(EventResponse)],
      ["query"]
    ),
    "get_user": IDL.Func([], [IDL.Opt(UserDataModel)], ["query"]),
    "join_event": IDL.Func([IDL.Nat], [IDL.Bool], []),
    "register_user": IDL.Func([UserDTO], [IDL.Bool], []),
    "update_user": IDL.Func([UserDTO], [IDL.Bool], [])
  });
};
const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const createActor = (canisterId2, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }
  {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId2,
    ...options.actorOptions
  });
};
const getIdentityProvider = () => {
  let idpProvider;
  if (typeof window !== "undefined") {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      idpProvider = `http://localhost:4943/?canisterId=${"be2us-64aaa-aaaaa-qaabq-cai"}`;
    } else {
      idpProvider = `http://${"be2us-64aaa-aaaaa-qaabq-cai"}.localhost:4943`;
    }
  }
  return idpProvider;
};
const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true
    }
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider: getIdentityProvider()
  }
};
function actorFromIdentity(identity) {
  return createActor(canisterId, {
    agentOptions: {
      host: "http://localhost:4943",
      identity
    }
  });
}
const initialAuth = {
  isAuthenticated: false,
  isReady: false,
  login: () => {
  },
  logout: () => {
  },
  init: () => {
  },
  identity: null,
  authClient: null,
  whoamiActor: null
};
const auth = readable(initialAuth, (set) => {
  const auth2 = {
    ...initialAuth,
    init: async () => {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      auth2.authClient = authClient;
      const isAuthenticated = await authClient.isAuthenticated();
      const identity = isAuthenticated ? authClient.getIdentity() : null;
      const whoamiActor = identity ? actorFromIdentity(identity) : null;
      auth2.isAuthenticated = isAuthenticated;
      auth2.identity = identity;
      auth2.whoamiActor = whoamiActor;
      auth2.isReady = true;
      set(auth2);
    },
    login: async () => {
      if (!auth2.isReady) return;
      if (!auth2.authClient) {
        await auth2.init();
      }
      auth2.authClient?.login({
        ...defaultOptions.loginOptions,
        identityProvider: getIdentityProvider(),
        onSuccess: async () => {
          const authClient = auth2.authClient;
          const isAuthenticated = await authClient?.isAuthenticated() ?? false;
          const identity = isAuthenticated ? authClient?.getIdentity() ?? null : null;
          const whoamiActor = identity ? actorFromIdentity(identity) : null;
          auth2.isAuthenticated = isAuthenticated;
          auth2.identity = identity;
          auth2.whoamiActor = whoamiActor;
          set(auth2);
        }
      });
    },
    logout: async () => {
      await auth2.authClient?.logout();
      auth2.isAuthenticated = false;
      auth2.identity = null;
      auth2.whoamiActor = null;
      set(auth2);
    }
  };
  set(auth2);
});

export { auth as a };
//# sourceMappingURL=auth-BUerAMzR.js.map
