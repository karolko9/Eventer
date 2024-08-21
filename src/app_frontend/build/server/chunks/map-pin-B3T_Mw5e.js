import { n as spread_props, h as slot, o as sanitize_props } from './index2-Cg2Yee25.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { d as default_slot } from './misc-b9uXgm3X.js';

function Map_pin($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" }
    ],
    [
      "path",
      {
        "d": "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "map-pin" },
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

export { Map_pin as M };
//# sourceMappingURL=map-pin-B3T_Mw5e.js.map
