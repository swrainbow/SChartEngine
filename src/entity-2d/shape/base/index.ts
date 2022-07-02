import { dirtyProperty } from "../../../dirty";
import { Entity2D, EntityType } from "../../core/Entity2D";
import { BaseStyle } from "./Style";

interface ConstructorOf<T> {
    new(): T
}

interface IShapeParam<Shape, Style> {
    /**
     * 图形的形状信息
     */
    shape?: Partial<Shape>;

    /**
     * 图形的样式信息
     */
    style?: Partial<Style>;
}

abstract class ShapeEntity<Shape, Style> extends Entity2D {
    protected _entityType: EntityType = EntityType.ShapeEntity;

    @dirtyProperty shape: Shape;

    @dirtyProperty style: Style;
}

interface ShapeEntityConstructor<Shape, Style> {
    new(param?: IShapeParam<Shape, Style>) : ShapeEntity<Shape, Style>;
}

/**
 * 合并Shape 类型 和 Style 类型 共同构成 ShapeEntity 类型
 * @param SHAPE 
 * @param STYLE 
 * @returns 
 */
function Combine<Shape, Style>(SHAPE: ConstructorOf<Shape>, STYLE: ConstructorOf<Style>): ShapeEntityConstructor<ShapeEntity, Style> {
    return class extends ShapeEntity<Shape, Style> {
        constructor(param?: IShapeParam<Shape, Style>) {
            super();

            // 根据用户的设置， 初始化 ShapeEntity 的shape 和 style
            const {shape, style} = param || {};
            this.shape = shape ? Object.assign(new SHAPE(), shape) : new SHAPE();
            this.style = style ? Object.assign(new STYLE(), style) : new STYLE();
        }
    }
}

export {
    Combine,
    BaseStyle,
    ShapeEntityConstructor,
    ShapeEntity,
}