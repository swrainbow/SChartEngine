import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class CircleShape {
    center: Vector2 = new Vector2();

    radius: number = 0;
}

class Circle extends Combine(CircleShape, BaseStyle) {}

export {
    Circle,
}