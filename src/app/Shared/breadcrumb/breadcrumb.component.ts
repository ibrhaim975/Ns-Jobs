import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  imports:[CommonModule,TranslateModule],
  standalone:true,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent  implements OnInit {

  constructor(private router: Router,) { }
  @Input() data: any=[]
  lang = localStorage.getItem('currentLang')
  ngOnInit(): void {
    
  }
  async navigate(link,index?) {
    if ( this.data.length-1 == index) {
      return null
    }
     await this.router.navigateByUrl('.', { skipLocationChange: true });
     return this.router.navigateByUrl(link);
 
  }

}
