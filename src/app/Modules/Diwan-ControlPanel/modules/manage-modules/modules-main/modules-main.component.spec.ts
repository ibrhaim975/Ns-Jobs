import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesMainComponent } from './modules-main.component';

describe('ModulesMainComponent', () => {
  let component: ModulesMainComponent;
  let fixture: ComponentFixture<ModulesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
