import { j as ensure_array_like, e as pop, p as push } from './index2-Cg2Yee25.js';
import './client-BUusD8wq.js';
import './auth-BUerAMzR.js';
import { E as EventCard } from './EventCard-Bg2ecnNm.js';
import { I as Info_circle } from './info-circle-HsxfpMUg.js';
import './exports-BGi7-Rnc.js';
import '@dfinity/agent';
import '@dfinity/auth-client';
import './index-DfWoi3jB.js';
import './Icon-7H-z9ib-.js';
import './misc-b9uXgm3X.js';
import './map-pin-B3T_Mw5e.js';

function _page($$payload, $$props) {
  push();
  let events = [];
  $$payload.out += `<header class="p-4 flex items-center justify-between"><h1 class="text-2xl font-semibold text-primary">Events</h1> `;
  Info_circle($$payload, {
    style: "color: #5B2784; width:30px; height:30px;"
  });
  $$payload.out += `<!----></header> <section class="w-full h-mobile lg:h-desktop m-auto p-4 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap gap-4">`;
  if (events.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(events);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const event = each_array[$$index];
      EventCard($$payload, {
        id: event.id,
        name: event.name,
        date: event.time_start,
        address: event.address
      });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BplR3ZTU.js.map
