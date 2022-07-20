import { EventCoorType } from './utils';
import { Vector2 } from "s-mathutil";
import { Entity2D, RenderTree } from "../entity-2d";
import { InteractionEvent } from "./InteractionEvent";
import { DOMEvent, InteractionType } from "./type";

abstract class BaseInteraction {
    /**
     * 渲染树
     */
    protected renderTree: RenderTree;


    /**
     * 转换事件对象， 将原生的DOMEvent 处理为交互器所需要的InteractionEvent
     * @param event 
     * @param type 
     * @returns 
     */
    static switchEvent(event: DOMEvent, type: InteractionType) {
        return new InteractionEvent(event, type)
    }

    constructor(renderTree: RenderTree) {
        this.renderTree = renderTree;
    }

    /**
     * 将交互事件交给交互器处理
     * @param type 交互事件类型
     * @param event 原生事件对象
     */
    trigger(type: InteractionType, event: DOMEvent) {
        // 将DOMEvent -> InteractionEvent
        const iEvent = BaseInteraction.switchEvent(event, type);
        // 绑定 InteractionEvent 上的全局坐标
        this.bindEventScenePoint(iEvent);
        // 进行处理
        this.triggerEvent(type, iEvent);
    }

    /**
     * 交互器的处理函数
     * @param type 交互事件类型 InteractionType
     * @param event 交互事件对象 InteractionEvent
     * 
     * @override 派生类根据实际需求实现该函数
     */
    protected abstract triggerEvent(type: InteractionType, event: InteractionEvent): void;

    /**
     * 
     * @param event 绑定InteractionEvent 上的全局坐标
     * @returns 
     */
    private bindEventScenePoint(event: InteractionEvent) {
        // 获取 renderTree 的变换逆矩阵
        const matrix = this.renderTree.transform.localMatrix.invert();
        // 设置 event 上的场景坐标
        event.scenePoint = event.canvasPoint.applyMatrix3(matrix);
        return this;
    }

    /**
     * 绑定InteractionEvent 触发本次事件的实体（originEntity）
     * @param event 
     * @param entity 
     * @returns 
     */
    protected bindOriginalEntity(event: InteractionEvent, entity: Entity2D) {
        event.originalEntity = entity;
        return this;
    }


    /**
     * 
     * @param event 
     * @param entity 
     * @param localPoint 
     * @returns 
     */
    protected bindCurrentEntity(event: InteractionEvent, entity: Entity2D, localPoint: Vector2) {
        event.currentEntity = entity;
        event.localPoint = localPoint;
        return this;
    }
}

export {
    BaseInteraction,
}