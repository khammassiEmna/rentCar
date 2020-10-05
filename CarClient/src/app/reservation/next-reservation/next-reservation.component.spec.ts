import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextReservationComponent } from './next-reservation.component';

describe('NextReservationComponent', () => {
  let component: NextReservationComponent;
  let fixture: ComponentFixture<NextReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
