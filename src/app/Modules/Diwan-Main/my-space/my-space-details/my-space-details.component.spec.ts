import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpaceDetailsComponent } from './my-space-details.component';

describe('MySpaceDetailsComponent', () => {
  let component: MySpaceDetailsComponent;
  let fixture: ComponentFixture<MySpaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpaceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
