import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { PerformanceReportComponent } from './performance-report/performance-report.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
// 🔥 ADD THESE IMPORTS
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';

export const routes: Routes = [

  // 🔐 Auth Pages (NO SIDEBAR)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // 🧑‍💻 Main Layout (WITH SIDEBAR)
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent },

      // 🔥 TASK ROUTES (YAHAN HONE CHAHIYE)
      { path: 'add-task', component: AddTaskComponent },
      { path: 'edit-task/:id', component: EditTaskComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'performance-report', component: PerformanceReportComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'edit-employee/:id', component: EditEmployeeComponent }
    ]
  }
];
