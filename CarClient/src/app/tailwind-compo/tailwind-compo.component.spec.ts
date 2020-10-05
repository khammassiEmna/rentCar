import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindCompoComponent } from './tailwind-compo.component';

describe('TailwindCompoComponent', () => {
  let component: TailwindCompoComponent;
  let fixture: ComponentFixture<TailwindCompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailwindCompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailwindCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
