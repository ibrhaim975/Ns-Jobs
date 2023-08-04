import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { isSet } from 'src/app/core/base/base.component';
import { Properties } from 'src/app/modals/Properties';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private api: ApiService) {
  }
  public propertiesChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public propertiesChangeEmitter: Observable<any> = this.propertiesChange.asObservable();

  getProperties(moduleId): Observable<ResponseBody<Properties[]>> {
    return this.api.get<ResponseBody<Properties[]>>(`module/${moduleId}/properties`)
  }
  getProperty(property): Observable<ResponseBody<Properties>> {
    return this.api.get<ResponseBody<Properties>>(`module/${property?.moduleId}/properties/${property?.id}?mode=edit`)
  }
  deleteProperty(propertyID): Observable<ResponseBody<Properties>> {
    return this.api.delete<ResponseBody<Properties>>(`module/properties/${propertyID}`)
  }
  updateProperty(property: Properties): Observable<ResponseBody<Properties[]>> {
    const property_ = Properties.cloneObject(property)
    return this.api.put<ResponseBody<Properties[]>>(`module/properties/${property_?.id}`, property_.addToDb())
  }
  activeDeactivatProperty(propertyID, isActive): Observable<ResponseBody<Properties[]>> {

    return this.api.put<ResponseBody<Properties[]>>(`module/properties/deactive/${propertyID}`, { isActive: isActive })
  }
  addProperty(property: Properties): Observable<ResponseBody<Properties[]>> {
    const property_ = Properties.cloneObject(property)
    property_.isActive = true
    return this.api.post<ResponseBody<Properties[]>>(`module/properties`, property_.addToDb())

  }
  orderProperty(properties): Observable<ResponseBody<Properties[]>> {
    return this.api.put<ResponseBody<Properties[]>>(`module/properties/order`, properties)

  }
  checkFormula(moduleId, body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`module/check-formula`, { moduleId: moduleId, formula: body })

  }
  checkApi(apiData): Observable<ResponseBody<any>> {
    const headers: any = {}
    apiData.headers.map(item => {
      headers[item?.key] = item?.value
    })
    apiData.headers = headers
    return this.api.post<ResponseBody<any>>(`module/call-api`, apiData)

  }
  detectJsonSchema(jsonData): Observable<ResponseBody<any>> {
    
    return this.api.post<ResponseBody<any>>(`module/detect-json-schema`, {jsonData:jsonData})

  }
}
