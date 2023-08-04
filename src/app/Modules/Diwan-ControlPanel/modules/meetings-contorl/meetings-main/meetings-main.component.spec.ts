import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsMainComponent } from './meetings-main.component';

describe('MeetingsMainComponent', () => {
  let component: MeetingsMainComponent;
  let fixture: ComponentFixture<MeetingsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
