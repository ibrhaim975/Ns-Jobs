import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModuleDetailsComponent } from './custom-module-details.component';

describe('CustomModuleDetailsComponent', () => {
  let component: CustomModuleDetailsComponent;
  let fixture: ComponentFixture<CustomModuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomModuleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomModuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
