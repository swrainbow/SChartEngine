
/**
 * 交互管理器可以注册监听的交互类型（交互事件）
 */
export enum InteractionType {
    
    /**
     * 点击事件
     */
    Click,
    /**
     * 双击事件
     */
    DBClick,
    /**
     * 右键事件
     */
    RightClick,
    /**
     * 悬浮事件
     */
    Hover,
    /**
     * 拖动开始
     */
    DragStart,
    /**
     * 拖动事件
     */
    DragMove,
    /**
     * 拖动结束
     */
    DragEnd,
    /**
     * 滚轮事件
     */
    Wheel,
}


export type BaseEvent = PointerEvent | WheelEvent;

export type DOMEvent = PointerEvent | WheelEvent;

export type EventType<T extends InteractionType> = T extends InteractionType.Wheel ? WheelEvent : PointerEvent;

export interface BaseInteraction< P = BaseEvent> {
    /**
     * 对 Event 的预处理， 处理为triggerEvent 接口所需要的payload 类型
     */
    handleEventPayload?: (e: BaseEvent) => P;

    /**
     * 触发交互器的交互事件
     */
    triggerEvent(type: InteractionType, payload: P): void;
}

