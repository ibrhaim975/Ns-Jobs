import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModuleMainComponent } from './custom-module-main.component';

describe('CustomModuleMainComponent', () => {
  let component: CustomModuleMainComponent;
  let fixture: ComponentFixture<CustomModuleMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomModuleMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomModuleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
