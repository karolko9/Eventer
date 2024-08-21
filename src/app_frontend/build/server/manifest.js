const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json5","eventCardImg1.png","eventCardImg2.png","eventCardImg3.png","favicon.ico"]),
	mimeTypes: {".json5":"application/json5",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.cUeruO2f.js","app":"_app/immutable/entry/app.CNSYXbB8.js","imports":["_app/immutable/entry/start.cUeruO2f.js","_app/immutable/chunks/entry.BudnKaMB.js","_app/immutable/chunks/runtime.aXHnhyvJ.js","_app/immutable/chunks/index.B1KEFf-C.js","_app/immutable/entry/app.CNSYXbB8.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/runtime.aXHnhyvJ.js","_app/immutable/chunks/render.BE2DS_ko.js","_app/immutable/chunks/utils.BlcS-Bm0.js","_app/immutable/chunks/template.eTO5rkRx.js","_app/immutable/chunks/disclose-version.Bg9kRutz.js","_app/immutable/chunks/if.SkAuWYcG.js","_app/immutable/chunks/svelte-component.B01si1_d.js","_app/immutable/chunks/props.BZlKUZyv.js","_app/immutable/chunks/this.B9FN-DZ9.js","_app/immutable/chunks/index-client.CQj2buiT.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CEpWCzyi.js')),
			__memo(() => import('./chunks/1-DEf5MsRb.js')),
			__memo(() => import('./chunks/2-C9j6m1xU.js')),
			__memo(() => import('./chunks/3-BMX8dBdo.js')),
			__memo(() => import('./chunks/4-DnBuO3g3.js')),
			__memo(() => import('./chunks/5-CQUUEQd_.js')),
			__memo(() => import('./chunks/6-DXjJFZ3D.js')),
			__memo(() => import('./chunks/7-DtlxxpdT.js')),
			__memo(() => import('./chunks/8-C8k2wZYN.js')),
			__memo(() => import('./chunks/9-ES3ns9ZO.js')),
			__memo(() => import('./chunks/10-BVsTRH0k.js')),
			__memo(() => import('./chunks/11-DSJxMMHm.js')),
			__memo(() => import('./chunks/12-CGXWYi8n.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/create-event-old",
				pattern: /^\/create-event-old\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/create-event",
				pattern: /^\/create-event\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/events/[slug]",
				pattern: /^\/events\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/my-events/attendee",
				pattern: /^\/my-events\/attendee\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/my-events/host",
				pattern: /^\/my-events\/host\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
