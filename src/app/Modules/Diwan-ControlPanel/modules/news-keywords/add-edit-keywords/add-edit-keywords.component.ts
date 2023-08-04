import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { NewsKeywordsService } from '../news-keywords.service';

@Component({
  selector: 'app-add-edit-keywords',
  templateUrl: './add-edit-keywords.component.html',
  styleUrls: ['./add-edit-keywords.component.scss']
})
export class AddEditKeywordsComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private newsKeywordsService: NewsKeywordsService) {
    super(messageService, translates)
  }

  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  header = 'Add Keyword'
  @Input() keyWord: any 
  selectedKeyWord:any={keyword:null,id:null}
  ngOnInit(): void {
    this.initKeyword()
  }
  initKeyword() {
    if (isSet(this.keyWord?.id)) {
      this.selectedKeyWord={...this.keyWord}
      return this.header = 'Edit Keyword'

    }
    return this.selectedKeyWord = {keyword:null,id:null}
  }
  submitKeyWord() {
    
    if (isSet(this.selectedKeyWord?.id)) {

      return this.updateKeyword()
    }
    return this.addKeyword()
  }
  addKeyword() {
    const body = { "keyword": this.selectedKeyWord?.keyword }

    this.loading = true
    this.newsKeywordsService.addKeyword(body).subscribe(() => {
      this.loading = false
      this.newsKeywordsService.newsChange.next(true)
      this.onHide()
    },error=>{
      this.loading = false

    })
  }
  updateKeyword() {
    const body = { "keyword": this.selectedKeyWord?.keyword }

    this.loading = true
    this.newsKeywordsService.updateKeyword(this.selectedKeyWord?.id, body).subscribe(() => {
      this.loading = false
      this.newsKeywordsService.newsChange.next(true)
      this.onHide()
    },error=>{
      this.loading = false

    })
  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
}
