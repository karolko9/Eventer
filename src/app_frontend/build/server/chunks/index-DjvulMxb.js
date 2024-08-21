import { x as fallback, q as store_get, y as store_set, k as attr, l as stringify, h as slot, u as unsubscribe_stores, z as bind_props, e as pop, s as setContext, p as push, t as getContext } from './index2-Cg2Yee25.js';
import { w as writable, r as readable } from './index-DfWoi3jB.js';
import maplibregl from 'maplibre-gl';
import { o as onDestroy } from './index-server-VuI1VAtu.js';
import { d as default_slot } from './misc-b9uXgm3X.js';

var collectionCompare = compare;

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/

function compare(value1, value2) {
  if (value1 === value2) {
    return true;
  }

  /* eslint-disable no-self-compare */
  // if both values are NaNs return true
  if (value1 !== value1 && value2 !== value2) {
    return true;
  }

  if (
    typeof value1 != typeof value2 || // primitive != primitive wrapper
    {}.toString.call(value1) != {}.toString.call(value2) // check for other (maybe nullish) objects
  ) {
    return false;
  }

  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }

  if (!value1) {
    return false;
  }

  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }

  if ({}.toString.call(value1) == '[object Set]') {
    return compareArrays(Array.from(value1), Array.from(value2));
  }

  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  }

  return compareNativeSubtypes(value1, value2);
}

function compareNativeSubtypes(value1, value2) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}

function compareArrays(value1, value2) {
  var len = value1.length;

  if (len != value2.length) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      return false;
    }
  }

  return true;
}

function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1);
  var len = keys1.length;

  if (len != Object.keys(value2).length) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];

    if (!(value2.hasOwnProperty(key1) && compare(value1[key1], value2[key1]))) {
      return false;
    }
  }

  return true;
}

const MAP_CONTEXT_KEY = Symbol.for("svelte-maplibre");
function mapContext() {
  return getContext(MAP_CONTEXT_KEY);
}
function eventTopMost(layerInfo) {
  let tracker = /* @__PURE__ */ new WeakMap();
  return (event) => {
    let id = tracker.get(event.originalEvent);
    if (id !== void 0) {
      return id;
    }
    let features = event.target.queryRenderedFeatures(event.point);
    let topId = features.find((f) => layerInfo.get(f.layer.id)?.interactive)?.layer.id;
    tracker.set(event.originalEvent, topId);
    return topId;
  };
}
function createMapContext() {
  let layerInfo = /* @__PURE__ */ new Map();
  return setContext(MAP_CONTEXT_KEY, {
    map: writable(null),
    source: readable(null),
    layer: readable(null),
    popupTarget: readable(null),
    cluster: writable(),
    loadedImages: writable(/* @__PURE__ */ new Set()),
    minzoom: writable(0),
    maxzoom: writable(24),
    layerEvent: writable(null),
    layerInfo,
    eventTopMost: eventTopMost(layerInfo),
    markerClickManager: new MarkerClickManager()
  });
}
function readableFromWritable(writable2) {
  return {
    subscribe: writable2.subscribe
  };
}
function updatedContext({ key, setPopupTarget = false, setCluster = false, setMouseEvent = false }) {
  let currentContext = mapContext();
  let newValue = writable(null);
  let ctxValue = readableFromWritable(newValue);
  let newCtx = {
    ...currentContext,
    [key]: readableFromWritable(newValue)
  };
  if (setPopupTarget) {
    newCtx.popupTarget = ctxValue;
  }
  if (setMouseEvent) {
    let layerEvent = writable(null);
    newCtx.layerEvent = layerEvent;
    currentContext.layerEvent = layerEvent;
  }
  if (setCluster) {
    newCtx.cluster = writable();
  }
  setContext(MAP_CONTEXT_KEY, newCtx);
  return {
    ...currentContext,
    self: newValue
  };
}
function updatedMarkerContext() {
  return updatedContext({ key: "popupTarget", setPopupTarget: true, setMouseEvent: true });
}
function isDeckGlMouseEvent(event) {
  return "layerType" in event && event.layerType === "deckgl";
}
class MarkerClickManager {
  _handlers = /* @__PURE__ */ new Set();
  add(markerClickInfo) {
    this._handlers.add(markerClickInfo);
  }
  remove(markerClickInfo) {
    this._handlers.delete(markerClickInfo);
  }
  handleClick(event) {
    for (const handler of this._handlers) {
      handler(event);
    }
  }
}
function FullscreenControl($$payload, $$props) {
  push();
  var $$store_subs;
  const { map } = mapContext();
  let position = fallback($$props["position"], "top-left");
  let container = fallback($$props["container"], () => void 0, true);
  let control = null;
  onDestroy(() => {
    if (store_get($$store_subs ??= {}, "$map", map)?.loaded() && control) {
      store_get($$store_subs ??= {}, "$map", map).removeControl(control);
    }
  });
  if (store_get($$store_subs ??= {}, "$map", map) && !control) {
    let containerEl;
    if (typeof container === "string") {
      containerEl = document.querySelector(container) ?? void 0;
    } else {
      containerEl = container;
    }
    control = new maplibregl.FullscreenControl({ container: containerEl });
    store_get($$store_subs ??= {}, "$map", map).addControl(control, position);
  }
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { position, container });
  pop();
}
function GeolocateControl($$payload, $$props) {
  push();
  var $$store_subs;
  const { map } = mapContext();
  let position = fallback($$props["position"], "top-left");
  let positionOptions = fallback($$props["positionOptions"], () => void 0, true);
  let fitBoundsOptions = fallback($$props["fitBoundsOptions"], () => void 0, true);
  let trackUserLocation = fallback($$props["trackUserLocation"], false);
  let showAccuracyCircle = fallback($$props["showAccuracyCircle"], true);
  let showUserLocation = fallback($$props["showUserLocation"], true);
  let control = fallback($$props["control"], null);
  onDestroy(() => {
    if (store_get($$store_subs ??= {}, "$map", map)?.loaded() && control) {
      store_get($$store_subs ??= {}, "$map", map).removeControl(control);
    }
  });
  if (store_get($$store_subs ??= {}, "$map", map) && !control) {
    control = new maplibregl.GeolocateControl({
      positionOptions,
      fitBoundsOptions,
      trackUserLocation,
      showAccuracyCircle,
      showUserLocation
    });
    store_get($$store_subs ??= {}, "$map", map).addControl(control, position);
  }
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    position,
    positionOptions,
    fitBoundsOptions,
    trackUserLocation,
    showAccuracyCircle,
    showUserLocation,
    control
  });
  pop();
}
function NavigationControl($$payload, $$props) {
  push();
  var $$store_subs;
  const { map } = mapContext();
  let position = fallback($$props["position"], "top-left");
  let showCompass = fallback($$props["showCompass"], true);
  let showZoom = fallback($$props["showZoom"], true);
  let visualizePitch = fallback($$props["visualizePitch"], false);
  let control = null;
  onDestroy(() => {
    if (store_get($$store_subs ??= {}, "$map", map)?.loaded() && control) {
      store_get($$store_subs ??= {}, "$map", map).removeControl(control);
    }
  });
  if (store_get($$store_subs ??= {}, "$map", map) && !control) {
    control = new maplibregl.NavigationControl({ showCompass, showZoom, visualizePitch }), store_get($$store_subs ??= {}, "$map", map).addControl(control, position);
  }
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    position,
    showCompass,
    showZoom,
    visualizePitch
  });
  pop();
}
function ScaleControl($$payload, $$props) {
  push();
  var $$store_subs;
  const { map } = mapContext();
  let position = fallback($$props["position"], "bottom-left");
  let maxWidth = fallback($$props["maxWidth"], () => void 0, true);
  let unit = fallback($$props["unit"], "metric");
  let control = null;
  onDestroy(() => {
    if (store_get($$store_subs ??= {}, "$map", map)?.loaded() && control) {
      store_get($$store_subs ??= {}, "$map", map).removeControl(control);
    }
  });
  if (store_get($$store_subs ??= {}, "$map", map) && !control) {
    control = new maplibregl.ScaleControl({ maxWidth, unit });
    store_get($$store_subs ??= {}, "$map", map).addControl(control, position);
  }
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { position, maxWidth, unit });
  pop();
}
function MapLibre($$payload, $$props) {
  push();
  var $$store_subs;
  let standardControlsPosition, allImagesLoaded;
  let map = fallback($$props["map"], null);
  let mapContainer = fallback($$props["mapContainer"], () => void 0, true);
  let classNames = fallback($$props["class"], () => void 0, true);
  let style = $$props["style"];
  let diffStyleUpdates = fallback($$props["diffStyleUpdates"], false);
  let center = fallback($$props["center"], () => void 0, true);
  let zoom = fallback($$props["zoom"], () => void 0, true);
  let pitch = fallback($$props["pitch"], 0);
  let bearing = fallback($$props["bearing"], 0);
  let bounds = fallback($$props["bounds"], () => void 0, true);
  let hash = fallback($$props["hash"], false);
  let updateHash = fallback($$props["updateHash"], (url) => {
    window.history.replaceState(window.history.state, "", url);
  });
  let loaded = fallback($$props["loaded"], false);
  let minZoom = fallback($$props["minZoom"], 0);
  let maxZoom = fallback($$props["maxZoom"], 22);
  let antialias = fallback($$props["antialias"], () => void 0, true);
  let zoomOnDoubleClick = fallback($$props["zoomOnDoubleClick"], true);
  let locale = fallback($$props["locale"], () => void 0, true);
  let interactive = fallback($$props["interactive"], true);
  let attributionControl = fallback($$props["attributionControl"], true);
  let cooperativeGestures = fallback($$props["cooperativeGestures"], false);
  let preserveDrawingBuffer = fallback($$props["preserveDrawingBuffer"], false);
  let maxBounds = fallback($$props["maxBounds"], () => void 0, true);
  let images = fallback($$props["images"], () => [], true);
  let standardControls = fallback($$props["standardControls"], false);
  let filterLayers = fallback($$props["filterLayers"], () => void 0, true);
  let transformRequest = fallback($$props["transformRequest"], () => void 0, true);
  const { map: mapInstance, loadedImages } = createMapContext();
  let loadingImages = /* @__PURE__ */ new Set();
  async function loadImage(image, force = false) {
    if (!store_get($$store_subs ??= {}, "$mapInstance", mapInstance)) {
      return;
    }
    if (!store_get($$store_subs ??= {}, "$mapInstance", mapInstance).loaded() && !force) {
      return;
    }
    if ("url" in image) {
      loadingImages.add(image.id);
      try {
        let imageData = await store_get($$store_subs ??= {}, "$mapInstance", mapInstance).loadImage(image.url);
        store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.addImage(image.id, imageData.data, image.options);
        store_get($$store_subs ??= {}, "$loadedImages", loadedImages).add(image.id);
        store_set(loadedImages, store_get($$store_subs ??= {}, "$loadedImages", loadedImages));
      } catch (e) {
      } finally {
        loadingImages.delete(image.id);
      }
    } else {
      store_get($$store_subs ??= {}, "$mapInstance", mapInstance).addImage(image.id, image.data, image.options);
      store_get($$store_subs ??= {}, "$loadedImages", loadedImages).add(image.id);
      store_set(loadedImages, store_get($$store_subs ??= {}, "$loadedImages", loadedImages));
    }
  }
  let lastStyle = style;
  standardControlsPosition = typeof standardControls === "boolean" ? void 0 : standardControls;
  map = store_get($$store_subs ??= {}, "$mapInstance", mapInstance);
  if (store_get($$store_subs ??= {}, "$mapInstance", mapInstance) && !collectionCompare(style, lastStyle)) {
    store_get($$store_subs ??= {}, "$mapInstance", mapInstance).getStyle();
    lastStyle = style;
    store_get($$store_subs ??= {}, "$mapInstance", mapInstance).setStyle(style, { diff: diffStyleUpdates });
    store_set(loadedImages, /* @__PURE__ */ new Set());
    loadingImages = /* @__PURE__ */ new Set();
  }
  if (loaded && store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.loaded()) {
    for (let image of images) {
      if (!store_get($$store_subs ??= {}, "$loadedImages", loadedImages).has(image.id) && !loadingImages.has(image.id) && !store_get($$store_subs ??= {}, "$mapInstance", mapInstance).hasImage(image.id)) {
        loadImage(image);
      }
    }
  }
  allImagesLoaded = images.every((image) => store_get($$store_subs ??= {}, "$loadedImages", loadedImages).has(image.id));
  if (store_get($$store_subs ??= {}, "$mapInstance", mapInstance)) {
    let options = {};
    if (center != null && !collectionCompare(center, store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.getCenter())) {
      options.center = center;
    }
    if (zoom != null && !collectionCompare(zoom, store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.getZoom())) {
      options.zoom = zoom;
    }
    if (bearing != null && !collectionCompare(bearing, store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.getBearing())) {
      options.bearing = bearing;
    }
    if (pitch != null && !collectionCompare(pitch, store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.getPitch())) {
      options.pitch = pitch;
    }
    if (Object.keys(options).length) {
      store_get($$store_subs ??= {}, "$mapInstance", mapInstance).easeTo(options);
    }
  }
  if (bounds && !collectionCompare(bounds, store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.getBounds())) store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.fitBounds(bounds);
  zoomOnDoubleClick ? store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.doubleClickZoom.enable() : store_get($$store_subs ??= {}, "$mapInstance", mapInstance)?.doubleClickZoom.disable();
  $$payload.out += `<div${attr("class", `${stringify(classNames)} svelte-p00lfq ${stringify([!classNames ? "expand-map" : ""].filter(Boolean).join(" "))}`)} data-testid="map-container">`;
  if (store_get($$store_subs ??= {}, "$mapInstance", mapInstance) && loaded) {
    $$payload.out += "<!--[-->";
    if (standardControls) {
      $$payload.out += "<!--[-->";
      NavigationControl($$payload, { position: standardControlsPosition });
      $$payload.out += `<!----> `;
      GeolocateControl($$payload, {
        position: standardControlsPosition,
        fitBoundsOptions: { maxZoom: 12 }
      });
      $$payload.out += `<!----> `;
      FullscreenControl($$payload, { position: standardControlsPosition });
      $$payload.out += `<!----> `;
      ScaleControl($$payload, { position: standardControlsPosition });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <!---->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        map: store_get($$store_subs ??= {}, "$mapInstance", mapInstance),
        loadedImages: store_get($$store_subs ??= {}, "$loadedImages", loadedImages),
        allImagesLoaded
      }
    );
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    map,
    mapContainer,
    class: classNames,
    style,
    diffStyleUpdates,
    center,
    zoom,
    pitch,
    bearing,
    bounds,
    hash,
    updateHash,
    loaded,
    minZoom,
    maxZoom,
    antialias,
    zoomOnDoubleClick,
    locale,
    interactive,
    attributionControl,
    cooperativeGestures,
    preserveDrawingBuffer,
    maxBounds,
    images,
    standardControls,
    filterLayers,
    transformRequest
  });
  pop();
}

// node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
freb(fdeb, 0);
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var et = /* @__PURE__ */ new u8(0);
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}

export { MapLibre as M, isDeckGlMouseEvent as i, mapContext as m, updatedMarkerContext as u };
//# sourceMappingURL=index-DjvulMxb.js.map
