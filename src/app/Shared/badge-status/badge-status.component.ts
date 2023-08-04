import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'badge-status',
  standalone:true,
  templateUrl: './badge-status.component.html',
  styleUrls: ['./badge-status.component.scss']
})
export class BadgeStatusComponent implements OnInit {

  constructor() { }
  @Input() status: any 
  @Input() class: string 

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
