import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { UsersGroupsService } from '../users-groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private usersGroupsService: UsersGroupsService,
    private confirmationService: ConfirmationService) {
    super(messageService, translates)

  }
  columns = [
    { header: 'Name', field: 'name', width: '45%' },
    { header: 'Users', field: 'users', width: '40%' },

  ]
  caption = { title: 'Manage Groups', title2: 'Group' }
  actionsColumns = [{ header: 'Action', key: 'action' }]
  groups = []
  groupsActions = []
  displayAddEditGroup = false
  displayAddEditUser = false

  selectedGroup: any
  members = []
  expanded = false
  ngOnInit(): void {
    this.getGroupsActions()
    this.getGroups()
    this.groupsChange()
  }

  getGroupsActions() {

    this.groupsActions = [
      {
        label: this.trans('Edit'),
        icon: 'pi pi-pencil',
        command: () => {
          this.showAddEditGroup()
        }
      },
      // {
      //   label: this.trans('Delete'),
      //   icon: 'pi pi-trash',
      //   command: () => {
      //     this.deleteGroup()
      //   }
      // },
      {
        label: this.trans('Add User'),
        icon: 'pi pi-plus',
        command: () => {
          this.showAddUsers()
        }
      }
    ]


  }

  showAddEditGroup() {
    this.displayAddEditGroup = true
  }
  setSelectedGroup(group) {
    this.selectedGroup = { ...group }
    
  }
  initSelectedGroup() {
    this.selectedGroup = { name: { en: '', ar: '' } }
  }

  deleteGroup() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Group'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.usersGroupsService.deleteGroup(this.selectedGroup?.id).subscribe(() => {
          const index = this.groups.findIndex(object => { return object.id === this.selectedGroup.id })
          this.groups.splice(index, 1)
          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }
  getGroups() {
    this.loading = true

    this.usersGroupsService.getGroups().subscribe(groups => {
      this.loading = false
      this.groups = groups?.data
      this.groups.map(item => {
        item['users'] = item?.members?.length
      })
      this.initSelectedGroup()

      if (this.expanded == true) {
        this.expanded =false
        setTimeout(() => {
          this.expanded =true
          const group=this.groups?.find(item => item?.id == this.members[0]?.groupId)
          this.members = group.members
        });
      }

    }, error => {
      this.loading = false

    })
  }
  groupsChange() {
    this.usersGroupsService.groupsChangeEmitter.subscribe(status => {
      if (!isSet(status)) {
        return
      }

        

      this.getGroups()
    })
  }

  showAddUsers() {
    this.displayAddEditUser = true
  }
  onExpanded(group) {
    this.expanded = false
    setTimeout(() => {
      this.expanded = true
      this.members = group.members
    });
  }
}
