import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { ResponseBody } from 'src/app/modals/response';

@Injectable({
  providedIn: 'root'
})
export class MySpaceService extends BaseComponent {

  public dataChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dataChangeEmitter: Observable<any> = this.dataChange.asObservable();

  public onActionClick: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public onActionClickEmitter: Observable<any> = this.onActionClick.asObservable();

 
  constructor(public translates: TranslateService, public messageService: MessageService, private api: ApiService, private confirmationService: ConfirmationService,
    private coreService: CoreService, private router: Router) {
    super(messageService, translates)
  }



  getWorkflowData(filter: any): Observable<ResponseBody<any>> {

    filter = `?filters=${filter}`
    return this.api.get<ResponseBody<any>>(`workflowdata/registry${filter}`)
  }

}
