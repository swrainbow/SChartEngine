import { Matrix3 } from "s-mathutil";
import { Transform2D } from "../../entity-2d/core/Transform2D";


/**
 * CanvasRendeingContext2D 的Transform 接口如下：
 * setTransform(a,b,c,d,e,f);
 * 其格式
 * a c e
 * b d f
 * 0 0 1
 * 齐次方程组
 * @param transform 
 * @returns 
 */
export function getContextTransform(transform: Transform2D) {

    const { translate, scale, rotate } = transform;

    const cos = Math.cos(rotate);
    const sin = Math.sin(rotate);

    const { x: sx, y: sy } = scale;

    const a = cos * sx;
    const b = sin;
    const c = -sin;
    const d = cos * sy;
    const e = translate.x;
    const f = translate.y;

    return { a, b, c, d, e, f };
}

/**
 * 将Matrix数据转换context的Transform
 * @param matrix 
 * @returns 
 */
export function getTransformFromMatrix3(matrix: Matrix3) {
    const [a, c, e, b, d, f] = matrix.toArray();
    return { a, b, c, d, e, f };
}