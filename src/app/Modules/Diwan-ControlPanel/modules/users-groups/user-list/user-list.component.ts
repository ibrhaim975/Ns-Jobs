import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';
import { UsersGroupsService } from '../users-groups.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {

  columns = [
    { header: 'Display Name', field: 'user', type: 'user' , width: '50%' },
    { header: 'User Name', field: 'userName', width: '40%'  },
    { header: 'Email', field: 'email', width: '40%' }
  ]
  caption = { title: 'Manage Users', title2: 'user' }
  actionsColumns = [{ header: 'Action', key: 'action' }]
  users = []
  constructor(public translates: TranslateService, public messageService: MessageService, private usersGroupsService: UsersGroupsService) {
    super(messageService, translates)

  }

  ngOnInit(): void {
    this.getUsers() 
  }
  getUsers() {
    this.loading = true
    this.usersGroupsService.getUsers().subscribe(users => {
      this.users = users.data
      this.users.map(item=>{
        item['user']=item
      })
      this.loading = false
    }, error => {
      this.loading = false

    })

  }

}
