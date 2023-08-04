import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, moduleKey } from 'src/app/core/base/base.component';
import { WorkflowService } from '../workflow.service';
import { Router } from '@angular/router';
import { ModulesService } from '../../manage-modules/modules.service';

@Component({
  selector: 'app-workflowregistry',
  templateUrl: './workflowregistry.component.html',
  styleUrls: ['./workflowregistry.component.scss']
})
export class WorkflowregistryComponent extends BaseComponent implements OnInit {

  constructor(public messageService: MessageService, public translates: TranslateService, private workflowService: WorkflowService,
    private modulesService: ModulesService,
    private router: Router) {
    super(messageService, translates)

  }
  registries = []
  columns = [
    { header: 'Name', field: 'name', width: '30%' },
    { header: 'Status', field: 'status', width: '30%', type: 'switch', filter: false },
    { header: 'Last Update', field: 'updatedAt', type: 'date', width: '30%' },
  ]

  caption = { title: 'Manage Approvals', title2: 'Approvals' }
  actionsColumns = [{ header: 'Action', key: 'action' }]
  registriesActions = []
  seletctedRegistry: any
  moduleId: any
  ngOnInit(): void {
    this.getModuleID()
    this.getWorkflowRegistriesModule()
    this.registriesActionsInit()
  }
  getWorkflowRegistriesModule() {
    this.loading = true
    this.workflowService.getworkflowregistryModule(moduleKey(this.moduleId)).subscribe(registries => {
      this.registries = registries?.data
      this.loading = false

    }, error => {
      this.loading = false

    })

  }

  activeDeactivatProperty(eve) {
    const body = {
      id: eve?.id,
      status: eve?.status
    }

    this.loading = true
    this.workflowService.activeDecativeworkflowregistry(body).subscribe(() => {
      this.loading = false
    }, error => {
      this.loading = false

    })

  }

  registriesActionsInit() {
    this.registriesActions = [
      {
        label: this.trans('View'),
        icon: 'pi pi-eye',
        command: () => {


          this.router.navigateByUrl(`${this.router.url}/workflow/${this.seletctedRegistry?.id}`)
        }

      }

    ]

  }
  getModuleID() {
    this.modulesService.moduleIdEmitter.subscribe(moduleId => {
      this.moduleId = moduleId
    })
  }
}
