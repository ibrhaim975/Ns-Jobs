import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardColoredComponent } from './card-colored.component';

describe('CardColoredComponent', () => {
  let component: CardColoredComponent;
  let fixture: ComponentFixture<CardColoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardColoredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardColoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
