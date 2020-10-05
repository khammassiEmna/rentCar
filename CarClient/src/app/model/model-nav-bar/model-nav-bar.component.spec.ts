import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelNavBarComponent } from './model-nav-bar.component';

describe('ModelNavBarComponent', () => {
  let component: ModelNavBarComponent;
  let fixture: ComponentFixture<ModelNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
