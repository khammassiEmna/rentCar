import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldReservationComponent } from './old-reservation.component';

describe('OldReservationComponent', () => {
  let component: OldReservationComponent;
  let fixture: ComponentFixture<OldReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
