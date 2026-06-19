import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({

  selector: 'app-edit-employee',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './edit-employee.component.html',

  styleUrls: ['./edit-employee.component.css']

})

export class EditEmployeeComponent implements OnInit {
  successMessage: string = '';

  errorMessage: string = '';

  employee = {

    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
    status: 'Active'
  };

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];

    console.log(id);

    this.authService.getEmployees()
      .subscribe({

        next: (res) => {

          console.log(res);

          const foundEmployee = res.find(
            (x: any) => x.id == id
          );

          if (foundEmployee) {

            this.employee = foundEmployee;

          }

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  updateEmployee() {

    this.authService.updateEmployee(
      this.employee.id,
      this.employee
    ).subscribe({

      next: (res) => {

        console.log(res);

        alert('Failed To Update Employee');

        this.errorMessage = '';

      },

      error: (err) => {

        console.log(err);
        alert('Employee Updated Successfully');
       

        this.successMessage = '';

      }

    });

  }

}
