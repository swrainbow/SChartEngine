import { StyleOption } from "../../entity-2d";

/**
 * 获取stroke的透明度
 * @param styleOption 
 * @returns 
 */
export function getStrokeAlpha(styleOption: StyleOption) {
    const { strokeAlpha, alpha } = styleOption;
    return strokeAlpha !== undefined ? strokeAlpha : alpha;
}

/**
 * 获取fill的透明度
 * @param styleOption 
 * @returns 
 */
export function getFillAlpha(styleOption: StyleOption) {
    const { fillAlpha, alpha } = styleOption;
    return fillAlpha !== undefined ? fillAlpha : alpha;
}

/**
 * 是否需要stroke
 * @param styleOption 
 * @returns 
 */
export function hasStrokeStyle(styleOption: StyleOption) {
    const { strokeStyle, lineWidth } = styleOption;
    return strokeStyle && getStrokeAlpha(styleOption) > 0 && lineWidth > 0;
}

/**
 * 是否需要fill
 * @param styleOption 
 * @returns 
 */
export function hasFillStyle(styleOption: StyleOption) {
    const { fillStyle } = styleOption;
    return fillStyle && getFillAlpha(styleOption) > 0
}