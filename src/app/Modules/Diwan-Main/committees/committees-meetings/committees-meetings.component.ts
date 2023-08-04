import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/modals/Meeting';
import { CommitteesService } from '../committees.service';

@Component({
  selector: 'app-committees-meetings',
  templateUrl: './committees-meetings.component.html',
  styleUrls: ['./committees-meetings.component.scss']
})
export class CommitteesMeetingsComponent implements OnInit {
  @Input() meetings: any
  @Input() addMeetingsPermission: boolean

  chartDoughnut = {}
  displayAddEdit = false
  currentLang = localStorage.getItem('currentLang')

  constructor(private datePipe: DatePipe, private committeesService: CommitteesService,private router:Router) { }

  ngOnInit(): void {
    this.setChartData()

  }

  setChartData() {
    this.meetings.summary['all'] = this.meetings?.summary?.attended?.value + this.meetings?.summary?.cancelled?.value
    let data =[]
    if (this.meetings?.summary?.attended?.value==0 && this.meetings?.summary?.cancelled?.value==0) {
      data=[1,1]
    }else {
      data=[this.meetings?.summary?.attended?.value,this.meetings?.summary?.cancelled?.value]
    }
    this.chartDoughnut = {
      datasets: [
        {
          data: data,
          backgroundColor: [
            this.meetings?.summary.attended?.details?.color,
            this.meetings?.summary.cancelled?.details?.color,

          ]
        }
      ]
    }
  }
  showAddMeet() {
    this.committeesService.showAddMeetings.next(true)
  }
  showDetailsMeet(meetId) {
    this.committeesService.showDetailsMeetings.next(true)
    this.router.navigate([], {
      queryParams: {
        meetId: meetId,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  getTimeDIFF(meeting){
  return `${meeting.startDateTime?.label.substring(meeting.startDateTime?.label.indexOf(' '))} - ${meeting.finishDateTime?.label.substring(meeting.finishDateTime?.label.indexOf(' '))}`

  }
}
