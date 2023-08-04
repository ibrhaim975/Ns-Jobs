import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CustomModuleService } from '../custom-module.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Modules } from 'src/app/modals/Modules';

@Component({
  selector: 'app-add-edit-custom-module',
  templateUrl: './add-edit-custom-module.component.html',
  styleUrls: ['./add-edit-custom-module.component.scss']
})
export class AddEditCustomModuleComponent extends BaseComponent implements OnInit {

  constructor(private customModuleService: CustomModuleService,
    public messageService: MessageService, public translates: TranslateService,
    private activateRoute: ActivatedRoute, private coreService: CoreService,

    private router: Router) {
    super(messageService, translates)

  }

  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  title: any
  currentModule = new Modules()
  currentModuleName: any
  modeEdit = false
  props=[]
  ngOnInit(): void {
    this.initModule()
    this.getFormUrl()

  }
  initModule() {
    this.activateRoute.params.subscribe(params => {
      this.getModule(params['id'])
    })
  }
  getFormUrl() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['entryId']) {
        this.getEntry(params['entryId'])
      }

    });

  }
  addData() {
    this.loading = true
    this.customModuleService.addDataModule(this.currentModule).subscribe(() => {
      this.customModuleService.moduleChange.next(true)
      this.onHide()
      this.loading = false

    }, error => {
      this.loading = false
    })
  }
  editData() {
    this.loading = true
    this.customModuleService.updateDataModule(this.currentModule).subscribe(() => {
      this.customModuleService.moduleChange.next(true)
      this.onHide()
      this.loading = false

    }, error => {
      this.loading = false
    })
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
  getModule(module) {
    this.currentModule=null
    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {
      if (!isSet(settings)) {
        return
      }
     const customModule = { ...settings?.modules?.find(item => item?.key == module) }
      this.currentModule =  JSON.parse(JSON.stringify(customModule))
      this.props= [...this.currentModule?.props]
      this.title = this.trans('Add New') +' '+ this.currentModule?.name

    })
    sub.unsubscribe()
  }

  getEntry(entryId) {
    this.loading = true
    this.customModuleService.getDataModuleEntry(entryId, 'edit').subscribe(entry => {
      this.currentModule = entry.data
      this.loading = false
      this.title = this.trans('Edit') + ' ' + this.currentModule?.moduleName + `(${this.currentModule?.id})`
      this.modeEdit = true

      this.currentModule?.props.map(item => {
        this.props?.map(prop => {
          if (item?.propertyId == prop?.id) {
       

            prop.value = item?.value
            prop.propertyId = item?.propertyId
            prop.id = item?.id

          }
        })
      })
      
      this.currentModule.props = this.props

    }, error => {
      this.loading = false

    })
  }
  addEditData() {
    if (this.modeEdit == true) {
      this.editData()
    } else {
      this.addData()
    }
  }
}
