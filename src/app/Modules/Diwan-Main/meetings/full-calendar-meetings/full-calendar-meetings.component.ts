import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Meeting } from 'src/app/modals/Meeting';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { MeetingsService } from '../meetings.service';

@Component({
  selector: 'app-full-calendar-meetings',
  templateUrl: './full-calendar-meetings.component.html',
  styleUrls: ['./full-calendar-meetings.component.scss']
})
export class FullCalendarMeetingsComponent extends BaseComponent implements OnInit {

  constructor(private datePipe: DatePipe, public messageService: MessageService, private authService: AuthService,
    public translates: TranslateService, private meetingsService: MeetingsService) {
    super(messageService, translates)
  }
  @ViewChild('calendar') calendar: FullCalendarComponent;

  @Output() meetClick: EventEmitter<any> = new EventEmitter();
  @Input() meetings: any
  allMeetings: Meeting[] = []
  calendarOptions: CalendarOptions
  currentDate: any
  //
  selectedViewType = this.trans('Monthly')
  viewTypes = []
  currentLang = localStorage.getItem('currentLang')

  ngOnInit(): void {
    this.calendarOptions = {
      headerToolbar: false,
      height: '100%',
      editable: true,
      selectable: true,
      locale: this.currentLang,
      eventClick: (arg) => {
        this.meetClick.emit(arg?.event?.id)
      },
      eventDrop: (arg) => {
        this.meetingDrop(arg.event)
      },


    }
    this.currentDate = this.datePipe.transform(new Date(), 'EEE, MMM d')
    this.handelMeetings()
    this.getActions()

  }

  getActions() {
    setTimeout(() => {
      this.viewTypes = [
        {
          label: this.trans('Monthly'),
          command: () => {
            this.selectedViewType = this.trans('Monthly')
            this.calendar.getApi().changeView('dayGridMonth')
          }
        },
        {
          label: this.trans('Weekly'),
          command: () => {
            this.selectedViewType = this.trans('Weekly')

            this.calendar.getApi().changeView('timeGridWeek')
          }
        },
        {
          label: this.trans('Timely'),
          command: () => {
            this.selectedViewType = this.trans('Timely')

            this.calendar.getApi().changeView('timeGridDay')
          }
        },

      ]
    });
  }
  handelMeetings() {
    this.calendarOptions.events = []
this.allMeetings=this.meetings.upcomingMeetings?.concat(this.meetings?.previousMeetings)

    for (let index = 0; index < this.allMeetings?.length; index++) {
      this.calendarOptions.events.push({
        id: this.allMeetings[index].id,
        title: this.allMeetings[index].title,
        start: new Date(this.allMeetings[index].startDateTime?.value),
        end: new Date(this.allMeetings[index].finishDateTime?.value),
        backgroundColor: this.hexToRGB(this.allMeetings[index].priority?.details?.color, 0.4),
        borderColor: this.allMeetings[index].priority?.details?.color,
      })
    }

  }
  getNext() {
    this.calendar.getApi().next()
  }
  getPrev() {
    this.calendar.getApi().prev()
  }
  getCurrentDay() {
    this.calendar.getApi().today()
  }
  meetingDrop(meet) {

    const selectedMeet = Meeting.cloneObject(this.meetings?.find(item => item?.id == meet?.id))
    selectedMeet.startDateTime = meet?.start
    selectedMeet.finishDateTime = meet?.end
    const invited = []
    selectedMeet.invited.map(item => { invited.push(item?.username) })
    selectedMeet.invited = invited
    this.meetingsService.updateMeeting(selectedMeet).subscribe(item => {
      console.log(item);

    })
  }
}