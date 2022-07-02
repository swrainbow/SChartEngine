import { Vector2 } from "@s7n/math";
import { Entity2D, EntityUtils } from "../entity-2d";
import { InteractionEvent } from "../listener";
import { Command } from "./Command";


/**
 * TODO 把这种每个交互函数中都要判断 entity 类型的行为变成一种前置的配置
 * 
 * 场景拖拽指令
 */
class SceneDragCommand extends Command {

    private lastDrogPos?: Vector2;

    protected onDragStart(entity: Entity2D, event: InteractionEvent): void {
        if(EntityUtils.isRenderTree(entity)) {
            this.lastDrogPos = event.canvasPoint;
        }
    }

    protected onDragMove(entity: Entity2D, event: InteractionEvent): void {
        if(EntityUtils.isRenderTree(entity)) {
            const currentPos = this.move(entity, event);

            this.lastDrogPos = currentPos
        }
    }

    protected onDragEnd(entity: Entity2D, event: InteractionEvent): void {
        if(EntityUtils.isRenderTree(entity)) {
            this.move(entity, event);

            this.lastDrogPos = undefined;
        }
    }

    private move(entity: Entity2D, event: InteractionEvent) {
        // step1 计算偏移距离
        const currentPos = event.canvasPoint;
        const translate = currentPos.sub(this.lastDrogPos);

        // step2 更新渲染便宜
        entity.transform.translate = entity.transform.translate.add(translate);

        return currentPos;
    }
}

export {
    SceneDragCommand,
}