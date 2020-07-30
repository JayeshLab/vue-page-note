const createDefaultElement = (prop)=>{
  return Object.assign({
    id: prop.id,
    type: prop.type,
    x: Math.floor(Math.random() * 100 + 200),
    y: Math.floor(Math.random() * 100 + 200),
    height:100,
    width:300,
    z: 0,
    rot: 0,
    text: 'Vue Page Note...',
    tmpText: '',
    cursor: 'move',
    selected: false,
    editable: false
  });
}
export { createDefaultElement }