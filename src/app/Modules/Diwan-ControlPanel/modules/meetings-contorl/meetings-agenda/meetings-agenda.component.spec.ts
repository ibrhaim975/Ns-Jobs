import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsAgendaComponent } from './meetings-agenda.component';

describe('MeetingsAgendaComponent', () => {
  let component: MeetingsAgendaComponent;
  let fixture: ComponentFixture<MeetingsAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
