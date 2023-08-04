import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { isSet } from 'src/app/core/base/base.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-stepper-vertical',
  templateUrl: './stepper-vertical.component.html',
  imports: [MatStepperModule, CommonModule, TableComponent],
  standalone: true,
  styleUrls: ['./stepper-vertical.component.scss']
})
export class StepperVerticalComponent implements OnInit {

  @Input() data: any;
  columns = [
    { header: 'Type', field: 'targetType', width: '80%' },
    { header: 'Value', field: 'targetValue', width: '20%' },
  ]
  currentIndex: any
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(index) {
    if (index == this.currentIndex) {
      this.currentIndex = null
    } else {
      this.currentIndex = index

    }
  }

}
