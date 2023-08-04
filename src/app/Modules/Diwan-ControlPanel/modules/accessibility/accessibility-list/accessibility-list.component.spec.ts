import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityListComponent } from './accessibility-list.component';

describe('AccessibilityListComponent', () => {
  let component: AccessibilityListComponent;
  let fixture: ComponentFixture<AccessibilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessibilityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
