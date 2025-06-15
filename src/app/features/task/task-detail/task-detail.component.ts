import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  task!: Task;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private taskService: TaskService) 
    {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(taskId).subscribe(task => {
      this.task = task;
    });
  }
  
  deleteTask(taskId: number | undefined): void {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;
  
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Delete failed:', error);
      }
  });
  }
  
}
