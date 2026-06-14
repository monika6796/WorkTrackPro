import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})

export class ForgotPasswordComponent {

  currentStep = 1;

  email: string = '';

  otp: string = '';

  newPassword: string = '';

  successMessage: string = '';

  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // ✅ STEP 1 SEND OTP

  sendOtp() {

    const data = {
      email: this.email
    };

    this.authService
      .sendOtp(data)
      .subscribe({

        next: (res) => {

          this.successMessage =
            'OTP Sent Successfully';

          this.errorMessage = '';

          // ⏳ 2 sec बाद next page
          setTimeout(() => {

            this.currentStep = 2;

            this.successMessage = '';

          }, 2000);

        },

        error: (err) => {

          this.errorMessage =
            'Email Not Found';

          this.successMessage = '';

        }

      });

  }

  // ✅ STEP 2 VERIFY OTP

  verifyOtp() {

    const data = {

      email: this.email,

      otp: this.otp

    };

    this.authService
      .verifyOtp(data)
      .subscribe({

        next: (res) => {

          this.successMessage =
            'OTP Verified Successfully';

          this.errorMessage = '';

          // ⏳ 2 sec बाद next page
          setTimeout(() => {

            this.currentStep = 3;

            this.successMessage = '';

          }, 2000);

        },

        error: (err) => {

          this.errorMessage =
            'Invalid OTP';

          this.successMessage = '';

        }

      });

  }

  // ✅ STEP 3 RESET PASSWORD

  resetPassword() {

    const data = {

      email: this.email,

      newPassword: this.newPassword

    };

    this.authService
      .resetPassword(data)
      .subscribe({

        next: (res) => {

          this.successMessage =
            'Password Reset Successful';

          this.errorMessage = '';

          // ⏳ 3 sec बाद login page
          setTimeout(() => {

            this.router.navigate(['/login']);

          }, 3000);

        },

        error: (err) => {

          this.errorMessage =
            'Something went wrong';

          this.successMessage = '';

        }

      });

  }

}
