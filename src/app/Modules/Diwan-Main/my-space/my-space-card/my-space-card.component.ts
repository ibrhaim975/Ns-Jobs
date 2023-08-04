import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { moduleName } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-my-space-card',
  templateUrl: './my-space-card.component.html',
  styleUrls: ['./my-space-card.component.scss']
})
export class MySpaceCardComponent implements OnInit {

  constructor() { }
  @Input() data: any
  @Output() onAction: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {

    this.handleActions()
    this.getModuleName(this.data?.moduleKey)
  }

  handleActions() {
    const actions = []

    this.data.actions.map((item) => {
      if (item?.details?.icon == 'fa-solid fa-xmark') item.details.icon = item.details.icon + ' mr-3'
      item.registryName = this.data?.workflowRegistryName
      item.registryId = this.data?.registryId
      item.link=item.url

      actions.push(
        {
          label: item?.details?.display,
          icon: item?.details?.icon,
          key: item.key,
          registryName: this.data?.workflowRegistryName,
          link:item?.url,
          command: () => {
            this.onAction.emit(item)
          }
        }
      )
    })
    this.data.actions = actions
  }
  onCardClick() {
   const details= this.data.actions?.find(item => item?.key == "details")
   this.onAction.emit(details)
  }
  getModuleName(modulekey){
    this.data.moduleName= moduleName(modulekey)
  }
}
