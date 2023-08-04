import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class UsersGroupsService {

  public groupsChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public groupsChangeEmitter: Observable<any> = this.groupsChange.asObservable();

  constructor(private api: ApiService) { }

  getUsers(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`users`)
  }
  getGroups(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`security/groups`)
  }
  getGroup(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`security/groups?mode=edit`)
  }
  addGroup(body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`security/groups`, body)
  }
  addUser(user,groupID): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`security/groups/users`, { userId: user,groupId:groupID })
  }
  deleteGroup(groupID): Observable<ResponseBody<any>> {
    return this.api.deleteBody<ResponseBody<any>>(`security/groups`, { id: groupID })
  }

  deleteUser(user,groupID): Observable<ResponseBody<any>> {
    return this.api.deleteBody<ResponseBody<any>>(`security/groups/users`, { userId: user,groupId:groupID })
  }
}
