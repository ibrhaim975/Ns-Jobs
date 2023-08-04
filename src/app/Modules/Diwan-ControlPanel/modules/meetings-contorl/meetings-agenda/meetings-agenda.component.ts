import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-meetings-agenda',
  templateUrl: './meetings-agenda.component.html',
  styleUrls: ['./meetings-agenda.component.scss']
})
export class MeetingsAgendaComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService) {
    super(messageService, translates)
  }

  columns = [{ header: 'Name', field: 'name' }, { header: 'Type', field: 'type' }]
  data = [{ name: 'test1', type: 'Text' }, { name: 'test2', type: 'Text3' }]
  caption = { title: 'Meeting Agenda' }
  loadingTable = false
  actionsColumns = [{ header: 'Required', key: 'required' }, { header: 'Action', key: 'action' }]
  meetingsAttributesActions = []
  ngOnInit(): void {
    this.meetingsAttributesActions = [
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
