import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CoreService } from 'src/app/core/core.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralSettingsService } from '../general-settings.service';
@Component({
  selector: 'app-logo-uploader',
  templateUrl: './logo-uploader.component.html',
  styleUrls: ['./logo-uploader.component.scss']
})
export class LogoUploaderComponent implements OnInit {

  constructor(private coreService: CoreService, private sanitizer: DomSanitizer, private generalSettingsService: GeneralSettingsService) { }
  @Input() title = 'File Upload'
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() accept = ".jpg,.jpeg,.png"
  @Input() image: any
  @Input() key: any
  @Input() imgWidth: any
  @Input() imgheight: any

  uploadMode = true
  timeZones: any
  @Output() imageChange: EventEmitter<any[]> = new EventEmitter();


  loading = false
  imageBlob = []
  imageView: any
  updateImg = false
  ngOnInit(): void {

    if (this.image) {
      this.uploadMode = false
      this.imageView = this.image
      this.base64toBlob()
    }
  }
  base64toBlob() {
    var blob = new Blob([this.imageView], { type: 'image/png' });

    let reader = new FileReader();
    this.imageBlob = [blob]

    reader.readAsDataURL(blob);
  }
  onSelect(event) {
    const file = event.currentFiles[0]
    let formData = new FormData();
    formData.append('file', file);
    this.loading = true

    this.coreService.uploadAttachment(formData).subscribe(_file => {

      this.image = _file.data
      this.loading = false
      this.uploadMode = false
      this.imageChange.emit(this.image)
      this.displayImage()
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
      this.updateImg = true

      setTimeout(() => {
        this.imageView = Imgviwe
        if (this.updateImg == true) {
          this.updateGeneralSettings(this.imageView)



        }
      }, 50);
      this.imageBlob = [blob]
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
    this.imageView = null
    this.uploadMode = true

    this.imageChange.emit(this.image)

  }
  sanitize(file: any) {
    return this.sanitizer.bypassSecurityTrustUrl(file.objectURL.changingThisBreaksApplicationSecurity);
  }
  updateGeneralSettings(img?) {
    this.loading = true
    const data = {
      'key': this.key,
      'value': img
    }

    this.generalSettingsService.updateGeneralSettings(data).subscribe(() => {
      this.updateImg = false
      this.loading = false
      localStorage.removeItem('genralSettings')
      this.coreService.getGenralSettings()

    }, error => {
      this.loading = false

    })

  }
  restartLogo() {
    this.image = ""
    this.imageChange.emit(this.image)
    this.uploadMode = true

    this.updateGeneralSettings(this.image)
  }

}