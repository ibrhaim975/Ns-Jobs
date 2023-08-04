import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Task } from 'src/app/modals/Task';

@Component({
  selector: 'app-home-task-card',
  templateUrl: './home-task-card.component.html',
  styleUrls: ['./home-task-card.component.scss']
})
export class HomeTaskCardComponent extends BaseComponent implements OnInit {

  constructor(private router:Router) { 
    super()
  }
  
  @Input() task=new Task()
  ngOnInit(): void {
  }

}
