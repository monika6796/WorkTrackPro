import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Employee`;

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  // ✅ Register API
  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ✅ Login API
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ✅ SEND OTP
  sendOtp(data: any) {

    return this.http.post(

      `${this.apiUrl}/send-otp`,
      data,
      { responseType: 'text' }

    );

  }

  // ✅ VERIFY OTP
  verifyOtp(data: any) {

    return this.http.post(

      `${this.apiUrl}/verify-otp`,
      data,
      { responseType: 'text' }

    );

  }

  // ✅ RESET PASSWORD
  resetPassword(data: any) {

    return this.http.put(

      `${this.apiUrl}/reset-password`,
      data,
      { responseType: 'text' }

    );

  }

  // ✅ Token Header
  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ✅ Get Employees
  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  getEmployeeById(id: any) {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );

  }

  // ✅ Update Employee
 
  updateEmployee(id: number, data: any) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      { responseType: 'text' }
    );

  }

  // ✅ Delete Employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }

  // ✅ Save Token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ Get Token
  getToken() {
    return localStorage.getItem('token');
  }

  // ✅ Logout
  logout() {

    localStorage.clear();

  }

  // ✅ Check Login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
