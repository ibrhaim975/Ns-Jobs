import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent extends BaseComponent implements OnInit {

  constructor(private coreService: CoreService) {
    super()
   }

  @Input() new: any

  loadingImg
  ngOnInit(): void {
    if (this.new?.isSync==false)  this.viewImage()
 
  }
  viewImage() {
    this.loadingImg = true
    this.coreService.downloadAttachment(this.new?.image?.fileName).subscribe(res => {

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

  getSource(id) {
    const lookups = JSON.parse(localStorage.getItem('settings')).lookups
    const news_Source = lookups?.find(item => item?.key == 'News_Source').items
    const news_Source_ = news_Source?.find(item => item?.id == id)

    return news_Source_

  }
}
