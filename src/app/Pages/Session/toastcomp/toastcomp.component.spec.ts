import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastcompComponent } from './toastcomp.component';

describe('ToastcompComponent', () => {
  let component: ToastcompComponent;
  let fixture: ComponentFixture<ToastcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
