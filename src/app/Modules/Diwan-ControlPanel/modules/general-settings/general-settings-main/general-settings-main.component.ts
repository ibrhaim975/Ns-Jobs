import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-settings-main',
  templateUrl: './general-settings-main.component.html',
  styleUrls: ['./general-settings-main.component.scss']
})
export class GeneralSettingsMainComponent implements OnInit {

  constructor(private router: Router) { }
  activeIndex = 0
  ngOnInit(): void {
  }
  navRouter(event) {
    this.activeIndex = event.index
    if (event.index == 0) {
      this.router.navigateByUrl('controlPanel/generalsettings/branding')
    }
    if (event.index == 1) {
      this.router.navigateByUrl('controlPanel/generalsettings/calendar')
    }
  }
}
