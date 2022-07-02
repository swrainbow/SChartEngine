import { remove } from '../../common';
import { dirtyProperty } from '../../dirty';
import { Entity2D, EntityType } from './Entity2D';


/**
 * 表示一个容器/集合， 可以将多个实体组合在一起。 给容器的变换会应用给所有的子实体
 */
class Group extends Entity2D {
    protected _entityType: EntityType = EntityType.GroupEntity

    /**
     * 子实体
     */
    @dirtyProperty private _children: Entity2D[] = [];

    /**
     * 获取子实体
     * @returns 
     */
    getChildren() {
        return this._children;
    }

    /**
     * 添加子实体
     * @param child
     */
    addChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        // 绑定child的parent
        children.forEach(element => {
            element.bindParent(this);
            // 将children 添加到自己的children 中
            this._children.push(...children);
        });
    }

    /**
     * 移除子实体
     * @param child 
     */
    removeChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        children.forEach(child => child.bindParent(undefined));
        remove(this._children, child);
    }


}

export {
    Group,
}