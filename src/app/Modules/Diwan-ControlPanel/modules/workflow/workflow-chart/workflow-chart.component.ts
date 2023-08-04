import { Component, ViewEncapsulation, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import {
    DiagramComponent, Diagram, NodeModel, ConnectorModel, LayoutAnimation, SnapSettingsModel, DiagramTools, DataBinding, HierarchicalTree, SnapConstraints, HtmlModel, ZoomOptions, IExportOptions
} from '@syncfusion/ej2-angular-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { WorkflowService } from '../workflow.service';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ModulesService } from '../../manage-modules/modules.service';
import { UsersGroupsService } from '../../users-groups/users-groups.service';
import { RolesPermissionsService } from '../../roles-permissions/roles-permissions.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { registerLicense } from '@syncfusion/ej2-base';

Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

export interface EmployeeInfo {
    Role: string;
    color: string;
}
export interface DataInfo {
    [key: string]: string;
}

/**
 * Sample for Organizational Chart
 */
registerLicense('MjM1OTA1MEAzMjMxMmUzMDJlMzBrdVVPMzJHc2RMbDNOcjkvRy9BMXpIMmp5RXJKTXpSNjJMc2k0cFh2YVJZPQ==;Mgo+DSMBaFt+QHJqVk1mQ1BBaV1CX2BZeVl3R2ldfU4BCV5EYF5SRHBfSl1kSHxXdERiWnk=;Mgo+DSMBMAY9C3t2VFhiQlJPcEBDWHxLflF1VWRTflx6cFdWESFaRnZdQV1lSXZTcURhXX1fc3BT;Mgo+DSMBPh8sVXJ1S0R+X1pCaV5HQmFJfFBmQmlYfVR0dkU3HVdTRHRcQltjQX5Ud0dnW35bcXI=;MjM1OTA1NEAzMjMxMmUzMDJlMzBPbW1odE8rdWs1Zlh2NTlrWjM2VUowQmJkZEVFNytCeEZNa2owSCs1RE8wPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfVldXGZWfFN0RnNedV9yflFEcC0sT3RfQF5jT35bdkJiW3tccX1cQA==;ORg4AjUWIQA/Gnt2VFhiQlJPcEBDWHxLflF1VWRTflx6cFdWESFaRnZdQV1lSXZTcURhXX1ccXBT;MjM1OTA1N0AzMjMxMmUzMDJlMzBNVXZSeXBCWUlvVllyWlFGRjVDcWgwOE1MbFdMcEs3UU1nckJ5ZUdnaHhVPQ==;MjM1OTA1OEAzMjMxMmUzMDJlMzBBalNmbFZpZkZDbkErWHMrWFNQTEFMNVozNEEwTzhJY21ZVkxneDc2RURZPQ==;MjM1OTA1OUAzMjMxMmUzMDJlMzBCc1pkZ2Y5bUdoZ1B0T255a2IwUENCV04wMHVsT0loMjFWRVJGRHlEZGJ3PQ==;MjM1OTA2MEAzMjMxMmUzMDJlMzBLTGE0dExvZjc2TndjdXdOQ1R4elVueEt1Sy9MNmZ0Q1I0RlJCQy9TMCswPQ==;MjM1OTA2MUAzMjMxMmUzMDJlMzBrdVVPMzJHc2RMbDNOcjkvRy9BMXpIMmp5RXJKTXpSNjJMc2k0cFh2YVJZPQ==')
@Component({
    selector: 'app-workflow-chart',
    templateUrl: './workflow-chart.component.html',
    styleUrls: ['./workflow-chart.component.scss'],

})
export class WorkflowChartComponent extends BaseComponent implements AfterViewInit {

    @ViewChild('diagram') diagram: DiagramComponent;

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public tool: DiagramTools = DiagramTools.ZoomPan;
    registryActivities: any
    displayactivityForm = false
    selectedactivity: any
    registryID: any
    registryName: any
    moduleId: any
    falseTrueValues = {}
    currentCondition: any
    groups = []
    roles = []
    constructor(public translates: TranslateService, public messageService: MessageService, private workflowService: WorkflowService, private router: Router, private activatedRoute: ActivatedRoute,
        private modulesService: ModulesService, private usersGroupsService: UsersGroupsService,
        private rolesPermissionsService: RolesPermissionsService) {
        super(messageService, translates)

        this.activatedRoute.params.subscribe(params => { this.registryID = params['registryID'] })

    }
    @HostListener("click", ["$event"])
    public onListenerTriggered(event: any): void {

        const el = event.srcElement.id

        if (el?.includes("activityBody")) {
            const activityID = el.replace("activityBody", "")
            this.selectedactivity = activityID
            this.activitySelect(activityID)
        }
        if (el?.includes("activityAdd")) {
            this.selectedactivity = el.replace("activityAdd", "")
            this.activitySelect(this.selectedactivity, true)
        }

    }

    public dataSourceSettings: any;
    public layout: Object = {
        type: 'HierarchicalTree',
        verticalSpacing: 70, horizontalSpacing: 200,
        enableAnimation: true
    };

    //Defines the default activity and connector properties
    public activityDefaults(obj: NodeModel): NodeModel {
        obj.backgroundColor = '#fff';
        obj.style = { fill: 'none', strokeColor: 'none', color: 'white' };
        obj.width = 220;
        obj.height = 70;

        return obj;
    };
    public connDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
        connector.targetDecorator.shape = 'Arrow';
        connector.targetDecorator = { style: { fill: '#a9aaac', strokeColor: '#a9aaac' } };
        connector.style.strokeColor = '#a9aaac'
        connector.style.strokeWidth = 2
        connector.type = 'Orthogonal';
        connector.cornerRadius = 0;
        connector.annotations = [{ id: connector?.id, height: 35, width: 50, offset: 0.5, template: '' }]
        connector.annotations[0].style = { textWrapping: 'Wrap' }


        return connector;
    }

    ngAfterViewInit(): void {
        this.getRegistryActivity()
        this.activitySelectChange()
        this.activityDeleteEmitter()
        this.onActionChange()
        this.onActionDelete()
        this.onEditAction()
        this.getModuleInfo()
        this.getGroups()
        this.getRoles()
    }

    bindTempaltes() {
        setTimeout(() => {

            const connectors = this.diagram.connectors;
            const nodes = this.diagram.nodes.filter(node => node.data['condition'] == true || node.data['condition'] == false)

            connectors.forEach((connector, index) => {


                const node = nodes.find(item => item?.id === connector?.targetID)
                if (this.currentCondition) {

                    if (node?.id == connector?.targetID && this.currentCondition == connector?.sourceID) {

                        if (node['data']['condition'] === true) {

                            connector.annotations[0].template = document.getElementById('connectorTrue' + node['data']['id'])
                        }
                        if (node['data']['condition'] === false) {

                            connector.annotations[0].template = document.getElementById('connectorFalse' + node['data']['id'])
                        }

                    }
                } else {
                    if (node?.id == connector?.targetID) {
                        if (node['data']['condition'] === true) {

                            connector.annotations[0].template = document.getElementById('connectorTrue' + node['data']['id'])
                        }
                        if (node['data']['condition'] === false) {

                            connector.annotations[0].template = document.getElementById('connectorFalse' + node['data']['id'])
                        }

                    }
                }


            })
            this.diagram.zoom(0.8)
            this.diagram.setCursor('pointer')
        }, 50);



    }
    backButton() {
        this.router.navigateByUrl(`controlPanel/modules/${this.moduleId}/approvals`)
    }
    bindData() {
        this.registryActivities?.map((activity, index) => {
            activity.id = activity?.id?.toString()

            if (isSet("previousWorkflowActivityId")) {
                activity['color'] = "#f79530"
                activity['previousWorkflowActivityId'] = activity['previousWorkflowActivityId']
                if (!isSet(activity['previousWorkflowActivityId'])) {
                    activity['previousWorkflowActivityId'] = 0
                }
            }

            if (isSet(activity?.falseDirectionActivity?.id) || isSet(activity?.trueDirectionActivity?.id)) {
                activity['type'] = "Condition"
                activity['color'] = "#7e96a1"

                const falseDirectionActivity = this.registryActivities?.findIndex(item => item?.id == activity?.falseDirectionActivity?.id)
                const trueDirectionActivity = this.registryActivities?.findIndex(item => item?.id == activity?.trueDirectionActivity?.id)

                this.registryActivities[falseDirectionActivity]['previousWorkflowActivityId'] = activity?.id
                this.registryActivities[falseDirectionActivity]['condition'] = false

                this.registryActivities[trueDirectionActivity]['previousWorkflowActivityId'] = activity?.id
                this.registryActivities[trueDirectionActivity]['condition'] = true

            }


        })
        const start = {
            "id": "0",
            "color": "#7e96a1",
            "type": "Start"
        }

        this.registryActivities = [start, ...this.registryActivities]
        this.endActivityHandle()
        const dataManager = new DataManager([...this.registryActivities]);

        this.dataSourceSettings = {
            id: 'id',
            parentId: 'previousWorkflowActivityId',
            dataSource: dataManager,
            query: new Query().requiresCount(),
            doBinding: (activityModel: NodeModel, data: object, diagram: Diagram) => {
                activityModel.shape = {
                    type: 'HTML',
                    content: document.getElementById('activity' + data['id']),
                };
            },
        };
    }
    endActivityHandle() {

        // const last = this.registryActivities[this.registryActivities.length - 1]
        // if (last?.id=='end') {
        //     this.deleteNode(last?.id)
        //     this.registryActivities.splice(this.registryActivities.length - 1,0)

        // }
        // let connectors = last?.id
        // if (last.type == "Condition") {
        //     connectors = [last.trueDirectionActivity?.id, last.falseDirectionActivity?.id]
        // }

        // const end = {
        //     "id": 'end',
        //     "color": "#7e96a1",
        //     "type": "End",
        //     "previousWorkflowActivityId": connectors
        // }
        // this.registryActivities = [...this.registryActivities, end]

    }
    addEndActivity() {

    }
    activitySelect(activityID, newActivity?) {
        if (newActivity == true) {
            this.workflowService.workflowChange.next({ previousWorkflowActivityId: activityID })
            this.displayactivityForm = true
            return
        } else {
            this.registryActivities?.map(item => {
                if (item?.id == activityID) {
                    this.displayactivityForm = true
                    this.workflowService.workflowChange.next(item)
                }
            })
        }

    }
    activitySelectChange() {
        const sub = this.workflowService.activitySumbitEmitter.subscribe(activityChanged => {

            if (activityChanged) {
                if (isSet(activityChanged?.id)) {

                    this.updateActivityName(activityChanged)

                } else {
                    this.submbitActivity(activityChanged)

                }
            }
        })
        this.subscriptions.push(sub)

    }
    submbitActivity(newActivity) {

        if (newActivity?.type == 'Condition') {
            this.conditionHandle(newActivity)

        } else {
            this.postActivity(newActivity)

        }
    }
    postActivity(newActivity) {

        const body = {
            workflowRegistryID: this.registryID,
            name: newActivity?.name,
            type: newActivity?.type,
            previousWorkflowActivityId: newActivity?.previousWorkflowActivityId
        }
        if (!isSet(body?.previousWorkflowActivityId) || body?.previousWorkflowActivityId == 0) delete body?.previousWorkflowActivityId

        this.loading = true
        const sub = this.workflowService.createActivity(body).subscribe(activity => {
            newActivity.id = activity?.data['id']?.toString()
            newActivity.color = "#f79530"
            newActivity.actions = []
            this.registryActivities?.push(newActivity)

            if (newActivity?.trueValue == true) {
                this.falseTrueValues['trueValueId'] = newActivity.id
                this.createActivityChart(newActivity)

            }else if (newActivity?.falseValue == true) {
                this.falseTrueValues['falseValueId'] = newActivity.id
                this.createActivityChart(newActivity,true)

            }else {
                this.createActivityChart(newActivity)

            }
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    deleteActivity(activityId) {
        this.loading = true
        const sub = this.workflowService.deleteActivity(activityId).subscribe(activities => {
            this.registryActivities.splice(this.registryActivities.findIndex(activty => activty['id'] === activityId), 1)
            const activitiesToDelete = activities?.data
            if (isSet(activitiesToDelete)) {
                activitiesToDelete.map(activityId => {
                    this.deleteNode(activityId)
                })
            }

            this.endActivityHandle()
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    postActivityCondition(newActivity) {

        const body = {
            workflowRegistryID: this.registryID,
            name: newActivity?.name,
            previousWorkflowActivityId: newActivity?.previousWorkflowActivityId,
            trueActivityId: this.falseTrueValues['trueValueId'],
            falseActivityId: this.falseTrueValues['falseValueId'],
            formulaRaw: newActivity?.formulaRaw || [],
            moduleId: this.moduleId
        }
        if (body?.previousWorkflowActivityId == 0) delete body?.previousWorkflowActivityId


        this.loading = true
        const sub = this.workflowService.createActivityCondition(body).subscribe(activity => {

            newActivity.id = activity?.data['id']?.toString()
            newActivity.color = "#7e96a1"
            newActivity.trueDirectionActivity = activity?.data['trueDirectionActivity']
            newActivity.falseDirectionActivity = activity?.data['falseDirectionActivity']

            this.registryActivities?.push(newActivity)

            this.createActivityChart(newActivity)

            this.loading = false
        }, error => {
            this.loading = false

        })
        this.subscriptions.push(sub)

    }
    getModuleInfo() {
        this.modulesService.moduleIdEmitter.subscribe(moduleId => {
            this.moduleId = moduleId


        })
    }
    updateActivityName(activity) {

        const body = {
            id: activity.id,
            name: activity?.name,
        }


        this.loading = true
        const sub = this.workflowService.updateActivityName(body).subscribe(() => {

            document.getElementById('activityBody' + activity['id'])['value'] = activity['name']
            document.getElementById('activityName' + activity['id'])['innerHTML'] = activity['type']

            const currentActivity = this.registryActivities?.find(item => item?.id == activity?.id)
            currentActivity.name = activity['name']

            this.loading = false
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    conditionHandle(newActivity) {
        this.falseTrueValues = {}
        newActivity.trueActivity['trueValue'] = true
        newActivity.trueActivity['type'] = newActivity.trueActivity['type']?.name

        newActivity.falseActivity['falseValue'] = true
        newActivity.falseActivity['type'] = newActivity.falseActivity['type']?.name

        this.postActivity(newActivity.trueActivity)
        this.postActivity(newActivity.falseActivity)
        const interval = setInterval(() => {
            if (isSet(this.falseTrueValues['trueValueId']) && isSet(this.falseTrueValues['falseValueId'])) {
                this.postActivityCondition(newActivity)

                clearInterval(interval)
            }
        });





    }
    conditionBuildConnectors(newActivity, soruceNode) {

        /// assign data to source arrray
        const falseDirectionActivity = this.registryActivities?.findIndex(item => item?.id?.toString() == newActivity.falseDirectionActivity?.id?.toString())
        const trueDirectionActivity = this.registryActivities?.findIndex(item => item?.id?.toString() == newActivity.trueDirectionActivity?.id?.toString())


        this.registryActivities[falseDirectionActivity]['previousWorkflowActivityId'] = newActivity?.id
        this.registryActivities[falseDirectionActivity]['condition'] = false
        this.registryActivities[trueDirectionActivity]['previousWorkflowActivityId'] = newActivity?.id
        this.registryActivities[trueDirectionActivity]['condition'] = true

        /// assign data to node 
        const trueDirectionNode = this.diagram.nodes.find(node => node['data']['id'] === newActivity.trueDirectionActivity?.id?.toString());
        const falseDirectionNode = this.diagram.nodes.find(node => node['data']['id'] === newActivity.falseDirectionActivity?.id?.toString());
        trueDirectionNode['data']['previousWorkflowActivityId'] = newActivity?.id
        trueDirectionNode['data']['condition'] = true

        falseDirectionNode['data']['previousWorkflowActivityId'] = newActivity?.id
        falseDirectionNode['data']['condition'] = false
  
        const connectorTrue = this.diagram.connectors.find(connector => connector.targetID === trueDirectionNode?.id);
        const connectorFalse = this.diagram.connectors.find(connector => connector.targetID === falseDirectionNode?.id);

        this.diagram.remove(connectorTrue)
        this.diagram.remove(connectorFalse)

        this.diagram.dataBind();


        /// build new connectors
        const trueDirectionconnector: ConnectorModel = {
            id: 'connector_' + trueDirectionNode.id + '_' + soruceNode,
            sourceID: soruceNode,
            targetID: trueDirectionNode.id,
            style: {
                strokeColor: '#a9aaac',
                strokeWidth: 2
            },
            targetDecorator: {
                shape: 'Arrow',
                style: {
                    fill: '#a9aaac',
                    strokeColor: '#a9aaac'
                }
            },
            annotations: [{ id: 'connector_' + trueDirectionNode.id + '_' + soruceNode, height: 35, width: 50, offset: 0.5, template: '' }]
        };
        const falseDirectionconnector: ConnectorModel = {
            id: 'connector_' + falseDirectionNode.id + '_' + soruceNode,
            sourceID: soruceNode,
            targetID: falseDirectionNode.id,
            style: {
                strokeColor: '#a9aaac',
                strokeWidth: 2
            },
            targetDecorator: {
                shape: 'Arrow',
                style: {
                    fill: '#a9aaac',
                    strokeColor: '#a9aaac'
                }
            },
            annotations: [{ id: 'connector_' + falseDirectionNode.id + '_' + soruceNode, height: 35, width: 50, offset: 0.5, template: '' }]

        };

        this.diagram.add(trueDirectionconnector);
        this.diagram.add(falseDirectionconnector);
        this.currentCondition = soruceNode
        this.upadtePrevious(newActivity.trueDirectionActivity?.id, newActivity?.id)
        this.upadtePrevious(newActivity.falseDirectionActivity?.id, newActivity?.id)
        this.bindTempaltes()




    }

    deleteNode(activityId: string): void {


        const node: NodeModel = this.diagram.nodes.find(node => node['data']['id'] === activityId?.toString());

        if (node) {
            this.diagram.remove(node);
        }
        setTimeout(() => {
            this.loading = false
            this.diagram.doLayout()

        }, 300);
    }
    createActivityChart(activityData: any,falseTrueActivity?) {
        // this.endActivityHandle()

        const dataManager = this.dataSourceSettings.dataSource as DataManager;
        dataManager.insert(activityData);

        const node: NodeModel = {}
        node['data'] = activityData

        this.diagram.addNode(node);

        this.diagram.dataBind()


        const targetNode = this.diagram.nodes[this.diagram.nodes.length - 1];
        setTimeout(() => {
            targetNode.shape = {
                type: 'HTML',
                content: document.getElementById('activity' + activityData.id),
            }
        });


        const sourceNode = this.diagram.nodes.find(node => node?.data['id'] === this.selectedactivity);

        const connector: ConnectorModel = {
            id: 'connector_' + activityData?.id + '_' + sourceNode?.id,
            sourceID: sourceNode.id,
            targetID: targetNode.id,
            style: {
                strokeColor: '#a9aaac',
                strokeWidth: 2
            },
            targetDecorator: {
                shape: 'Arrow',
                style: {
                    fill: '#a9aaac',
                    strokeColor: '#a9aaac'
                }
            }
        };


        this.diagram.add(connector);

        if (activityData?.type == 'Condition' ) {
            this.conditionBuildConnectors(activityData, targetNode?.id)
        }

        const prv = this.registryActivities?.filter(item => (item?.previousWorkflowActivityId == sourceNode.data['id'])
            && (activityData.id != item.id) && (activityData.id != item.trueDirectionActivity?.id) && (activityData.id != item.falseDirectionActivity?.id))

console.log(falseTrueActivity);

        if (isSet(prv) && !falseTrueActivity) {
            prv.map(item => {

                this.upadteActivityPrevious(targetNode.id, item.id, activityData.id)
            })
        } else {
            setTimeout(() => {
                this.loading = false
                this.diagram.doLayout()

            }, 100);


        }



    }
    activityDeleteEmitter() {
        const sub = this.workflowService.activityDeleteEmitter.subscribe(activityId => {
            if (activityId) {

                this.deleteActivity(activityId)

            }
        })
        this.subscriptions.push(sub)

    }
    getRegistryActivity() {
        this.loading = true
        const sub = this.workflowService.getworkflowregistry(this.registryID).subscribe(registryActivities => {
            this.registryActivities = registryActivities?.data?.activities
            this.registryName = registryActivities?.data?.name
            this.loading = false

            this.bindData()
            this.bindTempaltes()
        })
        this.subscriptions.push(sub)

    }
    onActionChange() {
        const sub = this.workflowService.actionSumbitEmitter.subscribe(actions => {
            if (!isSet(actions)) {
                return
            }
            this.submbitActtion(actions)
        })
        this.subscriptions.push(sub)

    }
    onActionDelete() {
        this.workflowService.aactionDeleteEmitter.subscribe(action => {
            if (!isSet(action)) {
                return
            }
            this.deleteActtion(action)
        })
    }
    submbitActtion(actions) {
        const body = {
            "workflowActivityId": Number(actions?.workflowActivityId),
            "sla": actions.sla,
            "targetType": actions?.targetType?.value,
            "groupSelection": actions?.groupSelection?.value,
            "targetValue": actions?.targetValue?.id
        }
        const sub = this.workflowService.createActivityAction(body).subscribe(action => {
            this.registryActivities.map(item => {
                if (item.id == Number(actions?.workflowActivityId)) {
                    item.actions.push(action.data)
                }
            })
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)


    }
    deleteActtion(actionD) {

        const sub = this.workflowService.deleteActivityAction(actionD?.id).subscribe(() => {
            this.registryActivities.map(item => {
                item['actions']?.map((action, index) => {
                    if (action['id'] == actionD?.id) {
                        item['actions'].splice(index, index)
                    }
                })
            })
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    onEditAction() {
        const sub = this.workflowService.actionEditEmitter.subscribe(action => {
            if (!isSet(action)) {
                return
            }
            this.editActtion(action)
        })
        this.subscriptions.push(sub)

    }
    editActtion(actions) {

        const body = {
            "id": actions?.id,
            "workflowActivityId": Number(actions?.workflowActivityId),
            "sla": actions.sla,
            "targetType": actions?.targetType?.value,
            "groupSelection": actions?.groupSelection?.value,
            "targetValue": actions?.targetValue?.id
        }
        const sub = this.workflowService.editActivityAction(body).subscribe(action => {
            this.registryActivities.map(item => {
                if (item.id == actions?.id) {
                    item = actions
                }
            })
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    upadteActivityPrevious(soruceId, activity, prvActivity) {
        const body = {
            id: activity,
            previousWorkflowActivityId: prvActivity,
        }

        this.loading = true
        const sub = this.workflowService.updateActivityAction(body).subscribe(() => {

            const currentActivity = this.registryActivities.find(act => act.id === activity);


            currentActivity.previousWorkflowActivityId = prvActivity

            const currentnode = this.diagram.nodes.find(node => node['data']['id'] === activity);
            currentnode['data']['previousWorkflowActivityId'] = prvActivity

            const connector = this.diagram.connectors.find(connector => connector.targetID === currentnode?.id);

            if (connector) {
                connector.sourceID = soruceId
                // this.diagram.remove(connector)
            }


            setTimeout(() => {
                this.diagram.dataBind()
                this.diagram.doLayout()
            }, 100);
            this.loading = false
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    upadtePrevious(activity, prvActivity) {
        const body = {
            id: activity,
            previousWorkflowActivityId: prvActivity,
        }

        this.loading = true
        const sub = this.workflowService.updateActivityAction(body).subscribe(() => {

            this.loading = false
        }, error => {
            this.loading = false
        })
        this.subscriptions.push(sub)

    }
    onToolbarClick(action): void {
        switch (action) {
            case 'Zoom In':
                let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomin);
                this.diagram.dataBind();
                break;
            case 'Zoom Out':
                let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomout);
                this.diagram.dataBind();
                break;
            case 'Reset':
                this.diagram.reset();
                this.diagram.zoom(0.8)
                break;
        }
    }
    getGroups() {
        this.usersGroupsService.getGroups().subscribe(groups => {
            this.groups = groups?.data
        })
    }
    getRoles() {

        this.rolesPermissionsService.getRoles(this.moduleId).subscribe(claims => {
            this.roles = claims?.data

        })
    }

    printFlowChart() {
        const content = document.getElementById('diagram')
        this.loading = true
        html2canvas(content, { scale: 2 }).then((canvas) => {
            const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
            const fileWidth = 220;
            const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
            const print = new jsPDF('p', 'mm', 'a4', true);
            print.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
            print.html(content)
            print.save(this.registryName);
            this.loading = false



        });

    }
}