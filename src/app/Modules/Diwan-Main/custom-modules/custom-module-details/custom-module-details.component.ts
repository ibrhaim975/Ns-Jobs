import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';
import { CustomModuleService } from '../custom-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-custom-module-details',
  templateUrl: './custom-module-details.component.html',
  styleUrls: ['./custom-module-details.component.scss']
})
export class CustomModuleDetailsComponent extends BaseComponent implements OnInit {

  constructor(private customModuleService: CustomModuleService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private confirmationService: ConfirmationService,private coreService : CoreService,
    public translates: TranslateService, public messageService: MessageService) {
    super(messageService, translates)

  }
  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  currentModule: any
  currentModuleActinos: any
  accessibility:any
  ngOnInit(): void {
    this.moduleActionsInit()
    this.getFormUrl()
  }
  getFormUrl() {
    const sub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['entryId']) {
        this.getEntry(params['entryId'])
      }
    });
    sub?.unsubscribe()

  }
  onHide() {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        entryId: null,
        view: null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  getEntry(entryId) {
    this.loading = true
    this.customModuleService.getDataModuleEntry(entryId).subscribe(entry => {
      this.currentModule = entry.data
      this.loading = false

    }, error => {
      this.loading = false

    })
  }
  getAccessibilities(){
    this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
      this.accessibility= accessibilities?.find(item => item?.key == "CustomModule")
    })

  }	
  moduleActionsInit() {
    if (this.accessibility?.hasPermission==true) {
      this.currentModuleActinos = [

        {
          label: this.trans('Edit'),
          icon: 'pi pi-pencil',
          command: () => {
            this.onHide()
            this.router.navigate([], {
              queryParams: {
                entryId: this.currentModule?.id,
                view:  'edit'
              }
              ,
              queryParamsHandling: 'merge',
            })
  
          }
  
        },
        {
          label: this.trans('Delete'),
          icon: 'pi pi-trash',
          command: () => {
            this.deleteEntry()
          }
        },
      ]
    }

  }

  deleteEntry() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Module'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.customModuleService.deleteDataModule(this.currentModule?.id).subscribe(() => {
          this.customModuleService.moduleChange.next(true)
          this.onHide()
          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }
}
