import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, moduleId } from 'src/app/core/base/base.component';
import { Meeting } from 'src/app/modals/Meeting';
import { AuthService } from 'src/app/Modules/auth/auth.service';
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
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { TextEditorComponent } from 'src/app/Shared/text-editor/text-editor.component';
import { CommitteesService } from '../../committees/committees.service';
import { MeetingsService } from '../meetings.service';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-meetings-details',
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
    SliderComponent,
    DynamicPropertiesPreviewComponent,
    BadgeStatusComponent],
  templateUrl: './meetings-details.component.html',
  styleUrls: ['./meetings-details.component.scss']
})
export class MeetingsDetailsComponent extends BaseComponent implements OnInit {
  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private router: Router, private meetingsService: MeetingsService, public translates: TranslateService,
    private coreService: CoreService,
    public messageService: MessageService, private confirmationService: ConfirmationService, private authService: AuthService,
    private activateRoute: ActivatedRoute, private committeesService: CommitteesService) {
    super(messageService, translates)
  }
  meeting = new Meeting()
  loadComments = true
  commentsHeight = 'calc(92vh - 250px)'

  currentUser = this.authService?.getAuthData()?.user
  meetingActinos = []
  requestId: any

  showSuggestAnotherDate = false
  anotherDate: any = { startDateTime: null, finishDateTime: null }

  //
  showAddMinutesofMeeting = false
  newMinutesofMeeting: any = { discussions: null, decisions: null, actionItems: [{ details: null, dueDate: null, assignedTo: null }], attachments: [] }
  currentMinutesofMeeting: any
  viewDetailsParms = null
  selectedTask: any
  ngOnInit(): void {
    this.getFormUrl()
  }

  getMeetingActions() {
    this.meetingActinos = []
    this.coreService.getPrivileges(moduleId('Meeting'), this.meeting?.id).subscribe((privileges: any) => {
      const meetingPrivileges = privileges?.data
      meetingPrivileges.map(action => {
          // if (action?.permissionName == 'CreateMeetingRequestsCommand') {

          // }
          if (this.meeting?.status?.key != 'Finished') {
            const user = this.meeting.invited?.find(item => item.user?.userName == this.currentUser?.userName)
            this.requestId = user?.requestId

            if (this.meeting?.organizer?.userName == this.currentUser?.userName &&action?.permissionName == 'UpdateMeetingCommand') {
              this.meetingActinos.push({
                label: this.trans('Edit Meeting'),
                icon: 'fa-solid fa-pen-to-square',
                command: () => {
                  this.display = false
                  if (this.viewDetailsParms == 'details') {
                    setTimeout(() => {
                      this.displayChange.emit(false)
                    }, 300);
                    this.committeesService.showAddMeetings.next(true)

                  } else {
                    this.router.navigate([], {
                      queryParams: {
                        meetId: this.meeting?.id,
                        view: 'edit'
                      },
                      queryParamsHandling: 'merge',
                    })
                    setTimeout(() => {
                      this.displayChange.emit(false)
                    }, 300);
                  }

                }
              })
            }


        
     

          }

          if (this.meeting?.status?.key == 'Finished' && !this.meeting?.hasMom) {

            if (action?.permissionName == 'CreateMeetingMinutesCommand') {
              this.meetingActinos.push({
                label: this.trans('Add Minutes of Meeting'),
                icon: 'fa-solid fa-handshake',
                command: () => {
                  this.showAddMinutesofMeeting = true
                }
              })
            }

          }

          if (this.meeting?.organizer?.userName == this.currentUser?.userName && action?.permissionName == 'DeleteMeetingCommand') {
            this.meetingActinos.push({
              label: this.trans('Delete') + '\n' + this.trans('Meeting'),
              icon: 'pi pi-trash',
              command: () => {
                this.deleteMeeting()

              }
            })
          }
       
      })

          this.meeting?.invited.map(item => {
              if ((item?.status?.key == 'Pending' || item?.status?.key == 'Suggest_New_Date_Time') && item?.user?.userName == this.currentUser?.userName) {
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

            })
    })


  }
  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {

      if (params['meetId']) {
        this.getMeeting(params['meetId'])
      }
      if (params['committeeID']) {
        this.viewDetailsParms = 'details'
      }
    });
    sub.unsubscribe()
  }
  getMeeting(meetId) {
    this.loading = true
    this.meetingsService.getMeeting(meetId).subscribe(meeting => {
      this.loading = false
      this.meeting = meeting?.data
      this.meeting.timeDiff = `${this.meeting.startDateTime.label.substring(this.meeting.startDateTime.label.indexOf(' '))} - ${this.meeting.finishDateTime.label.substring(this.meeting.finishDateTime.label.indexOf(' '))}`

      const startDate = this.meeting.startDateTime.label.substring(0, this.meeting.startDateTime.label.indexOf(' '))
      const finshDate = this.meeting.finishDateTime.label.substring(0, this.meeting.finishDateTime.label.indexOf(' '))

      if (startDate != finshDate) {
        this.meeting.dateDiff = `${startDate} - ${finshDate}`
      } else { this.meeting.dateDiff = startDate }
      this.getMeetingActions()

      setTimeout(() => { this.loadComments = false }, 300);

    }, error => {
      this.loading = false
    })
  }
  onHide(view?) {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        meetId: null,
        view: view || this.viewDetailsParms
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
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
        this.meetingsService.deleteMeeting(this.meeting?.id).subscribe(() => {
          this.loading = false
          this.onHide('reload')
        }, error => {
          this.loading = false

        })
      }

    });
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
          this.getMeeting(this.meeting?.id)
        }, error => {
          this.loading = false

        })
      }

    });
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
          this.getMeeting(this.meeting?.id)
        }, error => {
          this.loading = false

        })
      }

    });
  }
  suggestAnotherDate() {
    this.loading = true
    this.meetingsService.suggestAnotherDate(this.requestId, this.anotherDate).subscribe((item) => {
      this.loading = false
      this.showSuggestAnotherDate = false
      this.anotherDate = { startDateTime: null, finishDateTime: null }
      this.getMeeting(this.meeting?.id)
    }, error => {
      this.loading = false

    })
    // this.confirmationService.confirm({
    //   message: this.trans('Do you want to reject this') + '\n' + this.trans('Meeting'),
    //   header: this.trans('Reject Meeting'),
    //   rejectLabel: this.trans('Cancel'),
    //   rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
    //   acceptLabel: this.trans('Confirm'),
    //   acceptButtonStyleClass: ' text-btn',
    //   icon: 'pi pi-info-circle',
    //   accept: () => {

    //   }

    // });
  }
  showInvitedTitle(item) {
    if (item?.status?.key == 'Suggest_New_Date_Time') {
      item.startDateTime.label
      return `<span >${item.status?.name}</span> <br> <span class='text-sm'> 
      Date : ${item.startDateTime.label.substring(0, item.startDateTime.label.indexOf(' '))} <br>  Time : 
      ${item.startDateTime.label.substring(item.startDateTime.label.indexOf(' '))} - ${item.finishDateTime.label.substring(item.finishDateTime.label.indexOf(' '))}
      </span> `
    } else {

      return item.status.name
    }

  }
  addMinutesOfMeeting() {
    this.loading = true
    this.meetingsService.addMinutesOfMeeting(this.meeting?.id, this.newMinutesofMeeting).subscribe(item => {
      this.showAddMinutesofMeeting = false
      this.loading = false
      this.newMinutesofMeeting = { discussions: null, decisions: null, actionItems: [{ details: null, dueDate: null, assignedTo: null }], attachments: [] }
      this.meeting.hasMom = true
      this.meetingActinos.splice(this.meetingActinos.length - 1, 1)
    }, error => {
      this.loading = false
    })
  }
  newActionItems() {
    const action = { details: null, dueDate: null, assignedTo: null }
    console.log(this.newMinutesofMeeting.actionItems);

    this.newMinutesofMeeting.actionItems.push(action)
  }
  removeActionItems(index) {
    this.newMinutesofMeeting.actionItems.splice(index, 1)
  }
  getMinutesOfMeeting() {
    this.meetingsService.getMinutesOfMeeting(this.meeting?.id).subscribe(minutesofMeeting => {
      // setTimeout(() => { this.loadComments = false }, 300);
      this.currentMinutesofMeeting = minutesofMeeting.data

      this.currentMinutesofMeeting['chart'] = {
        labels: this.currentMinutesofMeeting?.actionItemsSummary.map(x => x.name),
        datasets: [
          {
            data: this.currentMinutesofMeeting?.actionItemsSummary.map(x => x.value),
            backgroundColor: this.currentMinutesofMeeting?.actionItemsSummary.map(x => x?.details?.color)
          }
        ]
      }
      this.currentMinutesofMeeting['actions'] = [
        {
          label: this.trans('View details'),
          icon: 'pi pi-eye',
          command: () => {
            this.router.navigateByUrl(`tasks?taskId=${this.selectedTask?.taskId}&view=details`)
          }
        }
      ]

    })
  }
  onMinutesOfMeetingClick(event) {
    if (event.index == 2) return this.getMinutesOfMeeting()
  }



  startDateChange() {
    this.anotherDate.finishDateTime = this.anotherDate.startDateTime
  }

  finishDateChange() {
    if (this.anotherDate.finishDateTime.getTime() < this.anotherDate.startDateTime.getTime()) {
      setTimeout(() => {
        this.anotherDate.finishDateTime = this.anotherDate.startDateTime
      }, 300);
      return this.errorMessage('Start Date Cant be greater than Finish Date')
    }

  }
}
