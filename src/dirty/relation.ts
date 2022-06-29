import { $OBSERVER, $OPTION } from "./const";
import { mergeOption, ObserverTarget, OptionPrototype, ObserverOption, ObserverOptionData } from "./type";
import { Observer } from './observer';


/**
 * 用以协调和处理目标对象上Observer 结构的关系
 * 
 * instance ----....-----> prototype
 * 
 */
abstract class Relation {

    /**
     * 在目标target上增加一个不可枚举的属性 key
     * @param target 目标对象
     * @param key 属性名
     * @param value 属性值
     */
    private static addUnEnumerableProp(target: Object, key: PropertyKey, value: unknown) {
        Object.defineProperty(target, key, {
            enumerable: false,
            writable: true,
            configurable: true,
            value,
        })
    }


    /**
     * 从目标对象上获取Observer对象 如果不存在就新建一个
     * @param target 目标对象
     * @returns Observer 对象
     */
    static getOrCreateObserver(target: ObserverTarget) {
        // 属性 enumerable对hasOwnProperty 接口没有影响
        if(!target.hasOwnProperty($OBSERVER)) {
            const observer = new Observer();
            this.addUnEnumerableProp(target, $OBSERVER, observer);
        }

        return target[$OBSERVER];
    }


    /**
     * 
     * @param prototype 
     * @returns 
     */
    static getOrCreateOption(prototype: OptionPrototype) {
        // $OPTION ----- observerOption
        if(!prototype.hasOwnProperty($OPTION)) {
            this.addUnEnumerableProp(prototype, $OPTION, {})
        }

        return prototype[$OPTION]
    }

    /**
     * 通过实例对象获取ObserverOption配置
     * @param target 实力对象
     * @param key 目标字段
     * @returns ObserverOption
     */
    static getOptionByInstance(target: Object, key: PropertyKey): ObserverOption {
        const optionData = this.findOptionFromPropertyChain(target);
        if(optionData) {
            const option = optionData[key as any];
            if(option) {
                return option;
            }
        }
    }

    /**
     * 从原型链上获取$OPTION 对象
     * @param target 实力对象
     * @returns 
     */
    static findOptionFromPropertyChain(target: Object): ObserverOptionData | undefined {
        const property = Object.getPrototypeOf(target);

        if(!property) {
            return undefined;
        }

        const data = property[$OPTION];
        // 如果不存在 就沿着原型链一直找， 直到null
        return data || this.findOptionFromPropertyChain(property);

    }

}

export {
    Relation
}