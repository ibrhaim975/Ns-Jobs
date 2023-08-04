import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKeywordsListComponent } from './new-keywords-list.component';

describe('NewKeywordsListComponent', () => {
  let component: NewKeywordsListComponent;
  let fixture: ComponentFixture<NewKeywordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKeywordsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewKeywordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
