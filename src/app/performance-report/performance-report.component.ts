import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Chart } from 'chart.js/auto';

import { TaskService }
  from '../services/task.service';

@Component({
  selector: 'app-performance-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl:
    './performance-report.component.html',

  styleUrls:
    ['./performance-report.component.css'],
})

export class PerformanceReportComponent
  implements OnInit, OnDestroy{

  chart: any;

  totalTasks = 0;

  completedTasks = 0;

  pendingTasks = 0;

  performance = 0;

  selectedMonth: string = 'May';

  months: string[] = [];

  labels: string[] = [];

  completedData: number[] = [];

  pendingData: number[] = [];

  chartData: any[] = [];

  metrics: any[] = [];

  performanceScore = 0;
  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  // ================= LOAD MONTHS =================

  loadMonths() {

    this.taskService
      .getMonths()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.months = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ================= SELECT MONTH =================

  selectMonth(month: string) {

    this.selectedMonth = month;

    this.loadPerformanceData(month);

  }

  // ================= LOAD PERFORMANCE =================

  loadPerformanceData(month: string) {

    this.taskService
      .getPerformanceByMonth(month)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.totalTasks =
            res.totalTasks;

          this.completedTasks =
            res.completedTasks;

          this.pendingTasks =
            res.pendingTasks;

          this.performance =
            res.performance;

          this.labels =
            res.monthlyData.map(
              (x: any) =>
                'Week ' + x.week
            );

          this.completedData =
            res.monthlyData.map(
              (x: any) =>
                x.completed
            );

          this.pendingData =
            res.monthlyData.map(
              (x: any) =>
                x.pending
            );

          this.createChart();

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  ngOnInit(): void {

    this.loadReport();
    this.loadMonths();

    this.loadPerformanceData(this.selectedMonth);
  }
  loadReport() {

    this.taskService
      .getPerformanceReport()
      .subscribe({

        next: (res) => {

          console.log(res);

          this.totalTasks =
            res.totalTasks;

          this.completedTasks =
            res.completedTasks;

          this.pendingTasks =
            res.pendingTasks;

          this.performance =
            res.performance;

          this.labels =
            res.monthlyData.map(
              (x: any) =>
                'Month ' + x.month
            );

          this.completedData =
            res.monthlyData.map(
              (x: any) =>
                x.completed
            );

          this.pendingData =
            res.monthlyData.map(
              (x: any) =>
                x.pending
            );

          this.createChart();

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  createChart() {
    if (this.chart) {

      this.chart.destroy();

    }
    const ctx =
      document.getElementById(
        'lineChart'
      ) as HTMLCanvasElement;

    this.chart = new Chart(ctx, {

      type: 'line',

      data: {

        labels: this.labels,

        datasets: [

          {
            label: 'Completed',

            data: this.completedData,

            borderColor: '#4e73df',

            backgroundColor:
              'rgba(78,115,223,0.2)',

            fill: true,

            tension: 0.4
          },

          {
            label: 'Pending',

            data: this.pendingData,

            borderColor: '#22c55e',

            backgroundColor:
              'rgba(34,197,94,0.2)',

            fill: true,

            tension: 0.4
          }

        ]
      },

      options: {

        responsive: true,

        maintainAspectRatio: false

      }

    });

  }
  ngOnDestroy(): void {

    if (this.chart) {

      this.chart.destroy();

    }

  }
}
