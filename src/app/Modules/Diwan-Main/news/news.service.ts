import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { isSet } from 'src/app/core/base/base.component';
import { New } from 'src/app/modals/New';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private api: ApiService, private datePipe: DatePipe) { }


  addNews(news: New): Observable<ResponseBody<New>> {
    const newsDate = this.datePipe.transform(news?.date, 'yyyy-MM-dd HH:mm:ss')
    return this.api.post<ResponseBody<New>>(`news`, news.toDb(newsDate))
  }

  getNews(sourceId): Observable<ResponseBody<any[]>> {
    let source =''
    if (isSet(sourceId)) source=`?sourceId=${sourceId}`
    
    return this.api.get<ResponseBody<any[]>>(`news${source}`)
  }
  getNewsDashboards(): Observable<ResponseBody<any[]>> {
    return this.api.get<ResponseBody<any[]>>(`news/kpis`)
  }
  getNewsSentiment(sourceId?): Observable<ResponseBody<any[]>> {
    let source =''
    if (isSet(sourceId)) source=`?sourceId=${sourceId}`
  
    return this.api.get<ResponseBody<any[]>>(`/news/sentiment${source}`)
  }
  getNew(id, mode?): Observable<ResponseBody<any>> {
    if (mode == 'edit') mode = '?mode=edit'
    else mode = ''
    return this.api.get<ResponseBody<any>>(`news/${id}${mode}`)
  }

  updateNew(newD: New): Observable<ResponseBody<any>> {
    const newsDate = this.datePipe.transform(newD?.date, 'yyyy-MM-dd HH:mm:ss')

    return this.api.put<ResponseBody<any>>(`news/${newD.id}`, newD?.toDb(newsDate))
  }
  deleteNew(id): Observable<ResponseBody<any>> {
    return this.api.delete<ResponseBody<any>>(`news/${id}`)
  }
  blockSource(id): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`news/source/block/${id}`,{})
  }

  unpublishNew(id): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`news/unpublish/${id}`,{})
  }
}

