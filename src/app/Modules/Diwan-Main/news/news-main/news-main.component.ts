import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-news-main',
  templateUrl: './news-main.component.html',
  styleUrls: ['./news-main.component.scss']
})
export class NewsMainComponent implements OnInit {
  breadcrumb = [{ label: 'News', url: `news`, }]
  displayaddEdit = false
  currentMode = 'dashbored'
  customFilter: any
  sourceFilter: any
  sources = []
  accessibility:any
  constructor(private router: Router, private activateRoute: ActivatedRoute,private coreService :CoreService) { }

  ngOnInit(): void {
    this.getFromUrl()
    setTimeout(() => {
      this.getSources()
    }, 300);
    this.getAccessibilities()
  }
  getAccessibilities(){
    this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
      this.accessibility= accessibilities?.find(item => item?.key == "New")
    })

  }	

  showAddEditNews(newID?, view?) {
    this.displayaddEdit = true

    this.router.navigate([], {
      queryParams: {
        mode: 'list',
        newID: newID,
        view: view || 'new'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  changeMode(mode) {
    this.currentMode = mode
    this.router.navigate([], {
      queryParams: {
        mode: mode
      },
      queryParamsHandling: 'merge',
    })
  }
  getSources() {

      this.coreService.getSetingsEmitter.subscribe(settings => {
        
        this.sources = settings?.sources

      })

  
  }
  onFilter(filter) {
    this.customFilter = filter

    this.router.navigate([], {
      queryParams: {
        source: this.customFilter?.id,
        mode: 'list',
        view:'reload'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  clearFilter() {
    this.customFilter = null
    this.sourceFilter = null

    this.router.navigate([], {
      queryParams: {
        source: 'all',
        mode: 'list',
        view:'reload'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['mode']) {
        this.currentMode = params['mode']
      }
      if (params['source']) {
        this.customFilter = this.sources?.find(item => item?.id == params['source'])
        this.sourceFilter = this.sources?.find(item => item?.id == params['source'])

      }
      if (params['mode'] == 'dashbored') {
        this.router.navigate([], {
          queryParams: {
            newID: null,
            source: null
          },
          queryParamsHandling: 'merge',
        })
      }
    });
  }
}
