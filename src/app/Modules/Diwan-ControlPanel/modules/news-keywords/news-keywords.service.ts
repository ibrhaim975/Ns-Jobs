import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class NewsKeywordsService {

  constructor(private api: ApiService) { }

  public newsChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public newsChangeEmitter: Observable<any> = this.newsChange.asObservable();

  getKeywords(): Observable<ResponseBody<any[]>> {
    return this.api.get<ResponseBody<any[]>>(`news/keywords`)
  }

  syncNews(): Observable<any> {
    return this.api.get<any>(`news/sync`)
  }
  addKeyword(body): Observable<ResponseBody<any[]>> {
    return this.api.post<ResponseBody<any[]>>(`news/keywords`,body)
  }
  updateKeyword(id,body): Observable<ResponseBody<any[]>> {
    return this.api.put<ResponseBody<any[]>>(`news/keywords/${id}`,body)
  }
  deleteKeyword(id): Observable<ResponseBody<any[]>> {
    return this.api.delete<ResponseBody<any[]>>(`news/keywords/${id}`)
  }
}
