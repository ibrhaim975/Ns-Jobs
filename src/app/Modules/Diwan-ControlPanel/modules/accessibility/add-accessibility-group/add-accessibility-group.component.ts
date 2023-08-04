import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';
import { UsersGroupsService } from '../../users-groups/users-groups.service';
import { AccessibilityService } from '../accessibility.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-add-accessibility-group',
  templateUrl: './add-accessibility-group.component.html',
  styleUrls: ['./add-accessibility-group.component.scss']
})
export class AddAccessibilityGroupComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private usersGroupsService: UsersGroupsService,
    private accessibilityService: AccessibilityService,private coreService:CoreService) {
    super(messageService, translates)

  }

  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  @Input() accessibilitiey: any

  group:any
  groups:any
  ngOnInit(): void {
    this.getAccessibilitiesGroup()
    this.getGroups()
  }

  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  getGroups() {
    this.loading = true

    this.usersGroupsService.getGroups().subscribe(groups => {
      this.loading = false
      this.groups = groups?.data
      this.groups.map(item => {
        item['users'] = item?.members?.length
      })

    }, error => {
      this.loading = false

    })
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
  addGroup() {
    this.loading = true
    this.accessibilitiey.groups.push(this.group)
    this.accessibilityService.updateAccessibilitiesGroup(this.accessibilitiey).subscribe(() => {
      this.loading = false
      this.accessibilityService.accessibilitiesChange.next(true)
      localStorage.removeItem('accessibilities')
      this.coreService.getAccessibilities()

      this.onHide()
    }, error => {
      this.loading = false

    })
  }
}
