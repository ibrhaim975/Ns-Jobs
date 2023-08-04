import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCalenderCardComponent } from './home-calender-card.component';

describe('HomeCalenderCardComponent', () => {
  let component: HomeCalenderCardComponent;
  let fixture: ComponentFixture<HomeCalenderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCalenderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCalenderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
