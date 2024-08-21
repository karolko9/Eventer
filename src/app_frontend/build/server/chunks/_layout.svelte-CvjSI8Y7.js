import { k as attr, h as slot, l as stringify } from './index2-Cg2Yee25.js';
import { I as Info_circle } from './info-circle-HsxfpMUg.js';
import { d as default_slot } from './misc-b9uXgm3X.js';
import './Icon-7H-z9ib-.js';

function _layout($$payload, $$props) {
  $$payload.out += `<header class="p-4 flex items-center justify-between"><h1 class="text-2xl font-semibold text-primary">Your Events</h1> `;
  Info_circle($$payload, {
    style: "color: #5B2784; width:30px; height:30px;"
  });
  $$payload.out += `<!----></header> <div class="w-fit ml-4 flex bg-primary border border-2 border-primary rounded-md"><a href="/my-events/attendee"${attr("class", `w-[100px] text-center p-2 text-md ${stringify("text-primary font-medium bg-background")} rounded-md`)}>Attendee</a> <a href="/my-events/host"${attr("class", `w-[100px] text-center p-2 text-md ${stringify("text-background bg-primary")} rounded-md`)}>Host</a></div> <!---->`;
  slot($$payload, default_slot($$props), {});
  $$payload.out += `<!---->`;
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CvjSI8Y7.js.map
