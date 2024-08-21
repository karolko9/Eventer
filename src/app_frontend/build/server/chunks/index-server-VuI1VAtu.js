import { C as current_component, D as noop } from './index2-Cg2Yee25.js';

function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function createEventDispatcher() {
  return noop;
}
async function tick() {
}

export { createEventDispatcher as c, onDestroy as o, tick as t };
//# sourceMappingURL=index-server-VuI1VAtu.js.map
