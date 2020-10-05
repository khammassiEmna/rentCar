import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResrvationNavBarComponent } from './resrvation-nav-bar.component';

describe('ResrvationNavBarComponent', () => {
  let component: ResrvationNavBarComponent;
  let fixture: ComponentFixture<ResrvationNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResrvationNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResrvationNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
