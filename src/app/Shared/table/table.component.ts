import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../prgoress/prgoress.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EntityViewerComponent } from '../entity-viewer/entity-viewer.component';
import { ReorderableColumn } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  imports: [CommonModule, PrimengComponentsModule, SliderComponent, TranslateModule, InputSwitchModule,
    EntityViewerComponent],
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentChecked {

  constructor(private cdr: ChangeDetectorRef) {

  }
  @Input() lodaing: boolean = false
  @Input() caption: any
  @Input() data = []
  @Input() columns = []
  @Input() reorderableColumns: boolean = false
  @Input() actionsColumns = []
  @Input() actionsTemplate: any
  @Input() expandedTable: boolean = false
  @Input() paginator: any = true
  @Input() rowClass: any = 'bg-primary'
  @Input() scrollable = true
  @Input() scrollHeight: any = 'calc( 80vh - 200px)'
  @ViewChild('dt') dt: any;

  recoderDone = false

  @Output() inputSwitchChange: EventEmitter<any> = new EventEmitter();
  @Output() reorderColumn: EventEmitter<any> = new EventEmitter();
  @Output() onExpanded: EventEmitter<any> = new EventEmitter();

  selectedItem: any
  currentLang = localStorage.getItem('currentLang')


  ngOnInit(): void {
  this.searhUsers()

  }
  searhUsers(){
    this.columns?.map(column => {

      if (column?.type == 'user') {

        this.columns.push({ header: 'Display Name', field: 'displayName', display: 'none', width: '30%' })

        setTimeout(() => {
          this.data?.map(entry => {
            entry['displayName'] = entry[column?.field]?.displayName
          })
        }, 1000);
      }
    })

  }
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  onChangeInputSwitch(item) {
    this.inputSwitchChange.emit(item)
  }
  onChangeReorderColumn(event:any) {
    this.recoderDone = true
    console.log(this.dt);
    this.reorderColumn.emit(event)
  }

  onExpandedColumn(evnent) {
    this.onExpanded.emit(evnent)
  }
}
