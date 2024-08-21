import { E as rest_props, p as push, x as fallback, j as ensure_array_like, B as spread_attributes, F as element, h as slot, z as bind_props, e as pop, o as sanitize_props } from './index2-Cg2Yee25.js';
import { d as default_slot } from './misc-b9uXgm3X.js';

const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "type",
    "name",
    "color",
    "size",
    "stroke",
    "iconNode"
  ]);
  push();
  let type = $$props["type"];
  let name = $$props["name"];
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let stroke = fallback($$props["stroke"], 2);
  let iconNode = $$props["iconNode"];
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes[type],
      ...$$restProps,
      width: size,
      height: size,
      class: `tabler-icon tabler-icon-${name} ${$$sanitized_props.class ?? ""}`,
      ...type === "filled" ? { fill: color } : { "stroke-width": stroke, stroke: color }
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const $$item = each_array[$$index];
    const [tag, attrs] = $$item;
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, default_slot($$props), {});
  $$payload.out += `<!----></svg>`;
  bind_props($$props, { type, name, color, size, stroke, iconNode });
  pop();
}

export { Icon as I };
//# sourceMappingURL=Icon-7H-z9ib-.js.map
