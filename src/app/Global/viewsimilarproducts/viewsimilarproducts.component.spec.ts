import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsimilarproductsComponent } from './viewsimilarproducts.component';

describe('ViewsimilarproductsComponent', () => {
  let component: ViewsimilarproductsComponent;
  let fixture: ComponentFixture<ViewsimilarproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsimilarproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsimilarproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
