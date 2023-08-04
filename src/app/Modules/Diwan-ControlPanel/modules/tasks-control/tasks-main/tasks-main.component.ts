import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit {
  activeIndex = 0
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navRouter(event) {
    this.activeIndex = event.index
    if (event.index == 0) {
      this.router.navigateByUrl('controlPanel/tasks/attributes')
    }
    if (event.index == 1) {
      this.router.navigateByUrl('controlPanel/tasks/roles')
    }
  }
}
