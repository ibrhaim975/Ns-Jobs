import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-input-check-box',
  templateUrl: './input-check-box.component.html',
  standalone:true,
  imports:[CheckboxModule,CommonModule,FormsModule,TranslateModule],
  styleUrls: ['./input-check-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputCheckBoxComponent,
      multi: true
    }]
})
export class InputCheckBoxComponent implements ControlValueAccessor {

  @Input() title: string
  @Input() class: string
  @Input() required: boolean=false
  @Input() placeholder: string

  constructor() { }
  innervalue
 

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get value(): any {
    return this.innervalue;
  }

  set value(v: any) {
    if (v !== this.innervalue) {
      this.innervalue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innervalue) {
      this.innervalue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public validate(c: FormControl) {
    return c.errors;
  }

}
