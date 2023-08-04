import { CommonModule } from '@angular/common';
import { Component, OnInit,  ViewChild } from '@angular/core';
import {  MultiSelectModule } from 'primeng/multiselect';
import { CoreService } from 'src/app/core/core.service';
import { ResponseBody } from 'src/app/modals/response';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalComponent } from '../modal/modal.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BaseComponent } from 'src/app/core/base/base.component';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-find-tags',
  standalone: true,
  imports: [CommonModule, MultiSelectModule, FormsModule, TranslateModule, ModalComponent, InputTextModule, ButtonModule,ToastModule],
  templateUrl: './find-tags.component.html',
  styleUrls: ['./find-tags.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FindTagsComponent,
      multi: true
    }]
})
export class FindTagsComponent extends BaseComponent implements OnInit,ControlValueAccessor {
  tags = []
  @ViewChild('multiSelect') multiSelect: any;

  //
  showAddTags = false
  newTag: any
  private innerselectedTags: any 

  constructor(private coreService: CoreService, public messageService: MessageService, public translateService: TranslateService) {
    super(messageService, translateService)
  }

  ngOnInit(): void {

    this.getTags()
  }

  getTags() {
    this.coreService.getTags().subscribe((tags: ResponseBody<any>) => { this.tags = tags.data })
  }
  showAddTag() {
    this.showAddTags = true
  }
  addTag() {
    this.loading = true
    this.coreService.addTag(this.newTag).subscribe((tag: ResponseBody<any>) => {
      if (!this.tags.length) {
        this.tags=[]
      }
      this.tags?.push(tag.data)
      this.selectedTags.push(tag.data)
      this.loading = false
      this.showAddTags = false
    })

  }
  onFilter(value) {
    this.newTag = value.filter
  }
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get selectedTags(): any {
    return this.innerselectedTags;
  }

  set selectedTags(v: any) {
    if (v !== this.innerselectedTags) {
      this.innerselectedTags = v;
      this.onChangeCallback(v);
    }
  }
  writeValue(selectedTags: any) {
    if (selectedTags !== this.innerselectedTags) {
      this.innerselectedTags = selectedTags;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public validate(c: FormControl) {
    return c.errors;
  }
}
