import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesPermissionsService } from '../roles-permissions.service';
import { ModulesService } from '../../manage-modules/modules.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-roles-permissions-list',
  templateUrl: './roles-permissions-list.component.html',
  styleUrls: ['./roles-permissions-list.component.scss']
})
export class RolesPermissionsListComponent extends BaseComponent implements OnInit {

  constructor(private rolesPermissionsService: RolesPermissionsService, private modulesService: ModulesService,
    public messageService: MessageService, public translates: TranslateService) {
    super(messageService, translates)
  }
  columns = [
    { header: 'Name', field: 'name', width: '90%' }
  ]
  caption = { title: 'Manage Roles', title2: 'Roles' }

  moduleId: any
  roles = []
  selectedRole: any
  rolesActions = []
  displayAddEditRole = false
  @ViewChild('table') table: any;

  ngOnInit(): void {
    this.getRolesActions()
    this.getModuleId()

  }

  getModuleId() {
    this.modulesService.moduleIdEmitter.subscribe(moduleId => {
      if (!moduleId) {
        return
      }
      this.moduleId = moduleId
      this.getRoles()
    })
  }
  getRoles() {
    this.loading = true
    this.rolesPermissionsService.getRoles(this.moduleId).subscribe(claims => {
      this.roles = claims?.data
      this.loading = false

    }, error => {
      this.loading = false
    })
  }
  getRolesActions() {
    this.rolesActions = [
      {
        label: this.trans('Edit'),
        icon: 'pi pi-pencil',
        command: () => {
          this.showAddEditRole()
        }
      },
      {
        label: this.trans('Delete'),
        icon: 'pi pi-trash',
        command: () => {
        }
      },
    ]

  }
  showAddEditRole() {
    this.displayAddEditRole = true
  }
  setSelectedRole(role) {
    this.selectedRole = role
  }
  initRole() {
    this.selectedRole = { name: { en: null, ar: null } }
  }
  onExpanded(role) {
    this.selectedRole = null
    setTimeout(() => {
      this.selectedRole = role
    });
  }
}
