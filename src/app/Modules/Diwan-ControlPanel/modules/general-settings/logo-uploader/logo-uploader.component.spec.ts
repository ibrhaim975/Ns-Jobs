import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoUploaderComponent } from './logo-uploader.component';

describe('LogoUploaderComponent', () => {
  let component: LogoUploaderComponent;
  let fixture: ComponentFixture<LogoUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
