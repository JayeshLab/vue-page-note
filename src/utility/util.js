const createDefaultElement = (prop)=>{
  return Object.assign({
    id: '',
    type: '',
    image: null,
    x: Math.floor(Math.random() * 200 + 200),
    y: Math.floor(Math.random() * 200 + 200),
    height: 50,
    width: 300,
    z: 0,
    rot: 0,
    text: 'Vue Page Note...',
    tmpText: '',
    cursor: 'move',
    selected: false,
    editable: false
  }, prop);
}
export { createDefaultElement }