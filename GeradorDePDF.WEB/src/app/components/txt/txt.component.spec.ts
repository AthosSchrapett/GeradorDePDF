import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtComponent } from './txt.component';

describe('TxtComponent', () => {
  let component: TxtComponent;
  let fixture: ComponentFixture<TxtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TxtComponent]
    });
    fixture = TestBed.createComponent(TxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
