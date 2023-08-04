import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Meeting } from 'src/app/modals/Meeting';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.scss']
})
export class HomeCalendarComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private datePipe: DatePipe) { 
    super()
  }
  calendarOptions: CalendarOptions
  currentLang = localStorage.getItem('currentLang')
  @Output() meetClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('calendar') calendar: FullCalendarComponent;
  @Input() meetings: any[] = []
  currentDate :any
  ngOnInit(): void {
    this.calendarOptions = {
      headerToolbar: false,
      height: '70vh',
      editable: false,
      selectable: true,
      locale: this.currentLang,
      eventClick: (arg) => {
        this.meetClick.emit(arg?.event?.id)
      },



    }

  }
  ngAfterViewInit() {
    this.calendar.getApi().changeView('timeGridDay')
    this.calendarOptions.events = []
    this.currentDate= new Date(this.calendar.getApi().getDate())

    for (let index = 0; index < this.meetings.length; index++) {
      this.calendarOptions.events.push({
        id: this.meetings[index]?.id,
        title: this.meetings[index].title,
        start: new Date(this.meetings[index].startDateTime?.value),
        end: new Date(this.meetings[index].finishDateTime?.value),
        backgroundColor: this.hexToRGB(this.meetings[index].priority?.details?.color, 0.4),
        borderColor: this.meetings[index].priority?.details?.color,
      })
    }
  }

  getNext() {
   this.currentDate= new Date(this.calendar.getApi().getDate())
    
    this.calendar.getApi().next()
  }
  getPrev() {
    this.currentDate= new Date(this.calendar.getApi().getDate())

    this.calendar.getApi().prev()
  }
  getCurrentDay() {
    this.calendar.getApi().today()
  }
}
