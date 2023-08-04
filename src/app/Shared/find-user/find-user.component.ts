import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BaseComponent, isSet } from 'src/app/core/base/base.component';
import { CoreService } from 'src/app/core/core.service';
import { UserInfo } from 'src/app/modals/User';
import {   ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResponseBody } from 'src/app/modals/response';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-user',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule, TranslateModule,CommonModule ],
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FindUserComponent,
      multi: true
    }]
})
export class FindUserComponent implements ControlValueAccessor    {

  constructor(private coreService: CoreService ) {
  }
  // selectedUser: UserInfo
  private innerselectedUser: any 

  @ViewChild('myinput') input;
  @Input() title: string
  @Input() multiple = false
  @Input() required: boolean=false
  @Input() hideTitle: boolean=false

  usersSuggestions: UserInfo[]

  findUser(event) {

    this.coreService.findUser(event.query).subscribe((users: ResponseBody<UserInfo[]>) => {
      this.usersSuggestions = users.data
    }, error => {
    })
  }

  onBlur(){
    
    if (!this.selectedUser?.userName && this.multiple==false ) this.selectedUser=null
    if (!isSet(this.selectedUser) && this.multiple==true ) this.selectedUser=null

  }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get selectedUser(): any {
    return this.innerselectedUser;
  }

  set selectedUser(v: any) {
    if (v !== this.innerselectedUser) {
      this.innerselectedUser = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(selectedUser: any) {
    if (selectedUser !== this.innerselectedUser) {
      this.innerselectedUser = selectedUser;
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
