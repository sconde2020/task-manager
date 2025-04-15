import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private endpoint = 'tasks';

  constructor(private apiService: ApiService) {}

  getAllTasks(): Observable<Task[]> {
    return this.apiService.get<Task[]>(this.endpoint);
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.apiService.get<Task>(`${this.endpoint}/${taskId}`);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${taskId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.apiService.post<Task>(this.endpoint, task);
  }

  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.apiService.put<Task>(`${this.endpoint}/${taskId}`, task);
  }
}