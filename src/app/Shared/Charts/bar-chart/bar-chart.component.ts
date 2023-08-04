import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  imports: [ChartModule,CommonModule],
  standalone: true,
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }
  @Input()basicOptions: any
  @Input() value: any 

  ngOnInit(): void {
    this.basicOptions = {
      plugins: {
      },
      scales: {
        x: {
          grid: {
            color: 'white'
          }
        },
        y: {
          grid: {
            color: 'white'
          }
        }

      }
    }
  }

}
