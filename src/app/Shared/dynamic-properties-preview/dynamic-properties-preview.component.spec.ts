import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPropertiesPreviewComponent } from './dynamic-properties-preview.component';

describe('DynamicPropertiesPreviewComponent', () => {
  let component: DynamicPropertiesPreviewComponent;
  let fixture: ComponentFixture<DynamicPropertiesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPropertiesPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicPropertiesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
