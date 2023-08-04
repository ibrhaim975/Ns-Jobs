import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreService } from 'src/app/core/core.service';
import { LoadingComponent } from '../loading/loading.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  standalone: true,
  imports: [FileUploadModule, CommonModule, FormsModule, TranslateModule, LoadingComponent],
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  constructor(private coreService: CoreService, private sanitizer: DomSanitizer) { }
  @Input() title = 'File Upload'
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() accept = ".jpg,.jpeg,.png"
  @Input() image: any
  @Input() required: any
  @Input() width: any=200

  @Output() imageChange: EventEmitter<any[]> = new EventEmitter();

  
  loading = false
  imageBlob = []
  imageView:any
  ngOnInit(): void {
    if (this.image) {
      this.displayImage()

    }
  }
  onSelect(event) {
    const file = event.currentFiles[0]
    let formData = new FormData();
    formData.append('file', file);
    this.loading = true

    this.coreService.uploadAttachment(formData).subscribe(_file => {

      this.image = _file.data
      this.loading = false

      this.imageChange.emit(this.image)
    }, error => {
      this.loading = false

    })
  }
  displayImage() {
    this.loading = true
   

    this.coreService.downloadAttachment(this.image?.fileName).subscribe(res => {

      var blob = new Blob([res], { type: 'image/png' });

      let Imgviwe = null
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        Imgviwe = reader.result
      }

      setTimeout(() => {
        this.imageView=Imgviwe
      }, 50);
      this.imageBlob=[blob]
      this.loading = false

    }, error => {
      this.loading = false

    })


  }

  removeFile(file: File, uploader: FileUpload) {
    const index = uploader?.files?.indexOf(file);
    uploader.remove(null, index);    
    this.image = null
    this.imageBlob = []
    this.imageView=null
    this.imageChange.emit(this.image)

  }
  sanitize(file: any) {
    return this.sanitizer.bypassSecurityTrustUrl(file.objectURL.changingThisBreaksApplicationSecurity);
  }
}
