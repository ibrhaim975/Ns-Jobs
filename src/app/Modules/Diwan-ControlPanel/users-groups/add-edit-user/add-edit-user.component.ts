import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';
import { UsersGroupsService } from '../users-groups.service';
import { UserInfo } from 'src/app/modals/User';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private usersGroupsService: UsersGroupsService) {
    super(messageService, translates)

  }

  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  @Input() groupId: any

  header = 'Add User'
  user = new UserInfo()
  ngOnInit(): void {

  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  addUser() {
    this.loading = true
    this.usersGroupsService.addUser(this.user?.userName,this.groupId).subscribe(() => {
      this.loading = false
      this.usersGroupsService.groupsChange.next(true)
      this.onHide()
    },error=>{
      this.loading = false

    })
  }
}
