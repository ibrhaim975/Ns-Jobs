import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'src/app/core/core.service';
import { ModulesService } from '../../modules/manage-modules/modules.service';

@Component({
  selector: 'app-contorl-panal-home',
  templateUrl: './contorl-panal-home.component.html',
  styleUrls: ['./contorl-panal-home.component.scss']
})
export class ContorlPanalHomeComponent extends BaseComponent implements AfterViewInit {

  constructor(public messageService: MessageService, public translates: TranslateService, private router: Router,
    private modulesService: ModulesService, private coreService: CoreService) {
    super(messageService, translates)

  }
  currentLang = localStorage.getItem('currentLang')
  currentUrl = this.router.url
  items: any[] = [];
  currentIndex = 0
  currentIndexModule = 0
  breadcrumb = [{ label: 'Control Panel', url: `controlPanel`, }]
  displayAddEditModule = false
  @ViewChild('panelMenu') panelMenu: any;


  ngAfterViewInit() {
    setTimeout(() => {
      this.getAccessibilities()
      this.getItems()
      this.initUrl()
      this.getModules()
      this.moduleChange()
    });
  }
  getAccessibilities(){
    this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
      const accessibility= accessibilities?.find(item => item?.key == "ControlPanel")
      if (accessibility?.hasPermission==false) {
        this.router.navigateByUrl('')
      }
    })

  }	
  getItems() {

    this.items = [
      {
        id: '0', routerLink: [`/controlPanel/generalsettings/branding`], label: this.trans('General Settings'), styleClass: 'active', icon: this.angleIcon() + ' px-2', command: (event) => {
          this.selectActiveMenu(event?.item?.id)
        }
      },
      {
        id: '1', label: this.trans('Modules'), icon: this.angleIcon() + ' px-2', command: (event) => {

          this.selectActiveMenu(event?.item?.id)

        },
      },

      {
        id: '2', routerLink: ['/controlPanel/lookups'], label: this.trans('Lookups Management'), icon: this.angleIcon() + ' px-2', command: (event) => {

          this.selectActiveMenu(event?.item?.id)
        },


      },

     
      {
        id: '4', routerLink: ['/controlPanel/usersgroup/users'], label: this.trans('Users & Groups'), icon: this.angleIcon() + ' px-2', command: (event) => {
          this.selectActiveMenu(event?.item?.id)

        }

      }





    ];
  }
  initUrl() {
    if (this.currentUrl == '/controlPanel') {
      this.router.navigateByUrl('controlPanel/generalsettings/branding')
    }

    if (this.currentUrl.includes('modules')) {
      setTimeout(() => {

        this.items[1].expanded = true
        this.selectActiveMenu(1)
        this.items[1]?.items?.map(item => {


          if (this.currentUrl?.includes(item?.id)) {
            console.log(item);

            this.activeModule(item.id)
          }


        })
      }, 300);

    } else {
      this.items.map(item => {
        if (item?.routerLink?.length) {
          if (this.currentUrl == item?.routerLink[0]) {
            this.selectActiveMenu(item.id)
          }
        }

      })

    }



  }
  selectActiveMenu(index) {
    this.items[Number(this.currentIndex)].styleClass = ''
    this.items[Number(index)].styleClass = 'active'
    this.currentIndex = index
    if (index != 1) {
      this.items[1].expanded = false
      if (this.items[1]?.items?.length) {
        this.items[1].items[this.currentIndexModule].styleClass = ''

      }
    }
  }
  activeMenu(event) {
    let node;
    if (event?.target?.tagName === "A") {
      node = event?.target;
    } else {
      node = event?.target?.parentNode;
    }
    let menuitem = document.getElementsByClassName("ui-menuitem-link");
    for (let i = 0; i < menuitem.length; i++) {
      menuitem[i].classList.remove("active");
    }
    node?.classList?.add("active")
  }
  angleIcon() {
    if (this.currentLang == 'ar') {
      return 'pi pi-angle-left'
    } else return 'pi pi-angle-right'

  }
  getModules() {
    this.coreService.getSetingsEmitter.subscribe(settings => {

      if (!isSet(settings)) {
        return
      }


    })

    this.modulesService.getModules().subscribe(modules => {
      this.loading = true

      const modules_ = modules?.data
      const customModules = []
      customModules.push({
        label: this.trans('New Module'), icon: 'pi pi-plus text-color', command: (event) => {
          this.displayAddEditModule = true
        }

      })

      modules_.map((item, index) => {
        if (item.key == 'Task' && !isSet(item?.icon)) {
          item.icon = 'icon-tasks'
        }
        if (item.key == 'Meeting' && !isSet(item?.icon)) {
          item.icon = 'icon-business-meeting'
        }
        if (item.key == 'Committee' && !isSet(item?.icon)) {
          item.icon = 'icon-committees'
        }
        if (item.key == 'New' && !isSet(item?.icon)) {
          item.icon = 'icon-news'
        }
        customModules.push({
          label: item.name, id: index + 1, key: item?.id, icon: item?.icon + ' text-color', routerLink: [`/controlPanel/modules/${item?.id}/properties`], command: (event) => {

            this.activeModule(event?.item?.id)
          }
        })

      })

      if (!isSet(customModules)) {
        return
      }
      this.items[1].items = customModules
      if (this.currentIndexModule != 0) {
        this.items[1].items[Number(this.currentIndexModule)].styleClass = 'active'

      }

      setTimeout(() => {
        this.loading = false

      }, 50);
    }, error => {

    })
  }
  moduleChange() {
    this.modulesService.moduleChangeEmitter.subscribe(stauts => {
      if (!isSet(stauts)) return
      this.getModules()

    })
  }

  activeModule(index) {
    this.items[1].items[Number(index)].styleClass = 'active'
    this.items[1].items[Number(this.currentIndexModule)].styleClass = ''
    this.currentIndexModule = index
  }

}
