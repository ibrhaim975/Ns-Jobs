import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { GeneralSettingsService } from '../general-settings.service';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseComponent implements OnInit {

  constructor(private generalSettingsService: GeneralSettingsService, private coreService: CoreService) {
    super()

  }


  generalSettigs: any
  selected: any

  startWeeks = [{ name: 'Sunday', value: '09:00-17:00', key: 1 }, { name: 'Monday', value: '09:00-17:00', key: 2 },
  { name: 'Tuesday', value: '09:00-17:00', key: 3 }, { name: 'Wednesday', value: '09:00-17:00', key: 4 }, { name: 'Thursday', value: '09:00-17:00', key: 5 },
  { name: 'Friday', key: 6 }, { name: 'Saturday', key: 7 }]

  selectedStartWeek = { name: 'Sunday', value: '09:00-17:00', focus: false }


  currentTimeZone = new Date().toTimeString().slice(9)


  ngOnInit(): void {
    this.getGeneralSettings()

  }
  getGeneralSettings() {
    this.loading = true
    this.generalSettingsService.getGeneralSettigs().subscribe(generalSettigs => {
      this.generalSettigs = generalSettigs.data

      this.findValue('Weekend').value?.Days?.map(item => {
        this.startWeeks.map(day => {
          if (item == day?.key) {

            day['status'] = true

          }
        })
      })

      this.loading = false

    }, error => {
      this.loading = false

    })
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
  updateWeekEnd(week) {
    week.status=!week.status

    const weekends = this.findValue('Weekend').value?.Days
    if (weekends.includes(week.key)) {
      const index = weekends.findIndex(item => { return item === week.key })
      weekends.splice(index, 1)
    } else {
      weekends.push(week.key)
    }

    const data = {
      key: 'Weekend',
      value: {
        Days: weekends
      }
    }
    this.updateGeneralSettings(data)
  }
}
