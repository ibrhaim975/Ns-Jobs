import { Component, OnInit } from '@angular/core';
import { LookupService } from '../lookup.service';
import { Lookups } from 'src/app/modals/lookups';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-list-lookups',
  templateUrl: './list-lookups.component.html',
  styleUrls: ['./list-lookups.component.scss']
})
export class ListLookupsComponent extends BaseComponent implements OnInit {

  constructor(private lookupService: LookupService, public translates: TranslateService, public messageService: MessageService,
    private coreService: CoreService, private confirmationService: ConfirmationService) {
    super(messageService, translates)

  }
  lookups: Lookups[] = []
  selectedLookup = new Lookups()
  displayAddEditLookup = false

  ngOnInit(): void {
    this.getLookups()
    this.refreshLookups()
  }
  showAddLookup() {
    this.selectedLookup = new Lookups()
    this.displayAddEditLookup = true
  }
  showEditLookup(lookup ) {
    console.log(lookup);
    
    this.selectedLookup = lookup
    this.displayAddEditLookup = true
  }
  getLookups() {
    this.loading = true
    this.lookupService.getLookups().subscribe(lookups => {
      this.loading = false
      this.lookups = lookups.data

    }, error => {
      this.loading = false
    })
  }
  refreshLookups() {
    this.lookupService.lookupChangeEmitter.subscribe(stauts => {
      if (!isSet(stauts)) return
      this.getLookups()
      localStorage.removeItem('settings')
      this.coreService.getSettings()
    })
  }
  deleteLookup(lookup) {
    this.confirmationService.confirm({
      message: this.trans('Do you want to delete this') + '\n' + this.trans('lookup'),
      header: this.trans('Delete Confirmation'),
      rejectLabel: this.trans('Cancel'),
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary text-btn',
      acceptLabel: this.trans('Confirm'),
      acceptButtonStyleClass: ' text-btn',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true
        this.lookupService.deleteLookup(lookup?.id).subscribe(() => {
            this.loading = false
            localStorage.removeItem('settings')
            this.coreService.getSettings()
            this.lookups = this.lookups.filter(val => val?.id !== lookup?.id);

          }, error => {
            this.loading = false

          })
      }

    });
  }

}
