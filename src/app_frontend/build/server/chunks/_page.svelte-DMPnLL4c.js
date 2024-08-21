import { j as ensure_array_like, q as store_get, k as attr, m as escape_html, B as spread_attributes, u as unsubscribe_stores, e as pop, p as push } from './index2-Cg2Yee25.js';
import { c as createTagsInput, M as Map_search, X } from './create-DTyoOZ4A.js';
import { I as Info_circle } from './info-circle-HsxfpMUg.js';
import './Icon-7H-z9ib-.js';
import './misc-b9uXgm3X.js';
import './index-DfWoi3jB.js';
import './index-server-VuI1VAtu.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let name;
  let job;
  let role;
  let bio;
  let searchQuery;
  let searchResults = [];
  const {
    elements: { root, input, tag, deleteTrigger, edit },
    states: { tags }
  } = createTagsInput({
    defaultTags: [],
    unique: true,
    add(tag2) {
      return { id: tag2, value: tag2 };
    },
    addOnPaste: true
  });
  const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$tags", tags));
  $$payload.out += `<header class="relative p-4 flex items-center justify-between"><h1 class="text-2xl font-semibold text-primary">Profile</h1> `;
  Info_circle($$payload, {
    style: "color: #5B2784; width:30px; height:30px;"
  });
  $$payload.out += `<!----></header> <form class="w-full h-mobile lg:h-desktop px-4 pb-4 overflow-y-hidden flex flex-col"><article class="w-full h-mobile flex flex-col lg:p-4 overflow-y-auto lg:p-2 lg:border-2 lg:border-color lg:rounded-md"><div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="name" class="mb-1 text-md text-primary">Name</label> <input${attr("value", name)} name="name" placeholder="Enter your city name" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="relative lg:h-fit flex flex-col gap-1 mb-3"><label for="name" class="mb-1 text-md text-primary">Location</label> <div class="lg:w-[40vw] relative lg:h-fit flex gap-1 mb-3"><input name="name" id="searchQuery"${attr("value", searchQuery)} placeholder="Enter your city of residence" class="w-full p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> <button class="flex items-center bg-primary px-2 py-0.5 rounded-md">`;
  Map_search($$payload, { style: "height:18px; width:18px; color:#fff;" });
  $$payload.out += `<!----></button></div> `;
  if (searchResults.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(searchResults);
    $$payload.out += `<ul class="w-full lg:w-[40vw] h-fit absolute top-[75px] z-50 overflow-auto p-3 flex flex-col gap-4 bg-background border-2 border-color lg:rounded-md"><!--[-->`;
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
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="tags" class="mb-1 text-md text-primary">Your intrests</label> <div class="lg:h-fit lg:w-[40vw] flex flex-col items-start justify-center gap-2 border-2 border-color rounded-md focus:border-primary"><div${spread_attributes({
    ...store_get($$store_subs ??= {}, "$root", root),
    class: "flex flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700 focus-within:ring focus-within:ring-magnum-400"
  })}><!--[-->`;
  for (let $$index_1 = 0; $$index_1 < each_array_1.length; $$index_1++) {
    const t = each_array_1[$$index_1];
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
  })}></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="job" class="mb-1 text-md text-primary">Job</label> <input${attr("value", job)} name="job" placeholder="Enter your job" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="role" class="mb-1 text-md text-primary">Role</label> <input${attr("value", role)} name="role" placeholder="Enter your role" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="lg:h-fit flex flex-col gap-1 mb-3"><label for="bio" class="mb-1 text-md text-primary">Bio</label> <input${attr("value", bio)} name="bio" placeholder="Enter your bio" class="lg:w-[40vw] p-2 text-sm text-primary font-medium border-2 border-color focus:outline-none focus:border-primary bg-background rounded-md placeholder-primary500"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></article> <div class="flex flex-col items-center lg:items-start lg:flex-row gap-2 lg:gap-3"><button class="w-full lg:w-[200px] mt-3 p-3 bg-primary border-2 border-primary text-background lg:self-start rounded-md">Save</button></div></form>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DMPnLL4c.js.map
