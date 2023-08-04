import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetings-main',
  templateUrl: './meetings-main.component.html',
  styleUrls: ['./meetings-main.component.scss']
})
export class MeetingsMainComponent implements OnInit {

  constructor(private router :Router) { }
  activeIndex=0
  ngOnInit(): void {
  }
  navRouter(event) {
    this.activeIndex = event.index
    if (event.index == 0) {
      this.router.navigateByUrl('controlPanel/meetings/attributes')
    }
    if (event.index == 1) {
      this.router.navigateByUrl('controlPanel/meetings/agenda')
    }
  }
}
