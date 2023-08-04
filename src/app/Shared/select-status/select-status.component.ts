import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {DropdownModule} from 'primeng/dropdown';
import { Satus } from 'src/app/modals/Status';

@Component({
  selector: 'app-select-status',
  templateUrl: './select-status.component.html',
  standalone:true,
  imports: [DropdownModule, FormsModule, TranslateModule,CommonModule ],
  styleUrls: ['./select-status.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectStatusComponent,
      multi: true
    }]
})
export class SelectStatusComponent implements ControlValueAccessor {

  constructor() { }
  @Input() title: string
  @Input() placeholder: string
  @Input() required: boolean=false
  @Input() disabled: boolean

  innerSelectedStatus
  @Input() statues: Satus[]=[]
  @Input() showColor: boolean=true
  @Input() optionLabel='name'
  @Input() optionValue:any='name'

  @Input() hideTitle=false
  @Input() filter=true

  
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get selectedStatus(): any {
    return this.innerSelectedStatus;
  }

  set selectedStatus(v: any) {
    if (v !== this.innerSelectedStatus) {
      this.innerSelectedStatus = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(selectedStatus: any) {
    if (selectedStatus !== this.innerSelectedStatus) {
      this.innerSelectedStatus = selectedStatus;
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
  ngModelChangeCustomFilter(data) {
    // this.customFilter = null
    // setTimeout(() => {
    //   this.customFilter = data
    // });

  }
}
