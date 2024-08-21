import { k as attr, m as escape_html, j as ensure_array_like, e as pop, p as push } from './index2-Cg2Yee25.js';
import './auth-BUerAMzR.js';
import 'maplibre-gl';
import { M as MapLibre } from './index-DjvulMxb.js';
import { M as MapEvents } from './MapEvents-B-Wb19xI.js';
import '@dfinity/agent';
import '@dfinity/auth-client';
import './index-DfWoi3jB.js';
import './index-server-VuI1VAtu.js';
import './misc-b9uXgm3X.js';

function _page($$payload, $$props) {
  push();
  let eventName = "";
  let eventTags = "";
  let eventStartTime = "";
  let eventEndTime = "";
  let creationStatus = "";
  let validationErrors = {};
  let searchQuery = "";
  let mapCenter = [50, 20];
  let searchResults = [];
  $$payload.out += `<div><h1>Create New Event</h1> <div><label for="eventName">Event Name:</label> <input type="text" id="eventName"${attr("value", eventName)}> `;
  if (validationErrors.eventName) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="error svelte-1rk6kvq">${escape_html(validationErrors.eventName)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div><label for="eventTags">Event Tags (blank-space-separated):</label> <input type="text" id="eventTags"${attr("value", eventTags)}></div> <div><label for="eventStartTime">Start Time:</label> <input type="datetime-local" id="eventStartTime"${attr("value", eventStartTime)}> `;
  if (validationErrors.eventStartTime) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="error svelte-1rk6kvq">${escape_html(validationErrors.eventStartTime)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div><label for="eventEndTime">End Time:</label> <input type="datetime-local" id="eventEndTime"${attr("value", eventEndTime)}> `;
  if (validationErrors.eventEndTime) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="error svelte-1rk6kvq">${escape_html(validationErrors.eventEndTime)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <section class="map-wrapper svelte-1rk6kvq">`;
  MapLibre($$payload, {
    center: mapCenter,
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
  $$payload.out += `<!----></section> <button type="button" id="createEventButton">Create Event</button> <p id="creationStatus">${escape_html(creationStatus)}</p> <div><label for="searchQuery">Search Location:</label> <input type="text" id="searchQuery"${attr("value", searchQuery)} placeholder="Search for a location"> <button type="button">Search</button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (searchResults.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(searchResults);
    $$payload.out += `<div class="search-results svelte-1rk6kvq"><h2>Search Results:</h2> <ul class="svelte-1rk6kvq"><!--[-->`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const result = each_array[$$index];
      $$payload.out += `<li class="svelte-1rk6kvq"><button type="button" tabindex="0" class="svelte-1rk6kvq"><strong>${escape_html(result.display_name)}</strong><br></button></li>`;
    }
    $$payload.out += `<!--]--></ul></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CruOMIqU.js.map
