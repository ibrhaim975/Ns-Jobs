import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {BadgeModule} from 'primeng/badge';

@Component({
  selector: 'app-badge-button',
  standalone:true,
  imports:[ButtonModule,CommonModule,BadgeModule],
  templateUrl: './badge-button.component.html',
  styleUrls: ['./badge-button.component.scss']
})
export class BadgeButtonComponent implements OnInit {

  constructor() { }
  @Output() click = new EventEmitter();
  @Input() label: string = '';
  @Input() value: any = '';
  @Input() active: boolean = false;

  ngOnInit(): void {
  }
  onClick(event){
    this.click.emit(event)
    
  }
}
