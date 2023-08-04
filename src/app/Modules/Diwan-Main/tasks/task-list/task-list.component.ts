import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { ResponseBody } from 'src/app/modals/response';
import { Task } from 'src/app/modals/Task';
import { TaskService } from '../task.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends BaseComponent implements OnInit {


  breadcrumb = [
    {
      label: 'Tasks',
      url: `tasks`,
    },
  ]
  ///
  tasks: Task[] = []
  accessibility:any
  loadingTasks = false
  displayAddEditTask = false
  displayTaskDetails = false
  //Statistics
  tasksStatistics: any
  loadingTasksStatistics = false
  taskPerMonth: any
  raciMatrixLength = 0
  tasksCharts: any = { years: [], currentYear: new Date().getFullYear(), data: null }
  selectedStatusCard:any
  constructor(private taskService: TaskService, public translates: TranslateService,
    public messageService: MessageService, private router: Router, private activateRoute: ActivatedRoute,
    private coreService:CoreService,
    @Inject(DOCUMENT) private document: Document) {
    super(messageService, translates)
  }

  ngOnInit(): void {
    this.getFromUrl()
    this.getTasks()
    this.getTaskStatistics()
    this.getAccessibilities()
  }
  getAccessibilities(){
 const sub = this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
      this.accessibility= accessibilities?.find(item => item?.key == "Task")
    })
    this.subscriptions.push(sub)

  }
  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['view'] == 'new') {
        this.showAddEditTask()

      }
      if (params['view'] == 'details') {
        this.showTaskDetails(params['taskId'])

      }
      if (params['view'] == 'edit') {
        this.showAddEditTask(params['taskId'], params['view'])

      }
      if (params['view'] == 'reload') {
        this.router.navigate([], {
          queryParams: {
            view: null
          },
          queryParamsHandling: 'merge',
        })
        this.getTasks()
        this.getTaskStatistics()
      }
      if (!isSet(params['view'])) {
        this.overflow('auto')
      }
    });
  }

  getTasks(statues?) {
    this.loadingTasks = true
    this.taskService.getTasks(statues).subscribe((tasks: ResponseBody<any>) => {
      this.tasks = tasks.data
      this.loadingTasks = false;
    }, error => {
      this.loadingTasks = false

    })
  }

  getTaskStatistics() {
    this.loadingTasksStatistics = true
    this.taskService.getTaskStatistics().subscribe((tasksStatistics: ResponseBody<any>) => {
      this.tasksStatistics = tasksStatistics.data
      this.tasksStatistics?.tasksPerMonth?.forEach(task => this.tasksCharts?.years?.push(task.year))
      this.raciMatrixLength = this.tasksStatistics?.raci?.map(item => item.value).reduce((prev, next) => prev + next)

      this.getTaskPerMonth()

      this.loadingTasksStatistics = false;

    }, error => {
      this.loadingTasksStatistics = false

    })
  }

  raciResponsiveOptions() {
    return [
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 3
      }
    ];
  }

  getTaskPerMonth() {

    const data: any = { month: [], unCompleted: { label: null, color: null, values: [] }, completed: { label: null, color: null, values: [] } }
    this.tasksStatistics?.tasksPerMonth.map(task => {
      if (this.tasksCharts.currentYear == task?.year) {
        task.data?.map(item => {
          data.month.push(item.month)
          data.unCompleted.label = item?.unCompleted?.name
          data.unCompleted.color = item?.unCompleted?.details?.color
          data.unCompleted.values.push(item?.unCompleted?.value)
          data.completed.label = item?.completed?.name
          data.completed.color = item?.completed?.details?.color
          data.completed.values.push(item?.completed?.value)

        })

      }
    })

    this.tasksCharts.data = {
      labels: data.month,
      datasets: [
        {
          label: data.unCompleted.label,
          backgroundColor: data.unCompleted.color,
          data: data.unCompleted.values
        },
        {
          label: data.completed.label,
          backgroundColor: data.completed.color,
          data: data?.completed?.values
        }
      ]
    }


  }
  showTaskDetails(taskId) {
    this.displayTaskDetails = true
    this.router.navigate([], {
      queryParams: {
        taskId: taskId,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  showAddEditTask(taskId?, view?) {
    this.displayAddEditTask = true
    this.router.navigate([], {
      queryParams: {
        taskId: taskId,
        view: view || 'new'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }

  overflow(value) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement
    htmlTag.style.overflow = value
  }
}
