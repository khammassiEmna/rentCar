import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOfTheDayComponent } from './return-of-the-day.component';

describe('ReturnOfTheDayComponent', () => {
  let component: ReturnOfTheDayComponent;
  let fixture: ComponentFixture<ReturnOfTheDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnOfTheDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
