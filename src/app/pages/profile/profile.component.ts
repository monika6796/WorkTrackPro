import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEdit = false;

  profile = {

    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    status: '',
    username: '',
    joinDate: '',
    profileImage: ''
  };
  constructor(
    private authService: AuthService
  ) { }
  password = {
    new: '',
    confirm: ''
  };

  ngOnInit(): void {

    const id = localStorage.getItem('employeeId');

    this.authService
      .getEmployeeById(id)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.profile = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }


  updateProfile() {

    this.authService.updateEmployee(
      this.profile.id,
      this.profile
    ).subscribe({

      next: (res) => {

        alert('Profile Updated');

        this.isEdit = false;

      },

      error: (err) => {

        alert('Failed To Update');

      }

    });

  }

  toggleEdit() {

    if (this.isEdit) {

      this.updateProfile();

    }

    this.isEdit = !this.isEdit;

  }

  changePassword() {
    if (this.password.new !== this.password.confirm) {
      alert('Passwords do not match!');
      return;
    }
    this.profile.password = this.password.new; // password update
    this.updateProfile(); // save password too
    this.password.new = '';
    this.password.confirm = '';
  }
}
