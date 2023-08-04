import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-accessibility-list',
  templateUrl: './accessibility-list.component.html',
  styleUrls: ['./accessibility-list.component.scss']
})
export class AccessibilityListComponent extends BaseComponent implements OnInit {

  constructor(public messageService: MessageService, public translates: TranslateService, private accessibilityService: AccessibilityService) {
    super(messageService, translates)

  }

  selectedAccessibility: any
  columns = [
    { header: 'Name', field: 'name', width: '45%' },
    { header: 'Role', field: 'action', width: '45%' }

  ]
  caption = { title: 'Manage Accessibilities', title2: 'accessibility' }
  actionsColumns = [{ header: 'Action', key: 'action' }]
  accessibilityActions: any
  accessibilities = []
  expanded = false
  addAccessibility = false
  ngOnInit(): void {
    this.getAccessibilities()
    this.onChangeAccessibilities()
    this.accessibilityActionsInit()
  }
  onExpanded(accessibility) {
    this.expanded = false

    setTimeout(() => {
      this.expanded = true
      this.selectedAccessibility = accessibility
    });
  }

  getAccessibilities() {
    this.loading = true
    this.accessibilityService.getAccessibilities().subscribe(accessibilities => {
      this.accessibilities = accessibilities?.data
      if (this.expanded == true) {
        this.expanded = false
        setTimeout(() => {
          this.expanded = true
        });
      }
      this.loading = false

    }, error => {
      this.loading = false
    })
  }

  setSelectedAccessibility(accessibility) {
    this.selectedAccessibility = accessibility
  }
  accessibilityActionsInit() {
    this.accessibilityActions = [
      {
        label: this.trans('Add Group'),
        icon: 'pi pi-plus',
        command: () => {
          this.addAccessibility = true
        }
      }
    ]

  }
  onChangeAccessibilities() {
    this.accessibilityService.accessibilitiesChangeEmitter.subscribe(status => {
      if (!isSet(status)) {
        return
      }
      this.getAccessibilities()
    })
  }
}
