import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  standalone: true,
  imports: [DropdownModule, FormsModule, TranslateModule, CommonModule,TranslateModule],
  styleUrls: ['./icon-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IconPickerComponent,
      multi: true
    }]
})
export class IconPickerComponent implements ControlValueAccessor,AfterViewInit {
  constructor(private http: HttpClient) {
    this.http.get('assets/icons/icons.json').subscribe(data => {
      this.icons = data['solid']

    });

  }
  ngAfterViewInit(): void {
    if (this.dropdown) {
      (this.dropdown.filterBy as any) = {
        split: (_: any) => [(item: any) => item],
      };
    }
  }
  @Input() title: string
  @Input() required: boolean = false
  icons: any
  selectedIcons:any
  innerSelectedStatus
  @ViewChild('dropdown') dropdown?: Dropdown;


  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

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
}
