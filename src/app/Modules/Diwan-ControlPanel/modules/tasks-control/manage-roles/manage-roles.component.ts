import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService) {
    super(messageService, translates)
  }  
  columns = [{ header: 'Role', field: 'role' ,width:'60%'}]
  data = [{ role: 'test1' }, { role: 'test2' }]
  caption = { title: 'Manage Roles' }
  loadingTable = false
  actionsColumns = [{ header: 'Enable', key: 'enable' }, { header: 'Action', key: 'action' }]
  taskRolesActions = []
  ngOnInit(): void {
    this.taskRolesActions=[
      {
        label: this.trans('Edit'),
        icon: 'pi pi-pencil',
        command: (event) => {
        }
      },
      {
        label: this.trans('Delete'),
        icon: 'pi pi-trash',
        command: (event) => {
        }
      }
    ]
  }

}
