import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPreviousMeetingsComponent } from './upcoming-previous-meetings.component';

describe('UpcomingPreviousMeetingsComponent', () => {
  let component: UpcomingPreviousMeetingsComponent;
  let fixture: ComponentFixture<UpcomingPreviousMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingPreviousMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingPreviousMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
