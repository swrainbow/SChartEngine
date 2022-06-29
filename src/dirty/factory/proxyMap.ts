import { markDirty } from "../dirtyTag";



const FuncNames = ['set', 'delete', 'clear'] as const;

type FuncName = typeof FuncNames[number];


function proxyFunc<K, V>(origin: Map<K, V>, name: FuncName) {
    Object.defineProperty(origin, name, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function() {
            markDirty(true);
            return Map.prototype[name].apply(this. arguments);
        }
    })
}

function proxyMapFunc<K, V>(origin: Map<K, V>) {
    return FuncNames.reduce((map, name)=> {
        proxyFunc(map, name);
        return map;
    }, origin)
}

export function proxyMap<K, V>(origin: Map<K,V>) {
    return new Proxy(proxyMapFunc(origin), {});
}