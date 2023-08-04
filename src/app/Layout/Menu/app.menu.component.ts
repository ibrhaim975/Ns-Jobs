import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { AppMainComponent } from '../Main/app.main.component';
import { MenuService } from './app.menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']

})
export class AppMenuComponent   implements OnInit {

    model: any[];
    // menu-wrapper
    constructor(public appMain: AppMainComponent, private router: Router,
        private menuService: MenuService,
        public coreService: CoreService) { 
        }
    lang = localStorage.getItem('currentLang')
    activeControlPanel = false
    activeTeamPanel = false

    customModulesClick = false
    customModules = []
    accessibility:any
    ngOnInit() {
        this.initModules()

    }
    initModules() {
        this.model = [
            { label: 'Dashboard', key: "Dashboard", icon: 'icon-statistics text-color', routerLink: ['/controlPanel'] },
            { label: 'Teams', key: "teams", icon: 'pi pi-users text-color', routerLink:['usersgroup/users'] },
            { label: 'Modules', key: "modules", icon: 'pi pi-briefcase text-color', routerLink: ['modules'] },
            { label: 'Profile', key: "profile", icon: 'pi pi pi-cog text-color', routerLink: ['generalsettings/branding'] },
        ];
        this.menuService.menuData = this.model
    }
    getModules() {

        this.coreService.getSetingsEmitter.subscribe(settings => {
            this.initModules()

            const modules_ = settings?.modules

            this.customModules = []
            modules_?.map(item => {
                if (item?.isSystem == false) {
                    this.customModules.push({ label: item.name, key: item?.key, icon: item?.icon + ' text-color', routerLink: [`module/${item?.key}`] })
                }
            })

            if (!isSet(this.customModules)) {
                return
            }
            this.model.push({
                label: 'Modules', skipLocationChange: true, icon: 'pi pi-briefcase text-color', items: [], command: (event) => {
                    event.item.items = this.customModules
                    this.customModulesClick = false
                }
            })
            this.menuService.menuData = this.model

        })

    }

  

}
