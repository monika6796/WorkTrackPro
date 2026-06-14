import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 👈 ADD
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule], // 👈 better use this
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  status: 'Active' | 'Inactive' = 'Active'  ;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private router: Router, 
  private authService: AuthService) { }   // ✅ ADD
  register() {

    const userData = {

      name: this.name,

      email: this.email,

      password: this.password,

      role: this.role || 'Employee',

      status: this.status

    };

    console.log(userData);

    this.authService.register(userData).subscribe({

      next: (res) => {

        console.log('Register Success:', res);

        this.successMessage =
          'Account created successfully';

        this.errorMessage = '';
        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);
        // ✅ Optional: form clear
        this.name = '';
        this.email = '';
        this.password = '';
        this.role = '';
      },

      error: (err) => {

        console.log(err);

        this.errorMessage =
          'Email already exists';

        this.successMessage = '';
      }

    });

  }
}
