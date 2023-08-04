import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService {

  constructor(private api: ApiService) {
  }

  
  getRoles(moduleId): Observable<ResponseBody<any[]>> {
    return this.api.get<ResponseBody<any[]>>(`security/roles?moduleId=${moduleId}`)
  }
  getRole(roleId): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`security/roles?id=${roleId}`)
  }
  getClaims(moduleId): Observable<ResponseBody<any[]>> {
    return this.api.get<ResponseBody<any[]>>(`security/clamis?moduleId=${moduleId}`)
  }
  addRole(moduleId,body): Observable<ResponseBody<any[]>> {
    return this.api.post<ResponseBody<any[]>>(`security/roles?moduleId=${moduleId}`,body)
  }

  activeClaimtoRole(body): Observable<ResponseBody<any[]>> {
    return this.api.post<ResponseBody<any[]>>(`security/roleclaim`,body)
  }
  dectiveClaimtoRole(body): Observable<ResponseBody<any[]>> {
    return this.api.deleteBody<ResponseBody<any[]>>(`security/roleclaim`,body)
  }
}
