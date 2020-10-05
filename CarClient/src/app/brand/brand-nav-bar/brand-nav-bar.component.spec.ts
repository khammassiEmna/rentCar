import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandNavBarComponent } from './brand-nav-bar.component';

describe('BrandNavBarComponent', () => {
  let component: BrandNavBarComponent;
  let fixture: ComponentFixture<BrandNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
