import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { TaskService } from '../services/task.service';

import { Chart } from 'chart.js/auto';

import {
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit, OnDestroy {

  // ✅ Dashboard Stats
  totalTasks: number = 0;

  completedTasks: number = 0;

  pendingTasks: number = 0;

  performance: number = 0;

  // ✅ Recent Tasks
  recentTasks: any[] = [];

  chartData: any[] = [];
  constructor(
    private router: Router,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // ✅ Check Login
    const token = localStorage.getItem('token');

    if (!token) {

      this.router.navigate(['/login']);

      return;

    }

    // ✅ Load Dashboard Data
    this.loadDashboardStats();

  }

  // ✅ Load Dashboard API Data
  loadDashboardStats(): void {

    this.taskService
      .getDashboardStats()
      .subscribe({

        next: (res) => {

          console.log('Dashboard Data:', res);

          // ✅ Cards Data
          this.totalTasks =
            res.totalTasks;

          this.completedTasks =
            res.completedTasks;

          this.pendingTasks =
            res.pendingTasks;

          this.performance =
            res.performance;

          // ✅ Recent Tasks
          this.recentTasks =
            res.recentTasks;

          // ✅ Graph Data
          this.chartData =
            res.monthlyData;
          console.log(this.chartData);
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(
            'Dashboard Error:',
            err
          );

        }

      });

  }
  ngOnDestroy(): void {

  }
}
