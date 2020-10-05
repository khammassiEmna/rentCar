import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserDetailsComponent } from './reser-details.component';

describe('ReserDetailsComponent', () => {
  let component: ReserDetailsComponent;
  let fixture: ComponentFixture<ReserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
