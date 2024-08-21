import { k as attr, m as escape_html, z as bind_props, e as pop, n as spread_props, h as slot, p as push, o as sanitize_props } from './index2-Cg2Yee25.js';
import { I as Icon } from './Icon-7H-z9ib-.js';
import { d as default_slot } from './misc-b9uXgm3X.js';
import { M as Map_pin } from './map-pin-B3T_Mw5e.js';

function Share($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }
    ],
    [
      "path",
      { "d": "M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }
    ],
    [
      "path",
      {
        "d": "M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      }
    ],
    ["path", { "d": "M8.7 10.7l6.6 -3.4" }],
    ["path", { "d": "M8.7 13.3l6.6 3.4" }]
  ];
  Icon($$payload, spread_props([
    { type: "outline", name: "share" },
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
function EventCard($$payload, $$props) {
  push();
  let id = $$props["id"];
  let name = $$props["name"];
  let date = $$props["date"];
  let address = $$props["address"];
  let ticketsAmount = Math.floor(Math.random() * 40);
  let description = "ICP: Roadmap for Devs is an event that guides developers through building on the Internet Computer Protocol (ICP). It features expert speakers, hands-on workshops, and networking opportunities, providing essential insights and tools for effective ICP development.";
  const getStreetAndNumber = () => {
    let fullAddressArr = address.split(",");
    return fullAddressArr[2] + ", " + fullAddressArr[1];
  };
  const formatDate = (isoString) => {
    const date2 = new Date(isoString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    };
    const formattedDate = date2.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const getThumbnail = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    return "/eventCardImg" + String(randomNumber + 1) + ".png";
  };
  let thumbnail = getThumbnail();
  $$payload.out += `<article class="w-full lg:w-[24%] h-fit bg-primary flex flex-col rounded-xl shadow-xl cursor-pointer"><img class="w-full object-cover"${attr("src", thumbnail)} alt="chuj"> <div class="p-3"><div class="flex items-center justify-between"><h1 class="text-lg font-md text-background">${escape_html(name)}</h1> `;
  Share($$payload, { style: "color:#fff; opacity: 80%" });
  $$payload.out += `<!----></div> <h4 class="text-sm text-background opacity-80 mb-6">Tickets amount: ${escape_html(ticketsAmount)}</h4> <h2 class="text-background font-md mb-2">${escape_html(formatDate(date))}</h2> <p class="text-xs leading-5 text-background font-extralight mb-6">${escape_html(description)}</p> <div class="flex items-center gap-1">`;
  Map_pin($$payload, { style: "color:#fff;" });
  $$payload.out += `<!----> <h3 class="text-sm text-background">${escape_html(getStreetAndNumber())}</h3></div></div></article>`;
  bind_props($$props, { id, name, date, address });
  pop();
}

export { EventCard as E };
//# sourceMappingURL=EventCard-Bg2ecnNm.js.map
