import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeStatusComponent } from '../badge-status/badge-status.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SliderComponent } from '../prgoress/prgoress.component';

@Component({
  selector: 'entity-viewer',
  templateUrl: './entity-viewer.component.html',
  imports: [CommonModule, AvatarModule, AvatarGroupModule, BadgeStatusComponent, TranslateModule, ButtonModule, TooltipModule,SliderComponent],
  standalone: true,
  styleUrls: ['./entity-viewer.component.scss']
})
export class EntityViewerComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() entity: any
  @Input() darkMode: any
  @Input() avatarSize: any
  @Input() avatar: any
  @Input() showAll = false
  show = 5


  ngOnInit(): void {
    if (this.showAll==true) {
      this.show = this.entity?.value?.length
    }
  }
  showLink(url) {
    this.router.navigateByUrl(url)
  }
}
