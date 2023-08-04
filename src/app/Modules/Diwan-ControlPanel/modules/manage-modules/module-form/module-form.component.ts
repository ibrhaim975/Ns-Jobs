import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { Modules } from 'src/app/modals/Modules';
import { Properties } from 'src/app/modals/Properties';
import { PropertiesService } from '../../mange-properties/properties.service';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleFormComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService,
    private modulesService: ModulesService, private router: Router,
    private coreService: CoreService, private propertiesService: PropertiesService, private confirmationService: ConfirmationService) {
    super(messageService, translates)


  }

  module = new Modules()
  moduleId: any
  modulesActions = []
  columns = [
    { header: 'Name', field: 'name', width: '30%' },
    { header: 'View Type', field: 'viewType' },
    { header: 'Required', field: 'isRequired', type: 'boolean', filter: false },
    { header: 'Active', field: 'isActive', type: 'switch', filter: false }
  ]
  caption = { title: 'Manage Properties', title2: 'Properties' }
  actionsColumns = [{ header: 'Action', key: 'action' }]
  displayAddEditProptry = false
  displayAddEditModule = false
  propertiesActions = []

  ngOnInit(): void {
    this.getFromUrl()
    this.propertiesChange()
    this.moduleChange()
  }

  getFromUrl() {
    this.modulesService.moduleIdEmitter.subscribe(moduleId=>{
      if (!moduleId) {
        return
      }
      this.moduleId = moduleId
      this.getModule()
    })
 
  }

  //Module
  getModule() {
    this.modulesService.getModule(this.moduleId).subscribe(module => {
      this.module = module.data
      // this.caption.title = this.module?.name
      this.modulesActionsInit()
      this.getProperties()
    })

  }
  showAddEditModule() {
    this.displayAddEditModule = true
  }
  initModule() {
    this.module = new Modules()
  }
  deleteModule() {
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
        this.modulesService.deleteModule(this.module?.id).subscribe(() => {
          this.loading = false
          this.router.navigateByUrl('controlPanel/generalsettings/branding')
          localStorage.removeItem('settings')
          this.coreService.getSettings()
        }, error => {
          this.loading = false

        })
      }

    });
  }
  modulesActionsInit() {
    this.modulesActions = []
    this.modulesActions.push({
      label: this.trans('Edit Module'),
      icon: 'pi pi-pencil',
      command: () => {
        this.showAddEditModule()
      }
    })
    if (this.module?.isSystem == false) {
      this.modulesActions.push({
        label: this.trans('Delete Module'),
        icon: 'pi pi-trash',
        command: () => {
          this.deleteModule()
        }
      })

      if (this.module.isActive == false) {
        this.modulesActions.push({
          label: this.trans('Active Module'),
          icon: 'pi pi-check-circle',
          command: () => {
            this.module.isActive = true
            this.activeDeactivateModule()
          }
        })
      }
      if (this.module.isActive == true) {
        this.modulesActions.push({
          label: this.trans('Deactivate Module'),
          icon: 'pi pi-times-circle',
          command: () => {
            this.module.isActive = false
            this.activeDeactivateModule()
          }
        })
      }
    }


  }
  moduleChange() {
    this.modulesService.moduleChangeEmitter.subscribe(stauts => {
      if (!isSet(stauts)) return

      localStorage.removeItem('settings')
      this.coreService.getSettings()
      this.getModule()

    })
  }
  activeDeactivateModule() {
    this.loading = true
    this.modulesService.activeDeactivatModule(this.module?.id, this.module.isActive).subscribe(item => {
      this.loading = false
      localStorage.removeItem('settings')
      this.coreService.getSettings()
      this.getModule()

    }, error => {
      this.loading = false

    })
  }
  //Props
  getProperties() {

    this.loading = true
    const sub = this.propertiesService.getProperties(this.module?.id).subscribe(properties => {

      this.module.properties = properties?.data
      this.propertiesActionsInit()
      this.loading = false
      sub.unsubscribe()
    }, error => {
      this.loading = false

    })
  }
  initSelectedProperty() {
    this.module.selectedProperty = new Properties()
    this.module.selectedProperty.moduleId = this.module?.id
  }
  setSelectedPropertry(porp) {
    this.module.selectedProperty = Properties.cloneObject(porp)
  }
  showAddEditProptry() {

    this.displayAddEditProptry = true
  }
  activeDeactivatProperty(property) {
    this.loading = true
    this.propertiesService.activeDeactivatProperty(property.id, property.isActive).subscribe(item => {
      this.loading = false
      localStorage.removeItem('settings')
      this.coreService.getSettings()
    }, error => {
      this.loading = false

    })
  }
  updateOrderProperty(evnent) {
    console.log(evnent);
    
    this.module.properties[evnent.dropIndex].order = evnent.dropIndex + 1
    this.module.properties[evnent.dragIndex].order = evnent.dragIndex + 1
    const body = {
      keys: [{
        key: this.module.properties[evnent.dropIndex].key,
        id: this.module.properties[evnent.dropIndex].id,
        order: this.module.properties[evnent.dropIndex].order,
      },
      {
        key: this.module.properties[evnent.dragIndex].key,
        id: this.module.properties[evnent.dragIndex].id,
        order: this.module.properties[evnent.dragIndex].order,
      },]
    }
    this.propertiesService.orderProperty(body).subscribe(item => {
      console.log(item);
      this.loading = false
      localStorage.removeItem('settings')
      this.coreService.getSettings()
    }, error => {
      this.loading = false

    })


  }
  deleteProperty() {
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
        this.propertiesService.deleteProperty(this.module?.selectedProperty?.id).subscribe(() => {
          this.loading = false
          this.module.properties = this.module?.properties.filter(val => val?.id !== this.module?.selectedProperty?.id);

          localStorage.removeItem('settings')
          this.coreService.getSettings()
        }, error => {
          this.loading = false

        })
      }

    });
  }
  propertiesActionsInit() {
    this.propertiesActions = [
      {
        label: this.trans('Edit'),
        icon: 'pi pi-pencil',
        command: () => {
          this.showAddEditProptry()
        }
      },
      {
        label: this.trans('Delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.deleteProperty()
        }
      },
    ]

  }
  propertiesChange() {
    this.propertiesService.propertiesChangeEmitter.subscribe(stauts => {
      if (!isSet(stauts)) return
      localStorage.removeItem('settings')
      this.coreService.getSettings()
      this.getProperties()

    })
  }
  //Props


}
