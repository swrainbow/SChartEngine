import { markDirty } from "../dirtyTag";

/**
 * 需要代理的数组方法
 */
const FuncNames = ['push', 'unshift', 'pop', 'shift', 'fill', 'reverse', 'splice'] as const;

/**
 * 可代理的数组方法类型
 */
type FuncName = typeof FuncNames[number];


/**
 * 在数组对象上代理原有方法
 * @param origin 原数组
 * @param name 要代理的方法名称
 */
function proxyFunc<T>(origin: Array<T>, name: FuncName) {
    Object.defineProperty(origin, name, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function() {
            markDirty(true);
            return Array.prototype[name].apply(this, arguments);
        }
    })
}


/**
 * 代理Array 会对原数据产生变更的方法
 * @param origin 原数组
 * @returns 
 */
function proxyArrayFunc<T>(origin: Array<T>) {
    return FuncNames.reduce((arr, name)=>{
        proxyFunc(arr, name);
        return arr;
    }, origin);
}

 /**
  * 代理目标数组
  * @param origin 目标数组
  * @returns 
  */
export function proxyArray<T>(origin: Array<T>) {
    return new Proxy(proxyArrayFunc(origin), {
        set(target: T[], key: PropertyKey, value: any) {
            markDirty(true);
            return Reflect.set(target, key, value);
        }
    })
}



