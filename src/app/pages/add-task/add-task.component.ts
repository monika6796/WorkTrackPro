import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'], // ✅ fixed
})
export class AddTaskComponent {

  task = {
    id: 0,
    title: '',
    description: '',
    assignedTo: 0,
    status: '',
    Date: ''
  };

  constructor(private router: Router,
    private taskService: TaskService
  ) { } // ✅ ADD

  saveTask() {

    this.taskService.addTask(this.task)
      .subscribe({

        next: (res) => {

          console.log(res);

          alert('Task Added Successfully');

          this.router.navigate(['/app/tasks']);

        },

        error: (err) => {

          console.log(err);

          alert('Failed to Add Task');

        }

      });

  }
}
