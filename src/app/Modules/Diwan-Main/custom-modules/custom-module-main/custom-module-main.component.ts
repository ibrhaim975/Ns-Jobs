import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { CustomModuleService } from '../custom-module.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-module-main',
  templateUrl: './custom-module-main.component.html',
  styleUrls: ['./custom-module-main.component.scss']
})
export class CustomModuleMainComponent extends BaseComponent implements OnInit {
  breadcrumb = []
  currentModule: any
  currentUrl: any

  columns = []
  data: any
  caption: any
  actionsColumns = [{ header: 'Action', key: 'action' }]
  taskRolesActions = []
  displayAddEdit = false
  displayDetails = false
  moduleActions: any
  selectedEntry: any
  constructor(public translates: TranslateService, public messageService: MessageService, private activatedRoute: ActivatedRoute,
    private customModuleService: CustomModuleService, private confirmationService: ConfirmationService,
    private activateRoute: ActivatedRoute,
    private coreService: CoreService, private router: Router,
  ) {
    super(messageService, translates)

    this.activatedRoute.params.subscribe(params => {
      this.breadcrumb = [{ label: 'Module' }, { label: params['id'], url: `module/${params['id']}` }]

      setTimeout(() => {this.getModule(params['id'])}, );
    })

  }


  ngOnInit(): void {
    this.getFromUrl()
    this.onChangeEntry()
    this.moduleActionsInit()

  }
  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['view'] == 'new') {
        this.initSelectedEntry();
        this.showAddEdit()
      }
      if (params['view'] == 'details') {

        this.showEntryDetails(params['entryId'])

      }
      if (params['view'] == 'edit') {

        this.showAddEdit(params['entryId'], 'edit')

      }


    });
  }
  getModule(module) {
    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {
      if (!isSet(settings)) {
      }
      const moudle = { ...settings?.modules?.find(item => item?.key == module) }
      if (Object.keys(moudle).length == 0) {
        console.log(moudle);
        
        this.router.navigateByUrl('/')
        
      }
      moudle.props = moudle?.props?.filter(item => item?.isIncludeSummary == true)
      this.currentModule = moudle
      this.currentModule.icon = `<i  class=" ${this.currentModule?.icon} text-primary text-3xl"></i>`
      this.caption = { title: this.currentModule?.name }

      const columWidth = 95 / this.currentModule.props.length + '%'

      this.currentModule.props.map(item => {
        let viewType = null
        if (item.viewType == 'user') {
          viewType = 'user'
          // this.columns.push({ header: 'Display Name', field: 'displayName' , display: 'none', width: columWidth  }{ header: item?.name, field: item?.key, type: viewType, width: columWidth })


        }
        if (item.viewType == 'lookup') {
          viewType = 'status'
        }

        if (item.viewType == 'date') {
          viewType = 'date'
        }
        this.columns.push({ header: item?.name, field: item?.key, type: viewType, width: columWidth })


      })
      this.customModuleService.moudleID = this.currentModule?.id

      setTimeout(() => {
        this.getModuleData()
      });
    })
    sub.unsubscribe()
  }
  showAddEdit(entryId?, view?) {

    this.displayAddEdit = true
    this.router.navigate([], {
      queryParams: {
        entryId: entryId,
        view: view || 'new'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  showEntryDetails(entryId) {
    this.displayDetails = true
    this.router.navigate([], {
      queryParams: {
        entryId: entryId,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  initSelectedEntry() {

    this.selectedEntry = null
  }
  getModuleData() {
    this.loading = true
    this.customModuleService.getDataModule().subscribe(modules => {
      this.data = modules?.data?.items
      const dataProps = []
      this.data.map(item => {
        item.props.map(prop => {
          if (prop.viewType == 'api') {
            prop.value = prop?.value?.value
          }
          if (prop.viewType == 'currency') {
            prop.value = prop?.value?.display
          }
          if (prop.viewType == 'percentage') {
            prop.value = prop?.value?.value
          }

        })
        dataProps.push(
          item.props.reduce((obj, cur) => ({ ...obj, [cur.key]: cur.value, id: item.id }), {})
        )
      })

      this.data = dataProps
      this.loading = false

    }, error => {
      this.loading = false

    })
  }
  moduleActionsInit() {
    this.moduleActions = [
      {
        label: this.trans('View'),
        icon: 'pi pi-eye',
        command: () => {
          this.showEntryDetails(this.selectedEntry?.id)
        }

      },
      {
        label: this.trans('Edit'),
        icon: 'pi pi-pencil',
        command: () => {
          console.log(this.selectedEntry?.id);

          this.showAddEdit(this.selectedEntry?.id, 'edit')
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
  setSelectedEntry(Entry) {
    this.selectedEntry = Entry
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
        this.customModuleService.deleteDataModule(this.selectedEntry?.id).subscribe(() => {
          this.data = this.data?.filter(val => val?.id !== this.selectedEntry?.id);
          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }
  onChangeEntry() {
    this.customModuleService.moduleChangeEmitter.subscribe(status => {
      if (!isSet(status)) {
        return
      }
      this.getModuleData()
    })
  }
}
