function dsDataAttrs(name) {
  return {
    "data-ds": true,
    "data-ds-component": name
  };
}
function dsStateAttr(state, active) {
  return active ? { [`data-ds-${state}`]: "true" } : {};
}
export {
  dsDataAttrs,
  dsStateAttr
};
