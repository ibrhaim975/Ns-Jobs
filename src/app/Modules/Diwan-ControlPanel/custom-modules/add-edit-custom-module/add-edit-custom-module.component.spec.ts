import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomModuleComponent } from './add-edit-custom-module.component';

describe('AddEditCustomModuleComponent', () => {
  let component: AddEditCustomModuleComponent;
  let fixture: ComponentFixture<AddEditCustomModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
