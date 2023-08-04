import { Component, Input, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  imports: [AvatarGroupModule, AvatarModule],
  standalone: true,
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent extends BaseComponent implements OnInit {
  @Input() progress: any=0
  @Input() color: string;
  @Input() value: any =0
  @Input() name: any
  constructor() {
    super(null)
   }

  ngOnInit(): void {
  }
  hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
}
