import { dirtyProperty } from "../dirty";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Rect extends BaseShape {
    /**
     * 矩形左上角 X 坐标
     */
    @dirtyProperty x: number = 0;

    /**
     * 矩形左上角 Y 坐标
     */
    @dirtyProperty y: number = 0;

    /**
     * 矩形宽度
     */
    @dirtyProperty width: number = 0;

    /**
     * 矩形高度
     */
    @dirtyProperty height: number = 0;

    constructor(x: number, y: number, width: number, height: number, styleOption?: Partial<StyleOption>) {
        super(styleOption);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // /**
    //  * 设置矩形左上角 X 坐标
    //  */
    // setX(x: number) {
    //     this.x = x;
    //     return this;
    // }

    // /**
    //  * 获取矩形左上角 X 坐标
    //  */
    // getX() {
    //     return this.x;
    // }

    // /**
    //  * 设置矩形左上角 Y 坐标
    //  */
    // setY(y: number) {
    //     this.y = y;
    //     return this;
    // }

    // /**
    //  * 获取矩形左上角 Y 坐标
    //  */
    // getY() {
    //     return this.y;
    // }

    // /**
    //  * 设置宽度
    //  */
    // setWidth(w: number) {
    //     this.width = w;
    //     return this;
    // }

    // /**
    //  * 获取宽度
    //  */
    // getWidth() {
    //     return this.width;
    // }

    // /**
    //  * 设置高度
    //  */
    // setHeight(h: number) {
    //     this.height = h;
    //     return this;
    // }

    // /**
    //  * 获取高度
    //  */
    // getHeight() {
    //     return this.height;
    // }
}

export { Rect };