export const clickCoords = (e) => {
    return {
        clickedX: e.nativeEvent.offsetX,
        clickedY: e.nativeEvent.offsetY
    }
}