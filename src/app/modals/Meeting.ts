import * as _ from 'lodash';
import { handlePropsValues, isSet, moduleId } from '../core/base/base.component';

export class Meeting {
  id?: any
  title: string
  agenda: string
  startDateTime: any
  finishDateTime: any
  location: string
  notes: string
  attachments: any[]
  priority: any
  invited: any[]
  createdBy:any
  createdAt:any
  dateDiff:any
  timeDiff:any
  organizer:any
  status:any
  hasMom:boolean
  comments:any
  commentsCount:any;
  filesCount:any
  props:any
  public constructor(params?: Meeting) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: Meeting) {
    if (!isSet(objectToClone)) {
      return new Meeting();
    }

    const obj = new Meeting(objectToClone);
    return obj;

  }
  public toDb(startDateTime,finishDateTime) {
    return {
      moduleId: moduleId('Meeting'),
      propsValues:handlePropsValues(this.props),
      id:this.id,
      title: this.title,
      agenda: this.agenda,
      startDateTime: startDateTime,
      finishDateTime: finishDateTime,
      location: this.location,
      notes: this.notes,
      priority: this.priority?.id,
      invited: _.map(this.invited, item => { return item?.userName }),
      attachments: _.map(this.attachments, item => { return item?.fileName }),

    }
  }
}
