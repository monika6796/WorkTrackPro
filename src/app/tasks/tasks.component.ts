import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../services/task.service';
import { OnInit } from '@angular/core';
import {
  ChangeDetectorRef
} from '@angular/core';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];

  errorMessage: string = '';

  constructor(private router: Router,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  // GET TASK

  getTasks() {

    this.taskService.getTasks().subscribe({

      next: (res) => {

        console.log(res);

        this.tasks = res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

        this.errorMessage =
          'Failed to load tasks';
      }

    });

  }
  ngOnInit(): void {

    this.getTasks();

  }

  goToAddTask() {

    this.router.navigate(['/app/add-task']);

  }

  editTask(id: number) {

    this.router.navigate(['/app/edit-task', id]);

  }


  // DELETE TASK

  deleteTask(id: number) {

    if (confirm('Are you sure?')) {

      this.taskService.deleteTask(id).subscribe({

        next: (res) => {

          console.log(res);

          // Refresh tasks
          this.getTasks();

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

  }
}
