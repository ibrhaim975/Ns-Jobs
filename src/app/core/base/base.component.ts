import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { DatePipe } from '@angular/common';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-base',
  template: '',
  standalone: true,
  imports: [ToastModule, TranslateModule, LoadingComponent],
})
export class BaseComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  public loading = false;
  currentLang = localStorage.getItem('currentLang')

  fileTypes = ['image/png', 'application/pdf', 'application/vnd.ms-excel', "image/jpeg", ".doc", '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.mp4', '.mov', '.wmv', '.avi', '.mkv']

  constructor(public messageService?: MessageService, public translates?: TranslateService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll(this.subscriptions);
  }

  public unsubscribeAll(subscriptions: Subscription[] = null): void {
    try {
      subscriptions.forEach((subscription: Subscription) => {
        if (isSet(subscription) && !subscription.closed) {
          subscription.unsubscribe();
        }
      });
    } catch (error) {
    }
  }
  hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  // toast messages
  public successMessage(header: string, detail?: string) {
    if (!isSet(header)) {
      header = 'Successful'
    }
    this.messageService.add({ severity: 'success', summary: header, detail: detail || '' });

  }
  public errorMessage(header: string, detail?: string,) {
    if (!isSet(header)) {
      header = 'Error'
    }
    this.messageService?.add({ severity: 'error', summary: header, detail: detail || '' });

  }
  public infoMessage(header: string, detail?: string) {
    if (!isSet(header)) {
      header = 'Info'
    }
    this.messageService.add({ severity: 'info', summary: header, detail: detail || '' });

  }
  minString(word: string, length?) {
    if (!isSet(length)) length = 25
    if (word?.length > length) {
      return word.slice(0, length) + '...';
    } else {
      return word;
    }
  }
  arrayInsert(array,index, ...items){
     return array.splice( index, 0, ...items )    
  
  }
  trans(key: any): any {
    return this.translates?.instant(key)
  }
 
  getFileType(name: string): string {

    if (name.includes('doc') || name.includes('docx')) {
      return 'docx'
    } else if (name.includes('xls') || name.includes('xlsx')) {
      return 'xlsx'
    } else if (name.includes('ppt') || name.includes('pptx')) {

      return 'pptx'
    } else if (name.includes('jpg') || name.includes('png') || name.includes('jpeg') || name.includes('gif') || name.includes('image/png')) {
      return 'image'
    } else if (name.includes('pdf')) {
      return 'pdf'
    } else if (name.includes('txt')) {
      return 'txt'
    } else if (name.includes('xml')) {
      return 'xml'
    } else {
      return 'unknown'
    }
  }

}
export function handlePropsValues(props) {
  
  const propsValues =[]
  if (isSet(props)) {
    props?.map(prop => {
      if (isSet(prop.value)) {
    
      if (prop?.viewType == 'number' ) {
         prop.value = prop.value?.toString()
      }
      if (prop?.viewType == 'user') {
        
         prop.value = prop?.value
      }
      if (prop?.viewType == 'date') {
        const datePipe = new DatePipe('en-US')
         prop.value = datePipe.transform(prop.value, 'yyyy-MM-dd')
      }
      if (prop?.viewType == 'datetime') {
        const datePipe = new DatePipe('en-US')
         prop.value = datePipe.transform(prop.value, 'yyyy-MM-dd hh:mm a')
      }
      if (prop?.viewType == 'user') {
         prop.value = prop?.value?.userName
      }
      if (prop?.viewType == 'lookup') {
         prop.value = prop?.value?.id
      }
      if (prop?.viewType == 'lookupmultiselect') {
         prop.value = [...prop?.value?.map(x => x?.id)]
      }
      console.log(prop);
      
      propsValues.push({
        propertyId: prop?.propertyId?prop?.propertyId:prop?.id,
        value: prop.value,
        id:prop?.propertyId?prop?.id:null
      })
    }
    })
  }


  return propsValues


}
export const isSet = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '' && value?.length !== 0   ;
};

export function moduleId(moduleKey) {
  const modules = JSON.parse(localStorage.getItem('settings')).modules
  return modules?.find(item => item?.key == moduleKey)?.id
}
export function moduleKey(moduleId) {
  const modules = JSON.parse(localStorage.getItem('settings')).modules
  return modules?.find(item => item?.id == moduleId)?.key
}

export function moduleName(moduleKey) {
  const modules = JSON.parse(localStorage.getItem('settings')).modules
  return modules?.find(item => item?.key == moduleKey)?.name
}
export function moduleProps(moduleId) {
  const modules = JSON.parse(localStorage.getItem('settings')).modules
  return modules?.find(item => item?.id == moduleId)?.props
}

export function checkPrivileges(privileges,action) {
 return privileges?.find(item => item?.permissionName == action)?.hasPermission
}