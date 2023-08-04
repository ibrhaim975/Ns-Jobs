import { Component, Inject, OnInit } from '@angular/core';
import { MySpaceService } from '../my-space.service';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseBody } from 'src/app/modals/response';
import { CoreService } from 'src/app/core/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-my-space-main',
  templateUrl: './my-space-main.component.html',
  styleUrls: ['./my-space-main.component.scss']
})
export class MySpaceMainComponent extends BaseComponent implements OnInit {

  constructor(private mySpaceService: MySpaceService, public translates: TranslateService,
    private activateRoute: ActivatedRoute,
    private router: Router,@Inject(DOCUMENT) private document: Document,
    public messageService: MessageService) {
    super(messageService, translates)
  }
  breadcrumb = [
    {
      label: 'My Space',
      url: `mySpace`,
    },
  ]
  workflowData = []
  currentFilter = "PendingRequiredAction"
  customFilter: any
  displayConfirmationModal = false
  displayDetailsWorkflow = false

  WorkflowDataTypes = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Returned', value: 'Returned' },
    { label: 'Pending', value: 'Pending' },
    { label: 'NonPending', value: 'NonPending' },
  ]

  ngOnInit(): void {
    this.getFormUrl()
    this.getWorkflowData()
    this.onChangeData()
  }
  getFormUrl() {
    this.activateRoute.queryParams.subscribe((params) => {

      if (params['url']) {
        this.displayDetailsWorkflow = true
      }
      if (params['filter']) {
        this.currentFilter=params['filter']
      }
      if (!isSet(params['view'])) {
        this.overflow('auto')
      }
    });
  }
  getWorkflowData() {
    this.loading = true
    this.mySpaceService.getWorkflowData(this.currentFilter).subscribe((workflowData: ResponseBody<any>) => {
      this.workflowData = workflowData?.data?.items
      this.loading = false;
    }, error => {
      this.loading = false

    })
  }
  onChangeData() {
    this.mySpaceService.dataChangeEmitter.subscribe(status => {
      if (!isSet(status)) return

      this.getWorkflowData()

    })
  }
  onAction(action) {
    if (action?.confirmationIsRequired == true) {
      this.mySpaceService.onActionClick.next(action)
      this.displayConfirmationModal = true

    } else {
      this.router.navigate([], {
        queryParams: {
          view: 'details',
          url: action?.link,
        },
        queryParamsHandling: 'merge',
      })
      this.displayDetailsWorkflow = true
    }
  }

  onFilter(filter, defult?: boolean) {
    if (defult) this.customFilter = null
    this.currentFilter = filter
    this.getWorkflowData()
    this.router.navigate([], {
      queryParams: {
        filter: filter
      },
      queryParamsHandling: 'merge',
    })
  }
  overflow(value) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement
    htmlTag.style.overflow = value
  }
}
