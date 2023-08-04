import { Component, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../general-settings.service';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent extends BaseComponent implements OnInit {
  data: any
  generalSettigs: any
  selected: any
  timeZones = []
  loadingImg: boolean

  systemColors: any

  languages = [{ name: 'English', value: 'en' }, { name: 'العربية', value: 'ar' }]
  currentLang: any


  landingModules: any
  currentLandingPage: any

  constructor(private generalSettingsService: GeneralSettingsService, private coreService: CoreService) {
    super()
  }

  ngOnInit(): void {
    this.getGeneralSettings()
    this.getTimeZone()
    this.getMenu()
  }
  getGeneralSettings() {
    this.loading = true
    this.loadingImg = true
    this.generalSettingsService.getGeneralSettigs().subscribe(generalSettigs => {
      this.generalSettigs = generalSettigs.data

      this.loading = false
      this.loadingImg = false
      this.systemColors = {
        primaryColor: this.findValue('PrimaryColor').value,
        textColor: this.findValue('TextColor').value,
        secondaryColor: this.findValue('SecondaryColor').value
      }
      this.currentLang = {
        key: 'Language',
        value: this.findValue('Language').value
      }
      this.currentLandingPage= {
        key: 'LandingPage',
        value: this.findValue('LandingPage').value
      }
    }, error => {
      this.loading = false
      this.loadingImg = false

    })
  }
  setSelected(key) {
    this.selected = { ...this.generalSettigs?.find(item => item?.key == key) }
  }
  findValue(key) {

    const selected = { ...this.generalSettigs?.find(item => item?.key == key) }

    return selected
  }
  updateGeneralSettings(data) {
    this.generalSettingsService.updateGeneralSettings(data).subscribe(() => {

      if (!Array.isArray(data)) {
        const index = this.generalSettigs.findIndex(object => { return object.key === data?.key })
        this.generalSettigs[index]['value'] = data?.value
        this.selected = null
      }

      localStorage.removeItem('genralSettings')
      const systemName: HTMLLinkElement = document.querySelector('#appName');
      systemName.innerHTML = this.generalSettigs?.find(item => item?.key == 'BusinessName')?.value;

    })

  }




  onPrimayColorChange() {

    document.documentElement.style.setProperty('--primary-color', this.systemColors?.primaryColor)
    this.selected = {
      key: 'PrimaryColor',
      value: this.systemColors?.primaryColor
    }


  }
  onTextColorChange() {
    document.documentElement.style.setProperty('--text-color', this.systemColors?.textColor)
    this.selected = {
      key: 'TextColor',
      value: this.systemColors?.textColor
    }

  }
  onTextSecondaryColorChange() {
    document.documentElement.style.setProperty('--surface-500', this.systemColors?.secondaryColor)
    this.selected = {
      key: 'SecondaryColor',
      value: this.systemColors?.secondaryColor
    }

  }
  backToDefultColors() {

    document.documentElement.style.setProperty('--primary-color', '#4F7EEA')
    document.documentElement.style.setProperty('--text-color', '#4e535a')
    document.documentElement.style.setProperty('--surface-500', '#797a7b')
    const data = [
      {
        key: 'PrimaryColor',
        value: '#4F7EEA'
      },
      {
        key: 'SecondaryColor',
        value: '#797a7b'
      },
      this.selected = {
        key: 'TextColor',
        value: '#4e535a'
      }
    ]
    this.systemColors={
      primaryColor:'#4F7EEA',
      textColor:'#4e535a',
      secondaryColor:'#797a7b',

    }
    this.updateGeneralSettings(data)

  }
  getTimeZone() {
    if (isSet(this.timeZones)) {
      return
    }
    this.generalSettingsService.getTimeZones().subscribe(timeZones => {
      this.timeZones = timeZones?.data
      this.timeZones.map(item => {
        item['name'] = item?.displayName
      })
    })
  }
  getMenu() {
    this.coreService.getSetingsEmitter.subscribe(settings => {

      const modules_ = settings.modules
      this.landingModules=[]
      modules_.map(item=>{
        this.landingModules.push({ name:item?.name, key: item?.key,isSystem:item?.isSystem })
      })
      this.landingModules = [{ name: 'Home', key: "Home",isSystem:true }, { name: 'Dashboard', key: "Dashboard",isSystem:true }, ...this.landingModules]

    })
  }
}
