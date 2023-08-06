import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCombineComponent } from './pdf-combine.component';

describe('PdfCombineComponent', () => {
  let component: PdfCombineComponent;
  let fixture: ComponentFixture<PdfCombineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfCombineComponent]
    });
    fixture = TestBed.createComponent(PdfCombineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
