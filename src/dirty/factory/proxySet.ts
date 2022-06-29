import { markDirty } from "../dirtyTag";


const FuncNames = ['add', 'delete', 'clear'] as const;


type FuncName = typeof FuncNames[number];

function proxyFunc<T>(origin: Set<T>, name: FuncName) {
    Object.defineProperty(origin, name, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function() {
            markDirty(true);
            return Set.prototype[name].apply(this, arguments);
        }
    })
}


function proxySetFunc<T>(origin: Set<T>) {
    return FuncNames.reduce((set, name)=> {
        proxyFunc(set, name);
        return set;
    }, origin)
}

export function proxySet<T>(origin: Set<T>) {
    return new Proxy(proxySetFunc(origin), {})
}