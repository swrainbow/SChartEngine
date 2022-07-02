import { Vector2 } from "@s7n/math";
import { Entity2D } from "../entity-2d";
import { DOMEvent, InteractionType } from "./type";
import { EventCoorType, getCoorFromEvent } from "./utils";


class InteractionEvent {
    static create(originalEvent: DOMEvent, type: InteractionType) {
        return new InteractionEvent(originalEvent, type)
    }

    /**
     * 拷贝 InteractionEvent 的基本信息
     * @param event 
     * @returns 
     */
    static clone(event: InteractionEvent) {
        const { type, originalEvent, originalEntity, scenePoint} = event;
        const e = new InteractionEvent(originalEvent, type);
        e.originalEntity = originalEntity;
        e.scenePoint = scenePoint;
        return e;
    }

    /**
     * 交互类型
     */
    type: InteractionType;

    /**
     * 原始事件
     */
    originalEvent: DOMEvent;

    /**
     * 触发事件的最初实体模型
     */
    originalEntity: Entity2D;

    /**
     * 事件当前冒泡到的实体模型
     */
    currentEntity: Entity2D;

    /**
     * 阻止时间冒泡
     */
    stopPropagation: boolean = false;

    /**
     * 阻止事件的其他监听函数调用
     */
    stopImmediatePropagation: boolean = false;

    /**
     * 场景中的全局坐标
     */
    scenePoint: Vector2 = new Vector2();

    /**
     * 父坐标系的全局坐标
     */
    localPoint: Vector2 = new Vector2();

    /**
     * 画布坐标
     */
    get canvasPoint() {
        const {x, y} = getCoorFromEvent(this.originalEvent, EventCoorType.Offset);
        return new Vector2(x, y);
    }

    constructor(originalEvent: DOMEvent, type: InteractionType) {
        this.originalEvent = originalEvent;
        this.type = type;
    }
}

export {
    InteractionEvent,
}

