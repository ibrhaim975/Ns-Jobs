import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SelectStatusComponent } from '../select-status/select-status.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CommonModule } from '@angular/common';
import { FindUserComponent } from '../find-user/find-user.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { isSet } from 'src/app/core/base/base.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputPercentageComponent } from '../input-percentage/input-percentage.component';
import { InputCheckBoxComponent } from '../input-check-box/input-check-box.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreService } from 'src/app/core/core.service';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import { ApiService } from 'src/app/core/api.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dynamic-properties',
  templateUrl: './dynamic-properties.component.html',
  standalone: true,
  imports: [InputComponent, SelectStatusComponent, TextAreaComponent, CommonModule, FindUserComponent, CalendarComponent,
    InputNumberComponent, InputPercentageComponent, MultiSelectComponent,
    CalendarComponent, InputCheckBoxComponent,
    FormsModule, TranslateModule],
  styleUrls: ['./dynamic-properties.component.scss']
})
export class DynamicPropertiesComponent implements OnInit, AfterViewInit {

  @Input() props: any
  @Output() propsChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('form') form: any;
  @Output() formInvalid: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient, private coreService: CoreService, private api: ApiService) { }

  ngOnInit(): void {

    this.initProps()

  }
  initProps() {

    if (!isSet(this.props)) {
      return
    }

    this.props = this.props?.filter(prop => prop?.isSystem == false)

    this.props?.map((item, index) => {
      if (item.isTranslatable == true) {
        item.value = {
          en: null, ar: null
        }
      }

      if (isSet(item?.reference) && item.viewType != 'user') {
      }

      if (item?.viewType == 'api') {
        this.getApiProps(item?.reference, index)
      }
      if (item?.viewType == 'lookup' || item?.viewType == 'lookupmultiselect') {
        this.getLookups(item)
      }
      if (isSet(item?.value)) {

        if (item?.viewType == 'currency') {
          console.log(item.value);

          item.value = item?.value?.value
        }
        if (item.viewType == 'percentage') {
          item.value = item?.value?.value
        }
        if (item.viewType == 'date') {
          item.value = new Date(item?.value?.value)
        }

      }
    })

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formInvalid.emit(this.form?.invalid)
    }, 1000)
  }
  getApiProps(reference, index) {

    this.api.get(reference?.url?.replace("api/", '')).subscribe((props: any) => {
      this.props[index].reference = { props: props?.data }

    })

  }
  onChangeData() {

    this.propsChange.emit(this.props)
    this.formInvalid.emit(this.form?.invalid)

  }
  getConfigration(item) {
    const currentLang = localStorage.getItem('currentLang')
    item.reference = JSON.parse(item.reference)
    item.reference.map(item => {

      if (currentLang == 'en') {
        item.name = item.name.en
      }
      if (currentLang == 'ar') {
        item.name = item.name.ar
      }
    })


  }
  getLookups(item) {

    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {

      if (!isSet(settings)) {
        return
      }
      const lookups = settings?.lookups
      item.reference = { ...lookups.find(lookup => lookup?.key == item?.reference) }
      console.log(item.reference);

      // if (isSet(this.property?.id)) {
      //   this.property.configuration = JSON.parse(this.property.configuration.name)
      //  this.property.configuration= this.lookups?.find(item => item?.key == this.property.configuration)       
      // }
    })
    sub.unsubscribe()

  }

}
