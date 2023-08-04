import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { ResponseBody } from 'src/app/modals/response';
import { Task } from 'src/app/modals/Task';
import { TaskService } from '../task.service';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { AttachmentComponent } from 'src/app/Shared/attachment/attachment.component';
import { BadgeStatusComponent } from 'src/app/Shared/badge-status/badge-status.component';
import { ProgressComponent } from 'src/app/Shared/Charts/progress/progress.component';
import { circleButtonComponent } from 'src/app/Shared/circle-button/circle-button.component';
import { CommentsComponent } from 'src/app/Shared/comments/comments.component';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { SliderComponent } from 'src/app/Shared/prgoress/prgoress.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FindTagsComponent } from 'src/app/Shared/find-tags/find-tags.component';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from 'src/app/Shared/text-area/text-area.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { CalendarComponent } from 'src/app/Shared/calendar/calendar.component';
import { FindUserComponent } from 'src/app/Shared/find-user/find-user.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { CoreService } from 'src/app/core/core.service';
import { DynamicPropertiesComponent } from 'src/app/Shared/dynamic-properties/dynamic-properties.component';

@Component({
  selector: 'app-task-EditAdd',
  templateUrl: './task-EditAdd.component.html',
  standalone: true,
  imports: [CommonModule, circleButtonComponent,
    FormsModule,
    TranslateModule,
    EntityViewerComponent,
    BadgeStatusComponent,
    SliderComponent,
    ProgressComponent,
    AttachmentComponent,
    CommentsComponent,
    SidebarComponent,
    FindUserComponent,
    SelectStatusComponent,
    FindTagsComponent,
    InputComponent,
    TextAreaComponent,
    CalendarComponent,
    PrimengComponentsModule,
    DynamicPropertiesComponent,
    LoadingComponent],
  styleUrls: ['./task-EditAdd.component.scss']
})
export class TaskEditAddComponent extends BaseComponent implements OnInit {

  constructor(private taskService: TaskService,
    public messageService: MessageService, public translates: TranslateService,
    private coreService: CoreService,
    private activateRoute: ActivatedRoute,
    private router: Router) {
    super(messageService, translates)
  }

  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  task = new Task()
  props = []
  //

  priorities = []
  title = 'Add New Task'
  ngOnInit(): void {
    this.getProps()
    this.getFormUrl()
    this.initTask()
    this.getFormSettings()

  }
  getFormUrl() {
    this.activateRoute.queryParams.subscribe((params) => {

      if (params['taskId']) {
        this.getTask(params['taskId'])
        this.title = this.trans('Edit') + '\n' + this.trans('Task')
      }
    });
  }
  initTask() {
    this.task.title = { en: '', ar: '' }
    this.task.description = { en: '', ar: '' }

  }
  getFormSettings() {
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    this.priorities = lookups?.find(item => item?.key == 'Task_Priority').items
  }
  addTask() {
    this.loading = true
    this.taskService.addTask(this.task).subscribe(() => {
      this.loading = false

      this.onHide('reload')
    }, error => {
      this.loading = false

    })

  }
  onHide(view?) {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        taskId: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  getTask(taskId) {
    this.loading = true

    this.taskService.getTask(taskId, 'edit').subscribe((task: ResponseBody<Task>) => {

      this.task = Task.cloneObject(task.data)
      this.task?.props.map(item => {
        this.props.map(prop => {
          if (item?.propertyId == prop?.id) {
            prop.value = item?.value
            prop.propertyId = item?.propertyId
            prop.id = item?.id
          }
        })
      })
      this.task.props = this.props

      this.task.dueDate = new Date(this.task.dueDate?.value)

      if (!isSet(this.task.description)) {
        this.task.description = {
          en: '',
          ar: ''
        }
      }
      this.loading = false

    }, error => {
      this.loading = false
    })
  }
  editTask() {
    this.taskService.updateTask(this.task).subscribe(() => {
      this.onHide('reload')
    })
  }
  taskEditAdd() {
    if (this.task?.id) {
      this.editTask()
    } else this.addTask()

  }
  getProps() {
    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {
      if (!isSet(settings)) {
        return
      }
      const customProps = settings?.modules?.find(item => item?.key == 'Task')?.props
      this.task.props = JSON.parse(JSON.stringify(customProps))
      this.props = JSON.parse(JSON.stringify(customProps))

    })
    sub.unsubscribe()
  }
}
