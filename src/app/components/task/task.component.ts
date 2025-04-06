import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    RouterModule 
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => this.tasks = data);
  }

}
