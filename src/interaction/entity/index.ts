import { Vector2 } from "s-mathutil";
import { Command } from "../../command";
import { Entity2D, EntityUtils } from "../../entity-2d";
import { BaseInteraction, InteractionEvent, InteractionType } from "../../listener";
import { hitEnityTest } from "./hitEntityTest";

interface HittedPath {

    /**
     * 碰撞到的模型实体
     */
    entity: Entity2D;

    /**
     * 碰撞到的坐标
     */
    point: Vector2;
}

/**
 * 将事件转发的到Entity 身上
 */
class EntityInteraction extends BaseInteraction {

    /**
     * 指令集
     */
    private commands: Command[] = [];

    triggerEvent(type: InteractionType, event: InteractionEvent) {
        // 对渲染树进行碰撞， 找到碰撞路径
        const HittedPath = this.hitTestPath(this.renderTree, event.canvasPoint);

        this.bubbleOnHittedPath(HittedPath, type, event);
    }
    /**
     * 注册指令
     * @param command 指令
     */
    registerCommand(command: Command | Command[]) {
        if(Array.isArray(command)) {
            this.commands.push(...command)
        }else {
            this.commands.push(command);
        }
    }

    /**
     * 碰撞检测
     * @param entity 需要进行检测的模型实体
     * @param point 鼠标位置
     * @returns 从当前节点到触发节点的碰撞路径
     */
    private hitTestPath(entity: Entity2D, point: Vector2) {
        // 碰撞路径
        const path: HittedPath[] = [];

        // step1 将point转化为局部坐标
        const matrix = entity.transform.localMatrix.invert();
        const localPoint = point.applyMatrix3(matrix);

        //step2 检测当前实体是否被命中
        const hitted = hitEnityTest(entity, localPoint);

        // step3 如果被命中 需要添加到path 中， 用以事件冒泡
        if(hitted) {
            path.push({entity, point: localPoint})
        }
        // step4 如果存在子树 需要深度优先的找到从根到叶子的冒泡路径
        if(EntityUtils.isGroup(entity)) {
            const children = EntityUtils.sortByZIndex(EntityUtils.filterByVisible(entity.getChildren()), false);

            // 按照z-index 从大到小进行递归 找到目标点的子树就停止
            for(let i = 0; i< children.length; i++) {
                const child = children[i];
                const childPath = this.hitTestPath(child, localPoint);
                if(childPath.length > 0) {
                    path.push(...childPath);
                    break
                }
            }
        }

        return path;
    }

    private bubbleOnHittedPath(path: HittedPath[], type: InteractionType, event: InteractionEvent) {
        // 反转路径， 得到从叶子到根
        const bubblePath = path.reverse();
        // 获取触发事件的最初实体
        const originalNode = bubblePath[0];
        // 在event 上绑定最初实体
        this.bindOriginalEntity(event, originalNode.entity);

        for(let i = 0; i < bubblePath.length; i++) {
            const { entity, point} = bubblePath[i];

            // clone 一个新的event 给每个实体用
            const currentEvent = InteractionEvent.clone(event);
            this.bindCurrentEntity(currentEvent, entity, point);

            entity.emit(type, currentEvent);

            this.commands.forEach(command => command.trigger(type, entity, event));

            if(currentEvent.stopPropagation || currentEvent.stopImmediatePropagation) {
                break;
            }
        }
    }
}

export {
    EntityInteraction,
}