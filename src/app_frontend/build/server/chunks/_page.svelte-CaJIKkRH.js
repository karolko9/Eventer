import { B as spread_attributes, q as store_get, k as attr, m as escape_html, u as unsubscribe_stores, e as pop, j as ensure_array_like, n as spread_props, h as slot, p as push, o as sanitize_props } from './index2-Cg2Yee25.js';
import { g as get, w as writable } from './index-DfWoi3jB.js';
import { t as toWritableStores, o as omit, a as overridable, m as makeElement, c as createTagsInput, X, M as Map_search, b as createElHelpers } from './create-DTyoOZ4A.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { d as default_slot } from './misc-b9uXgm3X.js';
import './client-BUusD8wq.js';
import 'maplibre-gl';
import { M as MapLibre } from './index-DjvulMxb.js';
import { M as MapEvents } from './MapEvents-B-Wb19xI.js';
import './auth-BUerAMzR.js';
import { I as Info_circle } from './info-circle-HsxfpMUg.js';
import './index-server-VuI1VAtu.js';
import './exports-BGi7-Rnc.js';
import '@dfinity/agent';
import '@dfinity/auth-client';

function Photo_plus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M15 8h.01" }],
    [
      "path",
      {
        "d": "M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"
      }
    ],
    [
      "path",
      {
        "d": "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"
      }
    ],
    [
      "path",
      {
        "d": "M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54"
      }
    ],
    ["path", { "d": "M16 19h6" }],
    ["path", { "d": "M19 16v6" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "photo-plus" },
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
const formProgress = writable(33);
const formStep = writable(0);
const formData = writable(
  {
    name: "",
    event_tags: [],
    description: "",
    thumbnail: "",
    location: [],
    address: "",
    date: "",
    start_hour: "",
    end_hour: ""
  }
);
const defaults = {
  defaultValue: 0,
  max: 100
};
const { name } = createElHelpers("progress");
const createProgress = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value"));
  const { max } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const root = makeElement(name(), {
    stores: [value, max],
    returned: ([$value, $max]) => {
      return {
        value: $value,
        max: $max,
        role: "meter",
        "aria-valuemin": 0,
        "aria-valuemax": $max,
        "aria-valuenow": $value,
        "data-value": $value,
        "data-state": $value === null ? "indeterminate" : $value === $max ? "complete" : "loading",
        "data-max": $max
      };
    }
  });
  return {
    elements: {
      root
    },
    states: {
      value
    },
    options
  };
};
function FormDateStep($$payload, $$props) {
  push();
  let formDataStore = get(formData);
  let tmp = formDataStore, date = tmp.date, start_hour = tmp.start_hour, end_hour = tmp.end_hour;
  $$payload.out += `<article class="w-full h-mobile flex flex-col lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md"><div class="lg:h-fit flex flex-col gap-1 mb-2"><label for="date" class="mb-1 text-md text-primary">Event date</label> <input type="date"${attr("value", date)} name="date" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="start-hour" class="mb-1 text-md text-primary">Event starts at</label> <input type="time"${attr("value", start_hour)} name="start-hour" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="end-hour" class="mb-1 text-md text-primary">Event ends at</label> <input type="time"${attr("value", end_hour)} name="end-hour" class="lg:w-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></article> <div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3"><button type="submit" class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button> <a href="#" class="lg:hidden text-center text-primary500 text-md underline">Go back</a> <button class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button></div>`;
  pop();
}
function FormDetailsStep($$payload, $$props) {
  push();
  var $$store_subs;
  let formDataStore = get(formData);
  let tmp = formDataStore, name2 = tmp.name, event_tags = tmp.event_tags, description = tmp.description, thumbnail = tmp.thumbnail;
  const {
    elements: { root, input, tag, deleteTrigger, edit },
    states: { tags }
  } = createTagsInput({
    defaultTags: event_tags,
    unique: true,
    add(tag2) {
      return { id: tag2, value: tag2 };
    },
    addOnPaste: true
  });
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$tags", tags));
  $$payload.out += `<article class="w-full h-mobile flex flex-col lg:flex-row lg:flex-wrap lg:gap-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md"><div class="lg:h-fit flex flex-col gap-1 order-1 mb-3"><label for="name" class="mb-1 text-md text-primary">Event name</label> <input${attr("value", name2)} name="name" placeholder="Enter event name" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 order-3 mb-3"><label for="description" class="mb-1 text-md text-primary">Event description</label> <textarea name="description" placeholder="Enter detailed description of your event" class="lg:w-[40vw] min-h-[200px] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500">`;
  const $$body = escape_html(description);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 order-2 mb-3"><label for="tags" class="mb-1 text-md text-primary">Event tags</label> <div class="lg:h-fit lg:w-[40vw] flex flex-col items-start justify-center gap-2 border-2 border-color rounded-md focus:border-primary"><div${spread_attributes({
    ...store_get($$store_subs ??= {}, "$root", root),
    class: "flex flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700 focus-within:ring focus-within:ring-magnum-400"
  })}><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const t = each_array[$$index];
    const __MELTUI_BUILDER_2__ = store_get($$store_subs ??= {}, "$edit", edit)(t);
    const __MELTUI_BUILDER_1__ = store_get($$store_subs ??= {}, "$deleteTrigger", deleteTrigger)(t);
    const __MELTUI_BUILDER_0__ = store_get($$store_subs ??= {}, "$tag", tag)(t);
    $$payload.out += `<div${spread_attributes({
      ...__MELTUI_BUILDER_0__,
      class: "flex items-center overflow-hidden rounded-md bg-primary300 text-background [word-break:break-word] data-[disabled]:bg-magnum-300 data-[selected]:bg-primary data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
    })}><span class="flex items-center border-r border-white/10 px-1.5">${escape_html(t.value)}</span> <button${spread_attributes({
      ...store_get($$store_subs ??= {}, "$deleteTrigger", deleteTrigger)(t),
      ...__MELTUI_BUILDER_1__,
      class: "flex h-full items-center px-1 enabled:hover:bg-primary500"
    })}>`;
    X($$payload, { class: "height:12px; width:12px" });
    $$payload.out += `<!----></button></div> <div${spread_attributes({
      ...__MELTUI_BUILDER_2__,
      class: "flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
    })}></div>`;
  }
  $$payload.out += `<!--]--> <input${spread_attributes({
    ...store_get($$store_subs ??= {}, "$input", input),
    type: "text",
    name: "tags",
    placeholder: "Enter tags...",
    class: "min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500 placeholder-primary500"
  })}></div></div></div> <div class="lg:h-fit flex flex-col gap-1 order-4 mb-3"><h3 class="mb-1 text-md text-primary">Event thumbnail</h3> `;
  if (!thumbnail) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="lg:w-[40vw] lg:min-h-[200px] p-3 flex flex-col items-center justify-center gap-2 border-2 border-color rounded-md">`;
    Photo_plus($$payload, {
      style: "height: 40px; width: 40px; color: #5B2784"
    });
    $$payload.out += `<!----> <p class="text-sm text-primary font-medium">Upload event's thumbnail</p> <input style="display:none" type="file" accept=".jpg, .jpeg, .png"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<img class="lg:w-[40vw] object-cover rounded-md"${attr("src", thumbnail)} alt="thumbnail">`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></article> <button class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function FormLocationStep($$payload, $$props) {
  push();
  get(formData);
  let searchQuery = "";
  let searchResults = [];
  $$payload.out += `<div class="relative w-full lg:h-fit flex gap-1 mb-3"><input name="name" id="searchQuery"${attr("value", searchQuery)} placeholder="Enter event location" class="w-full p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> <button class="flex items-center bg-primary px-2 py-0.5 rounded-md">`;
  Map_search($$payload, { style: "height:18px; width:18px; color:#fff;" });
  $$payload.out += `<!----></button></div> <article class="relative w-full h-mobile flex flex-col lg:border-2 lg:border-color lg:rounded-md">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (searchResults.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(searchResults);
    $$payload.out += `<ul class="w-full h-fit absolute top-[0] z-50 overflow-auto p-3 flex flex-col gap-4 bg-background border-2 lg:border-none lg:border-b-2 border-color lg:rounded-md"><!--[-->`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const result = each_array[$$index];
      $$payload.out += `<li class="whitespace-nowrap"><button type="button" tabindex="0">${escape_html(result.display_name)}</button></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  MapLibre($$payload, {
    center: [50, 20],
    zoom: 1,
    class: "map",
    standardControls: true,
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    children: ($$payload2) => {
      MapEvents($$payload2, {});
      $$payload2.out += `<!----> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></article> <div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3"><button class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Continue</button> <a href="#" class="lg:hidden text-center text-primary500 text-md underline">Go back</a> <button class="hidden lg:block w-[200px] mt-3 p-3 bg-background border-2 border-primary text-primary font-semibold self-start rounded-md">Go back</button></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const { elements: { root }, options: { max } } = createProgress({ formProgress, max: 100 });
  const formHeaders = [
    "Event details",
    "Event time",
    "Event location"
  ];
  $$payload.out += `<header class="relative p-4 flex items-center justify-between"><h1 class="text-2xl font-semibold text-primary">Create Event</h1> `;
  Info_circle($$payload, {
    style: "color: #5B2784; width:30px; height:30px;"
  });
  $$payload.out += `<!----></header> <form class="w-full h-mobile lg:h-desktop px-4 pb-4 overflow-y-hidden flex flex-col"><div${spread_attributes({
    ...store_get($$store_subs ??= {}, "$root", root),
    class: "h-6 w-full mb-3 overflow-hidden rounded-[99999px] border-2 border-color bg-background"
  })}><div class="h-full w-full bg-primary transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]"${attr("style", `transform: translateX(-${100 - 100 * (store_get($$store_subs ??= {}, "$formProgress", formProgress) ?? 0) / (store_get($$store_subs ??= {}, "$max", max) ?? 1)}%)`)}></div></div> <h2 class="mb-3 text-lg text-primary font-medium">${escape_html(formHeaders[store_get($$store_subs ??= {}, "$formStep", formStep)])}</h2> `;
  if (store_get($$store_subs ??= {}, "$formStep", formStep) === 0) {
    $$payload.out += "<!--[-->";
    FormDetailsStep($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$formStep", formStep) === 1) {
    $$payload.out += "<!--[-->";
    FormDateStep($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$formStep", formStep) === 2) {
    $$payload.out += "<!--[-->";
    FormLocationStep($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></form>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CaJIKkRH.js.map
