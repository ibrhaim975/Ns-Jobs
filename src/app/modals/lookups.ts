import * as _ from 'lodash';
import { isSet, moduleId } from '../core/base/base.component';
import { UserInfo } from './User';

export class Lookups {
  id?: any
  key: any
  displayName: { En?: string, Ar?: string } | any
  allowDelete: any
  allowManage: any
  allowEdit: any
  items: Array<{id: string;key: string;name:{ En?: string, Ar?: string } | any;details:any,order:number}>
  items_: any

  public constructor(params?: Lookups) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: Lookups) {
    if (!isSet(objectToClone)) {
      return new Lookups();
    }

    const obj = new Lookups(objectToClone);
    return obj;

  }
  public toDb() {

    return {
      displayName: this.displayName,



    }
  }
}
