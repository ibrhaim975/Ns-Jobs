import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { EntityViewerComponent } from 'src/app/Shared/entity-viewer/entity-viewer.component';
import { CoreService } from 'src/app/core/core.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { BaseComponent } from 'src/app/core/base/base.component';
import * as _ from 'lodash';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule, InputTextareaModule, ButtonModule,
    EntityViewerComponent, FormsModule, TooltipModule, TranslateModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends BaseComponent implements OnInit, AfterContentInit {

  constructor(private coreService: CoreService, private authService: AuthService, private cd: ChangeDetectorRef) {
    super()
  }
  entity
  @Input() height: any
  @Input() comments: any
  @Input() sourse: any
  @Input() workflowComment: boolean =false
  @Input() registryId : any

  newComment: any
  newAttachments = []
  user = this.authService?.getAuthData()?.user
  loading = false

  ngOnInit(): void {

  }
  ngAfterContentInit() {
    this.cd.detectChanges();

  }
  submbitComments(){
    if (this.workflowComment==true) {
      this.addCommentsWorkflow()
    }else {
      this.addComments()

    }
  }
  addComments() {
    const body = {
      body: this.newComment,
      attachments: _.map(this.newAttachments, item => { return item?.fileName }),
      module: this.sourse?.module,
      entityId: this.sourse?.id
    }
    this.coreService.addComment(body).subscribe(item => {
      const comment = {
        body: this.newComment,
        createdBy: this.user,
        createdAt: { label: 'now' },
        attachments: this.newAttachments

      }
      this.comments.push(comment)
      this.newComment = null
      this.newAttachments = []
    })
  }

  addCommentsWorkflow() {
    // _.map(this.newAttachments, item => { return item?.fileName })
    const body = {
      body: this.newComment,
      fileUid: this.newAttachments[0]?.fileName || '',
      registryId: this.registryId
    }
    this.coreService.addWorkflowComment(this.registryId,body).subscribe(item => {
      const comment = {
        body: this.newComment,
        createdBy: this.user,
        createdAt: { label: 'now' },
        attachments: this.newAttachments

      }
      this.comments.push(comment)
      this.newComment = null
      this.newAttachments = []
    })
  }
  handleFileInput(files): void {
    for (let index = 0; index < files?.length; index++) {
      this.loading = true
      let formData = new FormData();
      formData.append('file' + index, files[index]);
      this.coreService.uploadAttachment(formData).subscribe(file => {
        this.newAttachments.push(file?.data)
        this.loading = false

      }, error => {
        this.loading = false

      })
    }


  }
  downloadFile(attachment) {
    this.loading = true
    this.coreService.downloadAttachment(attachment?.fileName).subscribe(res => {
      console.log(res);

      var blob = new Blob([res], { type: attachment?.body?.ContentType });
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;

      link.download = attachment?.name?.split('?')[0];
      this.loading = false

      link.click();
    })

  }
  removeAttachment(index) {
    this.newAttachments.splice(index, 1)
  }
}
