import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReportComponent } from './performance-report.component';

describe('PerformenceReportComponent', () => {
  let component: PerformanceReportComponent;
  let fixture: ComponentFixture<PerformanceReportComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceReportComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
