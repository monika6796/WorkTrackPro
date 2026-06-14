import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:7185/api/Task';

  constructor(private http: HttpClient) { }

  // ✅ Token Header
  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ✅ Get Tasks
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  // ✅ Add Task
  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, this.getHeaders());
  }

  // ✅ Update Task
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      task,
      this.getHeaders()
    );
  }

  // ✅ Delete Task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }
  getDashboardStats(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/dashboard-stats`,
      this.getHeaders()
    );

  }
  getPerformanceReport(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/performance-report`,
      this.getHeaders()
    );

  }
  getMonths() {

    return this.http.get(
      `${this.apiUrl}/months`,
      this.getHeaders()
    );

  }

  getPerformanceByMonth(month: string) {

    return this.http.get(
      `${this.apiUrl}/performance-by-month/${month}`,
      this.getHeaders()
    );

  }
}
