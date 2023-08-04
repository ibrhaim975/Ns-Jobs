import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessibilityGroupComponent } from './add-accessibility-group.component';

describe('AddAccessibilityGroupComponent', () => {
  let component: AddAccessibilityGroupComponent;
  let fixture: ComponentFixture<AddAccessibilityGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccessibilityGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccessibilityGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
