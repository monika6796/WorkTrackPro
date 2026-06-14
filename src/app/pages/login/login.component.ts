import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  errorMessage: string = '';
  constructor(private router: Router,
    private authService: AuthService) { }   // ✅ ADD

  login() {

    const loginData = {
      email: this.email,
      password: this.password
    };
    console.log(loginData);
    this.authService.login(loginData).subscribe({

      next: (res) => {

        console.log('Login Success:', res);

        // ✅ Token Save
        this.authService.saveToken(res.token);

        // ✅ Employee Id Save
        localStorage.setItem(
          'employeeId',
          res.employeeId
        );

        // ✅ User Name Save
        localStorage.setItem(
          'employeeName',
          res.name
        );

        // ✅ Profile Image Save
        localStorage.setItem(
          'profileImage',
          res.profileImage
        );

        // ✅ Redirect
        this.router.navigate(
          ['/app/dashboard'],
          { replaceUrl: true }
        );

      },

      error: (err) => {

        console.log(err);

        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}


