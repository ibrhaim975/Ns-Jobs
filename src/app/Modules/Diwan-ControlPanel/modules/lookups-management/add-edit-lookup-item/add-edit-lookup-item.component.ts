import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { LookupService } from '../lookup.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-add-edit-lookup-item',
  templateUrl: './add-edit-lookup-item.component.html',
  styleUrls: ['./add-edit-lookup-item.component.scss']
})
export class AddEditLookupItemComponent extends BaseComponent implements OnInit {

  constructor(public translates: TranslateService, public messageService: MessageService, private lookupService: LookupService,
    private coreService: CoreService) {
    super(messageService, translates)

  }
  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() lookupID: any
  @Input() order: any
  @Input() LookupItem: any = { id: null, lookupId: null, name: { ar: null, en: null }, details: {color: null}, order: null }
  header = 'New Lookup Item'
  ngOnInit(): void {
    this.initLookupItem()
    this.getLookupItem()

  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  initLookupItem() {
    if (isSet(this.LookupItem)) {
      return
    }
    this.LookupItem = { id: null, lookupId: null, name: { ar: null, en: null }, details: {color: null}, order: null }

    this.LookupItem.lookupId = this.lookupID
    this.LookupItem.order = this.order
this.LookupItem.details.color='#444444'
  }
  lookupItemAddEdit() {
    if (this.LookupItem?.id) {
      this.updateLookupItem()
    } else {
      this.addLookupItem()

    }
  }
  addLookupItem() {
    this.loading = true
    delete this.LookupItem?.id

    this.lookupService.addLookupItem(this.LookupItem).subscribe(item => {
      this.loading = false
      this.lookupService.lookupChange.next(true)
      this.onHide()

    }, error => {
      this.loading = false

    })
  }
  getLookupItem() {
    if (!isSet(this.LookupItem?.id)) {
      return
    }
    this.loading = true
    this.lookupService.getLookupItem(this.lookupID, this.LookupItem?.id).subscribe(item => {
      this.LookupItem = item?.data
      this.loading = false

    }, error => {
      this.loading = false

    })
  }
  updateLookupItem() {
    this.loading = true
    console.log(this.LookupItem);
    
    this.lookupService.updateLookupItem(this.LookupItem).subscribe(item => {
      this.loading = false
      this.lookupService.lookupChange.next(true)
      this.onHide()
    }, error => {
      this.loading = false

    })
  }


}
