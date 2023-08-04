import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { Meeting } from 'src/app/modals/Meeting';
import { MeetingsService } from '../meetings.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-main-meetings',
  templateUrl: './main-meetings.component.html',
  styleUrls: ['./main-meetings.component.scss']
})
export class MainMeetingsComponent extends BaseComponent implements OnInit {

  constructor(public meetingsService: MeetingsService, public translates: TranslateService, public messageService: MessageService,
    private coreService:CoreService,
    private router: Router, private activateRoute: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {
    super(messageService, translates)
  }
  breadcrumb = [{ label: 'Meetings', url: `meetings`, },]

  displayAddEdit = false
  displayMeetingsDetails = false
  viewMode='calendar'
  accessibility:any
  meetings: Meeting[] = []
  privileges = []
  
  ngOnInit(): void {
    this.getFromUrl()
    this.getMeetings()
    this.getAccessibilities()
    // this.getPrivileges()
  }
  getAccessibilities(){
    const sub = this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
         this.accessibility= accessibilities?.find(item => item?.key == "Meeting")
       })
       this.subscriptions.push(sub)
   
     }
  showAddEditMeeting(meet, view?) {
    this.displayAddEdit = true
    this.router.navigate([], {
      queryParams: {
        meetId: meet,
        view: view || 'new'
      }
      ,
      queryParamsHandling: 'merge',
    })

  }
  showMeetingDetails(meet) {
    this.displayMeetingsDetails = true
    this.router.navigate([], {
      queryParams: {
        meetId: meet,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })

  }
  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['view'] == 'details') {
        this.showMeetingDetails(params['meetId'])

      }
      if (params['view'] == 'edit') {
        this.showAddEditMeeting(params['meetId'], params['view'])

      }
      if (params['view'] == 'reload') {
        this.getMeetings()

        this.router.navigate([], {
          queryParams: {
            view: null
          },
          queryParamsHandling: 'merge',
        })

      }
      if (!isSet(params['view'])) {
        this.overflow('auto')
      }
    });
  }
  getMeetings(target?) {
    this.loading = true
    this.meetingsService.getMeetings(target).subscribe(meetings => {
      this.meetings = meetings?.data
      this.loading = false

    }, error => {
      this.loading = false

    })


  }
  getPrivileges() {
    this.meetingsService.getPrivileges().subscribe(privileges => {
      this.privileges = privileges?.data
    })


  }
  overflow(value) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement
    htmlTag.style.overflow = value
  }
}
