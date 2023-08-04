import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EntityViewerComponent } from '../entity-viewer/entity-viewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-properties-preview',
  templateUrl: './dynamic-properties-preview.component.html',
  imports: [ CommonModule,TranslateModule,EntityViewerComponent],
  standalone:true,
  styleUrls: ['./dynamic-properties-preview.component.scss']
})
export class DynamicPropertiesPreviewComponent implements OnInit {

  @Input() props: any
  @Input() colClass: any='col-4 my-2'

  constructor() { }

  ngOnInit(): void {
  }

}
