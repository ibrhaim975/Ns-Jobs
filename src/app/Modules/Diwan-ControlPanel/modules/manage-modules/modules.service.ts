import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Modules } from 'src/app/modals/Modules';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  public moduleChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public moduleChangeEmitter: Observable<any> = this.moduleChange.asObservable();

  public moduleId: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public moduleIdEmitter: Observable<any> = this.moduleId.asObservable();

  constructor(private api: ApiService) {
  }
  getModules(): Observable<ResponseBody<Modules[]>> {
    return this.api.get<ResponseBody<Modules[]>>(`module`)
  }
  addModule(module: Modules): Observable<ResponseBody<Modules>> {

    return this.api.post<ResponseBody<Modules>>(`module`, module?.toDb())
  }
  deleteModule(id: string): Observable<ResponseBody<Modules>> {

    return this.api.delete<ResponseBody<Modules>>(`module/${id}`)
  }
  getModule(id: string,mode?): Observable<ResponseBody<Modules>> {
    if (mode == 'edit') mode = '?mode=edit'
    else mode = ''
    return this.api.get<ResponseBody<Modules>>(`module/${id}${mode}`)
  }
  updateModule(module_: Modules): Observable<ResponseBody<Modules>> {
    const cloneObject = Modules.cloneObject(module_)
    return this.api.put<ResponseBody<Modules>>(`module/${module_?.id}`, cloneObject?.toDb())
  }
  activeDeactivatModule(id: string, isActive: boolean): Observable<ResponseBody<Modules>> {

    return this.api.put<ResponseBody<Modules>>(`module/deactive/${id}`, { isActive: isActive })
  }
}
