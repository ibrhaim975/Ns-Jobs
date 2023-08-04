import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-groups-main',
  templateUrl: './users-groups-main.component.html',
  styleUrls: ['./users-groups-main.component.scss']
})
export class UsersGroupsMainComponent implements OnInit {

  constructor(private router: Router) { }
  activeIndex = 0


  ngOnInit(): void {
    this.router.navigateByUrl('controlPanel/usersgroup/users')

  }
  navRouter(event) {
    this.activeIndex = event.index
    if (event.index == 0) {
      this.router.navigateByUrl('controlPanel/usersgroup/users')

    }
    if (event.index == 1) {
      this.router.navigateByUrl('controlPanel/usersgroup/groups')
    }

    if (event.index == 2) {
      this.router.navigateByUrl('controlPanel/usersgroup/accessibility')
    }
  }
}
