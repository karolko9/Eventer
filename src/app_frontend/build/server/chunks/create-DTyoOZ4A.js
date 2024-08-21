import { n as spread_props, h as slot, o as sanitize_props } from './index2-Cg2Yee25.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { d as default_slot } from './misc-b9uXgm3X.js';
import { d as derived, r as readable, w as writable, a as readonly, g as get } from './index-DfWoi3jB.js';
import { o as onDestroy, t as tick } from './index-server-VuI1VAtu.js';

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let nanoid = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id
};

function Map_search($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5" }
    ],
    ["path", { "d": "M9 4v13" }],
    ["path", { "d": "M15 7v5" }],
    [
      "path",
      {
        "d": "M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      }
    ],
    ["path", { "d": "M20.2 20.2l1.8 1.8" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "map-search" },
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
function X($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 6l-12 12" }],
    ["path", { "d": "M6 6l12 12" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "x" },
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
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
function getElementByMeltId(id) {
  if (!isBrowser)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        }));
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction(removeUndefined({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      })));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute2 = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector2 = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector2(part));
  return {
    name: name2,
    attribute: attribute2,
    selector: selector2,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
function isElement(element) {
  return element instanceof Element;
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isHTMLInputElement(element) {
  return element instanceof HTMLInputElement;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function withGet(store) {
  return {
    ...store,
    get: () => get(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get2 = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get2());
      }));
    });
    subscriber(get2());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get: get2,
    subscribe
  };
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
function debounce(fn, wait = 500) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    const later = () => fn(...args);
    timeout = setTimeout(later, wait);
  };
  debounced.destroy = () => clearTimeout(timeout);
  return debounced;
}
function effect(stores, fn, opts = {}) {
  const { skipFirstRun } = opts;
  let isFirstRun = true;
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    if (isFirstRun && skipFirstRun) {
      isFirstRun = false;
    } else {
      cb = fn(stores2);
    }
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0),
  type: readable(void 0),
  checked: void 0
});
const layers = /* @__PURE__ */ new Set();
const useInteractOutside = (node, config = {}) => {
  let unsubEvents = noop;
  let unsubPointerDown = noop;
  let unsubPointerUp = noop;
  let unsubResetInterceptedEvents = noop;
  layers.add(node);
  const documentObj = getOwnerDocument(node);
  let isPointerDown = false;
  let isPointerDownInside = false;
  const interceptedEvents = {
    pointerdown: false,
    pointerup: false,
    mousedown: false,
    mouseup: false,
    touchstart: false,
    touchend: false,
    click: false
  };
  const resetInterceptedEvents = () => {
    for (const eventType in interceptedEvents) {
      interceptedEvents[eventType] = false;
    }
  };
  const isAnyEventIntercepted = () => {
    for (const isIntercepted of Object.values(interceptedEvents)) {
      if (isIntercepted)
        return true;
    }
    return false;
  };
  const setupCapturePhaseHandlerAndMarkAsIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = true;
      handler?.(e);
    }, true);
  };
  const setupBubblePhaseHandlerAndMarkAsNotIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = false;
      handler?.(e);
    });
  };
  function update(config2) {
    unsubEvents();
    unsubPointerDown();
    unsubPointerUp();
    unsubResetInterceptedEvents();
    resetInterceptedEvents();
    const { onInteractOutside, onInteractOutsideStart, enabled } = { enabled: true, ...config2 };
    if (!enabled)
      return;
    let wasTopLayerInPointerDownCapture = false;
    const onPointerDownDebounced = debounce((e) => {
      if (!wasTopLayerInPointerDownCapture || isAnyEventIntercepted())
        return;
      if (onInteractOutside && isValidEvent(e, node))
        onInteractOutsideStart?.(e);
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }, 10);
    unsubPointerDown = onPointerDownDebounced.destroy;
    const onPointerUpDebounced = debounce((e) => {
      if (wasTopLayerInPointerDownCapture && !isAnyEventIntercepted() && shouldTriggerInteractOutside(e)) {
        onInteractOutside?.(e);
      }
      resetPointerState();
    }, 10);
    unsubPointerUp = onPointerUpDebounced.destroy;
    const resetInterceptedEventsDebounced = debounce(resetInterceptedEvents, 20);
    unsubResetInterceptedEvents = resetInterceptedEventsDebounced.destroy;
    const markTopLayerInPointerDown = () => {
      wasTopLayerInPointerDownCapture = isHighestLayer(node);
    };
    unsubEvents = executeCallbacks(
      /** Capture Events For Interaction Start */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerdown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mousedown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchstart", markTopLayerInPointerDown),
      /**
       * Intercepted events are reset only at the end of an interaction, allowing
       * interception at the start while still capturing the entire interaction.
       * Additionally, intercepted events are reset in the capture phase with `resetInterceptedEventsDebounced`,
       * accommodating events not invoked in the bubbling phase due to user interception.
       */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mouseup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchend", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("click", resetInterceptedEventsDebounced),
      /** Bubbling Events For Interaction Start */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerdown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mousedown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchstart", onPointerDownDebounced),
      /**
       * To effectively detect an end of an interaction, we must monitor all relevant events,
       * not just `click` events. This is because on touch devices, actions like pressing,
       * moving the finger, and lifting it off the screen may not trigger a `click` event,
       * but should still invoke `onPointerUp` to properly handle the interaction.
       */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mouseup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchend", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("click", onPointerUpDebounced)
    );
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsubEvents();
      unsubPointerDown();
      unsubPointerUp();
      unsubResetInterceptedEvents();
      layers.delete(node);
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isHighestLayer(node) {
  return Array.from(layers).at(-1) === node;
}
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  escapeBehavior: "close",
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
function focusInput(id, pos = "default") {
  const inputEl = getElementByMeltId(id);
  if (!isHTMLInputElement(inputEl))
    return;
  inputEl.focus();
  if (pos === "start") {
    inputEl.setSelectionRange(0, 0);
  } else if (pos === "end") {
    inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
  }
}
function setSelectedFromEl(el, selected) {
  if (!el) {
    selected.set(null);
    return;
  }
  selected.set({
    id: el.getAttribute("data-tag-id") ?? "",
    value: el.getAttribute("data-tag-value") ?? ""
  });
}
function highlightText(query) {
  const el = document.querySelector(query);
  if (!isHTMLElement(el))
    return;
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
const defaults = {
  placeholder: "",
  disabled: false,
  editable: true,
  defaultTags: [],
  unique: false,
  trim: true,
  blur: "nothing",
  addOnPaste: false,
  maxTags: void 0,
  allowed: [],
  denied: [],
  add: void 0,
  remove: void 0,
  update: void 0
};
const { name, attribute, selector } = createElHelpers("tags-input");
function createTagsInput(props) {
  const withDefaults = { ...defaults, ...props };
  const meltIds = generateIds(["root", "input"]);
  const options = toWritableStores(omit(withDefaults, "tags"));
  const { placeholder, disabled, editable, unique, trim, blur, addOnPaste, allowed, denied, add, remove, update, maxTags } = options;
  const inputValue = writable("");
  const inputInvalid = writable(false);
  const editValue = writable("");
  const tagsWritable = withDefaults.tags ?? writable(
    withDefaults.defaultTags && withDefaults.defaultTags.length > 0 ? typeof withDefaults.defaultTags[0] === "string" ? withDefaults.defaultTags.map((tag2) => ({ id: generateId(), value: tag2 })) : withDefaults.defaultTags : []
    // if undefined)
  );
  const tags = overridable(tagsWritable, withDefaults?.onTagsChange);
  const selected = withGet.writable(withDefaults.selected ?? null);
  const editing = withGet.writable(null);
  const isInputValid = (v) => {
    const $tags = tags.get();
    const $editing = editing.get();
    const $allowed = allowed.get();
    const $denied = denied.get();
    const $maxTags = maxTags.get();
    if (trim.get())
      v = v.trim();
    if (unique.get() && $editing?.value !== v) {
      const index = $tags.findIndex((tag2) => tag2.value === v);
      if (index >= 0)
        return false;
    }
    if ($allowed && $allowed.length > 0 && !$allowed.includes(v))
      return false;
    if ($denied && $denied.length > 0 && $denied.includes(v))
      return false;
    if ($maxTags && $maxTags > 0 && $tags.length >= $maxTags)
      return false;
    return true;
  };
  const addTag = async (v) => {
    const $add = add.get();
    let workingTag = { id: "", value: v };
    if ($add) {
      try {
        const res = await $add(v);
        if (typeof res === "string")
          workingTag.value = res;
        else
          workingTag = res;
        if (!workingTag.id)
          workingTag.id = generateId();
      } catch {
        return false;
      }
    } else {
      workingTag.id = generateId();
    }
    if (trim.get())
      workingTag.value = workingTag.value.trim();
    if (!isInputValid(workingTag.value))
      return false;
    tags.update((current) => {
      current.push(workingTag);
      return current;
    });
    return true;
  };
  async function updateTag(tag2, select = false) {
    const $update = update.get();
    const oldId = tag2.id;
    let workingTag = tag2;
    if ($update) {
      try {
        const res = await $update(workingTag);
        workingTag = res;
        if (!workingTag.id)
          workingTag.id = generateId();
      } catch {
        return false;
      }
    }
    if (trim.get())
      workingTag.value = workingTag.value.trim();
    if (!isInputValid(workingTag.value))
      return false;
    tags.update(($tags) => {
      return $tags.map((t) => {
        if (t.id === oldId) {
          return workingTag;
        }
        return t;
      });
    });
    if (select)
      selected.set(workingTag);
    return true;
  }
  async function removeTag(t) {
    const $remove = remove.get();
    if ($remove) {
      try {
        if (!await $remove(t))
          return false;
      } catch {
        return false;
      }
    }
    const $tags = tags.get();
    const index = $tags.findIndex((tag2) => tag2.id === t.id);
    tags.update((t2) => {
      t2.splice(index, 1);
      return t2;
    });
    return true;
  }
  const isEditing = derived([editable, editing], ([$editable, $editing]) => {
    return (tag2) => $editable && $editing?.id === tag2.id;
  });
  const root = makeElement(name(""), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "data-melt-id": meltIds.root,
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled)
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "mousedown", (e) => {
        const target = e.target;
        if (!isHTMLElement(target))
          return;
        if (target.hasAttribute(attribute())) {
          e.preventDefault();
          focusInput(meltIds.input);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const input = makeElement(name("input"), {
    stores: [disabled, placeholder],
    returned: ([$disabled, $placeholder]) => {
      return {
        "data-melt-id": meltIds.input,
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        placeholder: $placeholder
      };
    },
    action: (node) => {
      const getTagsInfo = (id) => {
        const rootEl = getElementByMeltId(meltIds.root);
        let tagsEl = [];
        let selectedIndex = -1;
        let prevIndex = -1;
        let nextIndex = -1;
        if (rootEl) {
          tagsEl = Array.from(rootEl.querySelectorAll(selector("tag")));
          selectedIndex = tagsEl.findIndex((element) => element.getAttribute("data-tag-id") === id);
          prevIndex = selectedIndex - 1;
          nextIndex = selectedIndex + 1;
        }
        return {
          tagsEl,
          selectedIndex,
          prevIndex,
          nextIndex
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "focus", () => {
        const rootEl = getElementByMeltId(meltIds.root);
        if (rootEl)
          rootEl.setAttribute("data-focus", "");
        node.setAttribute("data-focus", "");
      }), addMeltEventListener(node, "blur", async () => {
        const rootEl = getElementByMeltId(meltIds.root);
        if (rootEl)
          rootEl.removeAttribute("data-focus");
        node.removeAttribute("data-focus");
        selected.set(null);
        const value = node.value;
        if (!value)
          return;
        const $blur = blur.get();
        if ($blur === "clear") {
          node.value = "";
        } else if ($blur === "add") {
          if (isInputValid(value) && await addTag(value)) {
            node.value = "";
            inputValue.set("");
          } else {
            inputInvalid.set(true);
          }
        }
      }), addMeltEventListener(node, "paste", async (e) => {
        const pastedText = e.clipboardData?.getData("text");
        if (!pastedText)
          return;
        if (!addOnPaste.get())
          return;
        e.preventDefault();
        const newTags = pastedText.split(",");
        addTag: for (let i = 0; i < newTags.length; i++) {
          const newTag = newTags[i];
          if (isInputValid(newTag) && await addTag(newTag)) {
            continue addTag;
          } else {
            node.value = newTags.slice(i).join(",");
            inputInvalid.set(true);
            return;
          }
        }
      }), addMeltEventListener(node, "keydown", async (e) => {
        const $selected = selected.get();
        if ($selected) {
          if (e.key.length === 1) {
            selected.set(null);
          } else if (e.key === kbd.ARROW_LEFT) {
            e.preventDefault();
            const { tagsEl, prevIndex } = getTagsInfo($selected.id);
            if (prevIndex >= 0) {
              setSelectedFromEl(tagsEl[prevIndex], selected);
            }
          } else if (e.key === kbd.ARROW_RIGHT) {
            e.preventDefault();
            const { tagsEl, nextIndex } = getTagsInfo($selected.id);
            if (nextIndex === -1 || nextIndex >= tagsEl.length) {
              selected.set(null);
              focusInput(meltIds.input, "start");
            } else {
              setSelectedFromEl(tagsEl[nextIndex], selected);
            }
          } else if (e.key === kbd.HOME) {
            e.preventDefault();
            const { tagsEl } = getTagsInfo($selected.id);
            if (tagsEl.length > 0)
              setSelectedFromEl(tagsEl[0], selected);
          } else if (e.key === kbd.END) {
            e.preventDefault();
            selected.set(null);
            focusInput(meltIds.input);
          } else if (e.key === kbd.DELETE) {
            e.preventDefault();
            const prevSelected = $selected;
            const { tagsEl, nextIndex } = getTagsInfo($selected.id);
            if (nextIndex === -1 || nextIndex >= tagsEl.length) {
              selected.set(null);
              focusInput(meltIds.input);
            } else {
              setSelectedFromEl(tagsEl[nextIndex], selected);
            }
            if (!await removeTag(prevSelected))
              selected.set(prevSelected);
          } else if (e.key === kbd.BACKSPACE) {
            e.preventDefault();
            const prevSelected = $selected;
            const { tagsEl, nextIndex, prevIndex } = getTagsInfo($selected.id);
            if (prevIndex >= 0) {
              setSelectedFromEl(tagsEl[prevIndex], selected);
            } else {
              if (nextIndex === -1 || nextIndex >= tagsEl.length) {
                selected.set(null);
                focusInput(meltIds.input, "start");
              } else {
                setSelectedFromEl(tagsEl[nextIndex], selected);
              }
            }
            if (!await removeTag(prevSelected))
              selected.set(prevSelected);
          } else if (e.key === kbd.ENTER) {
            e.preventDefault();
            const editEl = document.querySelector(selector("edit") + `[data-tag-id="${$selected.id}"]`);
            if (!editEl)
              return;
            editing.set({ id: $selected.id, value: $selected.value });
            editEl.textContent = $selected.value;
            await tick();
            highlightText(selector("edit") + `[data-tag-id="${$selected.id}"]`);
          }
        } else {
          if (e.key === kbd.ENTER) {
            e.preventDefault();
            const value = node.value;
            if (!value)
              return;
            if (isInputValid(value) && await addTag(value)) {
              node.value = "";
              inputValue.set("");
            } else {
              inputInvalid.set(true);
            }
          } else if (node.selectionStart === 0 && node.selectionEnd === 0 && (e.key === kbd.ARROW_LEFT || e.key === kbd.BACKSPACE)) {
            e.preventDefault();
            const { tagsEl } = getTagsInfo("");
            const lastTag = tagsEl.at(-1);
            if (!lastTag)
              return;
            setSelectedFromEl(lastTag, selected);
          }
        }
      }), addMeltEventListener(node, "input", () => {
        inputValue.set(node.value);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const tag = makeElement(name("tag"), {
    stores: [selected, editing, disabled, editable],
    returned: ([$selected, $editing, $disabled, $editable]) => {
      return (tag2) => {
        const disabled2 = $disabled || tag2.disabled;
        const editable2 = $editable && tag2.editable !== false;
        const selected2 = disabled2 ? void 0 : $selected?.id === tag2?.id;
        const editing2 = editable2 ? $editing?.id === tag2?.id : void 0;
        return {
          "aria-hidden": editing2,
          "aria-selected": selected2,
          "data-tag-id": tag2.id,
          "data-tag-value": tag2.value,
          "data-selected": selected2 ? "" : void 0,
          "data-editable": editable2 ? "" : void 0,
          "data-editing": editing2 ? "" : void 0,
          "data-disabled": disabledAttr(disabled2),
          disabled: disabledAttr(disabled2),
          hidden: editing2,
          tabindex: -1,
          style: editing2 ? styleToString({
            position: "absolute",
            opacity: 0,
            "pointer-events": "none",
            margin: 0
          }) : void 0
        };
      };
    },
    action: (node) => {
      const getElProps = () => {
        const id = node.getAttribute("data-tag-id") ?? "";
        return {
          id
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "mousedown", (e) => {
        const $editing = editing.get();
        if ($editing && $editing.id !== getElProps().id)
          return;
        focusInput(meltIds.input);
        e.preventDefault();
        setSelectedFromEl(node, selected);
        editing.set(null);
      }), addMeltEventListener(node, "click", (e) => {
        const $editing = editing.get();
        if ($editing && $editing.id === getElProps().id)
          return;
        focusInput(meltIds.input);
        e.preventDefault();
        setSelectedFromEl(node, selected);
        editing.set(null);
      }), addMeltEventListener(node, "dblclick", async () => {
        if (!isBrowser)
          return;
        if (!node.hasAttribute("data-editable"))
          return;
        const editEl = document.querySelector(selector("edit") + `[data-tag-id="${getElProps().id}"]`);
        if (!editEl)
          return;
        const value = node.getAttribute("data-tag-value") ?? "";
        editing.set({
          id: node.getAttribute("data-tag-id") ?? "",
          value
        });
        editEl.textContent = value;
        await tick();
        highlightText(selector("edit") + `[data-tag-id="${getElProps().id}"]`);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const deleteTrigger = makeElement(name("delete-trigger"), {
    stores: [selected, editing, disabled, editable],
    returned: ([$selected, $editing, $disabled, $editable]) => {
      return (tag2) => {
        const disabled2 = $disabled || tag2.disabled;
        const editable2 = $editable && tag2.editable !== false;
        const selected2 = disabled2 ? void 0 : $selected?.id === tag2?.id;
        const editing2 = editable2 ? $editing?.id === tag2?.id : void 0;
        return {
          "aria-selected": selected2,
          "data-tag-id": tag2.id,
          "data-tag-value": tag2.value,
          "data-selected": selected2 ? "" : void 0,
          "data-editing": editing2 ? "" : void 0,
          "data-disabled": disabledAttr(disabled2),
          disabled: disabledAttr(disabled2),
          tabindex: -1
        };
      };
    },
    action: (node) => {
      function handleDelete() {
        if (node.hasAttribute("data-disabled"))
          return;
        const value = node.getAttribute("data-tag-value") ?? "";
        const id = node.getAttribute("data-tag-id") ?? "";
        removeTag({ id, value });
        focusInput(meltIds.input);
      }
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        e.stopPropagation();
        handleDelete();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleDelete();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const edit = makeElement(name("edit"), {
    stores: isEditing,
    returned: ($isEditing) => {
      return (tag2) => {
        const editing2 = $isEditing(tag2);
        return {
          "aria-hidden": !editing2,
          "data-tag-id": tag2.id,
          "data-tag-value": tag2.value,
          hidden: !editing2 ? true : void 0,
          contenteditable: editing2,
          tabindex: -1,
          style: !editing2 ? styleToString({
            position: "absolute",
            opacity: 0,
            "pointer-events": "none",
            margin: 0
          }) : void 0
        };
      };
    },
    action: (node) => {
      const getElProps = () => {
        const id = node.getAttribute("data-tag-id") ?? "";
        const value = node.getAttribute("data-tag-value") ?? "";
        return {
          id,
          value
        };
      };
      let unsubInteractOutside = noop;
      let unsubEvents = noop;
      const unsubDerived = effect(isEditing, ($isEditing) => {
        unsubInteractOutside();
        unsubEvents();
        if (!$isEditing(getElProps()))
          return;
        unsubInteractOutside = useInteractOutside(node).destroy;
        unsubEvents = executeCallbacks(addMeltEventListener(node, "blur", () => {
          editing.set(null);
          node.textContent = getElProps().value;
          getElementByMeltId(meltIds.root)?.removeAttribute("data-invalid-edit");
          node.removeAttribute("data-invalid-edit");
        }), addMeltEventListener(node, "keydown", async (e) => {
          if (e.key === kbd.ENTER) {
            e.preventDefault();
            const value = node.textContent;
            if (!value)
              return;
            const t = { id: getElProps().id, value };
            if (isInputValid(value) && await updateTag(t, true)) {
              node.textContent = t.value;
              editValue.set("");
              focusInput(meltIds.input);
            } else {
              getElementByMeltId(meltIds.root)?.setAttribute("data-invalid-edit", "");
              node.setAttribute("data-invalid-edit", "");
            }
          } else if (e.key === kbd.ESCAPE) {
            e.preventDefault();
            e.stopImmediatePropagation();
            node.textContent = getElProps().value;
            editValue.set("");
            setSelectedFromEl(node, selected);
            focusInput(meltIds.input);
          }
        }), addMeltEventListener(node, "input", () => {
          editValue.set(node.textContent || "");
        }));
      });
      return {
        destroy() {
          unsubInteractOutside();
          unsubEvents();
          unsubDerived();
        }
      };
    }
  });
  const isSelected = derived(selected, ($selected) => {
    return (tag2) => $selected?.id === tag2.id;
  });
  effect(inputValue, () => {
    inputInvalid.set(false);
  });
  effect(inputInvalid, ($inputInvalid) => {
    if ($inputInvalid) {
      getElementByMeltId(meltIds.root)?.setAttribute("data-invalid", "");
      getElementByMeltId(meltIds.input)?.setAttribute("data-invalid", "");
    } else {
      getElementByMeltId(meltIds.root)?.removeAttribute("data-invalid");
      getElementByMeltId(meltIds.input)?.removeAttribute("data-invalid");
    }
  });
  effect(editValue, () => {
    if (!isBrowser)
      return;
    getElementByMeltId(meltIds.root)?.removeAttribute("data-invalid-edit");
    const invalidEl = Array.from(document.querySelectorAll(selector("edit") + "[data-invalid-edit]"));
    invalidEl.forEach((e) => {
      e.removeAttribute("data-invalid-edit");
    });
  });
  return {
    ids: meltIds,
    elements: {
      root,
      input,
      deleteTrigger,
      edit,
      tag
    },
    states: {
      tags,
      inputValue: readonly(inputValue),
      inputInvalid: readonly(inputInvalid),
      selected: readonly(selected)
    },
    helpers: {
      isSelected,
      isEditing,
      isInputValid,
      addTag,
      updateTag,
      removeTag
    },
    options
  };
}

export { Map_search as M, X, overridable as a, createElHelpers as b, createTagsInput as c, makeElement as m, omit as o, toWritableStores as t };
//# sourceMappingURL=create-DTyoOZ4A.js.map
