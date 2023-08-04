import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalendarMeetingsComponent } from './full-calendar-meetings.component';

describe('FullCalendarMeetingsComponent', () => {
  let component: FullCalendarMeetingsComponent;
  let fixture: ComponentFixture<FullCalendarMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullCalendarMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCalendarMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
