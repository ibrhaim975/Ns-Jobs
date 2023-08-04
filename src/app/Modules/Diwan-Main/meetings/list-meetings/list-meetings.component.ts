import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meeting } from 'src/app/modals/Meeting';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { BaseComponent } from 'src/app/core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MeetingsService } from '../meetings.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.scss']
})
export class ListMeetingsComponent extends BaseComponent implements OnInit {

  constructor(private datePipe: DatePipe, public messageService: MessageService, public translates: TranslateService,
    private meetingsService: MeetingsService, private authService: AuthService, private router: Router, private confirmationService: ConfirmationService) {
    super(messageService, translates)
  }

  @Output() meetClick: EventEmitter<any> = new EventEmitter();
  @Input() meetings: any

  meetingDays: any = []
  Dates = []
  today = new Date()
  currentDate = new Date()
  currentMeeting = new Meeting()
  commentsHeight = 'calc(75vh - 238px)'
  currentMinutesofMeeting: any
  meetingActinos = []
  currentUser = this.authService?.getAuthData()?.user
  requestId: any
  showSuggestAnotherDate = false
  showAddMinutesofMeeting = false
  currentDateIndex:any
  ngOnInit(): void {
    const allMeetings=this.meetings.upcomingMeetings?.concat(this.meetings?.previousMeetings)
    this.meetings=allMeetings

    this.initDates()
    if (this.meetings?.length) {
      this.getMeetingDays()
    }
  }
  getMeetingDays() {


    this.meetings?.map(meeting => {
      meeting.timeDiff = `${meeting.startDateTime.label.substring(meeting.startDateTime.label.indexOf(' '))} - ${meeting.finishDateTime.label.substring(meeting.finishDateTime.label.indexOf(' '))}`
      meeting.startDateTime.value = new Date(meeting.startDateTime.value)
      meeting.startDateTime.value.setHours(0, 0, 0, 0)
      this.meetingDays.push({ date: meeting.startDateTime.value, meetings: [] })
    })
    //
    let uniqueDayFilter = this.meetingDays.filter((item_, i, self) =>
      self.findIndex(item => item.date.getTime() === item_.date.getTime()) === i
    )
    //
    this.meetingDays = uniqueDayFilter
    this.meetingDays.forEach(item => {
      this.meetings.map(meeting => {
        if (moment(item.date).isSame(meeting.startDateTime.value, 'day')) {
          item.meetings.push(meeting)
        }
      })
    })

    //

    this.Dates.map(item => {
      this.meetingDays.map(meet => {
        if (item.date.getTime() == meet.date.getTime()) {
          item.meetings = meet.meetings
        }
      })

    })
    this.getMeeting(this.Dates[0].meetings[0].id,{meet:0,date:0})
  }
  initDates() {
    for (let index = 0; index < 3; index++) {
      this.Dates.push({ date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + index), meetings: [] })
    }
  }
  getToday() {
    this.currentDate = new Date()
    this.Dates = []
    for (let index = 0; index < 3; index++) {
      this.Dates.push({ date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + index), meetings: [] })
      this.getRelatedMeetingToDate()

    }
  }
  getDay(value) {
    return value.getDate()
  }
  getNext() {
    this.currentDate = new Date(this.Dates[2].date.getFullYear(), this.Dates[2].date.getMonth(), this.Dates[2].date.getDate() + 1)
    this.Dates = []
    for (let index = 0; index < 3; index++) {
      this.Dates.push({ date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + index), meetings: [] })
    }

    this.getRelatedMeetingToDate()
  }

  getPrv() {
    this.currentDate = new Date(this.Dates[0].date.getFullYear(), this.Dates[0].date.getMonth(), this.Dates[0].date.getDate() - 3)
    this.Dates = []
    for (let index = 0; index < 3; index++) {
      this.Dates.push({ date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + index), meetings: [] })
    }

    this.getRelatedMeetingToDate()
  }
  getRelatedMeetingToDate() {
    this.Dates.map(item => {
      this.meetingDays.map(meet => {
        if (item.date.getTime() == meet.date.getTime()) {
          item.meetings = meet.meetings
        }
      })

    })
  }
  checkToday(date) {

    return moment(date).isSame(this.today, 'day')

  }


  getMeeting(meetId,dateMeetIndex?) {
    this.currentDateIndex=dateMeetIndex
    this.loading = true
    this.meetingsService.getMeeting(meetId).subscribe(meeting => {
      this.loading = false
      this.currentMeeting = meeting?.data
      this.getMeetingActions()

      this.currentMeeting.timeDiff = `${this.currentMeeting.startDateTime.label.substring(this.currentMeeting.startDateTime.label.indexOf(' '))} - ${this.currentMeeting.finishDateTime.label.substring(this.currentMeeting.finishDateTime.label.indexOf(' '))}`

      const startDate = this.currentMeeting.startDateTime.label.substring(0, this.currentMeeting.startDateTime.label.indexOf(' '))
      const finshDate = this.currentMeeting.finishDateTime.label.substring(0, this.currentMeeting.finishDateTime.label.indexOf(' '))

      if (startDate != finshDate) {
        this.currentMeeting.dateDiff = `${startDate} - ${finshDate}`
      } else { this.currentMeeting.dateDiff = startDate }



    }, error => {
      this.loading = false
    })
  }
  getMeetingActions() {
    this.meetingActinos = []


    if (this.currentMeeting?.organizer?.userName == this.currentUser.userName) {

      if (this.currentMeeting?.status?.key != 'Finished') {
        this.meetingActinos.push({
          label: this.trans('Edit Meet'),
          icon: 'fa-solid fa-pen-to-square',
          command: () => {
            this.router.navigate([], {
              queryParams: {
                meetId: this.currentMeeting?.id,
                view: 'edit'
              },
              queryParamsHandling: 'merge',
            })

          }
        })
      }
      this.meetingActinos.push({
        label: this.trans('Delete') + '\n' + this.trans('Meeting'),
        icon: 'pi pi-trash',
        command: () => {
          this.deleteMeeting()

        }
      })

    } else if (this.currentMeeting?.status?.key != 'Finished') {
      const user = this.currentMeeting.invited?.find(item => item.user?.userName == this.currentUser?.userName)
      this.requestId = user?.requestId

      this.meetingActinos.push({
        label: this.trans('Accept Meeting'),
        icon: 'pi pi-check',
        command: () => {
          this.acceptMeeting()
        }
      })
      this.meetingActinos.push({
        label: this.trans('Reject Meeting'),
        icon: 'pi pi-times',
        command: () => {
          this.rejectMeeting()
        }
      })
      this.meetingActinos.push({
        label: this.trans('Suggest Another Date'),
        icon: 'pi pi-forward',
        command: () => {
          this.showSuggestAnotherDate = true

        }
      })
    }
    if (this.currentMeeting?.status?.key == 'Finished' && !this.currentMeeting?.hasMom && this.currentMeeting?.organizer?.userName == this.currentUser.userName) {
      this.meetingActinos.push({
        label: this.trans('Add Minutes of Meeting'),
        icon: 'fa-solid fa-handshake',
        command: () => {
          this.showAddMinutesofMeeting = true
        }
      })
    }

  }
  rejectMeeting() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to reject this') + '\n' + this.trans('Meeting'),
      header: this.trans('Reject Meeting'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.meetingsService.rejectMeeting(this.requestId).subscribe(() => {
          this.loading = false
          this.getMeeting(this.currentMeeting?.id)
        }, error => {
          this.loading = false

        })
      }

    });
  }
  getMinutesOfMeeting() {
    this.meetingsService.getMinutesOfMeeting(this.currentMeeting?.id).subscribe(minutesofMeeting => {
      this.currentMinutesofMeeting = minutesofMeeting.data
    })
  }
  acceptMeeting() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to accept this') + '\n' + this.trans('Meeting'),
      header: this.trans('Accept Meeting'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.meetingsService.acceptMeeting(this.requestId).subscribe(() => {
          this.loading = false
          this.getMeeting(this.currentMeeting?.id)
        }, error => {
          this.loading = false

        })
      }

    });
  }
  deleteMeeting() {

    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Meeting'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.meetingsService.deleteMeeting(this.currentMeeting?.id).subscribe(() => {
          this.Dates[this.currentDateIndex?.date].meetings.splice(this.currentDateIndex?.meet, 1)


          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }
  onMinutesOfMeetingClick(event) {
    if (event.index == 1) return this.getMinutesOfMeeting()
  }
  showInvitedTitle(item) {

    if (item?.status?.key == 'Suggest_New_Date_Time') {
      item.startDateTime.key
      return `<span >${item.status?.name}</span> <br> <span class='text-sm'> 
      Date : ${item.startDateTime.key.substring(0, item.startDateTime.key.indexOf(' '))} <br>  Time : 
      ${item.startDateTime.key.substring(item.startDateTime.key.indexOf(' '))} - ${item.finishDateTime.key.substring(item.finishDateTime.key.indexOf(' '))}
      </span> `
    } else {

      return item.status.name
    }


  }
  showTask(taskID) {
    return `tasks?taskId=${taskID}&view=details`
  }
}
