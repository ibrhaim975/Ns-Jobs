import * as _ from 'lodash';
import { isSet, moduleId } from '../core/base/base.component';
import { Properties } from './Properties';

export class Modules {
  id:any
  name:any
  key: string
  isActive:boolean
  isSystem: boolean
  icon:string;
  properties:Properties[]
  selectedProperty:any
  props:any
  moduleName:any
  public constructor(params?: Modules) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: Modules) {
    if (!isSet(objectToClone)) {
      return new Modules();
    }
  
    const obj = new Modules(objectToClone);
    return obj;

  }
 
  public toDb() {
    console.log(this.isActive);
    
    return {
      name: {
        "ar": this.name?.ar,
        "en": this.name?.en
    },
    isActive: this.isActive,
    icon:this.icon
    }
  }
}
