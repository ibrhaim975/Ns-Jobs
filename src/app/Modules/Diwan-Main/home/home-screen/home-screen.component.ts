import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Carousel } from 'primeng/carousel';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { ResponseBody } from 'src/app/modals/response';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { TaskService } from '../../tasks/task.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent extends BaseComponent implements OnInit {
  currentUser = this.authService?.getAuthData()?.user?.displayName
  statistics: any
  @ViewChild('carousel') carousel: Carousel ;

  currentMode = 'Tasks'
  header = 'PENDING TASKS'
  currentLang = localStorage.getItem('currentLang')

  displayTaskDetails = false
  displayAddEditTask = false
  displayAddEditCalender = false
  displayCalenderDetails = false
  constructor(private authService: AuthService, public translates: TranslateService,
    private homeService: HomeService, private router: Router, private cdref: ChangeDetectorRef,
    private activateRoute: ActivatedRoute, private taskService: TaskService,
    public messageService: MessageService) {
    super(messageService, translates)
  }
  ngOnInit(): void {
    // this.refreshCache()
    this.getStatistics()
    this.getFromUrl()

  }
  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {

      if (params['taskId']) {

        if (params['view'] == 'edit') this.displayAddEditTask = true

        if (params['view'] == 'details') this.displayTaskDetails = true

      }

      if (params['meetId']) {

        if (params['view'] == 'edit') this.displayAddEditCalender = true

        if (params['view'] == 'details') this.displayCalenderDetails = true

      }
      if (params['view'] == 'reload') {
        this.getStatistics()

        this.router.navigate([], {
          queryParams: {
            view: null
          },
          queryParamsHandling: 'merge',
        })

      }

    });
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  refreshCache() {
    this.loading = true
    const sub = this.homeService.refreshCache().subscribe((statistics: ResponseBody<any>) => {
      this.getStatistics()

      sub.unsubscribe()

    }, error => {
      sub.unsubscribe()
      this.loading = false

    })
  }
  getStatistics() {
    const sub = this.homeService.getStatistics().subscribe((statistics: ResponseBody<any>) => {

      this.statistics = statistics?.data
      sub.unsubscribe()
      this.loading = false

    }, error => {
      this.loading = false

    })
  }
  showTaskDetails(taskId) {
    // if (!isSet(this.taskService.privileges)) {
    //   // this.taskService.getPrivileges()
    // }
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
  showCalendar() {
    this.currentMode = 'Calendar'
    this.header = 'CALENDAR'
    console.log(this.header);

  }
  showTasks() {
    this.currentMode = 'Tasks'
    this.header = 'PENDING TASKS'

  }

  showMeetingsCard(){
    this.currentMode='MeetingCard'
    this.header = 'MEETINGS'

  }
  showMeetDetails(meetId) {
    this.displayCalenderDetails = true
    this.router.navigate([], {
      queryParams: {
        meetId: meetId,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })

  }

}
