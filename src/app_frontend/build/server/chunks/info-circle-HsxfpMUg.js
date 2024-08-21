import { n as spread_props, h as slot, o as sanitize_props } from './index2-Cg2Yee25.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { d as default_slot } from './misc-b9uXgm3X.js';

function Info_circle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" }
    ],
    ["path", { "d": "M12 9h.01" }],
    ["path", { "d": "M11 12h1v4h1" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "info-circle" },
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

export { Info_circle as I };
//# sourceMappingURL=info-circle-HsxfpMUg.js.map
