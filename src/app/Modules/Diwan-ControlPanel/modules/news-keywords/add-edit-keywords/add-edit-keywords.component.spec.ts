import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditKeywordsComponent } from './add-edit-keywords.component';

describe('AddEditKeywordsComponent', () => {
  let component: AddEditKeywordsComponent;
  let fixture: ComponentFixture<AddEditKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditKeywordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
