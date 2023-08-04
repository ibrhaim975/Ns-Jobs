import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { New } from 'src/app/modals/New';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add-edit-news',
  templateUrl: './add-edit-news.component.html',
  styleUrls: ['./add-edit-news.component.scss']
})
export class AddEditNewsComponent extends BaseComponent implements OnInit {

  constructor(private newsService: NewsService,
    private router: Router, private activateRoute: ActivatedRoute,
    public messageService: MessageService, public translates: TranslateService) {
    super(messageService, translates)
  }
  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  title: any = 'Add News'
  new = new New()
  newsSource = []
  newsKeywords = []
  sentiments=[]
  ngOnInit(): void {
    this.getFormSettings()
    this.getFormUrl()
  }
  onHide(view?) {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        newID: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {

      if (params['newID']) {
        this.title = 'Edit New'
        this.getNews(params['newID'])
      }
    });
    sub.unsubscribe()
  }
  addNews() {
    this.loading = true

    this.newsService.addNews(this.new).subscribe(() => {
      this.onHide('reload')

      this.loading = false

    },error=>{
      this.loading = false

    })
  }
  getNews(newID) {
    this.loading=true
    this.newsService.getNew(newID,'edit').subscribe((newD) => {
      this.new = New.cloneObject(newD.data)
      this.new.date=new Date(this.new.date.value)

      this.loading=false

    },error=>{
      this.loading=false

    })
  }
  updateNew(){
    
    this.loading=true
    this.newsService.updateNew(this.new).subscribe(() => {
      this.onHide('reload')
      this.loading=false

    },error=>{
      this.loading=false

    })
  }
  getFormSettings() {
    this.newsSource = JSON.parse(localStorage.getItem('settings'))?.sources
    this.newsKeywords = JSON.parse(localStorage.getItem('settings')).keywords
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    this.sentiments = lookups?.find(item => item?.key == 'News_Sentiment').items


    
  }
  newAddEdit() {

    if (isSet(this.new?.id)) {
      this.updateNew()
    } else this.addNews()

  }
}
