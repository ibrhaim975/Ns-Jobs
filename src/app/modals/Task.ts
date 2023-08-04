import * as _ from 'lodash';
import { handlePropsValues, isSet, moduleId } from '../core/base/base.component';
import { UserInfo } from './User';

export class Task {
  id?:any
  taskId:any
  title: { en?: string, ar?: string }
  description: { en: string, ar: string }
  responsible: any
  accountable: any
  informative: any[]
  consult: any[]
  attachments: any[]
  priority: any
  progress: any
  dueDate: any
  tags: any[]
  status: any
  createdAt?:any
  createdBy?:any
  piriority?:any
  updatedReason?:any
  comments:any[]
  raci?:any
  filesCount:any
  commentsCount:any
  props:any
  public constructor(params?: Task) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: Task) {
    if (!isSet(objectToClone)) {
      return new Task();
    }
  
    const obj = new Task(objectToClone);
    return obj;

  }

  public toDb(dueDate) {
    return {
      moduleId: moduleId('Task'),
      title: this.title,
      description: this.description,
      responsible: this.responsible?.userName,
      accountable: this.accountable?.userName,
      informative: _.map(this.informative, item => { return item?.userName}),
      consult: _.map(this.consult, item => {return item?.userName}),
      priority: this.priority?.id,
      status: this.status?.id,
      dueDate:dueDate,
      tags:_.map(this.tags, item => {return item?.id}),
      attachments:_.map(this.attachments, item => {return item?.fileName}),
      updatedReason:this.updatedReason,
      progress:this.progress,
      propsValues:handlePropsValues(this.props)


    }
  }
}
