import * as _ from 'lodash';
import { isSet, moduleId } from '../core/base/base.component';

export class Properties {
  id: any
  name: any
  key: string
  isActive: boolean
  moduleId: any
  viewType: any
  isRequired: boolean
  isTranslatable: boolean
  configuration: any
  order: number
  isCalculated: boolean
  reference: any
  formulaRaw: any
  isIncludeSummary: boolean
  propertiesApi: any
  isIncludeWorkflow:boolean
  public constructor(params?: Properties) {
    Object.assign(this, params);
  }
  public static cloneObject(objectToClone: Properties) {
    if (!isSet(objectToClone)) {
      return new Properties();
    }

    const obj = new Properties(objectToClone);
    return obj;

  }

  public addToDb() {

    if (this.configuration && this.viewType?.key == 'api') {
      this.configuration.value = this.configuration?.value?.key
      this.configuration.key = this.configuration?.key?.key
      //
      const headers = {}
      this.configuration.headers.map(item => {
        console.log(item);

        headers[item?.key] = item?.value
      })
      this.configuration.headers = headers
      console.log(headers);

    }
    if (this.viewType?.key == 'lookup' || this.viewType?.key == 'lookupmultiselect') {
      this.configuration=this.configuration?.key
    }
    return {
      name: {
        ar: this.name?.ar,
        en: this.name?.en
      },
      isActive: this.isActive,
      moduleId: this.moduleId,
      viewType: this.viewType?.key,
      isRequired: this.isRequired,
      isTranslatable: this.isTranslatable,
      configuration: this.configuration,
      order: this.order,
      isCalculated: this.isCalculated,
      formulaRaw: this.formulaRaw,
      isIncludeSummary: this.isIncludeSummary,
      isIncludeWorkflow:this.isIncludeWorkflow
    }
  }

}
