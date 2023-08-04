import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContorlPanalHomeComponent } from './contorl-panal-home.component';

describe('ContorlPanalHomeComponent', () => {
  let component: ContorlPanalHomeComponent;
  let fixture: ComponentFixture<ContorlPanalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContorlPanalHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContorlPanalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
