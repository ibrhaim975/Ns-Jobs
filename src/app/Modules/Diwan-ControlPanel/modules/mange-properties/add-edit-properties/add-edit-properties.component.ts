import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { Properties } from 'src/app/modals/Properties';
import { PropertiesService } from '../properties.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-add-edit-properties',
  templateUrl: './add-edit-properties.component.html',
  styleUrls: ['./add-edit-properties.component.scss']
})
export class AddEditPropertiesComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private propertiesService: PropertiesService,
    private coreService: CoreService) {
    super(messageService, translates)
  }
  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  @Input() property = new Properties()
  @Input() properties: any
  @Input() order: number

  header = 'New Property'
  types = []
  //
  formulaBuilder = { porp: null, function: null, type: null, value: null }
  operators = []
  functions = []
  formulaCheck = false
  //
  lookups = []

  ngOnInit(): void {
    this.getPropertyTypes()
    this.initProperty()
    this.getProperty()
    this.getOperators()
    this.getFunctions()
  }
  getFunctions() {
    this.functions = [
      { name: 'Max', key: 'max' }, { name: 'Min', key: 'min' }, { name: 'Abs', key: 'abs' }, { name: 'Today', key: 'today' },
    ]
  }
  getOperators() {
    this.operators = [
      { name: 'fa-solid fa-equals', key: '=' }, { name: 'fa-solid fa-not-equal', key: '!=' }, { name: 'fa-solid fa-greater-than-equal', key: '>=' }, { name: 'fa-solid fa-less-than-equal', key: '<=' },
      { name: 'fa-solid fa-less-than', key: '>' }, { name: 'fa-solid fa-greater-than', key: '<' }, { name: 'fa-solid fa-plus', key: '+' }, { name: 'fa-solid fa-minus', key: '-' }, { name: 'fa-solid fa-xmark', key: '*' }
      , { name: 'fa-solid fa-divide', key: '/' }, { name: '', key: '(' }, { name: '', key: ')' }
    ]
  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  initProperty() {
    this.property.name = {
      ar: null,
      en: null
    }
    this.property.viewType = this.types[1]
    this.property.order = this.order
    this.property.isIncludeSummary=false
  }
  getPropertyTypes() {
    this.types = JSON.parse(localStorage.getItem('settings')).propertyTypes
    this.types.map(item => {
      item.name = item?.value?.label
    })

  }
  addEditProperty() {
    if (this.property?.id) {
      this.updateProperty()
    } else {
      this.addProperty()

    }
  }
  updateProperty() {
    this.loading = true
    this.propertiesService.updateProperty(this.property).subscribe(item => {
      this.loading = false

      this.propertiesService.propertiesChange.next(true)
      this.onHide()
    }, error => {
      this.loading = false

    })
  }
  addProperty() {
    this.loading = true
    this.propertiesService.addProperty(this.property).subscribe(item => {
      this.loading = false

      this.propertiesService.propertiesChange.next(true)
      this.onHide()
    }, error => {
      this.loading = false

    })
  }
  getProperty() {
    if (!isSet(this.property?.id)) {
      return
    }

    this.loading = true

    this.propertiesService.getProperty(this.property).subscribe(module => {
      this.property = module?.data
      this.property.viewType = this.types?.find(item => item?.key == this.property.viewType)
      if (isSet(this.property?.configuration?.headers)) {
        const headers = []
        for (const prop in this.property?.configuration?.headers) {
          headers.push({ key: prop, value: this.property?.configuration?.headers[prop] })
          this.property.configuration.headers = headers
        }
      }
      if (this.property.viewType.key == 'lookup' || this.property.viewType.key == 'lookupmultiselect') {
        this.getLookup()
      }
      this.header = 'Edit Property'
      this.loading = false

    }, erorr => {
      this.loading = false

    })
  }
  onChangeViewType() {
    this.property.isCalculated = false
    this.property.configuration = null
    if (this.property.viewType.key != 'percentage' || this.property.viewType.key != 'number' || this.property.viewType.key != 'currency' || this.property.viewType.key != 'date') {
      this.property.formulaRaw = null
    }

    if (this.property.viewType.key == 'api') {
      this.property.configuration = { endpoint: null, headers: [{ key: 'Accept', value: '*/*' }], key: null, value: null }
      this.property.propertiesApi = null
    }
    if (this.property.viewType.key == 'lookup' || this.property.viewType.key == 'lookupmultiselect') {
      this.getLookup()
    }

  }
  //Formula
  onAddFormula(data, type) {
    if (!isSet(this.property.formulaRaw)) {
      this.property.formulaRaw = []
    }
    if (type == 'value') {
      if (!isNaN(data?.key)) {
        data.key = Number(data?.key)
      }
    }
    this.property.formulaRaw.push({ key: data?.key, type: type, name: data?.name })
    this.checkFormula()
  }
  onRemoveFormula(index) {
    this.property.formulaRaw.splice(index, 1)
    this.checkFormula()
  }
  checkFormula() {
    this.propertiesService.checkFormula(this.property?.moduleId, this.property.formulaRaw).subscribe(item => {
      this.formulaCheck = item.data
    })
  }

  //Api

  checkApi() {
    const apiData = { ... this.property.configuration }
    this.propertiesService.checkApi(apiData).subscribe(api => {
      this.detectJsonSchema(api?.data)
    })
  }
  addHeader() {
    this.property.configuration.headers.push({ key: null, value: null })
  }
  removeHeader(index) {
    this.property.configuration.headers.splice(index, 1)
  }
  detectJsonSchema(json) {
    this.propertiesService.detectJsonSchema(json).subscribe(fields => {

      this.property.propertiesApi = fields.data?.properties
      console.log(this.property.propertiesApi);
      const properties = []

      for (const prop in this.property.propertiesApi) {
        console.log(prop);
        `${prop} | ${this.property.propertiesApi[prop]?.type}`
        properties.push({ name: `${prop} | ${this.property.propertiesApi[prop]?.type}`, key: prop })
      }

      this.property.propertiesApi = properties
    })
  }

  //Lookup
  getLookup() {
    if (isSet(this.lookups)) {
      return
    }
    const sub = this.coreService.getSetingsEmitter.subscribe(settings => {

      if (!isSet(settings)) {
        return
      }
      this.lookups = settings?.lookups
      if (isSet(this.property?.id)) {
        console.log(this.property.configuration);

        this.property.configuration = this.lookups?.find(item => item?.key == this.property.configuration)
      }
    })
    sub.unsubscribe()
  }
}
