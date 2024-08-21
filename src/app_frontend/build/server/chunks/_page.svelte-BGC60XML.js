import { q as store_get, u as unsubscribe_stores, e as pop, v as copy_payload, w as assign_payload, p as push, j as ensure_array_like, k as attr, l as stringify, n as spread_props, h as slot, x as fallback, y as store_set, z as bind_props, A as sanitize_slots, m as escape_html, o as sanitize_props } from './index2-Cg2Yee25.js';
import { w as writable } from './index-DfWoi3jB.js';
import maplibregl from 'maplibre-gl';
import { M as MapLibre, u as updatedMarkerContext, m as mapContext, i as isDeckGlMouseEvent } from './index-DjvulMxb.js';
import { o as onDestroy } from './index-server-VuI1VAtu.js';
import { d as default_slot } from './misc-b9uXgm3X.js';
import { a as auth } from './auth-BUerAMzR.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { M as Map_pin } from './map-pin-B3T_Mw5e.js';
import { I as Info_circle } from './info-circle-HsxfpMUg.js';
import '@dfinity/agent';
import '@dfinity/auth-client';

var collectionFlush = flush;

/*
  flush([1, undefined, 2, null, 3, NaN, 0]); // [1, 2, 3, NaN, 0]
  flush([true, null, false, true, [null], undefined]); // [true, false, true, [null]]
  flush({a: 2, b: null, c: 4, d: undefined}); // {a: 2, c: 4}
  flush('something'); // undefined
  flush(); // undefined
*/

function flush(collection) {
  var result, len, i;
  if (!collection) {
    return undefined;
  }
  if (Array.isArray(collection)) {
    result = [];
    len = collection.length;
    for (i = 0; i < len; i++) {
      var elem = collection[i];
      if (elem != null) {
        result.push(elem);
      }
    }
    return result;
  }
  if (typeof collection == 'object') {
    result = {};
    var keys = Object.keys(collection);
    len = keys.length;
    for (i = 0; i < len; i++) {
      var key = keys[i];
      var value = collection[key];
      if (value != null) {
        result[key] = value;
      }
    }
    return result;
  }
  return undefined;
}

function Calendar_event($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
      }
    ],
    ["path", { "d": "M16 3l0 4" }],
    ["path", { "d": "M8 3l0 4" }],
    ["path", { "d": "M4 11l16 0" }],
    ["path", { "d": "M8 15h2v2h-2z" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "calendar-event" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Location($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "location" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Logout($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
      }
    ],
    ["path", { "d": "M9 12h12l-3 -3" }],
    ["path", { "d": "M18 15l3 -3" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "logout" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Mail($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
      }
    ],
    ["path", { "d": "M3 7l9 6l9 -6" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "mail" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Search($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
      }
    ],
    ["path", { "d": "M21 21l-6 -6" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "search" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Ticket($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M15 5l0 2" }],
    ["path", { "d": "M15 11l0 2" }],
    ["path", { "d": "M15 17l0 2" }],
    [
      "path",
      {
        "d": "M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "ticket" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Users($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" }
    ],
    [
      "path",
      {
        "d": "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
      }
    ],
    [
      "path",
      { "d": "M16 3.13a4 4 0 0 1 0 7.75" }
    ],
    [
      "path",
      { "d": "M21 21v-2a4 4 0 0 0 -3 -3.85" }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "users" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Wallet($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"
      }
    ],
    [
      "path",
      { "d": "M20 12v4h-4a2 2 0 0 1 0 -4h4" }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "wallet" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, default_slot($$props), {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function DefaultMarker($$payload, $$props) {
  push();
  var $$store_subs;
  let markerProp = fallback($$props["marker"], () => void 0, true);
  let lngLat = $$props["lngLat"];
  let classNames = fallback($$props["class"], () => void 0, true);
  let draggable = fallback($$props["draggable"], false);
  let feature = fallback($$props["feature"], null);
  let offset = fallback($$props["offset"], () => void 0, true);
  let rotation = fallback($$props["rotation"], 0);
  let opacity = fallback($$props["opacity"], 1);
  const { map, layerEvent, self: marker } = updatedMarkerContext();
  const dragStartListener = () => sendEvent("dragstart");
  const dragListener = () => {
    propagateLngLatChange();
    sendEvent("drag");
  };
  const dragEndListener = () => {
    propagateLngLatChange();
    sendEvent("dragend");
  };
  store_set(marker, new maplibregl.Marker(collectionFlush({
    draggable,
    rotation,
    className: classNames,
    offset,
    opacity: opacity.toString()
  })).setLngLat(lngLat).addTo(store_get($$store_subs ??= {}, "$map", map)));
  markerProp = store_get($$store_subs ??= {}, "$marker", marker);
  if (draggable) {
    store_get($$store_subs ??= {}, "$marker", marker).on("dragstart", dragStartListener);
    store_get($$store_subs ??= {}, "$marker", marker).on("drag", dragListener);
    store_get($$store_subs ??= {}, "$marker", marker).on("dragend", dragEndListener);
  }
  onDestroy(() => {
    markerProp = void 0;
    store_get($$store_subs ??= {}, "$marker", marker)?.remove();
  });
  function propagateLngLatChange() {
    let newPos = store_get($$store_subs ??= {}, "$marker", marker)?.getLngLat();
    if (!newPos) {
      return;
    }
    if (Array.isArray(lngLat)) {
      lngLat = [newPos.lng, newPos.lat];
    } else if (lngLat && "lon" in lngLat) {
      lngLat = { lon: newPos.lng, lat: newPos.lat };
    } else {
      lngLat = newPos;
    }
  }
  function sendEvent(eventName) {
    let loc = store_get($$store_subs ??= {}, "$marker", marker)?.getLngLat();
    if (!loc) {
      return;
    }
    const lngLat2 = [loc.lng, loc.lat];
    let data = {
      map: store_get($$store_subs ??= {}, "$map", map),
      marker: store_get($$store_subs ??= {}, "$marker", marker),
      lngLat: lngLat2,
      features: [
        {
          type: "Feature",
          properties: feature?.properties ?? {},
          geometry: { type: "Point", coordinates: lngLat2 }
        }
      ]
    };
    store_set(layerEvent, {
      ...data,
      layerType: "marker",
      type: eventName
    });
  }
  store_get($$store_subs ??= {}, "$marker", marker)?.setLngLat(lngLat);
  store_get($$store_subs ??= {}, "$marker", marker)?.setOffset(offset ?? [0, 0]);
  store_get($$store_subs ??= {}, "$marker", marker)?.setRotation(rotation);
  store_get($$store_subs ??= {}, "$marker", marker)?.setOpacity(opacity.toString());
  $$payload.out += `<!---->`;
  slot(
    $$payload,
    default_slot($$props),
    {
      marker: store_get($$store_subs ??= {}, "$marker", marker)
    }
  );
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    marker: markerProp,
    lngLat,
    class: classNames,
    draggable,
    feature,
    offset,
    rotation,
    opacity
  });
  pop();
}
function Popup($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  push();
  var $$store_subs;
  let actualCloseButton, hoveringOnLayer;
  let closeButton = fallback($$props["closeButton"], () => void 0, true);
  let closeOnClickOutside = fallback($$props["closeOnClickOutside"], true);
  let closeOnClickInside = fallback($$props["closeOnClickInside"], false);
  let closeOnMove = fallback($$props["closeOnMove"], false);
  let openOn = fallback($$props["openOn"], "click");
  let openIfTopMost = fallback($$props["openIfTopMost"], true);
  let focusAfterOpen = fallback($$props["focusAfterOpen"], true);
  let anchor = fallback($$props["anchor"], () => void 0, true);
  let offset = fallback($$props["offset"], () => void 0, true);
  let popupClass = fallback($$props["popupClass"], () => void 0, true);
  let maxWidth = fallback($$props["maxWidth"], () => void 0, true);
  let lngLat = fallback($$props["lngLat"], () => void 0, true);
  let html = fallback($$props["html"], () => void 0, true);
  let open = fallback($$props["open"], false);
  const {
    map,
    popupTarget,
    layerEvent,
    layer,
    eventTopMost,
    markerClickManager
  } = mapContext();
  const clickEvents = ["click", "dblclick", "contextmenu"];
  let popup;
  let hoveringOnPopup = false;
  let popupElement;
  function setPopupClickHandler() {
    if (!popup) {
      return;
    }
    let el = popup.getElement();
    if (!el || el === popupElement) {
      return;
    }
    popupElement = el;
    if (openOn === "hover") {
      popupElement.style.pointerEvents = "none";
    }
    popupElement.addEventListener(
      "mouseenter",
      () => {
        hoveringOnPopup = true;
      },
      { passive: true }
    );
    popupElement.addEventListener(
      "mouseleave",
      () => {
        hoveringOnPopup = false;
      },
      { passive: true }
    );
    popupElement.addEventListener(
      "click",
      () => {
        if (closeOnClickInside) {
          open = false;
        }
      },
      { passive: true }
    );
  }
  function skipHandlingEvent(e) {
    if (!openIfTopMost) {
      return false;
    }
    return !("marker" in e) && !isDeckGlMouseEvent(e) && eventTopMost(e) !== store_get($$store_subs ??= {}, "$layer", layer);
  }
  let features = null;
  function handleLayerEvent(e) {
    if ("layerType" in e && e.layerType === "deckgl") {
      lngLat = e.coordinate;
      features = e.object ? [e.object] : null;
    } else {
      lngLat = e.lngLat;
      features = e.features ?? [];
    }
  }
  function handleLayerClick(e) {
    if (e.type !== openOn || skipHandlingEvent(e)) {
      return;
    }
    handleLayerEvent(e);
    setTimeout(() => open = true);
  }
  onDestroy(() => {
    if (store_get($$store_subs ??= {}, "$map", map) && popup?.isOpen()) {
      popup.remove();
    }
  });
  actualCloseButton = closeButton ?? (!closeOnClickOutside && !closeOnClickInside);
  if (!popup) {
    popup = new maplibregl.Popup({
      closeButton: actualCloseButton,
      // We handle this ourselves to improve behavior on mobile.
      closeOnClick: false,
      closeOnMove,
      focusAfterOpen,
      maxWidth,
      className: popupClass,
      anchor,
      offset
    });
    popupElement = popup.getElement();
    popup.on("open", () => {
      open = true;
      setPopupClickHandler();
    });
    popup.on("close", () => {
      open = false;
    });
    popup.on("hover", () => {
    });
  }
  if (popup && store_get($$store_subs ??= {}, "$popupTarget", popupTarget) instanceof maplibregl.Marker) {
    if (openOn === "click") {
      store_get($$store_subs ??= {}, "$popupTarget", popupTarget).setPopup(popup);
    } else if (store_get($$store_subs ??= {}, "$popupTarget", popupTarget).getPopup() === popup) {
      store_get($$store_subs ??= {}, "$popupTarget", popupTarget).setPopup(void 0);
    }
  }
  if (clickEvents.includes(openOn) && store_get($$store_subs ??= {}, "$layerEvent", layerEvent)?.type === openOn) {
    handleLayerClick(store_get($$store_subs ??= {}, "$layerEvent", layerEvent));
    store_set(layerEvent, null);
  }
  hoveringOnLayer = openOn === "hover" && (store_get($$store_subs ??= {}, "$layerEvent", layerEvent)?.type === "mousemove" || store_get($$store_subs ??= {}, "$layerEvent", layerEvent)?.type === "mouseenter");
  if (openOn === "hover" && layerEvent) {
    if (hoveringOnLayer && store_get($$store_subs ??= {}, "$layerEvent", layerEvent)) {
      handleLayerEvent(store_get($$store_subs ??= {}, "$layerEvent", layerEvent));
    }
    open = (hoveringOnLayer || hoveringOnPopup) ?? false;
  }
  if (html) {
    popup.setHTML(html);
  }
  if (lngLat) popup.setLngLat(lngLat);
  if (store_get($$store_subs ??= {}, "$map", map)) {
    let isOpen = popup.isOpen();
    if (open && !isOpen) {
      popup.addTo(store_get($$store_subs ??= {}, "$map", map));
    } else if (!open && isOpen) {
      popup.remove();
    }
  }
  if ($$slots.default) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div>`;
    if (features?.length || store_get($$store_subs ??= {}, "$popupTarget", popupTarget) instanceof maplibregl.Marker) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot(
        $$payload,
        default_slot($$props),
        {
          features,
          data: features?.[0] ?? null,
          map: store_get($$store_subs ??= {}, "$map", map),
          close: () => open = false
        }
      );
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    closeButton,
    closeOnClickOutside,
    closeOnClickInside,
    closeOnMove,
    openOn,
    openIfTopMost,
    focusAfterOpen,
    anchor,
    offset,
    popupClass,
    maxWidth,
    lngLat,
    html,
    open
  });
  pop();
}
function Button($$payload, $$props) {
  let click = fallback($$props["click"], () => {
  });
  $$payload.out += `<button class="svelte-ezcb5i"><!---->`;
  slot($$payload, default_slot($$props), {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { click });
}
function EventDetailsModal($$payload, $$props) {
  push();
  let event = $$props["event"];
  let open = $$props["open"];
  const getStreetAndNumber = (address) => {
    let fullAddressArr = address.split(",");
    return fullAddressArr[2] + ", " + fullAddressArr[1];
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  $$payload.out += `<main${attr("class", `h-[500px] lg:h-full w-full lg:w-[400px] bottom-[-500px] lg:left-[-500px] lg:bottom-0 p-4 bg-white overflow-y-scroll absolute z-10 duration-300 ease-in-out border-r-2 border-gray-200 rounded-md svelte-198nquw ${stringify([open ? "open" : ""].filter(Boolean).join(" "))}`)}>`;
  if (event != null) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img src="/eventCardImg1.png" class="w-full object-cover mb-4 rounded-md" alt="thumbnail"> <h1 class="mb-2 text-lg font-medium">${escape_html(event.name)}</h1> <div class="flex items-center gap-3 mb-2">`;
    Calendar_event($$payload, {});
    $$payload.out += `<!----> <p style="text-md">${escape_html(formatDate(event.time_start))}</p></div> <div class="flex gap-3 mb-2">`;
    Map_pin($$payload, {});
    $$payload.out += `<!----> <p style="text-md">${escape_html(getStreetAndNumber(event.address))}</p></div> <div class="flex gap-3 mb-4">`;
    Users($$payload, {});
    $$payload.out += `<!----> <p style="text-md">Bilety: <span class="text-green">dostępne</span></p></div> <div class="w-full overflow-hidden mb-4"><div class="flex gap-2 overflow-x-scroll"><button class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">`;
    Ticket($$payload, { style: "color: #fff" });
    $$payload.out += `<!----> <p class="text-background">Join event</p></button> <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">`;
    Info_circle($$payload, { style: "color: #fff" });
    $$payload.out += `<!----> <p class="text-background">More info</p></div> <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">`;
    Location($$payload, { style: "color: #fff" });
    $$payload.out += `<!----> <p class="text-background">Location</p></div> <div class="w-fit flex items-center gap-1 p-2 whitespace-nowrap bg-primary rounded-xl">`;
    Mail($$payload, { style: "color: #fff" });
    $$payload.out += `<!----> <p class="text-background">Contact</p></div></div></div> <p class="text-sm font-light mb-4">"ICP: Roadmap for Devs" is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.</p> <div class="flex gap-2 mb-2">`;
    Ticket($$payload, { style: "color: #000" });
    $$payload.out += `<!----> <div class="flex flex-col"><p class="text-md">Form: 100zł</p> <p class="text-sm opacity-80">Price includes 4zł service fee</p></div></div> <button class="py-3 px-10 text-md font-medium bg-primary text-background rounded-[20px]">Buy Ticket</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></main>`;
  bind_props($$props, { event, open });
  pop();
}
function Searchbox($$payload, $$props) {
  push();
  let searchQuery = "";
  let searchResults = [];
  let timeoutId;
  onDestroy(() => {
    clearTimeout(timeoutId);
  });
  $$payload.out += `<div class="lg:w-full flex flex-col relative"><div class="search-bar svelte-19us5hk"><input type="text" id="searchQuery"${attr("value", searchQuery)} placeholder="Enter location" class="svelte-19us5hk"> <button type="button" class="svelte-19us5hk">`;
  Search($$payload, { style: "color:#5B278480" });
  $$payload.out += `<!----></button></div> `;
  if (searchResults.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(searchResults);
    $$payload.out += `<ul class="w-full h-fit absolute top-[60px] z-50 overflow-auto p-3 flex flex-col gap-4 bg-background border-2 border-color rounded-[14px]"><!--[-->`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const result = each_array[$$index];
      $$payload.out += `<li class="whitespace-nowrap"><button type="button" tabindex="0">${escape_html(result.display_name)}</button></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Map($$payload, $$props) {
  push();
  var $$store_subs;
  let events = writable([]);
  let selectedEvent;
  let eventDetailsModalOpen = false;
  let mapCenter = [50, 20];
  let map;
  function openEventDetailsModal() {
    eventDetailsModalOpen = true;
  }
  function extractEventLocation(event) {
    return [event.location[1], event.location[0]];
  }
  function selectEvent(event) {
    selectedEvent = event;
    openEventDetailsModal();
    map.flyTo({
      center: extractEventLocation(event),
      zoom: 9
    });
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<section class="map-wrapper svelte-1e37b05">`;
    MapLibre($$payload2, {
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      class: "map",
      zoom: 1,
      center: mapCenter,
      attributionControl: false,
      zoomOnDoubleClick: true,
      get map() {
        return map;
      },
      set map($$value) {
        map = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$events", events));
        $$payload3.out += `<!--[-->`;
        for (let $$index = 0; $$index < each_array.length; $$index++) {
          const event = each_array[$$index];
          DefaultMarker($$payload3, {
            lngLat: [event.location[1], event.location[0]],
            children: ($$payload4) => {
              Popup($$payload4, {
                offset: [0, -10],
                children: ($$payload5) => {
                  $$payload5.out += `<div class="popup-wrapper svelte-1e37b05"><div class="event-name svelte-1e37b05">${escape_html(event.name)}</div> `;
                  if (event.tags.length > 0) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<div class="event-description-item svelte-1e37b05">Tags: ${escape_html(event.tags.join(", "))}</div>`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--> <div class="event-description-item svelte-1e37b05">Date: ${escape_html(event.time_start)}</div> `;
                  Button($$payload5, {
                    click: () => selectEvent(event),
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->More info`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----></div>`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
        }
        $$payload3.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    EventDetailsModal($$payload2, {
      event: selectedEvent,
      open: eventDetailsModalOpen
    });
    $$payload2.out += `<!----> <div${attr("class", `searchbox-wrapper svelte-1e37b05 ${stringify([eventDetailsModalOpen ? "shifted" : ""].filter(Boolean).join(" "))}`)}>`;
    Searchbox($$payload2);
    $$payload2.out += `<!----></div> <button class="hidden absolute right-[20px] top-[20px] lg:flex items-center justify-center w-[50px] h-[50px] border-[1px] border-color bg-background rounded-xl">`;
    if (store_get($$store_subs ??= {}, "$auth", auth).isAuthenticated) {
      $$payload2.out += "<!--[-->";
      Logout($$payload2, { style: "color:#5B2784" });
    } else {
      $$payload2.out += "<!--[!-->";
      Wallet($$payload2, { style: "color:#5B2784" });
    }
    $$payload2.out += `<!--]--></button></section>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  if (store_get($$store_subs ??= {}, "$auth", auth).isReady) {
    $$payload.out += "<!--[-->";
    Map($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BGC60XML.js.map
