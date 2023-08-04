import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulesService } from '../modules.service';
import { BaseComponent, moduleId } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-modules-main',
  templateUrl: './modules-main.component.html',
  styleUrls: ['./modules-main.component.scss']
})
export class ModulesMainComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private modulesService: ModulesService) {
    super()
    this.activatedRoute.params.subscribe(params => {

      if (this.router.url.includes('properties')) {
        this.activeIndex = 0
      }
      if (this.router.url.includes('keywords')) {
        this.activeIndex = 1
      }
      if (this.router.url.includes('roles')) {
        this.activeIndex = 2
      }
      if (this.router.url.includes('approvals')) {
        this.activeIndex = 3
      }
      if (params['id'] == moduleId('New') && this.tabPanels?.length == 3) {
        this.arrayInsert(this.tabPanels, 1, { label: 'Keywords', url: `controlPanel/modules/${this.moduleId}/keywords` })
      }
      
      if (params['id'] != moduleId('New') && this.tabPanels?.length == 4) {
        
        this.tabPanels.splice(1, 1)

      }

      this.moduleId = params['id']
      this.modulesService.moduleId.next(this.moduleId)
    });
  }

  activeIndex = 0
  moduleId: any
  tabPanels = []
  ngOnInit(): void {
    this.initTabPanels()

  }
  initTabPanels() {
    this.tabPanels = []
    this.tabPanels.push({ label: 'Properties', url: `controlPanel/modules/${this.moduleId}/properties` })
 if (this.moduleId==moduleId('New')) this.tabPanels.push( { label: 'Keywords', url: `controlPanel/modules/${this.moduleId}/keywords` })
    this.tabPanels.push({ label: 'Roles', url: `controlPanel/modules/${this.moduleId}/roles` })
    this.tabPanels.push({ label: 'Approvals', url: `controlPanel/modules/${this.moduleId}/approvals` })

  }
  navRouter(event) {
    this.activeIndex = event.index
    this.initTabPanels()
    this.router.navigateByUrl(this.tabPanels[this.activeIndex]?.url)

  }
}
