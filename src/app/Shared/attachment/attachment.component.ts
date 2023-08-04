import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CoreService } from 'src/app/core/core.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { MenuModule } from 'primeng/menu';
import { AuthService } from 'src/app/Modules/auth/auth.service';
@Component({
  selector: 'app-attachment',
  standalone: true,
  imports: [CommonModule, TranslateModule, TableModule, ButtonModule, MenuModule, TooltipModule],
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent extends BaseComponent implements OnInit {

  constructor(private authService: AuthService, private coreService: CoreService, private datePipe: DatePipe, public messageService?: MessageService, public translates?: TranslateService) {
    super(messageService, translates)
  }
  files: any[] = [];
  @Input() attachments: any[] = []
  @Output() attachmentsChange: EventEmitter<any[]> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() hideUpload: boolean=false
  @Input() hideTitle: boolean = false

  @ViewChild('attachmentsTable') attachmentsTable: any;

  @Output() onUpload = new EventEmitter<any>();
  currentUser = this.authService?.getAuthData()?.user
  dragAreaClass: string
  countfiles = 0
  loading = false
  selecteAttachments: any

  attachmentsAction = [
    {
      label: this.trans('Download') + '\n' + this.trans('File'),
      icon: 'pi pi-cloud-download text-lg',
      command: () => {
        this.downloadFile()
      }

    }

  ]
  ngOnInit(): void {
    this.countfiles = this.attachments?.length
    if (!this.hideUpload) {
      this.attachmentsAction.push({
        label: this.trans('Delete') + '\n' + this.trans('File'),
        icon: 'pi pi-trash text-lg',
        command: () => {
          this.deleteFile()

        }

      })
    }
  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;

      let filesSupported = []
      for (let i = 0; i < files.length; i++) {
        
      const type=  files[i]?.name.substr(files[i]?.name.indexOf('.'))
      console.log(type);
      
        if (this.fileTypes?.includes(type)) {
          filesSupported.push(files[i])
          console.log('ewq');
          
        }
      }
      if (filesSupported.length) {
        this.handleFileInput(filesSupported)
      }

    }
  }
  filesDropped(files: any[]): void {
    this.files = files;
  }

  handleFileInput(files): void {
    this.loading = true
    for (let index = 0; index < files?.length; index++) {
      let formData = new FormData();
      formData.append('file' + index, files[index]);
      this.coreService.uploadAttachment(formData).subscribe(file => {

        if (!this.attachments?.length) {
          this.attachments = []
        }
        file.data.createdBy = this.currentUser
        file.data.createdAt = {label:this.datePipe.transform(new Date(), 'yyyy-MM-dd , h:mm a')}
        this.attachments.push(file.data)
        this.loading = false

        this.attachmentsChange.emit(this.attachments)
      }, error => {
        this.loading = false

      })
    }


    //get image upload file obj;
  }


  downloadFile() {
    this.loading = true
    this.coreService.downloadAttachment(this.selecteAttachments?.fileName).subscribe(res => {
      var blob = new Blob([res], { type: this.selecteAttachments?.body?.ContentType });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;

      link.download = this.selecteAttachments?.name?.split('?')[0];
      this.loading = false

      link.click();
    }, error => {
      this.loading = false

    })

  }
  deleteFile() {
    const attachments = this.attachments?.findIndex(item => item?.fileName == this.selecteAttachments?.fileName)
    this.attachments.splice(attachments, 1);
    this.attachmentsChange.emit(this.attachments)
    this.successMessage(this.trans('File Deleted Successfully'))
  }




}