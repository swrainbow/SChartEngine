
export class RenderOption {

    /**
     * 合并渲染器配置
     * @param option 
     * @returns 
     */
    static mereOption(option: Partial<RenderOption> = {}): RenderOption {
        return Object.assign(new RenderOption(), option);
    }

    /**
     * 是否开启自动渲染
     */
    autoRender: boolean = false;
}