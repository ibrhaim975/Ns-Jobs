import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { UsersGroupsService } from '../users-groups.service';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent extends BaseComponent implements OnInit {
  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  header = 'Add Group'
  @Input() group :any
  constructor(public translates: TranslateService, public messageService: MessageService, private usersGroupsService: UsersGroupsService) {
    super(messageService, translates)

  }

  ngOnInit(): void {
    this.initGroup()
  }
  initGroup(){
    console.log(this.group);
    
    if (isSet(this.group?.id)) {
      return
    }
    this.group = { name: { en: '', ar: '' } }
  }
  getGroupEditMode(){
    
  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  addEditGroup() {
    this.loading = true
    this.usersGroupsService.addGroup(this.group).subscribe(() => {
      this.loading = false
      this.usersGroupsService.groupsChange.next(true)
      this.onHide()
    })
  }
}
