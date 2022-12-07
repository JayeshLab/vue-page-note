import uid from "@/utility/uid";

const createDefaultElement = (prop = {})=>{
  return Object.assign({
    id: '',
    type: '',
    x: Math.floor(Math.random() * 300 + 200),
    y: Math.floor(Math.random() * 300 + 150),
    z: 0,
    rot: 0,
    height: 50,
    width: 300,
    content: 'Default Text'
  }, prop);
}
const createDefaultPage = (prop = {}) => {
  const defaultElement = {};
  const id = `EL_${uid(32)}`;
  defaultElement[id] = createDefaultElement({id: id, type: 'TextElement'});
  return Object.assign({
    pid: `PG_${uid(32)}`,
    icon: "📝",
    title: "Untitled",
    elements: defaultElement,
    last_saved: new Date()
  }, prop);
}
const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export { createDefaultElement, createDefaultPage, debounce }