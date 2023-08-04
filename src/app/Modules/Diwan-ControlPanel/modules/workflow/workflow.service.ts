import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  public workflowChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public workflowChangeEmitter: Observable<any> = this.workflowChange.asObservable();

  public activitySumbit: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public activitySumbitEmitter: Observable<any> = this.activitySumbit.asObservable();

  public actionSumbit: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public actionSumbitEmitter: Observable<any> = this.actionSumbit.asObservable();

  
  public activityDelete: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public activityDeleteEmitter: Observable<any> = this.activityDelete.asObservable();

  public actionDelete: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public aactionDeleteEmitter: Observable<any> = this.actionDelete.asObservable();

  public actionEdit: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public actionEditEmitter: Observable<any> = this.actionEdit.asObservable();

  constructor(private api: ApiService) { }

  
  getworkflowregistryModule(moduleKey): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`workflowschema/workflowregistry?moduleKey=${moduleKey}`)
  }
  getworkflowregistry(id): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`workflowschema/workflowregistry/${id}`)
  }

  activeDecativeworkflowregistry(body): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`workflowschema/workflowregistrystatus`,body)
  }

  createActivity(body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`workflowschema/workflowactivity`,body)
  }
  deleteActivity(id): Observable<ResponseBody<any>> {
    return this.api.delete<ResponseBody<any>>(`workflowschema/workflowactivity/${id}`)
  }
  updateActivityName(body): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`workflowschema/workflowactivityname`,body)
  }
  createActivityCondition(body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`workflowschema/workflowaconditionaactivity`,body)
  }

  createActivityAction(body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`workflowschema/workflowaction`,body)
  }

  deleteActivityAction(id): Observable<ResponseBody<any>> {
    return this.api.delete<ResponseBody<any>>(`workflowschema/workflowaction/${id}`)
  }
  editActivityAction(body): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`workflowschema/workflowaction`,body)
  }

  updateActivityAction(body): Observable<ResponseBody<any>> {
    console.log(body);
    
    return this.api.put<ResponseBody<any>>(`workflowschema/workflowactivityprevious`,body)
  }
}
