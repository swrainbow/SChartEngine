import { EntityEmitter } from './EntityEmitter'
import { Transform2D } from './Transform2D'

enum EntityType {
    /**
     * 普通实体
     */
    Entity,
    /**
     * 集合实体
     */
    GroupEntity,
    /**
     * 渲染书
     */
    RenderTree,
    /**
     * 几何图形实体
     */
    ShapeEntity,
    /**
     * 文本
     */
    TextEntity,
    /**
     * 图像
     */
    ImageEntity,
}
class Entity2D  extends EntityEmitter{
    /**
     * 实体类型
     */
    protected _entityType: EntityType = EntityType.Entity;

    /**
     * 表示当前实体的父实体
     * 当实体被添加到集合Group 下时， Group 会被作为当前实体的父实体
     */
    private _parent?: Entity2D;

    /**
     * 模型实体的变换
     */
    transform: Transform2D = new Transform2D(this);

    /**
     * 实体是否可见， 不可见的实体连同子树一起被移除渲染
     * 
     * 默认： true；
     */
    visible: boolean = true;

    /**
     * Z方向的层级。 渲染时 层级高的会覆盖层级低的实体
     * 默认 0
     */
    zIndex: number = 0;

    /**
     * 获取当前实体的实体类型
     * @returns 
     */
    getEntityType() {
        return this._entityType;
    }

    /**
     * 绑定当前实体的父实体
     * @param parent 父实体
     */
    bindParent(parent?: Entity2D) {
        this._parent = parent;
    }

    /**
     * 获取当前实体的父实体
     */
    getParent() {
        return this._parent;
    }
}

export {
    Entity2D,
    EntityType,
}