import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { Meeting } from 'src/app/modals/Meeting';
import { MeetingsService } from '../meetings.service';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { TextEditorComponent } from 'src/app/Shared/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { CommitteesService } from '../../committees/committees.service';
import { CoreService } from 'src/app/core/core.service';
import { DynamicPropertiesComponent } from 'src/app/Shared/dynamic-properties/dynamic-properties.component';
@Component({
  selector: 'app-add-edit-meetings',
  standalone: true,
  imports: [FormsModule,
    TranslateModule,
    PrimengComponentsModule,
    ModalComponent,
    InputComponent,
    TextAreaComponent,
    CalendarComponent,
    FindUserComponent,
    SelectStatusComponent,
    AttachmentComponent,
    SidebarComponent,
    EntityViewerComponent,
    CommentsComponent,
    TextEditorComponent,
    LoadingComponent,
    DynamicPropertiesComponent,
    BadgeStatusComponent],
  templateUrl: './add-edit-meetings.component.html',
  styleUrls: ['./add-edit-meetings.component.scss']
})
export class AddEditMeetingsComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private meetingsService: MeetingsService, public translates: TranslateService,
    public messageService: MessageService, private committeesService: CommitteesService,
    private coreService : CoreService,
    private activateRoute: ActivatedRoute) {
    super(messageService, translates)
  }
  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  meetID: any
  committeeID: any
  meeting = new Meeting()
  priorities = []
  title = 'Add New Meet'
  props=[]
  ngOnInit(): void {
    this.getProps()
    this.getFormSettings()
    this.getFormUrl()

  }
  onHide(view?) {
    this.display = false
    this.router.navigate([], {
      queryParams: {
        meetId: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  getFormSettings() {
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    this.priorities = lookups?.find(item => item?.key == 'Meeting_Priority').items
  }
  meetingAddEdit() {

    if (isSet(this.meeting?.id)) {
      this.updateMeeting()
    } else this.addMeeting()

  }

  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {

      if (params['meetId']) {
        this.title = 'Edit Meet'
        this.getMeeting(params['meetId'])
      }
      if (params['committeeID']) {
        this.committeeID = params['committeeID']
      }
    });
    sub.unsubscribe()
  }
  getMeeting(meetId) {
    this.loading = true
    this.meetingsService.getMeeting(meetId).subscribe(meeting => {
      this.loading = false

      this.meeting = Meeting.cloneObject(meeting?.data)
      this.meeting.startDateTime = new Date(this.meeting.startDateTime?.value)
      this.meeting.finishDateTime = new Date(this.meeting.finishDateTime?.value)
      const users = []
      this.meeting.invited.map(item => {
        users.push(item?.user)
      })
      this.meeting.invited = users


      this.meeting?.props.map(item => {
        this.props.map(prop => {
          if (item?.propertyId == prop?.id) {
            prop.value = item?.value
            prop.propertyId = item?.propertyId
            prop.id = item?.id
          }
        })
      })
      this.meeting.props = this.props

    }, error => {
      this.loading = false

    })
  }
  addMeeting() {
    this.loading = true
    this.meetingsService.addMeeting(this.meeting).subscribe(meet => {
      this.loading = false
      if (isSet(this.committeeID)) {
        this.addMettingToCommittee(meet?.data)

      } else this.onHide('reload')

    }, error => {
      this.loading = false

    })
  }
  updateMeeting() {
    this.loading = true
    this.meetingsService.updateMeeting(this.meeting).subscribe(item => {
      this.loading = false
      this.onHide('reload')
    }, error => {
      this.loading = false

    })
  }

  startDateChange() {
    this.meeting.finishDateTime = this.meeting.startDateTime
  }

  finishDateChange() {
    if (this.meeting.finishDateTime.getTime() < this.meeting.startDateTime.getTime()) {
      setTimeout(() => {
        this.meeting.finishDateTime = this.meeting.startDateTime
      }, 300);
      return this.errorMessage('Start Date Cant be greater than Finish Date')
    }

  }
  addMettingToCommittee(meet) {
    this.loading = true
    this.committeesService.addMeetingCommittee(this.committeeID, meet.id).subscribe(item => {
      this.loading = false
      this.committeesService.newCommitteeMeet.next(meet)
      this.onHide()

    }, error => {
      this.loading = false

    })
  }
  getProps() {
    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {
      if (!isSet(settings)) {
        return
      }
      const customProps = settings?.modules?.find(item => item?.key == 'Meeting')?.props
      this.meeting.props = JSON.parse(JSON.stringify(customProps))
      this.props= JSON.parse(JSON.stringify(customProps))
      if (!isSet(this.meeting.props)) {
        this.meeting.props=[]
      }
    })
    sub.unsubscribe()
  }
}
