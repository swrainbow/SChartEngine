import { SceneDragCommand, SceneScaleCommand } from "../command";
import { Entity2D, RenderTree } from "../entity-2d";
import { EntityInteraction } from '../interaction'
import { DOMListener } from "../listener";
import { Renderer } from "../renderer";
import { StyleOption } from "../entity-2d";
import { DEFAULT_CANVAS_OPTION } from "./const";
import { CanvasOption } from "./type";


class Canvas2D {

    /**
     * 渲染器
     */
    private renderer: Renderer;

    private element: HTMLCanvasElement;

    /**
     * 渲染模型树
     */
    private renderTree: RenderTree = new RenderTree()；

    private domListener: DOMListener;
    constructor(option: CanvasOption = {}) {
        // 初始化画布
        this.element = this.createCanvas(option);
        //适配场景
        this.adaptCoordinateSystem(this.element, option);
        // 初始化渲染器
        this.renderer = new Renderer(this.element, option.autoRender);
        // 初始化数据监听
        this.domListener = new DOMListener(this.element);

        const entityInteraction = this.initEntityInteraction(option);
        this.domListener.registerInteraction(entityInteraction);
    }


    /**
     * 获取被渲染的目标画布
     * @returns 
     */
    getCanvas() {
        return this.element;
    }

    /**
     * 增加要渲染的元素
     * @param entity 
     * @returns 
     */
    addEntity(entity: Entity2D | Entity2D[]) {
        this.renderTree.addChild(entity);
        return this;
    }

    removeEnity(enity: Entity2D | Entity2D) {
        this.renderTree.removeChild(enity);
        return this;
    }

    render() {
        this.renderer.render(this.renderTree)
    }


    /**
     * 创建画布
     * @param option 
     * @returns 
     */
    private createCanvas(option: CanvasOption) {
        const { element, width, height } = option;
        let canvas = typeof element === 'string' ? document.getElementById(element) as HTMLCanvasElement : element;
        if (canvas && canvas.tagName === 'CANVAS') {
            // 用户传入了有效的画布DOM，仅可以根据用户传入的宽高进行设置
            return (
                width && canvas.setAttribute('width', `${width}`),
                height && canvas.setAttribute('height', `${height}`),
                canvas
            );
        }

        // 需要创建画布对象DOM，优先使用用户传入的宽高进行设置
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${width || DEFAULT_CANVAS_OPTION.width}`);
        canvas.setAttribute('height', `${height || DEFAULT_CANVAS_OPTION.height}`);
        return canvas;
    }

    /**
     *  将场景的坐标系适配
     * @param canvas 
     * @param option 
     */
    private adaptCoordinateSystem(canvas: HTMLCanvasElement, option: CanvasOption) {
        const { width, height } = canvas.getBoundingClientRect();
        const { sceneWidthRange = [0, width], sceneHeightRange = [0, height] } = option;

        const widthRange = typeof sceneWidthRange === 'number' ? [0, sceneWidthRange] : sceneWidthRange;
        const heightRange = typeof sceneHeightRange === 'number' ? [0, sceneHeightRange] : sceneHeightRange;

        this.renderTree.fitView({ width, height, widthRange, heightRange });

    }


    private initEntityInteraction(option: CanvasOption) {
        const interaction = new EntityInteraction(this.renderTree);
        const { draggable = false, scalable = false } = option;

        if (draggable) {
            interaction.registerCommand(new SceneDragCommand());
        }

        if (scalable) {
            interaction.registerCommand(new SceneDragCommand());
        }

        return interaction;
    }
}

export { Canvas2D }
