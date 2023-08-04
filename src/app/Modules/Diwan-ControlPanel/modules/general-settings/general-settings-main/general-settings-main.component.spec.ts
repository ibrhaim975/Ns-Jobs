import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingsMainComponent } from './general-settings-main.component';

describe('GeneralSettingsMainComponent', () => {
  let component: GeneralSettingsMainComponent;
  let fixture: ComponentFixture<GeneralSettingsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSettingsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralSettingsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
