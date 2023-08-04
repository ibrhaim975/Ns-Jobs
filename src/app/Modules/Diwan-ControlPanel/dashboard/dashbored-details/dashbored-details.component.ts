import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { DashboredService } from '../dashbored.service';

@Component({
  selector: 'app-dashbored-details',
  templateUrl: './dashbored-details.component.html',
  styleUrls: ['./dashbored-details.component.scss']
})
export class DashboredDetailsComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(private dashboredService: DashboredService, private router: Router,
    private cdref: ChangeDetectorRef,
    public translates: TranslateService, public messageService: MessageService) {
    super(messageService, translates)

  }
  @Input() dataToDisplay: any;
  data: any
  loadingTable = false
  columns = []
  selectedItem: any
  actions = []
  actionsColumns = [{ header: 'Actions', key: 'action' }]
  caption: any

  ngOnInit(): void {
    if (this.dataToDisplay.type == 'Tasks') {
      this.getTasks()
    }
    if (this.dataToDisplay.type == 'Meetings') {
      this.getMeetings()
    }
    if (this.dataToDisplay.type == 'Committees') {
      this.getCommittees()
    }
  }
  ngAfterViewInit(): void {
  
    this.cdref.detectChanges();

  }
  getTasks() {
    this.loadingTable = true
    this.dashboredService.getTasks(this.dataToDisplay.param).subscribe(tasks => {
      this.data = tasks.data

      const lookups = JSON.parse(localStorage.getItem('settings')).lookups
      if (isSet(this.dataToDisplay.filed)) {
        if (this.dataToDisplay.filed == 'status') {
          const task_Status = lookups?.find(item => item?.key == 'Task_Status').items

          this.dataToDisplay['name'] = task_Status?.find(item => item?.id == this.dataToDisplay.value)?.name
          this.dataToDisplay['color'] = task_Status?.find(item => item?.id == this.dataToDisplay.value)?.details?.color
        } else {
          const target = lookups?.find(item => item?.key == 'Dashboard').items

          this.dataToDisplay['name'] = target?.find(item => item?.key == 'Action_Items')?.name
          this.dataToDisplay['color'] = target?.find(item => item?.key == 'Action_Items')?.details?.color


        }
      }
      this.caption = { title: this.dataToDisplay.type, subTitle: this.dataToDisplay?.name, color: this.dataToDisplay?.color }


      this.columns = [{ header: 'Title', field: 'title' }, { header: 'Due Date', field: 'dueDate', type: 'date' }, { header: 'Created By', field: 'createdBy', type: 'user' }, { header: 'Progress', field: 'progress', type: 'progress', color: 'status' }]
      this.actions = [
        {
          label: this.trans('View details') , icon: 'pi pi-eye', command: (event) => {
            this.router.navigateByUrl(`tasks?taskId=${this.selectedItem?.id}&view=details`)
          }
        },

      ];

      this.loadingTable = false

    })
  }

  getMeetings() {
    this.loadingTable = true
    this.dashboredService.getMeetings(this.dataToDisplay.param).subscribe(meetings => {
      const lookups = JSON.parse(localStorage.getItem('settings')).lookups
      const Meeting_Request_Status = lookups?.find(item => item?.key == 'Meeting_Request_Status').items
      this.dataToDisplay['name'] = Meeting_Request_Status?.find(item => item?.id == this.dataToDisplay.value)?.name
      this.dataToDisplay['color'] = Meeting_Request_Status?.find(item => item?.id == this.dataToDisplay.value)?.details?.color


      this.data = meetings.data.upcomingMeetings?.concat(meetings.data?.previousMeetings)
      this.data.map(item => {
        item.timeDiff = `${item.startDateTime.label.substring(item.startDateTime.label.indexOf(' '))} - ${item.finishDateTime.label.substring(item.finishDateTime.label.indexOf(' '))}`
        const startDate = item.startDateTime.label.substring(0, item.startDateTime.label.indexOf(' '))
        const finshDate = item.finishDateTime.label.substring(0, item.finishDateTime.label.indexOf(' '))
        if (startDate != finshDate) {
          item.dateDiff = `${startDate} - ${finshDate}`
        } else { item.dateDiff = startDate }

      })
      this.columns = [{ header: 'Title', field: 'title' }, { header: 'Date', field: 'dateDiff' }, { header: 'Time', field: 'timeDiff' }, { header: 'Created By', field: 'createdBy', type: 'user' }, { header: 'Location', field: 'location' }]
      this.actions = [
        {
          label: this.trans('View details'), icon: 'pi pi-eye', command: (event) => {
            this.router.navigateByUrl(`meetings?meetId=${this.selectedItem?.id}&view=details`)
          }
        },

      ];
      this.caption = { title: this.dataToDisplay.type, subTitle: this.dataToDisplay?.name, color: this.dataToDisplay?.color }

      this.loadingTable = false

    })
  }
  getCommittees() {
    this.loadingTable = true
    this.dashboredService.getCommittees(this.dataToDisplay.param).subscribe(meetings => {
      this.data = meetings?.data?.items
      this.dataToDisplay['name'] = this.data[0][this.dataToDisplay.filed]?.name
      this.dataToDisplay['color'] = this.data[0][this.dataToDisplay.filed]?.details?.color

      this.columns = [{ header: 'Title', field: 'title' }, { header: 'Start Date', field: 'startDate', type: 'date' },
      { header: 'End Date', field: 'endDate', type: 'date' }, { header: 'Created By', field: 'createdBy', type: 'user' }]
      this.actions = [
        {
          label: this.trans('View details') , icon: 'pi pi-eye', command: (event) => {
            this.router.navigateByUrl(`committees?committeeID=${this.selectedItem?.id}&view=details`)
          }
        },

      ];
      this.caption = { title: this.dataToDisplay.type, subTitle: this.dataToDisplay?.name, color: this.dataToDisplay?.color }

      this.loadingTable = false

    })
  }
}
