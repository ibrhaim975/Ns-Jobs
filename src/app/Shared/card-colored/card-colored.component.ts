import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-colored',
  templateUrl: './card-colored.component.html',
  standalone:true,
  imports: [CommonModule],

  styleUrls: ['./card-colored.component.scss']
})
export class CardColoredComponent implements OnInit {
  @Input() colorDir='leftRight'
  @Input() class=''
  @Input() color=''
  @Input() width=''
  @Input() height=''
  @Input() backgroundColor=''

 
  constructor() { }
  lang = localStorage.getItem('currentLang')

  ngOnInit(): void {
  }

}
