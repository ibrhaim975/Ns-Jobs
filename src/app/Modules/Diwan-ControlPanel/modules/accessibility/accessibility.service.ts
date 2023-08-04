import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  constructor(private api: ApiService) {
  }
  public accessibilitiesChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public accessibilitiesChangeEmitter: Observable<any> = this.accessibilitiesChange.asObservable();

  getAccessibilities(): Observable<ResponseBody<any[]>> {
    return this.api.get<ResponseBody<any[]>>(`security/accessabilities`)
  }
  getAccessibilitiesGroup(accessabilitiesID): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`security/accessabilities?id=${accessabilitiesID}`)
  }
  updateAccessibilitiesGroup(accessibilitiey): Observable<ResponseBody<any>> {

    return this.api.put<ResponseBody<any>>(`security/accessabilities`, { id: accessibilitiey?.id, groups: accessibilitiey.groups.map(x => x.id) })
  }
  addGroupAccessibilities(): Observable<ResponseBody<any[]>> {
    return this.api.get<ResponseBody<any[]>>(`security/accessabilities`)
  }
}
