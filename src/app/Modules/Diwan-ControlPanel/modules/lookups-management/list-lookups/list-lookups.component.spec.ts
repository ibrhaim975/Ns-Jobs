import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLookupsComponent } from './list-lookups.component';

describe('ListLookupsComponent', () => {
  let component: ListLookupsComponent;
  let fixture: ComponentFixture<ListLookupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLookupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLookupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
