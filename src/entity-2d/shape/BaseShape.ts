import { dirtyProperty } from "../../dirty";
import { Group } from "../core/Group2D";
import { mergeStyleOption, StyleOption } from './style';

abstract class BaseShape extends Group {
    /**
     * 样式配置
     */
    @dirtyProperty protected styleOption: StyleOption;

    constructor(styleOption: Partial<StyleOption> = {}) {
        super();
        this.updateStyleOption(styleOption, true);
    }

    /**
     * 更新图形的 styleOption
     * 
     * @param styleOption 样式配置
     * @param replace 是否重置为初始样式，再应用当前样式配置。默认：false
     */
    updateStyleOption(styleOption: Partial<StyleOption>, reset: boolean = false) {
        if (reset) {
            this.styleOption = mergeStyleOption(styleOption);
        } else {
            this.styleOption = Object.assign(this.styleOption, styleOption);
        }
        return this;
    }

    /**
     * 获取图形的样式配置
     */
    getStyleOption() {
        return this.styleOption;
    }
}

export { BaseShape };