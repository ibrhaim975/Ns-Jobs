import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MySpaceService } from '../my-space.service';
import { isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-my-space-actions',
  templateUrl: './my-space-actions.component.html',
  styleUrls: ['./my-space-actions.component.scss']
})
export class MySpaceActionsComponent implements OnInit {


  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() header: any
  data: any = { body: null, fileUid: [] }
  action: any
  hideUploader = false
  constructor(private mySpaceService: MySpaceService, private coreService: CoreService) { }

  ngOnInit(): void {
    this.onDetailsClickEmitter()
  }
  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }

  onDetailsClickEmitter() {
    this.mySpaceService.onActionClickEmitter.subscribe(action => {
      this.action = action

    })
  }
  onConfirm() {
    this.data.fileUid = this.data.fileUid[0]?.fileName
    this.coreService.putCustomUrl(this.action?.link, this.data).subscribe(() => {
      this.mySpaceService.dataChange.next(true)
      this.onHide()
    })
  }
  onUpload() {

    if (this.data.fileUid.length == 1) {
      this.hideUploader = true
    } else {
      this.hideUploader = false

    }
  }
}
