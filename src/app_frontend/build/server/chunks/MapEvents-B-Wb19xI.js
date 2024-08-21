import { p as push, x as fallback, q as store_get, u as unsubscribe_stores, z as bind_props, e as pop } from './index2-Cg2Yee25.js';
import { o as onDestroy, c as createEventDispatcher } from './index-server-VuI1VAtu.js';
import { m as mapContext } from './index-DjvulMxb.js';
import 'maplibre-gl';

function MapEvents($$payload, $$props) {
  push();
  var $$store_subs;
  const dispatch = createEventDispatcher();
  let layer = fallback($$props["layer"], () => void 0, true);
  const { map } = mapContext();
  function sendEvent(e) {
    dispatch(
      // @ts-expect-error
      e.type,
      { ...e, map }
    );
  }
  const layerEvents = [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mousemove",
    "mouseenter",
    "mouseleave",
    "contextmenu",
    "mouseover",
    "mouseout"
  ];
  const mapEvents = [
    "click",
    "dblclick",
    "contextmenu",
    "mousemove",
    "movestart",
    "moveend",
    "zoomstart",
    "zoom",
    "zoomend"
  ];
  onDestroy(() => {
    if (store_get($$store_subs ??= {}, "$map", map)) {
      if (layer) {
        for (const eventName of layerEvents) {
          store_get($$store_subs ??= {}, "$map", map).off(eventName, layer, sendEvent);
        }
      } else {
        for (const eventName of mapEvents) {
          store_get($$store_subs ??= {}, "$map", map).off(eventName, sendEvent);
        }
      }
    }
  });
  if (store_get($$store_subs ??= {}, "$map", map)) {
    if (layer) {
      for (const eventName of layerEvents) {
        store_get($$store_subs ??= {}, "$map", map).on(eventName, layer, sendEvent);
      }
    } else {
      for (const eventName of mapEvents) {
        store_get($$store_subs ??= {}, "$map", map).on(eventName, sendEvent);
      }
    }
  }
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { layer });
  pop();
}

export { MapEvents as M };
//# sourceMappingURL=MapEvents-B-Wb19xI.js.map
