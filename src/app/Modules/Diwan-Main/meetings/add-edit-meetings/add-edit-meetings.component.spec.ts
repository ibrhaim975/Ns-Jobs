import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMeetingsComponent } from './add-edit-meetings.component';

describe('AddEditMeetingsComponent', () => {
  let component: AddEditMeetingsComponent;
  let fixture: ComponentFixture<AddEditMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
