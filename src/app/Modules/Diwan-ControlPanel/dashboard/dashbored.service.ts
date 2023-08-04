import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { isSet } from 'src/app/core/base/base.component';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class DashboredService {

  constructor(private api: ApiService) {
   }

   getDashboard(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`home/dashboard`)
  }

  getTasks(params?): Observable<ResponseBody<any>> {
    if (isSet(params)) params =  `?${params}`
    else params = ''
    return this.api.get<ResponseBody<any>>(`tasks${params}`)
  }
  getMeetings(params?): Observable<ResponseBody<any>> {
    if (isSet(params)) params =  `?${params}`
    else params = ''
    return this.api.get<ResponseBody<any>>(`meetings${params}`)
  }
  getCommittees(params?): Observable<ResponseBody<any>> {
    if (isSet(params)) params =  `?${params}`
    else params = ''
    return this.api.get<ResponseBody<any>>(`committees${params}`)
  }
}
