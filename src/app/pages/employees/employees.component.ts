import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-employees',

  standalone: true,

  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './employees.component.html',

  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  employees: any[] = [];
  searchText: string = '';
  allEmployees: any[] = [];
  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.getEmployees();

  }

  // ✅ GET EMPLOYEES

  getEmployees() {

    this.authService.getEmployees()
      .subscribe({

        next: (res) => {

          console.log(res);
          this.allEmployees = res;
          this.employees = res;
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ✅ DELETE EMPLOYEE

  deleteEmployee(id: number) {

    if (confirm('Delete Employee?')) {

      this.authService.deleteEmployee(id)
        .subscribe({

          next: (res) => {

            console.log(res);

            alert('Employee Deleted');

            this.getEmployees();

          },

          error: (err) => {

            console.log(err);

          }

        });

    }

  }
  applyFilter() {

    const text = this.searchText.toLowerCase().trim();

    if (!text) {
      this.employees = this.allEmployees;
      return;
    }

    this.employees = this.allEmployees.filter(emp => {

      return (
        emp.name?.toLowerCase().includes(text) ||
        emp.email?.toLowerCase().includes(text) ||
        emp.role?.toLowerCase().includes(text)
      );

    });

  }
}
