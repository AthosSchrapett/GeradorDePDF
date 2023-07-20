import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSplitComponent } from './pdf-split.component';

describe('PdfSplitComponent', () => {
  let component: PdfSplitComponent;
  let fixture: ComponentFixture<PdfSplitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfSplitComponent]
    });
    fixture = TestBed.createComponent(PdfSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
