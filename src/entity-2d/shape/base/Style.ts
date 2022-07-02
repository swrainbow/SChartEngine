/**
 * 图形样式
 */
class BaseStyle {
        /**
         * 合并样式配置
         * @param style 
         * @returns 
         */
        static mergeStyle(style: Partial<BaseStyle> = {}) {
            return Object.assign(new BaseStyle(), style);
        }

        /**
         * 透明度
         * @default 1
         * 指定当前图形的透明度， 优先级高于globalAlpha
         */
        alpha: number = 1;

        /**
         * 填充颜色。
         * @default #000 (black)
         * 当在填充颜色指明透明度时（例如使用rgba）， 会同fillAlpha/alpha 属性产生叠加效应
         */
        fillStyle: string = '#000';

        /**
         * 填充颜色的透明度
         * @default 1
         * 指定当前图形填充颜色的透明度， 优先级高于alpha
         */
        fillAlpha: number = 1;

        /**
         * @default undefined
         * 线条边框颜色. 当strokeStyle 设置为 undefined后， 不会绘制 stroke
         */
        strokeStyle?: string;

        /**
         * 线条边框透明度
         * @default 1
         * 
         * 指定当前图形线条边框的透明度， 优先级高于alpha
         */
        strokeAlpha: number = 1;


        /**
         * 仅绘制边框。当指定为true时， 将不会进行填充绘制
         * 
         * @default false
         */
        onlyStroke: boolean = false;

        /**
         * 线条宽度
         * @default 1.0
         */
        lineWidth: number = 1;

        /**
         * 线条端点样式
         * @default butt
         */
        lineCap: 'butt' | 'round' | 'square' = 'butt';

        /**
         * 线条的链接部分样式。 
         * @default miter
         */
        lineJoin: 'miter' | 'bevel' | 'round' = 'miter';


        /**
         * 斜接限制长度
         * @default 10.0
         */
        miterLimit: number = 10;

        /**
         * 虚线样式
         * @default undefined
         */
        lineDash: number[] = [];


        /**
         * 虚线样式偏移
         * @default 0.0
         */
        lineDashOffset: number = 0;
}

export {
    BaseStyle,
}