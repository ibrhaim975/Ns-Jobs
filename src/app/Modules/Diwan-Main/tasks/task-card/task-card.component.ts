import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/modals/Task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  constructor() { }
  @Input() task:Task
  ngOnInit(): void {
  }

}
