import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { LookupService } from '../lookup.service';
import { Lookups } from 'src/app/modals/lookups';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-add-edit-lookup',
  templateUrl: './add-edit-lookup.component.html',
  styleUrls: ['./add-edit-lookup.component.scss']
})
export class AddEditLookupComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private lookupService: LookupService,
    private confirmationService: ConfirmationService,
    private coreService: CoreService) {
    super(messageService, translates)

  }

  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() lookup = new Lookups()
  selectedLookupItem: any

  header = 'Add Lookup'
  columns = [
    { header: 'Name', field: 'name', width: '40%', type: 'translatable' },
    { header: 'Color', type: 'color', width: '30%' },
    { header: 'Order', field: 'order', width: '20%' },
  ]
  
  caption = { title: 'Items Management', title2: 'Items' }
  actionsColumns = [{ header: 'Action', key: 'action' }]

  showAddEditItem = false
  itemActions = []
  ngOnInit(): void {
    this.initLookup()
    this.getLookup()
    this.refreshLookups()
    this.LookupItemActions()
  }
  initLookup() {
    if (isSet(this.lookup?.id)) {
      return
    }
    this.lookup.displayName = {
      ar: null,
      en: null
    }
  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  addEditLookup() {
    if (this.lookup?.id) {
      this.updateLookup()
    } else {
      this.addLookup()
    }
  }
  addLookup() {
    this.lookupService.addLookup(this.lookup).subscribe(lookup => {
      this.lookupService.lookupChange.next(true)
      this.onHide()
    })
  }
  updateLookup() {
    this.lookupService.updateLookup(this.lookup).subscribe(lookup => {
      this.lookupService.lookupChange.next(true)
      this.onHide()
    })
  }
  getLookup() {
    if (!isSet(this.lookup?.id)) {
      return
    }
    this.loading = true
    const sub = this.lookupService.getLookup(this.lookup?.id).subscribe(lookups => {
      this.loading = false
      this.lookup = lookups.data
      sub.unsubscribe()
    }, error => {
      this.loading = false
    })
  }
  LookupItemActions() {
    this.itemActions.push({
      label: this.trans('Edit'),
      icon: 'pi pi-pencil',
      command: () => {
        this.showAddEditLookupItem()
      }
    })
    this.itemActions.push({
      label: this.trans('Delete'),
      icon: 'pi pi-trash',
      command: () => {

        this.deleteLookupItem()
      }
    })
  }
  showAddEditLookupItem() {
    this.showAddEditItem = true
  }
  initSelectedLookupItem() {
    this.selectedLookupItem = null
  }
  deleteLookupItem() {

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
        this.lookupService.deleteLookupItem(this.selectedLookupItem?.id).subscribe(() => {
          this.loading = false
          this.lookupService.lookupChange.next(true)

        }, error => {
          this.loading = false

        })
      }

    });
  }
  refreshLookups() {
    this.lookupService.lookupChangeEmitter.subscribe(stauts => {
      if (!isSet(stauts)) return
      this.getLookup()
      this.lookupService.lookupChange.next(null)
    })
  }
  updateOrderLookup(evnent) {
    this.lookup.items[evnent.dropIndex].order = evnent.dropIndex + 1
    this.lookup.items[evnent.dragIndex].order = evnent.dragIndex + 1
    const body = {
      keys: [{
        key: this.lookup.items[evnent.dropIndex].key,
        id: this.lookup.items[evnent.dropIndex].id,
        order: this.lookup.items[evnent.dropIndex].order,
      },
      {
        key: this.lookup.items[evnent.dragIndex].key,
        id: this.lookup.items[evnent.dragIndex].id,
        order: this.lookup.items[evnent.dragIndex].order,
      },]
    }
    this.lookupService.orderLookupItem(body).subscribe(item => {
      console.log(item);
      this.loading = false
      localStorage.removeItem('settings')
      this.coreService.getSettings()
    }, error => {
      this.loading = false

    })
  }
}
