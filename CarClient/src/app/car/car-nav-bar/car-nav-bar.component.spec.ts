import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNavBarComponent } from './car-nav-bar.component';

describe('CarNavBarComponent', () => {
  let component: CarNavBarComponent;
  let fixture: ComponentFixture<CarNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
