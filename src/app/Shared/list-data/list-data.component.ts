import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import { ModalComponent } from '../modal/modal.component';
import { InputComponent } from '../input/input.component';
import { isSet } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  standalone:true,
  imports:[CommonModule,FormsModule,TranslateModule,ButtonModule,ModalComponent,InputComponent],
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {
  @Input() title: string
  @Input() title2: string
  @Input() class: string
  @Input() required: boolean=false
  @Input() placeholder: string
  @Input() hideTitle: boolean
  @Input() disabled: boolean
  @Input() value: any
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter();

  showAddValue=false
  
  newValue
  constructor() { }

  showAddNew() {
    this.showAddValue = true
    this.newValue = null
  }
  addNewValue() {
    if (!isSet(this.value)) {
      this.value=[]
    }
    this.value.push(this.newValue)
    this.valueChange.emit(this.value)
    this.showAddValue = false
  }
deleteValue(index){
this.value.splice(index,1)
}

  ngOnInit(): void {
  }
 
}
