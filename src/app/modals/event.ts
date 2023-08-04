import { isSet } from "../core/base/base.component";



export class Calendar_event {
  id: string;
  company: any;
  title: string;
  description: string;
  start: Date;
  startTime: any;
  end: Date;
  endTime: any;
  startP: any;
  endP: any;
  date: any
  color: string;
  priority: string
  created_at: any;
  updated_at: Date;
  company_user: any;
  public constructor(params?: Calendar_event) {
    Object.assign(this, params);
  }

  public static cloneObject(objectToClone: Calendar_event) {
    if (!isSet(objectToClone)) {
      return objectToClone;
    }
    const obj = new Calendar_event(objectToClone);


    return obj;
  }

  public static cloneManyObjects(objectsToClone: Calendar_event[]) {
    const objects: Calendar_event[] = [];
    for (const obj of objectsToClone) {
      objects.push(Calendar_event.cloneObject(obj));
    }

    return objects;
  }

  public addtoDB() {

    return {
      title: this.title,
      description: this.description,
      start: this.start,
      end: this.end,
      color: this.color,
      priority: this.priority
    }

  }

}
