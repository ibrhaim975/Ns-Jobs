import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prgoress',
  templateUrl: './prgoress.component.html',
  imports: [SliderModule, FormsModule, ProgressBarModule, CommonModule],
  standalone: true,
  styleUrls: ['./prgoress.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {

  constructor() { }
  @Input() value: any = 0
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter();
  @Input() mode: string = 'NoEdit'
  @Input() color: string

  id: string

  ngOnInit(): void {

    this.id = new Date().getTime().toString()





  }
  ngAfterViewInit(): void {

    //progressBar color
    const progressBar: Element = document?.getElementById("progressBar" + this.id)
    const progressbarValue: any = progressBar?.getElementsByClassName('p-progressbar-value')[0]

    if (progressbarValue?.style) {
      progressbarValue.style.background = this.color

    }
    //slider color

    const slider: Element = document?.getElementById("slider" + this.id)
    const sliderValue: any = slider?.getElementsByClassName('p-slider-range')[0]
    const sliderHandle: any = slider?.getElementsByClassName('p-slider-handle')[0]
    if (sliderHandle?.style) {
      sliderHandle.style['border-color'] = this.color
      sliderValue.style.background = this.color

    }



  }
  onChange(event) {
    this.valueChange.emit(event?.value)
  }

}
