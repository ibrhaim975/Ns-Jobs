import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Lookups } from 'src/app/modals/lookups';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  public lookupChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public lookupChangeEmitter: Observable<any> = this.lookupChange.asObservable();

  constructor(private api: ApiService) {
  }
  getLookups(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`lookups`)
  }
  getLookup(lookupId): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`lookups/${lookupId}?mode=edit`)
  }
  addLookup(lookup: Lookups): Observable<ResponseBody<any[]>> {
    return this.api.post<ResponseBody<any[]>>(`lookups`, lookup.toDb())
  }
  updateLookup(lookup: Lookups): Observable<ResponseBody<any[]>> {
    const lookup_ = Lookups.cloneObject(lookup)
    return this.api.put<ResponseBody<any[]>>(`lookups/${lookup_.id}`, lookup_.toDb())
  }
  deleteLookup(lookupId): Observable<ResponseBody<any[]>> {
    return this.api.delete<ResponseBody<any[]>>(`lookups/${lookupId}`)
  }

  ///
  addLookupItem(data): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`lookups/lookupitem`, data)
  }
  updateLookupItem(lookupItem): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(`lookups/lookupitem/${lookupItem?.id}`, lookupItem)
  }
  getLookupItem(lookupId,lookupItemId): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`lookups/${lookupId}/lookupitem/${lookupItemId}?mode=edit`)
  }
  deleteLookupItem(lookupItemId): Observable<ResponseBody<any>> {
    return this.api.delete<ResponseBody<any>>(`lookups/lookupitem/${lookupItemId}`)
  }

  orderLookupItem(items): Observable<ResponseBody<any[]>> {
    return this.api.put<ResponseBody<any[]>>(`lookups/lookupitems/order`, items)
  }
}
