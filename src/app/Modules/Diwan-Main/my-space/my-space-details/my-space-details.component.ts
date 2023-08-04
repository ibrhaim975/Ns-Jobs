import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, isSet, moduleName } from 'src/app/core/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-my-space-details',
  templateUrl: './my-space-details.component.html',
  styleUrls: ['./my-space-details.component.scss']
})
export class MySpaceDetailsComponent extends BaseComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private confirmationService: ConfirmationService, private coreService: CoreService,
    public translates: TranslateService, public messageService: MessageService) {
    super(messageService, translates)

  }
  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onAction: EventEmitter<boolean> = new EventEmitter();

  data: any
  currentModule: any
  currentModuleActinos: any
  commentsHeight = `calc(92vh - 290px)`
  tabViewIndex = 0
  ngOnInit(): void {
    this.getFormUrl()
  }

  getFormUrl() {
    const sub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['url']) {
        this.getData(params['url'])
      }
    });
    sub?.unsubscribe()

  }
  getData(url) {
    this.loading = true
    this.coreService.getCustomUrl(url).subscribe((flow) => {
      this.data = flow.data
      console.log(this.data);
      
      this.data?.history?.map(item => {
        if (isSet(item?.attachments)) {
          item.attachments=[item?.attachments]
        }
      })
      this.data.moduleName= moduleName(this.data?.moduleKey)

      this.handleActions()
      this.loading = false

    }, error => {
      this.loading = false

    })

  }
  onHide() {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        url: null,
        view: null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }

  handleActions() {
    const actions = []

    this.data.actions.map((item) => {
      if (item?.details?.icon == 'fa-solid fa-xmark') item.details.icon = item.details.icon + ' mr-3'
      item.registryName = this.data?.workflowRegistryName
      item.registryId = this.data?.registryId
      item.link = item.url,

        actions.push(
          {
            label: item?.details?.display,
            icon: item?.details?.icon,
            key: item.key,
            registryName: this.data?.workflowRegistryName,
            command: () => {
              this.onAction.emit(item)
            }
          }
        )
    })
    this.data.actions = actions
  }

}
