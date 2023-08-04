import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreService } from 'src/app/core/core.service';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { LoadingComponent } from '../loading/loading.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-timeline-activities',
  templateUrl: './timeline-activities.component.html',
  standalone: true,
  imports: [CommonModule, PrimengComponentsModule, TranslateModule, FormsModule, InputTextModule, LoadingComponent],
  styleUrls: ['./timeline-activities.component.scss']
})
export class TimelineActivitiesComponent implements OnInit {
  activities: any
  activitiesDispaly: any
  @Input() module: any
  activitie: any
  loadingActivity = false
  constructor(private datePipe: DatePipe, private coreService: CoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getActivities()

  }
  handleTime() {
    const times = []
    const uniqueTime = []
    const data = []
    this.activities?.map(item => {
      item.createdAt.value = this.datePipe.transform(new Date(item?.createdAt?.value), 'yyyy-MM-dd')
      times.push(item.createdAt.value)
    })
    times.map(x => uniqueTime.filter(a => a == x).length > 0 ? null : uniqueTime.push(x));


    uniqueTime.map((time) => {
      data.push({ time: time })
      this.activities.map(item => {
        if (time == item.createdAt.value) {
          data.push(item)

        }
      })
    })

    this.activitiesDispaly = data

  }
  getActivities() {
    this.loadingActivity = true
    this.coreService.getActivities(this.module).subscribe((activities) => {
      this.activities = activities?.data
      this.handleTime()

      this.loadingActivity = false
    }, error => {
      this.loadingActivity = false

    })
  }
  addActivities() {
    const body = {
      body: this.activitie,
      module: this.module
    }
    this.coreService.addComment(body).subscribe(item => {
      const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      const user = this.authService?.getAuthData()?.user
      const activity = {
        body: this.activitie,
        createdBy: user,
        createdAt: {value:new Date()},
        attachments: []
      }
      this.activitie = null
      console.log(this.activities);
      
      this.activities.push(activity)
      this.handleTime()
    })
  }
}
