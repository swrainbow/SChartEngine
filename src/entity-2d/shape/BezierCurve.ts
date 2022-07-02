import { Vector2 } from '@s7n/math';
import { BaseStyle, Combine } from './base';

class BezierCurveShape {

    startPoint: Vector2 = new Vector2();

    endPoint: Vector2 = new Vector2();

    cp1: Vector2 = new Vector2();

    cp2?:Vector2;
}

class BezierCurve extends Combine(BezierCurveShape, BaseStyle) {}

export {
    BezierCurve,
}