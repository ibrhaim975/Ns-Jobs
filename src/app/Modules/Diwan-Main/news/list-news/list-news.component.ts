import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss']
})
export class ListNewsComponent extends BaseComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document,
    private newsService: NewsService, private activateRoute: ActivatedRoute) {
    super()
  }
  displayaddEdit = false
  displayNewDetails = false
  news: any
  newsSentiment:any
  currentSource:any
  ngOnInit(): void {
    this.getFromUrl()
    this.getNews()
    this.getNewsSentiment()

  }
  getFromUrl() {
    this.activateRoute.queryParams.subscribe((params) => {

      if (params['view'] == 'new') {
        this.showAddEditNews()
      }
      if (params['view'] == 'details') {
        this.showNewDetails(params['newID'])

      }
      if (params['view'] == 'edit') {
        this.showAddEditNews(params['newID'], params['view'])

      }
  
      if (!isSet(params['view'])) {
        this.overflow('auto')
      }
      if (params['source']) {
        this.currentSource=params['source']=='all'?null : params['source']
      }
      if (params['view'] == 'reload') {
        this.router.navigate([], {
          queryParams: {
            newID:null,
            view: null
          },
          queryParamsHandling: 'merge',
        })
        this.getNews()
        this.getNewsSentiment()

      } 
    });
  }
  getNewsSentiment(){
    this.loading = true
    this.newsSentiment=null
    this.newsService.getNewsSentiment(this.currentSource).subscribe(newsSentiment => {
      this.newsSentiment = newsSentiment?.data
      this.newsSentiment['chart'] = {
        labels: [this.newsSentiment?.totalNegative?.details?.name, this.newsSentiment?.totalPositive?.details?.name,this.newsSentiment?.totalNeutral?.details?.name],
        datasets: [
          {
            data: [this.newsSentiment?.totalNegative?.value, this.newsSentiment?.totalPositive?.value,this.newsSentiment?.totalNeutral?.value],
            backgroundColor: [this.newsSentiment?.totalNegative?.details?.details?.color, this.newsSentiment?.totalPositive?.details?.details?.color, this.newsSentiment?.totalNeutral?.details?.details?.color]
          }
        ]
      }
      this.loading = false

    }, error => {
      this.loading = false

    })
  }
  overflow(value) {
    const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement
    htmlTag.style.overflow = value
  }
  showNewDetails(newID) {
    this.displayNewDetails = true
    this.router.navigate([], {
      queryParams: {
        newID: newID,
        view: 'details'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  showAddEditNews(newID?, view?) {
    this.displayaddEdit = true

    this.router.navigate([], {
      queryParams: {
        newID: newID,
        view: view || 'new'
      }
      ,
      queryParamsHandling: 'merge',
    })
  }
  getSource(id) {
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    const news_Source = lookups?.find(item => item?.key == 'News_Source').items
    const news_Source_ = news_Source?.find(item => item?.id == id)
    return news_Source_
    
  }
  getNews() {
    this.loading = true
    this.news=null
    this.newsService.getNews(this.currentSource).subscribe(news => {
      this.news = news.data
      this.loading = false

    }, error => {
      this.loading = false

    })


  }

}
