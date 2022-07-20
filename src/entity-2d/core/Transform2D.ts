import { Matrix3, Vector2} from "s-mathutil";
import { dirtyProperty} from '../../dirty';
import { Entity2D } from "./Entity2D";



/**
 * 二维变换部分
 * TODO: 支持设置transform-origin
 */
class Transform2D {
    /**
     * 当前变换所属的实体
     */
    private _entity: Entity2D;

    /**
     * 平移
     * 默认 Vector2（1，1）
     */
    @dirtyProperty translate: Vector2 = new Vector2(0, 0);
    @dirtyProperty scale: Vector2 = new Vector2(0, 0);
    @dirtyProperty rotate: number = 0;

    constructor(entity: Entity2D) {
        this._entity = entity;
    }

    /**
     *  相对于父坐标的变换矩阵
     */
    get localMatrix() {
        const { translate, scale, rotate} = this;
        return (new Matrix3()).applyRotate(rotate).applyScale(scale).applyTranslate(translate);
    }

    get worldMatrix() {
        let matrix = this.localMatrix;
        let parent = this._entity.getParent();
        while(parent) {
            matrix = parent.transform.localMatrix.preMultiply(matrix);
            parent = parent.getParent()
        }
        return matrix;
    }
}

export {
    Transform2D,
}