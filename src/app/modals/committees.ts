import * as _ from 'lodash';
import { handlePropsValues, isSet, moduleId } from '../core/base/base.component';
import { UserInfo } from './User';

export class Committees {
  id?: any
  title: { en?: string, ar?: string } | any
  type:any
  flag:any
  status:any
  details: any
  chairman: any
  secretary: any
  members: any[]
  profilePic: any
  createdAt?: any
  createdBy?: any
  attachments: any[]
  startDate:any
  endDate:any
  meetings:any
  props:any
  deliverables:any[]
  recurrence:any
  chairmanResponsibilities:any[]
  public constructor(params?: Committees) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: Committees) {
    if (!isSet(objectToClone)) {
      return new Committees();
    }

    const obj = new Committees(objectToClone);
    return obj;

  }
  public toDb(startDate,endDate) {
   
    return {
      moduleId: moduleId('Committee'),
      propsValues:handlePropsValues(this.props),
      title: this.title,
      startDate:startDate,
      endDate:endDate,
      type:this.type?.id,
      statues:this.status?.id,
      flag:this.flag?.id,
      details:this.details,
      chairman:this.chairman?.userName,
      secretary:this.secretary?.userName,
      members:_.map(this.members, item => {return item?.userName}),
      profilePic:this.profilePic?.fileName,
      deliverables:this.deliverables,
      chairmanResponsibilities:this.chairmanResponsibilities,
      recurrence:this.recurrence?.id,
      attachments: _.map(this.attachments, item => { return item?.fileName }),


    }
  }
}
