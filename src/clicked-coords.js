export const clickCoords = (e) => ({
  imgX: e.nativeEvent.offsetX,
  imgY: e.nativeEvent.offsetY,
  screenX: e.pageX,
  screenY: e.pageY,
});
