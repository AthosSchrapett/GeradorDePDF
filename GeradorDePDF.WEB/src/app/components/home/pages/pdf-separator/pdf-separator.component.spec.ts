import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSeparatorComponent } from './pdf-separator.component';

describe('PdfSeparatorComponent', () => {
  let component: PdfSeparatorComponent;
  let fixture: ComponentFixture<PdfSeparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfSeparatorComponent]
    });
    fixture = TestBed.createComponent(PdfSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
