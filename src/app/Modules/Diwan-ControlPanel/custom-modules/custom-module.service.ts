import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { handlePropsValues } from 'src/app/core/base/base.component';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class CustomModuleService {

  constructor(private api: ApiService) { }

  public moduleChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public moduleChangeEmitter: Observable<any> = this.moduleChange.asObservable();
  public moudleID: any
  addDataModule(data: any): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`moduledata`, { moduleId: data?.id, propsValues: handlePropsValues(data?.props) })
  }
  updateDataModule(data: any): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`moduledata/${data?.id}`, { moduleId: this.moudleID, propsValues: handlePropsValues(data?.props) })
  }

  getDataModule(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`moduledata?moduleId=${this.moudleID}`)
  }
  getDataModuleEntry(entryID,mode?): Observable<ResponseBody<any>> {
    if (mode == 'edit') mode = '&mode=edit'
    else mode = ''
    return this.api.get<ResponseBody<any>>(`moduledata/${entryID}?moduleId=${this.moudleID}${mode}`)
  }
  
  deleteDataModule(entryID): Observable<ResponseBody<any>> {
    return this.api.delete<ResponseBody<any>>(`moduledata/${entryID}?moduleId=${this.moudleID}`)
  }


}
