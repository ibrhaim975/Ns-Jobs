import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {EditorModule} from 'primeng/editor';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  standalone:true,
  styleUrls: ['./text-editor.component.scss'],
  imports:[EditorModule,CommonModule,FormsModule,TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextEditorComponent,
      multi: true
    }]
})
export class TextEditorComponent implements ControlValueAccessor {

 
  @Input() title: string
  @Input() required: boolean=false
  @Input() placeholder: string
  @Input() height: string = '320px'

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