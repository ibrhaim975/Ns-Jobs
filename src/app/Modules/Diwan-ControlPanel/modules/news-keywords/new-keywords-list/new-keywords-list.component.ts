import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { NewsKeywordsService } from '../news-keywords.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-keywords-list',
  templateUrl: './new-keywords-list.component.html',
  styleUrls: ['./new-keywords-list.component.scss']
})
export class NewKeywordsListComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, private confirmationService: ConfirmationService,
    private newsKeywordsService: NewsKeywordsService,
    public messageService: MessageService) {
    super(messageService, translates)

  }

  columns = [
    { header: 'keyword', field: 'keyword', width: '90%' },

  ]
  caption = { title: 'Manage Keywords', title2: 'keywords' }
  actionsColumns = [{ header: 'Action', key: 'action' }]
  keywords = []
  keywordsActions = []
  displayAddEditKeywords = false
  selectedKeyword: any

  ngOnInit(): void {
    this.getKeywords()
    this.getkeywordsActions()
    this.newsChangeEmitter()
  }
  getKeywords() {
    this.loading = true

    this.newsKeywordsService.getKeywords().subscribe(keywords => {
      this.loading = false
      this.keywords = keywords?.data
    }, error => {
      this.loading = false

    })
  }
  syncNews() {
    this.loading = true

    this.newsKeywordsService.syncNews().subscribe(() => {
      this.loading = false
    }, error => {
      this.loading = false

    })
  }
  setSelectedKeyWord(keyword) {
    this.selectedKeyword = keyword
  }

  showAddKeyWords() {
    this.displayAddEditKeywords = true
    this.selectedKeyword = null
  }
  showEditKeyWords() {
    this.displayAddEditKeywords = true
  }
  getkeywordsActions() {

    this.keywordsActions = [
      {
        label: this.trans('Edit'),
        icon: 'pi pi-pencil',
        command: () => {
          this.showEditKeyWords()
        }
      },
      {
        label: this.trans('Delete'),
        icon: 'pi pi-trash',
        command: () => {
          this.deleteKeyword()

        }
      }

    ]


  }
  newsChangeEmitter() {
    const sub = this.newsKeywordsService.newsChangeEmitter.subscribe(status => {
      if (!isSet(status)) {
        return
      }
      this.getKeywords()
    })
    this.subscriptions.push(sub)
  }
  deleteKeyword() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('keyword'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.newsKeywordsService.deleteKeyword(this.selectedKeyword?.id).subscribe(() => {
          const index = this.keywords.findIndex(object => { return object.id === this.selectedKeyword.id })
          this.keywords.splice(index, 1)
          this.loading = false
        }, error => {
          this.loading = false

        })
      }

    });
  }

}
