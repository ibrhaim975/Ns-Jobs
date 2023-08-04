import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from 'src/app/modals/Meeting';

@Component({
  selector: 'app-upcoming-previous-meetings',
  templateUrl: './upcoming-previous-meetings.component.html',
  styleUrls: ['./upcoming-previous-meetings.component.scss']
})
export class UpcomingPreviousMeetingsComponent implements OnInit {

  constructor() { }
  @Input() meetings: any
  @Input() height: any

  ngOnInit(): void {
  }

}
