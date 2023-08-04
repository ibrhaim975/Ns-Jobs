import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsAttributesComponent } from './meetings-attributes.component';

describe('MeetingsAttributesComponent', () => {
  let component: MeetingsAttributesComponent;
  let fixture: ComponentFixture<MeetingsAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
