import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfGeneratorComponent } from './pdf-generator.component';

describe('PdfGeneratorComponent', () => {
  let component: PdfGeneratorComponent;
  let fixture: ComponentFixture<PdfGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfGeneratorComponent]
    });
    fixture = TestBed.createComponent(PdfGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
