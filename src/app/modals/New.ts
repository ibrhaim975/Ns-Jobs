import * as _ from 'lodash';
import { isSet, moduleId } from '../core/base/base.component';
import { UserInfo } from './User';

export class New {
  id?:any
  title: string
  details: any
  image:any
  link:any
  source:any
  keyword:any
  createdBy:any
  createdAt:any
  view:any
  date:any
  sentiment:any
  isSync:boolean
  public constructor(params?: New) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: New) {
    if (!isSet(objectToClone)) {
      return new New();
    }
  
    const obj = new New(objectToClone);
    return obj;

  }
  public toDb(newsDate) {
    return {
      moduleId: moduleId('New'),
      title: this.title,
      date: newsDate, 
      details: this.details,
      image: this.image?.fileName,
      link:this.link,
      sourceId:this.source?.id,
      keywordId:this.keyword?.id,
      sentiment:this.sentiment?.id,


    }
  }
}
