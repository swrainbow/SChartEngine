import { dirtyProperty } from "../../dirty";
import { Entity2D, EntityType } from "../core/Entity2D";
import { TextStyle } from "./style";

class Text extends Entity2D {
    protected _entityType: EntityType = EntityType.TextEntity;

    @dirtyProperty text: string;

    @dirtyProperty style: TextStyle;

    constructor(text: string, style: Partial<TextStyle> = {}) {
        super();
        this.text = text;
        this.updateStyle(style, true);
    }

    updateStyle(textStyle: Partial<TextStyle>, reset: boolean = false) {
        if(reset) {
            this.style = TextStyle.mergeStyle(textStyle);
        } else {
            // TODO Object.assgin 是否会触发setter 从而追踪到数据变更
            this.style = Object.assign(this.style, textStyle)
        }
        return this;
    }
}

export {
    Text,
    TextStyle,
}