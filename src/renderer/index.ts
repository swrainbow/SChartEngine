import { getDirtyTag, markDirty } from "../dirty";
import { RenderTree } from "../entity-2d";
import { BaseRendererPlugin, RendererPluginConstructorOf } from "./base-renderer-plugin";
import { CanvasRenderer } from "./canvas-renderer";
import { RenderOption } from "./type";

/**
 * 提供给场景的渲染器
 */
class Unstable_Render {
    
    /**
     * 渲染插件: 实现不同渲染的插件 TODO canvas svg webgl
     */
    private plugin: BaseRendererPlugin<any>;

    /**
     * 自动渲染任务的id
     */
    private timer?: number;

    constructor(dom: HTMLCanvasElement, Plugin: RendererPluginConstructorOf, option?: RenderOption) {
        // step1 初始化渲染插件
        this.plugin = new Plugin(dom);

        // step2 获取渲染器配置
        const { autoRender } = RenderOption.mereOption(option);
        if(autoRender) {
            this.tick();
        }
    }

    render(forceRender = true) {
        this.renderViewport(forceRender)
    }


    /**
     * 开启自动渲染
     */
    startAutoRender() {
        if(!this.timer) {
            this.tick();
        }
    }

    /**
     * 停止自动渲染
     */
    stopAutoRender() {
        if(this.timer) {
            cancelAnimationFrame(this.timer);
        }
    }


    /**
     * 渲染场景
     */
    private renderViewport(forceRender = false) {
        if(forceRender || getDirtyTag()) {
            this.plugin.render();
            markDirty(false);
        }
    }

    /**
     * 自动渲染任务
     */
    private tick() {
        this.timer = requestAnimationFrame(()=> {
            this.renderViewport();
            this.tick();
        })
    }
}

/**
 * 渲染器 负责将Canvas 传递来的数据进行渲染
 */
class Renderer {
    /**
     * 画布dom节点
     */
    private dom: HTMLCanvasElement;


    /**
     *  使用Canvas2D 的渲染器
     */
    private canvasRenderer: CanvasRenderer;


    /**
     * 要被渲染的视口
     */
    private renderTree?: RenderTree;

    /**
     * 自动渲染任务id
     */
    private timer?: number;

    constructor(dom: HTMLCanvasElement, autoRender: boolean = false) {
        this.dom = dom;
        this.canvasRenderer = new CanvasRenderer(this.dom)
        if(autoRender) {
            this.tick()
        }
    }
    /**
     * 渲染场景
     * @param  
     */
     render(renderTree: RenderTree) {
        this.renderTree = renderTree
        this.renderViewport();
    }

    /**
     * 开启自动渲染
     */
    startAutoRender() {
        if (!this.timer) {
            this.tick();
        }
    }

    /**
     * 停止自动渲染
     */
    stopAutoRender() {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
        }
    }

    /**
     * 渲染当前视口
     */
    private renderViewport() {
        if (this.renderTree && getDirtyTag()) {
            // step 1 清空画布
            this.canvasRenderer.clearCanvas();
            // step 2 重新渲染全部实体模型
            const entities = this.renderTree.flattenTree();
            entities.forEach(entity => this.canvasRenderer.render(entity));
            markDirty(false);
        }
    }

    /**
     * 自动渲染任务
     */
    private tick() {
        this.timer = requestAnimationFrame(() => {
            this.renderViewport();
            this.tick();
        });
    }
}

export {
    Renderer,
    Unstable_Render,
    RendererPluginConstructorOf,
}