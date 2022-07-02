import { dirtyProperty } from "../../dirty";
import { Entity2D, EntityType } from "../core/Entity2D";
import { ImageStyle } from "./style";

type ImageSrc = string | HTMLImageElement;

class Image extends Entity2D {

    protected _entityType: EntityType = EntityType.ImageEntity;

    /**
     * 图像的原始内容， 可以是string 也可以是HTMLImageElement
     */
    @dirtyProperty imageSrc: ImageSrc;

    @dirtyProperty style: ImageStyle;


    constructor(image: ImageSrc, style: Partial<ImageStyle> = {}) {
        super();
        this.imageSrc = image;
        this.updateStyle(style, true);
    }

    /**
     * 设置当前图像样式
     * @param style 图像样式
     * @param reset 是否重置初始样式， 再应用当前样式 
     */
    updateStyle(style: Partial<ImageStyle>, reset: boolean = false) {
        if(reset) {
            this.style = ImageStyle.mergeStyle(style);
        }else {
            this.style = Object.assign(this.style, style)
        }
    }
}

export {
    Image,
}