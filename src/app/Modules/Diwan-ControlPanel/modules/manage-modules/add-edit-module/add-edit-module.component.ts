import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { Modules } from 'src/app/modals/Modules';
import { ModulesService } from '../modules.service';
import { PrimengComponentsModule } from 'src/app/primeng-components.module';
import { TableComponent } from 'src/app/Shared/table/table.component';
import { ModalComponent } from 'src/app/Shared/modal/modal.component';
import { InputComponent } from 'src/app/Shared/input/input.component';
import { SelectStatusComponent } from 'src/app/Shared/select-status/select-status.component';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { IconPickerComponent } from 'src/app/Shared/icon-picker/icon-picker.component';

@Component({
  selector: 'app-add-edit-module',
  templateUrl: './add-edit-module.component.html',
  standalone: true,
  imports: [
    PrimengComponentsModule,
    TranslateModule,
    ModalComponent,
    InputComponent,
    SelectStatusComponent,
    LoadingComponent,
    IconPickerComponent],
  styleUrls: ['./add-edit-module.component.scss']
})
export class AddEditModuleComponent extends BaseComponent implements OnInit {

  @Input() display: boolean = false
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  @Input() module = new Modules()
  header = 'New Module'
  constructor(public translates: TranslateService, public messageService: MessageService, private modulesService: ModulesService) {
    super(messageService, translates)
  }
  ngOnInit(): void {
    this.initModule()
    this.getModule()
  }
  initModule() {
    if (isSet(this.module?.id)) {
      return
    }
    this.module.name = {
      ar: null,
      en: null
    }
  }

  addModule() {
    this.loading = true
    this.modulesService.addModule(this.module).subscribe(() => {
      this.loading = false
      this.modulesService.moduleChange.next(true)
      this.onHide()
    }, error => {
      this.loading = false
    })
  }
  addEditModule() {
    if (this.module?.id) {
      this.updateModule()
    } else {
      this.addModule()

    }
  }
  updateModule() {
    this.loading = true
    this.modulesService.updateModule(this.module).subscribe(() => {
      this.loading = false
      this.modulesService.moduleChange.next(true)
      this.onHide()
    }, error => {
      this.loading = false
    })
  }

  onHide() {
    this.display = false
    this.displayChange.emit(false)
  }
  getModule() {
    if (!isSet(this.module?.id)) {
      return
    }
    this.loading = true
    this.modulesService.getModule(this.module?.id, 'edit').subscribe(module => {
      this.module = Modules.cloneObject(module?.data)

      this.header = 'Edit Module'
      this.loading = false

    }, erorr => {
      this.loading = false

    })
  }
}
