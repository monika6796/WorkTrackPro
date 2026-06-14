import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  successMessage: string = '';
  errorMessage: string = '';

  employee = {
    name: '',
    email: '',
    password: '',
    role: '',
    status: 'Active'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // ✅ ADD EMPLOYEE
  addEmployee() {

    this.authService.addEmployee(this.employee)
      .subscribe({

        next: (res) => {
          console.log(res);

          this.successMessage = 'Employee Added Successfully';
          this.errorMessage = '';

          alert('Employee Added Successfully');

          // redirect to list page
          this.router.navigate(['/employees']);
        },

        error: (err) => {
          console.log(err);

          this.errorMessage = 'Failed To Add Employee';
          this.successMessage = '';

          alert('Failed To Add Employee');
        }

      });
  }
}
