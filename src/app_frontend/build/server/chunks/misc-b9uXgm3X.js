function default_slot($$props) {
  var children = $$props.$$slots?.default;
  if (children === true) {
    return $$props.children;
  } else {
    return children;
  }
}

export { default_slot as d };
//# sourceMappingURL=misc-b9uXgm3X.js.map
