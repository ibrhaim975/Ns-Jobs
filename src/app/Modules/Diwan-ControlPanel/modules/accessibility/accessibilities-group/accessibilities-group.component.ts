import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersGroupsService } from '../../users-groups/users-groups.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-accessibilities-group',
  templateUrl: './accessibilities-group.component.html',
  styleUrls: ['./accessibilities-group.component.scss']
})
export class AccessibilitiesGroupComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accessibilityService: AccessibilityService) {
    super(messageService, translates)

  }
  columns = [
    { header: 'Name', field: 'name', width: '90%' },

  ]
  actionsColumns = [{ header: 'Action', key: 'action' }]
  selectedGroup: any
  @Input() accessibilitiey: any

  ngOnInit(): void {
    this.getAccessibilitiesGroup()
  }
  getAccessibilitiesGroup() {
    this.loading = true
    this.accessibilityService.getAccessibilitiesGroup(this.accessibilitiey?.id).subscribe(accessibilities => {
      this.accessibilitiey = accessibilities?.data
      this.loading = false

    }, error => {
      this.loading = false
    })
  }
  setSelectedGroup(group) {
    this.selectedGroup = group
  }

  deleteGroup() {

    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Module'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.accessibilitiey.groups = this.accessibilitiey?.groups.filter(val => val?.id !== this.selectedGroup?.id);

        this.loading = true
        this.accessibilityService.updateAccessibilitiesGroup(this.accessibilitiey).subscribe(() => {
          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }

}
