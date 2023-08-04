import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersGroupsService } from '../users-groups.service';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-users-group-list',
  templateUrl: './users-group-list.component.html',
  styleUrls: ['./users-group-list.component.scss']
})
export class UsersGroupListComponent extends BaseComponent implements OnInit {
  columns = [
    { header: 'User', field: 'user', type: 'user', width: '90%' },

  ]
  actionsColumns = [{ header: 'Action', key: 'action' }]
  @Input() members

  selectedUser: any
  constructor(public translates: TranslateService, public messageService: MessageService, private usersGroupsService: UsersGroupsService,
    private confirmationService: ConfirmationService) {
    super(messageService, translates)

  }

  ngOnInit(): void {

  }
  setSelectedUser(user) {
    this.selectedUser=user
  }

  deleteUser() {
    
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('User'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.usersGroupsService.deleteUser(this.selectedUser?.user?.userName,this.selectedUser?.groupId).subscribe(() => {
          const index = this.members.findIndex(object => { return object.id === this.selectedUser.id })
          this.members.splice(index, 1)
          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }
}
