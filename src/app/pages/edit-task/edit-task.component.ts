import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'], // ✅ fixed
})
export class EditTaskComponent {

  task = {
    id: 0,
    title: '',
    description: '',
    assignedTo: 0,
    status: '',
    Date: ''
  };

  constructor(
    private route: ActivatedRoute, // ✅ ADD
    private router: Router      ,   // ✅ ADD
    private taskService: TaskService // ✅ ADD
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];

    this.taskService.getTasks()
      .subscribe({

        next: (res) => {

          const foundTask = res.find(
            (x: any) => x.id == id
          );

          if (foundTask) {

            this.task = foundTask;
          }

        }

      });

  }

  updateTask() {

    this.taskService.updateTask(
      this.task.id,
      this.task
    ).subscribe({

      next: (res) => {

        console.log(res);

        alert('Task Updated Successfully');

        this.router.navigate(['/app/tasks']);
      },

      error: (err) => {

        console.log(err);

        alert('Failed to Update');

      }

    });

  }
}
