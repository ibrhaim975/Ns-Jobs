import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { Committees } from 'src/app/modals/committees';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { CommitteesService } from '../committees.service';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { circleButtonComponent } from 'src/app/Shared/circle-button/circle-button.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { CardColoredComponent } from 'src/app/Shared/card-colored/card-colored.component';
import { BarChartComponent } from 'src/app/Shared/Charts/bar-chart/bar-chart.component';
import { ProgressComponent } from 'src/app/Shared/Charts/progress/progress.component';
import { BreadcrumbComponent } from 'src/app/Shared/breadcrumb/breadcrumb.component';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { FindTagsComponent } from 'src/app/Shared/find-tags/find-tags.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { BadgeButtonComponent } from 'src/app/Shared/badge-button/badge-button.component';
import { TextEditorComponent } from 'src/app/Shared/text-editor/text-editor.component';
import { ImageUploadComponent } from 'src/app/Shared/image-upload/image-upload.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { TimelineActivitiesComponent } from 'src/app/Shared/timeline-activities/timeline-activities.component';
import * as _ from 'lodash';
import { CoreService } from 'src/app/core/core.service';
import { DynamicPropertiesComponent } from 'src/app/Shared/dynamic-properties/dynamic-properties.component';
import { ListDataComponent } from 'src/app/Shared/list-data/list-data.component';

@Component({
  selector: 'app-committees-add-edit',
  standalone: true,
  imports: [CommonModule, PrimengComponentsModule, TranslateModule,
    // shared
    circleButtonComponent,
    EntityViewerComponent,
    BadgeStatusComponent,
    SliderComponent,
    CardColoredComponent,
    BarChartComponent,
    ProgressComponent,
    BreadcrumbComponent,
    AttachmentComponent,
    CommentsComponent,
    SidebarComponent,
    FindUserComponent,
    SelectStatusComponent,
    FindTagsComponent,
    InputComponent,
    TextAreaComponent,
    CalendarComponent,
    LoadingComponent,
    BadgeButtonComponent,
    TextEditorComponent,
    ImageUploadComponent,
    DynamicPropertiesComponent,
    ListDataComponent,
    TimelineActivitiesComponent],
  templateUrl: './committees-add-edit.component.html',
  styleUrls: ['./committees-add-edit.component.scss']
})
export class CommitteesAddEditComponent extends BaseComponent implements OnInit {
  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  title = "New Committee"
  committee = new Committees()
  statuses = []
  flags = []
  types = []
  recurrences = []
  props = []
  constructor(public translates: TranslateService, private router: Router,
    private coreService: CoreService,
    private committeesService: CommitteesService, private activateRoute: ActivatedRoute,
    public messageService: MessageService) {
    super(messageService, translates)
  }
  ngOnInit(): void {
    this.getProps()
    this.initCommittee()
    this.getFormSettings()
    this.getFormUrl()
  }
  addCommittee() {
    this.committeesService.addCommittee(this.committee).subscribe(() => {
      this.onHide('reload')
    })
  }
  getFormSettings() {
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    this.statuses = lookups?.find(item => item?.key == 'Committee_Status').items
    this.flags = lookups?.find(item => item?.key == 'Committee_Flag').items
    this.types = lookups?.find(item => item?.key == 'Committee_Type').items
    this.recurrences = lookups?.find(item => item?.key == 'Committee_Recurrence').items

  }
  initCommittee() {
    this.committee.title = { en: '', ar: '' }


  }
  onHide(view?) {
    this.committeesService.showAddMeetings.next(false)
    this.committeesService.showDetailsMeetings.next(false)

    this.display = false
    this.router.navigate([], {
      queryParams: {
        committeeID: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  getCommittee(committeeID) {
    this.loading = true
    this.committeesService.getCommittee(committeeID, 'edit').subscribe(committee => {
      this.loading = false
      this.committee = Committees.cloneObject(committee.data)
      this.committee.chairman = this.committee?.chairman?.user
      this.committee.secretary = this.committee?.secretary?.user
      this.committee.members = _.map(this.committee?.members, item => { return item?.user })
      this.committee.startDate = new Date(this.committee.startDate.value)
      this.committee.endDate = new Date(this.committee.endDate.value)

      this.committee?.props.map(item => {
        this.props.map(prop => {
          if (item?.propertyId == prop?.id) {
            if (isSet(item?.value)) {
              prop.value = item?.value
              prop.propertyId = item?.propertyId
              prop.id = item?.id
            }
          }
        })
      })
     
      this.committee.props = this.props


    }, error => {
      this.loading = false
    })
  }
  committeeAddEdit() {

    if (isSet(this.committee?.id)) {
      this.updateCommittee()
    } else this.addCommittee()

  }
  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {

      if (params['committeeID']) {
        this.title = 'Edit Committee'
        this.getCommittee(params['committeeID'])
      }
    });
    sub.unsubscribe()
  }
  updateCommittee() {

    this.committeesService.updateCommittee(this.committee).subscribe(() => {
      this.onHide('reload')
    })
  }
  getProps() {
    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {
      if (!isSet(settings)) {
        return
      }

      const customProps = settings?.modules?.find(item => item?.key == 'Committee')?.props
      this.committee.props = JSON.parse(JSON.stringify(customProps))
      this.props = JSON.parse(JSON.stringify(customProps))

      if (!isSet(this.committee.props)) {
        this.committee.props = []

      }

    })
    sub.unsubscribe()
  }

  endDateChange() {

    if (Date.parse(this.committee.startDate.toString()) > Date.parse(this.committee.endDate.toString())) {
      console.log('test');

      this.committee.endDate = null
      return this.errorMessage("Start date can't be greater than the End date")
    }

  }
}
