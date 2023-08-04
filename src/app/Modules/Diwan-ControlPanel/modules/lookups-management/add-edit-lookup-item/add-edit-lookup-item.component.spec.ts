import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLookupItemComponent } from './add-edit-lookup-item.component';

describe('AddEditLookupItemComponent', () => {
  let component: AddEditLookupItemComponent;
  let fixture: ComponentFixture<AddEditLookupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLookupItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLookupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
