import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private api: ApiService) { }


  getUsersStatistics(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`app/users-statistics`)
  }
}
