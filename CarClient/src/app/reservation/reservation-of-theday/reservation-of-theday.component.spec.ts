import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationOfThedayComponent } from './reservation-of-theday.component';

describe('ReservationOfThedayComponent', () => {
  let component: ReservationOfThedayComponent;
  let fixture: ComponentFixture<ReservationOfThedayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationOfThedayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationOfThedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
