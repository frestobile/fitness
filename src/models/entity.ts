export function purgeAttribute(ref: any, object:Record<string|number,any>,attr:String):any
{        
    if(object==null || object==undefined) return null;
    if(object.hasOwnProperty(attr.toString())) return object[attr.toString()]
    if(ref.hasOwnProperty(attr.toString()))  return Reflect.get(ref,attr.toString());
    return null;
}

export function generateId():String
{
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
}

export interface SingleObjet{
    id: number;
    name: string;
}

export class Entity
{
    _id?:string="";
    
    set id(id:string){
        this._id=id;
    }

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        let r: any={};
        for(const k of Object.keys(this))
        {
            r[k]=Reflect.get(this,k);
        }
        return r;
    }
}