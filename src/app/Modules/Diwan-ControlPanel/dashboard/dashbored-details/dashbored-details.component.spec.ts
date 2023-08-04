import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredDetailsComponent } from './dashbored-details.component';

describe('DashboredDetailsComponent', () => {
  let component: DashboredDetailsComponent;
  let fixture: ComponentFixture<DashboredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboredDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
