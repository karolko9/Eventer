import { h as slot, j as ensure_array_like, k as attr, l as stringify, m as escape_html, n as spread_props, o as sanitize_props } from './index2-Cg2Yee25.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { d as default_slot } from './misc-b9uXgm3X.js';

function Calendar_check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6"
      }
    ],
    ["path", { "d": "M16 3v4" }],
    ["path", { "d": "M8 3v4" }],
    ["path", { "d": "M4 11h16" }],
    ["path", { "d": "M15 19l2 2l4 -4" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "calendar-check" },
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
function Circle_plus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" }
    ],
    ["path", { "d": "M9 12h6" }],
    ["path", { "d": "M12 9v6" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "circle-plus" },
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
function Map($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13"
      }
    ],
    ["path", { "d": "M9 4v13" }],
    ["path", { "d": "M15 7v13" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "map" },
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
function Settings($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
      }
    ],
    [
      "path",
      { "d": "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "settings" },
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
function User($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" }
    ],
    [
      "path",
      {
        "d": "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "user" },
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
function Menu($$payload) {
  const iconMapping = {
    "map": Map,
    "events": Calendar_check,
    "plus": Circle_plus,
    "user": User,
    "settings": Settings
  };
  const menuItems = [
    {
      href: "/",
      label: "Events Map",
      icon: "map",
      hideOnMobile: false
    },
    {
      href: "/my-events/attendee",
      label: "My Events",
      icon: "events",
      hideOnMobile: false
    },
    {
      href: "/create-event",
      label: "Create Event",
      icon: "plus",
      hideOnMobile: false
    },
    {
      href: "/profile",
      label: "Profile",
      icon: "user",
      hideOnMobile: true
    }
    // { href: "/settings", label: "Settings", icon:"settings", hideOnMobile: true }
  ];
  const getIconComponent = (iconName) => {
    return iconMapping[iconName] || null;
  };
  const each_array = ensure_array_like(menuItems);
  $$payload.out += `<nav class="svelte-o8823"><ul class="border-t-2 lg:border-r-2 border-gray-200 border-solid svelte-o8823"><!--[-->`;
  for (let index = 0; index < each_array.length; index++) {
    const item = each_array[index];
    $$payload.out += `<li${attr("class", `${stringify(item.hideOnMobile)} svelte-o8823`)}><a${attr("href", item.href)} class="svelte-o8823">`;
    if (getIconComponent(item.icon)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      getIconComponent(item.icon)?.($$payload, {
        style: "color: #5B2784; width:30px; height:30px;"
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <p class="svelte-o8823">${escape_html(item.label)}</p></a></li>`;
  }
  $$payload.out += `<!--]--></ul></nav>`;
}
function _layout($$payload, $$props) {
  $$payload.out += `<div class="fixed inset-0 flex flex-col-reverse lg:flex-row">`;
  Menu($$payload);
  $$payload.out += `<!----> <main class="flex-1 h-full"><!---->`;
  slot($$payload, default_slot($$props), {});
  $$payload.out += `<!----></main></div>`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DP4kTIsB.js.map
