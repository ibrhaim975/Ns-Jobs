import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  constructor(private api: ApiService) { }

  getGeneralSettigs(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`settings/app`)
  }
  getTimeZones(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`settings/timezones`)
  }
  updateGeneralSettings(data): Observable<ResponseBody<any>> {
    let values = {}

    if (Array.isArray(data)) {
      values = data
    } else {
      values = [{
        key: data?.key,
        value: data?.value
      }]
    }


    return this.api.put<ResponseBody<any>>(`settings/app`, { values: values })
  }
}
