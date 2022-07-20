import { IVec2, Vector2 } from "s-mathutil";
import { dirtyProperty } from "../../dirty";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Ellipse extends BaseShape {
    /**
     * 椭圆圆心
     */
    @dirtyProperty private center: Vector2 = new Vector2(0, 0);

    /**
     * 椭圆的长轴半径
     */
    @dirtyProperty radiusX: number = 0;

    /**
     * 椭圆的短轴半径
     */
    @dirtyProperty radiusY: number = 0;

    /**
     * 椭圆的旋转（弧度）
     */
    @dirtyProperty rotation: number = 0;

    constructor(center: Vector2, radiusX: number, radiusY: number, rotation: number, styleOption?: Partial<StyleOption>) {
        super(styleOption);
        this.center = center.clone();
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    /**
     * 设置椭圆圆心
     */
    setCenter(center: Partial<IVec2>) {
        const x = center.x !== undefined ? center.x : this.center.x;
        const y = center.y !== undefined ? center.y : this.center.y;
        this.center = new Vector2(x, y);
        return this;
    }

    /**
     * 获取椭圆圆心
     */
    getCenter() {
        return this.center.clone();
    }
}

export { Ellipse };