import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTagsComponent } from './find-tags.component';

describe('FindTagsComponent', () => {
  let component: FindTagsComponent;
  let fixture: ComponentFixture<FindTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
