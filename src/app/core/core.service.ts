import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseBody } from '../modals/response';
import { UserInfo } from '../modals/User';
import { UserToken } from '../modals/UserToken';
import { ApiService } from './api.service';
import { isSet } from './base/base.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public setSetings: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('settings')));
  public getSetingsEmitter: Observable<any> = this.setSetings.asObservable();

  public setAccessibilities: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('accessibilities')));
  public getAccessibilitiesEmitter: Observable<any> = this.setAccessibilities.asObservable();


  public setGenralSettings: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('genralSettings')));
  public genralSettingsEmitter: Observable<any> = this.setGenralSettings.asObservable();

  

  constructor(private api?: ApiService) { }

  getSettings() {

    if (isSet(localStorage.getItem('settings'))) {
      return
    }
    this.api.get<any>(`app/settings`).subscribe(item => {
      this.setSetings.next(item?.data)

      localStorage.setItem('settings', JSON.stringify(item?.data))
    })
  }
  getGenralSettings() {
    const favIcon: HTMLLinkElement = document.querySelector('#appIcon');
    const systemName: HTMLLinkElement = document.querySelector('#appName');

    if (isSet(localStorage.getItem('genralSettings'))) {

      const genralSettings = JSON.parse(localStorage.getItem('genralSettings'))
      const primaryColor = genralSettings?.find(item => item?.key == 'PrimaryColor')?.value
      const textColor = genralSettings?.find(item => item?.key == 'TextColor')?.value
      const secondaryColor = genralSettings?.find(item => item?.key == 'SecondaryColor')?.value

      if (genralSettings?.find(item => item?.key == 'BrowserTabIcon')?.value) {
        favIcon.href = genralSettings?.find(item => item?.key == 'BrowserTabIcon')?.value;
      }
      if (genralSettings?.find(item => item?.key == 'BusinessName')?.value) {
        systemName.innerHTML = genralSettings?.find(item => item?.key == 'BusinessName')?.value;
      }

      if (primaryColor) {

        document.documentElement.style.setProperty('--primary-color', primaryColor)
      }
      if (textColor) {
        document.documentElement.style.setProperty('--text-color', textColor)
      }
      if (secondaryColor) {
        document.documentElement.style.setProperty('--surface-500', secondaryColor)
      }
      return
    }


    this.api.getGuest<any>(`settings/app`).subscribe(item => {


      this.setGenralSettings.next(item?.data)
      localStorage.setItem('genralSettings', JSON.stringify(item?.data))

      const primaryColor = item?.data?.find(item => item?.key == 'PrimaryColor')?.value
      const textColor = item?.data?.find(item => item?.key == 'TextColor')?.value
      const secondaryColor = item?.data?.find(item => item?.key == 'SecondaryColor')?.value

      if (primaryColor) {

        document.documentElement.style.setProperty('--primary-color', primaryColor)
      }
      if (textColor) {
        document.documentElement.style.setProperty('--text-color', textColor)
      }
      if (secondaryColor) {
        document.documentElement.style.setProperty('--surface-500', secondaryColor)
      }

      const favIcon: HTMLLinkElement = document.querySelector('#appIcon');

      favIcon.href = item?.data?.find(item => item?.key == 'BrowserTabIcon')?.value;
      systemName.innerHTML = item?.data?.find(item => item?.key == 'BusinessName')?.value;


    })
  }

  uploadAttachment(body: any) {
    return this.api.post<ResponseBody<any>>(`uploader`, body)
  }
  downloadAttachment(id) {
    return this.api.getFile<any>(`uploader/${id}`)
  }
  findUser(displayName): Observable<ResponseBody<UserInfo[]>> {
    return this.api.get<ResponseBody<UserInfo[]>>(`users/find?q=${displayName}`)
  }

  getTags(): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`common/tags`)
  }

  addTag(tag): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`common/tags`, { tagName: tag })
  }

  getActivities(module): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(`common/comments?module=${module}`)
  }
  addComment(body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`common/comments`, body)
  }
  addWorkflowComment(id,body): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(`workflowdata/registry/message/${id}`, body)
  }

  displayIogo(generalSettigs) {

    const logo = generalSettigs?.find(item => item?.key == 'Logo').value
    if (!isSet(logo)) {
      return
    }
    const index = generalSettigs.findIndex(object => { return object.key === 'Logo' })
    this.downloadAttachment(logo?.fileName).subscribe(res => {
      var blob = new Blob([res], { type: 'image/png' });

      let Imgviwe = null
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        Imgviwe = reader.result
      }

      setTimeout(() => {
        generalSettigs[index].value = Imgviwe
        this.setGenralSettings.next(generalSettigs)
        localStorage.setItem('genralSettings', JSON.stringify(generalSettigs))
      }, 50);


    })


  }

  getPrivileges(moduleId, instanceId?): Observable<ResponseBody<any>> {
    moduleId = `?moduleId=${moduleId}`
    

    if (isSet(instanceId)) instanceId = `&instanceId=${instanceId}`
    else instanceId = ''
    const info = moduleId + instanceId


    return this.api.get<ResponseBody<any>>(`module/privileges${info}`)
  }
  putCustomUrl(url, bdoy): Observable<ResponseBody<any>> {
    return this.api.put<ResponseBody<any>>(url, bdoy)
  }
  postCustomUrl(url, bdoy): Observable<ResponseBody<any>> {
    return this.api.post<ResponseBody<any>>(url, bdoy)
  }
  getCustomUrl(url): Observable<ResponseBody<any>> {
    return this.api.get<ResponseBody<any>>(url)
  }
  getAccessibilities() {
    
    if (isSet(localStorage.getItem('accessibilities')) || !isSet(localStorage.getItem('authData')) ) {
      return
    }
    this.api.get<ResponseBody<any>>(`app/accessibility`).subscribe(accessibilities=>{
      
     this.setAccessibilities.next(accessibilities?.data)
     localStorage.setItem('accessibilities',JSON.stringify(accessibilities?.data))
    })
 }

 
}

