export class ImageStyle {

    /**
     * 合并默认样式
     * @param style 图片样式
     * @returns ImageStyle
     */
    static mergeStyle(style: Partial<ImageStyle>): ImageStyle {
        return Object.assign(new ImageStyle(), style);
    }

    /**
     * 图像左上角的X坐标
     */
    x: number = 0;

    /**
     * 图像左上角的y坐标
     */
    y: number = 0;

    /**
     * 图像显示的宽度
     */
    width?: number;

    /**
     * 图像的显示实际高度
     */
    height?: number;
}