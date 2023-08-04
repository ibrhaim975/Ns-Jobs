import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from '../workflow.service';
import { BaseComponent, isSet, moduleProps } from 'src/app/core/base/base.component';
import { PropertiesService } from '../../mange-properties/properties.service';
import { ModulesService } from '../../manage-modules/modules.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workflow-form',
  templateUrl: './workflow-form.component.html',
  styleUrls: ['./workflow-form.component.scss']
})
export class WorkflowFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private workflowService: WorkflowService,
    private confirmationService: ConfirmationService,
    private modulesService: ModulesService, 
    public translates: TranslateService, public messageService: MessageService,
    private propertiesService: PropertiesService) {
    super(messageService, translates)

  }

  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() registryActivities: any
  @Input() roles: any =[]
  @Input() groups: any=[]

  title = 'New Activity'
  moduleId: any
  data = []

  formulaBuilder = { porp: null, function: null, type: null, value: null }
  formulaRaw = []
  formulaCheck = false
  properties = []
  functions = []
  operators = []

  activity: any
  activityTypes = [
    { name: 'Sequencial' },
    { name: 'Parallel' },
    { name: 'Condition' }
  ]
  activityTypes2 = [
    { name: 'Sequencial' },
    { name: 'Parallel' }
  ]
  actionsTypes = [
    { name: 'Group', value: 'Group' },
    { name: 'Role', value: 'Role' }
  ]
  actionGroupSelection = [
    { name: 'FirstOne', value: 'FirstOne' },
    { name: 'All', value: 'All' }, { name: 'Half', value: 'Half' },

  ]

  activeIndex = 0
  actionsRemove = []
  actionsEdits = []

  ngOnInit(): void {
    this.getModuleInfo()
    this.activitySelect()

    this.initData()

  }
  ngAfterViewInit(): void {
    this.actionsHandle()
  }
  getModuleInfo() {
    this.modulesService.moduleIdEmitter.subscribe(moduleId => {
      this.moduleId = moduleId

      this.properties = moduleProps(this.moduleId)
      this.getFunctions()
      this.getOperators()
    })
  }
  initData() {
    this.data = [...this.registryActivities]
    this.data?.splice(0, 1)


  }
  activitySelect() {
    const sub = this.workflowService.workflowChangeEmitter.subscribe(activity => {
      if (!isSet(activity)) {
        return
      }

      if (activity?.id) {
        this.activity = { ...activity }

        this.activity['type'] = { name: this.activity['type'] }
        this.title = 'Edit Activity'

        if (this.activity?.type?.name == 'Condition') {
          this.activity['trueActivity'] = this.activity['trueDirectionActivity']
          this.activity['falseActivity'] = this.activity['falseDirectionActivity']
          if (!this.activity['trueActivity']?.type?.name) {
            this.activity['trueActivity'].type = { name: this.activity['trueActivity']['type'] }
            this.activity['falseActivity'].type = { name: this.activity['falseActivity']['type'] }

          }
          this.formulaRaw=this.activity['formulaRaw'] || []
          this.formulaCheck=true
        } else {
          if (!isSet(this.activity['actions'])) {
            this.activity['actions']=[{ targetType: null, targetValue: '', groupSelection: '', sla: null }]
          }
        }

      } else {
        this.activity = { name: '', type: '', previousWorkflowActivityId: activity?.previousWorkflowActivityId, trueActivity: {}, falseActivity: {} }


      }


    })
    sub.unsubscribe()
  }
  //Formula
  checkFormula() {
    this.propertiesService.checkFormula(this.moduleId, this.formulaRaw).subscribe(item => {
      this.formulaCheck = item.data
    })
  }
  onAddFormula(data, type) {
    if (!isSet(this.formulaRaw)) {
      this.formulaRaw = []
    }
    if (type == 'value') {
      if (!isNaN(data?.key)) {
        data.key = Number(data?.key)
      }
    }
    this.formulaRaw.push({ key: data?.key, type: type, name: data?.name })
    this.checkFormula()
  }
  onRemoveFormula(index) {
    this.formulaRaw.splice(index, 1)
    this.checkFormula()
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
  //
  onHide(view?) {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        activityId: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
      this.workflowService.workflowChange.next(null)
    }, 300);
  }
  onSubmit(check) {
    if (check?.form == true) {
      this.activity['type'] = this.activity['type']?.name
      this.activity['formulaRaw'] = this.formulaRaw
      this.workflowService.activitySumbit.next(this.activity)
      this.onHide()

    }
    if (check?.formActions == true || this.actionsRemove.length) {
      if (this.actionsRemove.length) {
        this.actionsRemove.map(action => {
          this.workflowService.actionDelete.next(action)
        })
      }
      if (this.actionsEdits.length) {
        this.actionsEdits.map(action => {

          this.workflowService.actionEdit.next(action)
        })
      }

      this.activity?.actions?.map((action, index) => {

        if (!isSet(action?.id) && isSet(action?.targetValue?.id)) {
          action['workflowActivityId'] = this.activity?.id

          this.workflowService.actionSumbit.next(action)
        }
        if (this.activity.actions?.length - 1 == index) {
          this.onHide()
        }
      })


    }




  }
  onDelete() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('Do you want to delete this Task'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onHide()
        this.workflowService.activityDelete.next(this.activity?.id)
      }

    });
  }
 

  addAction() {
    if (!this.activity.actions?.length) {
      this.activity.actions = []
    }
    this.activity.actions.push({ targetType: null, targetValue: '', groupSelection: '', sla: null })
  }
  removeAction(index) {
    if (this.activity.actions[index]?.id) {
      this.actionsRemove.push(this.activity.actions[index])

    }
    this.activity.actions.splice(index, 1)

  }
  onEditAction(action) {
    if (action?.id) {
      if (!this.actionsEdits.length) {
        this.actionsEdits.push(action)
        return
      }
      this.actionsEdits?.map(item => {
        if (item?.id == action?.id) {
          action = item
        } else {
          this.actionsEdits.push(action)

        }
      })
    }

  }
  actionsHandle() {
    if (this.activity.actions?.length == 0) {
      this.activity.actions = [{ targetType: null, targetValue: '', groupSelection: '', sla: null }]

    }
      this.activity?.actions?.map(action => {
        if (!action.targetType?.name) {
          action.targetType = { name: action?.targetType, value: action?.targetType }
          action.groupSelection = { name: action?.groupSelection, value: action?.groupSelection }
          action['workflowActivityId'] = this.activity?.id

          if (action?.targetType?.value == "Group") {
            action.targetValue = this.groups?.find(item => item?.id == Number(action?.targetValue))

          }
          if (action?.targetType?.value == "Role") {
            action.targetValue = this.roles?.find(item => item?.id == Number(action?.targetValue))

          }
        }

      })
      this.activity.actions = this.activity?.actions?.filter((item, index) => this.activity.actions.indexOf(item) === index);



  }

}
