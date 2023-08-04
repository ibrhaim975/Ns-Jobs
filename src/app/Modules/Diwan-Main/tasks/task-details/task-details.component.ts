import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, moduleId } from 'src/app/core/base/base.component';
import { Task } from 'src/app/modals/Task';
import { AuthService } from 'src/app/Modules/auth/auth.service';
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
import { TaskService } from '../task.service';
import { DynamicPropertiesPreviewComponent } from 'src/app/Shared/dynamic-properties-preview/dynamic-properties-preview.component';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-details.component.html',
  standalone: true,
  imports: [CommonModule, PrimengComponentsModule, SidebarComponent, TranslateModule, circleButtonComponent,
    EntityViewerComponent,
    BadgeStatusComponent,
    SliderComponent,
    ProgressComponent,
    AttachmentComponent,
    CommentsComponent,
    SidebarComponent,
    DynamicPropertiesPreviewComponent,
    LoadingComponent],
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent extends BaseComponent implements OnInit, AfterContentInit {

  constructor(private cd: ChangeDetectorRef, private activateRoute: ActivatedRoute, private coreService: CoreService,
    private router: Router, private taskService: TaskService, private confirmationService: ConfirmationService,
    public translates: TranslateService, public messageService: MessageService, private authService: AuthService) {
    super(messageService, translates)
  }
  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('autoCompleteSearch') autoCompleteSearch: any;
  @ViewChild('RelatedMembers') relatedMembers: ElementRef;

  task = new Task()
  prgoressMode = 'NoEdit'
  prgoressPrv=0
  taskActinos = []
  loadComments = true
  currentUser = this.authService?.getAuthData()?.user
  commentsHeight
  view = null
  loadingTask = true
  ngOnInit(): void {
    this.getFormUrl()

  }

  ngAfterContentInit(): void {
    this.cd?.detectChanges();

  }
  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {
      if (params['taskId']) {
        this.getTask(params['taskId'])
      }
    });
    sub?.unsubscribe()

  }
  getTask(taskId) {
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task.data
      this.loadingTask = false
      this.getPrivileges()
      setTimeout(() => {
        const height = `${this.relatedMembers.nativeElement.offsetHeight + 250}px`
        this.commentsHeight = `calc(92vh - ${height})`
      });

    }, error => {
      this.loadingTask = false
      this.loadComments = false

    })
  }
  onHide(view?) {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        taskId: null,
        view: view || this.view
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  deleteTask() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Task'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.taskService.deleteTask(this.task?.id).subscribe((t) => {
          this.onHide('reload')
        })
      }

    });
  }
  progressChange() {
    setTimeout(() => {
      this.confirmationService.confirm({
        message: this.trans('Do you want to update progress this') + '\n' + this.trans('Task'),
        header: this.trans('Update Progress'),
        rejectLabel: this.trans('Cancel'),
        rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
        acceptLabel: this.trans('Confirm'),
        acceptButtonStyleClass: ' text-btn',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.taskService.updateProgress(this.task?.id, this.task?.progress).subscribe(() => {
            this.successMessage(this.trans('Progress Updated Successfully'))
            this.prgoressMode = 'NoEdit'
            this.view = 'reload'
            this.getTask(this.task?.id)
          })
        }

      });

    }, 500);

  }
  markAsCompleted() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to mark task as completed'),
      header: this.trans('Mark as Completed'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.taskService.markAsCompleted(this.task?.id).subscribe(() => {
          this.getTask(this.task?.id)
          this.successMessage(this.trans('Task Marked as Completed'))
        })
      }

    });


  }
  getPrivileges() {
    this.coreService.getPrivileges(moduleId('Task'), this.task?.id).subscribe((privileges: any) => {
      const taskPrivileges = privileges?.data
      this.taskActinos = []
      taskPrivileges.map(action => {
        if (action?.hasPermission == true) {

          if (action?.permissionName == 'DeleteTaskCommand') {
            this.taskActinos.push(
              {
                label: this.trans('Delete') + '\n' + this.trans('Task'),
                icon: 'pi pi-trash',
                command: () => {
                  this.deleteTask()
                }


              }
            )
          }
          if (this.task?.status?.key != 'Completed') {
            if (action?.permissionName == 'UpdateTaskProgressCommand') {
              this.taskActinos.push({
                label: this.trans('Update Progress'),
                icon: 'pi pi-pencil',
                command: (event) => {
                  this.prgoressPrv=this.task.progress

                  if (this.prgoressMode == 'Edit') {
                    this.prgoressMode = 'NoEdit'
                    event.item.label=this.trans('Update Progress')
                    event.item.icon='pi pi-pencil'
  
                  } else {
                    event.item.label=this.trans('Cancel Update Progress')
                    event.item.icon=this.trans('pi pi-times')
                    this.prgoressMode = 'Edit'
                    this.task.progress=this.prgoressPrv
                  }
  
  
  
                }
              })
            }

            if (action?.permissionName == 'MarkTaskAsCompletedCommand') {
              this.taskActinos.push(
                {
                  label: this.trans('Mark as Completed'),
                  icon: 'pi pi-check-circle',
                  command: () => {
                    this.markAsCompleted()
                  }
                }
              )
            }

            if (action?.permissionName == 'UpdateTaskCommand') {
              this.taskActinos.push(
                {
                  label: this.trans('Edit') + '\n' + this.trans('Task'),
                  icon: 'fa-solid fa-pen-to-square',
                  command: () => {
                    this.display = false
                    this.router.navigate([], {
                      queryParams: {
                        view: 'edit'
                      },
                      queryParamsHandling: 'merge',
                    })

                    setTimeout(() => {
                      this.displayChange.emit(false)
                    }, 300);
                  }


                }
              )
            }
          }

          
        }
      })
 
   
    })




    /// remove dupplicats
    const uniqueIds = [];
    const unique = this.taskActinos.filter(element => {
      const isDuplicate = uniqueIds.includes(element.label);
      if (!isDuplicate) {
        uniqueIds.push(element.label);
        return true;
      }
      return false;
    });
    this.taskActinos = unique


  }
}