import { Vector2 } from "@s7n/math";

export interface CoordinateSystemOptions {
    /**
     * 坐标系原点位置
     * @defautl (0,0)
     */
    origin?: Vector2;

    /**
     * 坐标系是否可拖拽
     */
    draggable?: boolean;

    afterDragCallBack?: ()=>void;
}