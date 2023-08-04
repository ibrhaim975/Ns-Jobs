import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDeactiveRolesComponent } from './active-deactive-roles.component';

describe('ActiveDeactiveRolesComponent', () => {
  let component: ActiveDeactiveRolesComponent;
  let fixture: ComponentFixture<ActiveDeactiveRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDeactiveRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveDeactiveRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
