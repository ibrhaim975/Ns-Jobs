import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTaskCardComponent } from './home-task-card.component';

describe('HomeTaskCardComponent', () => {
  let component: HomeTaskCardComponent;
  let fixture: ComponentFixture<HomeTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTaskCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
