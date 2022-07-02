/**
 * PointerEvent 事件中不同的坐标类型
 */
export enum EventCoorType {
    /**
     * screenX & screenY
     * @description the top-left corner of the user's entire screen space
     */
    Screen,
    /**
     * pageX & pageY
     * @description the e
     */
    Page,
    /**
     * clientX & clientY
     * @description the top-left corner of the viewport(相对于视口的坐标， 不受scroll影响)
     * Viewport:
     * 1. 通常页面就是浏览器页面区域的左上角
     * 2. iframe 就是承载 iframe的左上角
     */
    Client,
    /**
     * offsetX & offsetY
     * @description top-left corner of the node to which the event has been delivered(相对于触发事件节点的左上角)
     */
    Offset,
}

/**
 * 获取 PointEvent 中的不同类型坐标
 * @param event PointerEvent
 * @param type 事件的坐标类型：Screen Client Page Offset
 * @returns 
 */
export function getCoorFromEvent(event: PointerEvent | WheelEvent, type: EventCoorType = EventCoorType.Offset) {
    switch(type) {
        case EventCoorType.Screen: {
            const {screenX:x, screenY: y} = event;
            return {x, y};
        }
        case EventCoorType.Page: {
            const {pageX: x, pageY: y} = event;
            return {x, y};
        }
        case EventCoorType.Client: {
            const { clientX:x, clientY:y} = event;
            return {x, y};
        }
        case EventCoorType.Offset:
        default: {
            const {offsetX:x, offsetY: y} = event;
            return {x, y}
        }
    }
}