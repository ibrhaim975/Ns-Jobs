import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { trans } from 'src/app/core/localization/localization';
import { DashboredService } from '../dashbored.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent extends BaseComponent implements OnInit, AfterContentInit,AfterViewInit {

  constructor(private dashboredService: DashboredService, public translates: TranslateService,
    public messageService: MessageService, private rotuer: Router, private cd: ChangeDetectorRef) {
    super(messageService, translates)

  }

  breadcrumb = [{ label: 'Dashboard', url: `dashboard` }]
  currentLang = localStorage.getItem('currentLang')
  dashboard: any
  showDetails = false
  dataDetails: any
  textSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--surface-500')

  ngOnInit(): void {

    this.getDashbored()
  }
  ngAfterViewInit(): void {
  
    this.cd.detectChanges();

  }
  ngAfterContentInit() {
    this.cd.detectChanges();

  }
  getDashbored() {
    this.loading = true
    this.dashboredService.getDashboard().subscribe(dashboard => {
      this.dashboard = dashboard.data

      this.buildHeader()
      this.buildTasksCards()
      // this.chartDoughnutTaskCompleted()
      this.chartDoughnutTaskStatus()
      this.meetingsChartBar()
      this.chartDoughnutCommitteesStatus()
      this.chartBarCommitteesTypes()
      this.actionItemsDoughnutDashboard()
      this.loading = false

    },error=>{
      this.loading = true

    })
  }
  hexToRGB(hex, alpha?) {
    var r = parseInt(hex?.slice(1, 3), 16),
      g = parseInt(hex?.slice(3, 5), 16),
      b = parseInt(hex?.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  buildHeader() {
    const tasks = this.dashboard.tasks
    const meetings = this.dashboard.meetings
    const committees = this.dashboard.committees?.types

    this.dashboard['header'] = []
    this.dashboard['header'].push({
      name: tasks?.find(item => item?.key == "Total_Tasks")?.name,
      count: tasks?.find(item => item?.key == "Total_Tasks")?.value,
      icon: 'icon-tasks',
      type: 'Tasks',
      color: tasks?.find(item => item?.key == "Total_Tasks")?.details?.color
    })
    this.dashboard['header'].push({
      name: meetings?.find(item => item?.key == "Total_Meetings")?.name,
      count: meetings?.find(item => item?.key == "Total_Meetings")?.value,
      icon: 'icon-business-meeting',
      type: 'Meetings',
      color: meetings?.find(item => item?.key == "Total_Meetings")?.details?.color
    })

    this.dashboard['header'].push({
      name: committees?.find(item => item?.key == "Total_Committees")?.name,
      count: committees?.find(item => item?.key == "Total_Committees")?.value,
      icon: 'icon-committees',
      type: 'Committees',
      color: committees?.find(item => item?.key == "Total_Committees")?.details?.color
    })
    this.dashboard['header'].push({
      name: meetings?.find(item => item?.key == "Action_Items")?.name,
      count: meetings?.find(item => item?.key == "Action_Items")?.value,
      icon: 'icon-actionItems',
      type: 'Tasks',
      filed: 'target',
      id: 'ActionItem',
      color: meetings?.find(item => item?.key == "Action_Items")?.details?.color

    })

    this.dashboard['header'].push({
      name: 'High Priority Projects',
      count: 0,
      icon: 'icon-portfolio',
      color: '#F1987D'

    })
  }
  buildTasksCards() {
    const tasks = this.dashboard.tasks
    this.dashboard['tasksCards'] = []
    this.dashboard['tasksCards'].push({
      name: tasks?.find(item => item?.key == "Delayed")?.name,
      count: tasks?.find(item => item?.key == "Delayed")?.value,
      id: tasks?.find(item => item?.key == "Delayed")?.id,
      color: tasks?.find(item => item?.key == "Delayed")?.details?.color
    })

    this.dashboard['tasksCards'].push({
      name: tasks?.find(item => item?.key == "Completed")?.name,
      count: tasks?.find(item => item?.key == "Completed")?.value,
      id: tasks?.find(item => item?.key == "Completed")?.id,
      color: tasks?.find(item => item?.key == "Completed")?.details?.color
    })

    this.dashboard['tasksCards'].push({
      name: tasks?.find(item => item?.key == "In_Progress")?.name,
      count: tasks?.find(item => item?.key == "In_Progress")?.value,
      id: tasks?.find(item => item?.key == "In_Progress")?.id,
      color: tasks?.find(item => item?.key == "In_Progress")?.details?.color
    })
  }
  chartDoughnutTaskStatus() {
    const tasks = this.dashboard.tasks
    this.dashboard['tasksCount'] = tasks[0]?.value
    tasks.splice(tasks.findIndex(object => { return object.key === 'Total_Tasks' }), 1);
    tasks.splice(tasks.findIndex(object => { return object.key === 'In_Completed' }), 1);
    this.dashboard['doughnutTaskStatusID'] = tasks.map(x => x.id)
    this.dashboard['doughnutTaskStatus'] = {
      labels: tasks.map(x => x.name),
      datasets: [
        {
          data: tasks,
          backgroundColor: tasks.map(x => x?.details?.color)
        }
      ]
    }


  }
  chartDoughnutTaskCompleted() {
    const tasks = this.dashboard.tasks
    console.log(tasks);

    this.dashboard['tasksCompleted'] = tasks?.find(item => item?.key == "Completed")?.value


    this.dashboard['doughnutTaskStatusCompleted'] = {
      labels: [tasks?.find(item => item?.key == "Completed")?.name, tasks?.find(item => item?.key == "In_Completed")?.name],
      datasets: [
        {
          data: [tasks?.find(item => item?.key == "Completed"), tasks?.find(item => item?.key == "In_Completed")],
          backgroundColor: [tasks?.find(item => item?.key == "Completed")?.details?.color, tasks?.find(item => item?.key == "In_Completed")?.details?.color]
        }
      ]
    }


  }
  meetingsChartBar() {
    const meetings = this.dashboard.meetings

    this.dashboard['meetingsChartBarID'] = [meetings?.find(item => item?.key == "Approved")?.id, meetings?.find(item => item?.key == "Rejected")?.id]
    this.dashboard['doughnutChartBarNames'] = [meetings?.find(item => item?.key == "Approved")?.name, meetings?.find(item => item?.key == "Rejected")?.name]

    this.dashboard['meetingsChartBar'] = {
      labels: [meetings?.find(item => item?.key == "Approved")?.name, meetings?.find(item => item?.key == "Rejected")?.name],
      datasets: [
        {
          label: meetings?.find(item => item?.key == "Approved")?.name,
          data: [meetings?.find(item => item?.key == "Approved")?.value,],
          barThickness: 30,
          categoryPercentage: 1, // notice here 
          barPercentage: 1,  // notice here 
          backgroundColor: meetings?.find(item => item?.key == "Approved")?.details?.color

        },
        {
          label: meetings?.find(item => item?.key == "Rejected")?.name,
          data: [, meetings?.find(item => item?.key == "Rejected")?.value],
          barThickness: 30,
          categoryPercentage: 1, // notice here 
          barPercentage: 1,  // notice here 
          backgroundColor: meetings?.find(item => item?.key == "Rejected")?.details?.color

        }


      ]
    };
    this.dashboard['meetingsChartBarOpction'] = {
      plugins: { legend: { labels: { boxWidth: 10, color: this.textSecondaryColor } } },
      scales: {
        x: {
          ticks: {
            display: false,

          }, grid: { color: 'white' }
        },
        y: {
          grid: { color: 'white' }
        },


      }
    }

  }
  chartDoughnutCommitteesStatus() {
    const committees = this.dashboard.committees.statueses
    this.dashboard['committeesCount'] = committees[0]?.value
    // committees.splice(0, 1);



    this.dashboard['doughnutCommitteesStatus'] = {
      labels: [committees?.find(item => item?.key == "Active")?.name, committees?.find(item => item?.key == "Cancelled")?.name],
      datasets: [
        {
          data: [committees?.find(item => item?.key == "Active"), committees?.find(item => item?.key == "Cancelled")],
          backgroundColor: [committees?.find(item => item?.key == "Active")?.details?.color, committees?.find(item => item?.key == "Cancelled")?.details?.color]
        }
      ]
    }


  }
  chartBarCommitteesTypes() {
    const committees = this.dashboard.committees.types
    committees.map((item, index) => {
      item.select = false
      if (item.key == "Total_Committees") {
        committees.splice(index, 1);
      }
      if (item.key == "Active") {
        committees.splice(index, 1);
      }
      if (item.key == "Cancelled") {
        committees.splice(index, 1);
      }
    })
    committees[0].select = false

    this.dashboard['barCommitteesTypesID'] = committees.map(x => x?.id)
    this.dashboard['barCommitteesTypesitems'] = committees

    this.dashboard['barCommitteesTypes'] = {
      labels: committees.map(x => x.name),
      datasets: [
        {
          barThickness: 30,
          data: committees.map(x => x.value),
          backgroundColor: committees.map(x => x.details?.color)

        }
      ]
    }

      ;
  }
  actionItemsDoughnutDashboard() {
    const meetings = this.dashboard.meetings
    this.dashboard['action_ItemTotal'] = meetings?.find(item => item?.key == "Action_Items")?.value


    meetings.splice(meetings.findIndex(object => { return object.key === 'Approved' }), 1);
    meetings.splice(meetings.findIndex(object => { return object.key === 'Total_Meetings' }), 1);
    meetings.splice(meetings.findIndex(object => { return object.key === 'Action_Items' }), 1);
    meetings.splice(meetings.findIndex(object => { return object.key === 'Cancelled_Meetings' }), 1);
    meetings.splice(meetings.findIndex(object => { return object.key === 'Rejected' }), 1);

    console.log(meetings);



    this.dashboard['actionItemsDoughnutDashboard'] = {
      labels: meetings.map(x => x.name),
      datasets: [
        {
          data: meetings,
          backgroundColor: meetings.map(x => x.details?.color)
        }
      ]
    }
  }

  onDataSelect(target, data?, target2?, data2?) {

    this.dataDetails = { type: target?.type, filed: target?.filed == 'statues' ? 'status' : target?.filed, value: data }
    if (data) {
      this.dataDetails['param'] = `${target?.filed}=${data}`
    }
    if (target2 && data2) {
      this.dataDetails.param = this.dataDetails.param + `&${target2?.filed}=${data2}`
    }
    this.showDetails = true
  }
  onLegendClickCommitteesTypes(item) {
    const barCommitteesTypesitems = [...this.dashboard?.barCommitteesTypesitems]

    if (item['select'] == false) {
      item['select'] = true
      barCommitteesTypesitems.splice(barCommitteesTypesitems.findIndex(object => { return object.key == item.key }), 1)
    } else {
      item['select'] = false
    }



    this.dashboard['barCommitteesTypes'] = {
      labels: barCommitteesTypesitems.map(x => x.name),
      datasets: [
        {
          barThickness: 30,
          data: barCommitteesTypesitems.map(x => x.value),
          backgroundColor: barCommitteesTypesitems.map(x => x.details?.color)

        }
      ]
    }
    console.log(this.dashboard?.barCommitteesTypesitems);

  }
}
