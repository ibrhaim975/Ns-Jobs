import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base.component';
import { New } from 'src/app/modals/New';
import { NewsService } from '../news.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.scss']
})
export class NewDetailsComponent extends BaseComponent implements OnInit {
  @Input() display: boolean = true
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private activateRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public messageService: MessageService, private coreService: CoreService,
    private newsService: NewsService, public translates: TranslateService) {
    super(messageService, translates)
  }
  new = new New()
  newActinos = []
  loadingImg = false
  accessibility:any
  ngOnInit(): void {
    this.getAccessibilities()
    this.getFormUrl()

  }
  getAccessibilities(){
    this.coreService.getAccessibilitiesEmitter.subscribe(accessibilities=>{
      this.accessibility= accessibilities?.find(item => item?.key == "New")
    })

  }	
  getNewActinos() {

    this.newActinos.push({
      label: this.trans('View') + '\n' + this.trans('new from Source'),
      icon: 'pi pi-external-link',
      command: () => {
        window.open(this.new?.link, '_blank');

      }
    }
    )
    if (this.accessibility?.hasPermission==true) {
      
 
    if (this.new?.isSync == false) {
      this.newActinos.push({
        label: this.trans('Edit') + '\n' + this.trans('New'),
        icon: 'pi pi-pencil',
        command: () => {
          this.display = false
          this.router.navigate([], {
            queryParams: {
              newID: this.new?.id,
              view: 'edit'
            },
            queryParamsHandling: 'merge',
          })
          setTimeout(() => {
            this.displayChange.emit(false)
          }, 300);




        }
      }
      )
      this.newActinos.push(
        {
          label: this.trans('Delete') + '\n' + this.trans('New'),
          icon: 'pi pi-trash',
          command: () => {
            this.deleteNew()
          }
  
  
        }
      )
    }

    this.newActinos.push(
      {
        label: this.trans('Unpublish New'),
        icon: 'pi pi-minus-circle',
        command: () => {
          this.unpublishNew()
        }

      }
    )
 

    this.newActinos.push(
      {
        label: this.trans('Block') + '\n' + this.trans('Source'),
        icon: 'pi pi-times-circle',
        command: () => {
          this.blockSource()
        }

      }
    )
  }
  }
  deleteNew() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('New'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.newsService.deleteNew(this.new?.id).subscribe((t) => {
          this.onHide('reload')
        })
      }

    });
  }
  blockSource() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to block this') + '\n' + this.trans('source'),
      header: this.trans('Block Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.newsService.blockSource(this.new?.source?.id).subscribe((t) => {

          localStorage.removeItem('settings')
          this.coreService.getSettings()

  
          this.onHide('reload','all')
     
        })
      }

    });
  }
  unpublishNew() {
    this.confirmationService.confirm({
      message: this.trans('Do you want to unpublish this') + '\n' + this.trans('new'),
      header: this.trans('Unpublish Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.newsService.unpublishNew(this.new?.id).subscribe((t) => {
          this.onHide('reload')
        })
      }

    });
  }
  getFormUrl() {
    const sub = this.activateRoute.queryParams.subscribe((params) => {

      if (params['newID']) {
        this.getNew(params['newID'])
      }

    });
    sub.unsubscribe()
  }

  onHide(view?,source?) {

    this.display = false
    this.router.navigate([], {
      queryParams: {
        source: source,
        newID: null,
        view: view || null
      },
      queryParamsHandling: 'merge',
    })
    setTimeout(() => {
      this.displayChange.emit(false)
    }, 300);
  }
  getNew(newID) {
    this.loading = true
    this.newsService.getNew(newID).subscribe(newDetails => {
      this.new = newDetails?.data
      this.loading = false
      this.viewImage()
      this.getNewActinos()


    }, error => {
      this.loading = false

    })
  }
  viewImage() {
    this.loadingImg = true
    this.coreService.downloadAttachment(this.new.image?.fileName).subscribe(res => {

      var blob = new Blob([res], { type: 'image/png' });

      let Imgviwe = null
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        Imgviwe = reader.result
      }

      setTimeout(() => {
        this.new.view = Imgviwe
      }, 50);
      this.loadingImg = false

    }, error => {
      this.loadingImg = false

    })

  }
}
