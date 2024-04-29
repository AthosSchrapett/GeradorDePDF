import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfJoinComponent } from './pdf-join.component';

describe('PdfJoinComponent', () => {
  let component: PdfJoinComponent;
  let fixture: ComponentFixture<PdfJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfJoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
