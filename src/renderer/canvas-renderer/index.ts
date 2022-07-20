import { Entity2D, EntityUtils } from "../../entity-2d";
import { Image } from "../../entity-2d";
import { BaseShape } from "../../entity-2d";
import { Text } from "../../entity-2d";
import { getImageContent } from "./imageUtils";
import { getShapePath } from "./shapePath";
import { getFillAlpha, getStrokeAlpha, hasFillStyle, hasStrokeStyle } from "./styleUtil";
import { getTransformFromMatrix3 } from "./transformUtil";

/**
 * 使用 Canvas 2D 绘制的渲染器
 */
class CanvasRenderer {
    /**
     * 画布 2D Context
     */
    private ctx: CanvasRenderingContext2D;

    /**
     * 画布的宽度
     */
    private width: number = 0;

    /**
     * 画布的高度
     */
    private height: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');

        const { width, height } = canvas.getBoundingClientRect();
        this.width = width;
        this.height = height;
    }

    render(entity: Entity2D) {
        if (EntityUtils.isShapeEntity(entity)) {
            this.renderShape(entity, this.ctx)
        }
    }

    /**
     * 清空画布
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * 渲染基本图形
     * @param shape 图形对象
     * @param ctx 渲染上下文
     */
    private renderShape(shape: BaseShape, ctx: CanvasRenderingContext2D) {
        const styleOption = shape.getStyleOption();

        const shouldStroke = hasStrokeStyle(styleOption);
        const shouldFill = hasFillStyle(styleOption);

        if (shouldFill || shouldStroke) {
            ctx.save();

            const path = getShapePath(shape);

            ctx.setTransform(getTransformFromMatrix3(shape.transform.worldMatrix));

            if (shouldFill && !styleOption.onlyStroke) {
                const { fillStyle } = styleOption;
                const alpha = getFillAlpha(styleOption);
                ctx.fillStyle = fillStyle;
                ctx.globalAlpha = alpha;
                ctx.fill(path);
            }

            if (shouldStroke) {
                const { lineCap, lineJoin, miterLimit, lineWidth, lineDash, lineDashOffset, strokeStyle } = styleOption;
                const alpha = getStrokeAlpha(styleOption);
                ctx.lineCap = lineCap;
                ctx.lineJoin = lineJoin;
                ctx.miterLimit = miterLimit;
                ctx.lineWidth = lineWidth;
                ctx.setLineDash(lineDash);
                ctx.lineDashOffset = lineDashOffset;
                ctx.strokeStyle = strokeStyle;
                ctx.globalAlpha = alpha;
                ctx.stroke(path);
            }

            ctx.restore();
        }
    }

    /**
     * 渲染文本
     * @param textEntity 
     * @param ctx 
     */
    private renderText(textEntity: Text, ctx: CanvasRenderingContext2D) {
        const textStyle = textEntity.getStyleOption();

        const shouldFill = hasFillStyle(textStyle);
        const shouldStroke = hasFillStyle(textStyle);

        if (shouldFill || shouldStroke) {
            ctx.setTransform(getTransformFromMatrix3(textEntity.transform.worldMatrix));
            const { x, y, align, baseline, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } = textStyle;
            ctx.textAlign = align;
            ctx.textBaseline = baseline;
            const ctxFontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
            ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${ctxFontSize} ${fontFamily}`;

            if (shouldFill && !textStyle.onlyStroke) {
                const { fillStyle } = textStyle;
                ctx.fillStyle = fillStyle;

                const alpha = getFillAlpha(textStyle);
                ctx.globalAlpha = alpha;
                ctx.fillText(textEntity.text, x, y);
            }

            if (shouldStroke) {
                const { strokeStyle } = textStyle
                if (strokeStyle !== undefined) {
                    ctx.strokeStyle = strokeStyle;

                    const alpha = getStrokeAlpha(textStyle);
                    ctx.globalAlpha = alpha;

                    ctx.strokeText(textEntity.text, x, y);
                }
            }

            ctx.restore()
        }
    }

    private renderImage(entity: Image, ctx: CanvasRenderingContext2D) {
        const image = getImageContent(entity);

        if (!image) {
            return;
        }

        const option = entity.style;

        const width = option.width || image.width;
        const height = option.height || image.height;

        ctx.drawImage(image, option.x, option.y, width, height);
    }

}

export {
    CanvasRenderer
}