import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilitiesGroupComponent } from './accessibilities-group.component';

describe('AccessibilitiesGroupComponent', () => {
  let component: AccessibilitiesGroupComponent;
  let fixture: ComponentFixture<AccessibilitiesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessibilitiesGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilitiesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
