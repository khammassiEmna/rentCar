import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistCarComponent } from './adminlist-car.component';

describe('AdminlistCarComponent', () => {
  let component: AdminlistCarComponent;
  let fixture: ComponentFixture<AdminlistCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlistCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
