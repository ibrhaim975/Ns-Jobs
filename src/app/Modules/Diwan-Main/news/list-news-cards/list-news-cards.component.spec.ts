import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewsCardsComponent } from './list-news-cards.component';

describe('ListNewsCardsComponent', () => {
  let component: ListNewsCardsComponent;
  let fixture: ComponentFixture<ListNewsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewsCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNewsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
