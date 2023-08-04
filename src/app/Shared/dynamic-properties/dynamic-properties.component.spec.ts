import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPropertiesComponent } from './dynamic-properties.component';

describe('DynamicPropertiesComponent', () => {
  let component: DynamicPropertiesComponent;
  let fixture: ComponentFixture<DynamicPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
