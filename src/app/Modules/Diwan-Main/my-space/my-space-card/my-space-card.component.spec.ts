import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpaceCardComponent } from './my-space-card.component';

describe('MySpaceCardComponent', () => {
  let component: MySpaceCardComponent;
  let fixture: ComponentFixture<MySpaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpaceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
