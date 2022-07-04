import { Entity2D, EntityType } from "./core/Entity2D";
import { Group } from "./core/Group2D";
import { RenderTree } from "./core/RenderTree";
import { Text } from './text';
import { Image } from './image';
import { BaseShape } from "./shape/BaseShape";
import { Arc } from "./shape/Arc";
import { BezierCurve } from "./shape/BezierCurve";
import { Circle } from "./shape/Circle";
import { Ellipse } from "./shape/Ellipse";
import { Line } from "./shape/Line";
import { Polygon } from "./shape/Polygon";
import { Rect } from "./shape/Rect";
import { Sector } from "./shape/Sector";

abstract class EntityUtils {
    /**
     * 是否是 Group
     */
    static isGroup(value: Entity2D): value is Group {
        return value.getEntityType() === EntityType.GroupEntity;
    }

    /**
     * 是否是 RenderTree
     */
    static isRenderTree(value: Entity2D): value is RenderTree {
        return value instanceof RenderTree;
    }

    /**
     * 是否是图形实体
     */
    static isShapeEntity(value: Entity2D): value is BaseShape {
        return value.getEntityType() === EntityType.ShapeEntity
    }

    /**
     * 是否是文本实体
     */
    static isTextEntity(value: Entity2D): value is Text {
        return value.getEntityType() === EntityType.TextEntity;
    }

    /**
     * 是否是图像实体
     */
    static isImageEntity(value: Entity2D): value is Image {
        return value instanceof Image;
    }

    /**
     * 是否是 Arc 图形
     */
    static isArc(entity: Entity2D): entity is Arc {
        return entity instanceof Arc;
    }

    /**
     * 是否是 BezierCurve 图形
     */
    static isBezierCurve(entity: Entity2D): entity is BezierCurve {
        return entity instanceof BezierCurve;
    }

    /**
     * 是否是 Circle 图形
     */
    static isCircle(entity: Entity2D): entity is Circle {
        return entity instanceof Circle;
    }

    /**
     * 是否是 Ellipse 图形
     */
    static isEllipse(entity: Entity2D): entity is Ellipse {
        return entity instanceof Ellipse;
    }

    /**
     * 是否是 Line 图形
     */
    static isLine(entity: Entity2D): entity is Line {
        return entity instanceof Line;
    }

    /**
     * 是否是 Polygon 图形
     */
    static isPolygon(entity: Entity2D): entity is Polygon {
        return entity instanceof Polygon;
    }

    /**
     * 是否是 Rect 图形
     */
    static isRect(entity: Entity2D): entity is Rect {
        return entity instanceof Rect;
    }

    /**
     * 是否是 Sector 图形
     */
    static isSector(entity: any): entity is Sector {
        return entity instanceof Sector;
    }

    /**
   * 将实体按照 zIndex 进行排序
   * @param children 需要排序的实体数组
   * @param minFirst 是否从小到大，默认：true (从小到大：true; 从大到小：false)
   * @returns 排序后的实体数组
   */
    static sortByZIndex(children: Entity2D[], minFirst: boolean = true) {
        if (minFirst) {
            return [...children].sort((a, b) => a.zIndex - b.zIndex);
        }
        // 按照 zIndex 从大到小，还需要注意的是 children 本身 zIndex 相同的情况下，后添加的会高于先添加的
        return [...children].reverse().sort((a, b) => b.zIndex - a.zIndex);
    }

    /**
     * 过滤出 visible 为 true 的实体
     * @param children 需要进行过滤的实体数组
     */
    static filterByVisible(children: Entity2D[]) {
        return children.filter(child => child.visible);
    }
}

export {
    EntityUtils,
}