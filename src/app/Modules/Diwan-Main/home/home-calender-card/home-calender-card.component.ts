import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from 'src/app/modals/Meeting';

@Component({
  selector: 'app-home-calender-card',
  templateUrl: './home-calender-card.component.html',
  styleUrls: ['./home-calender-card.component.scss']
})
export class HomeCalenderCardComponent implements OnInit {

  constructor() { }
  @Input() meet=new Meeting()

  ngOnInit(): void {
    this.meet.timeDiff = `${this.meet.startDateTime.label.substring(this.meet.startDateTime.label.indexOf(' '))} - ${this.meet.finishDateTime.label.substring(this.meet.finishDateTime.label.indexOf(' '))}`

    const startDate = this.meet.startDateTime.label.substring(0, this.meet.startDateTime.label.indexOf(' '))
    const finshDate = this.meet.finishDateTime.label.substring(0, this.meet.finishDateTime.label.indexOf(' '))

    if (startDate != finshDate) {
      this.meet.dateDiff = `${startDate} - ${finshDate}`
    } else { this.meet.dateDiff = startDate }
  }

}
