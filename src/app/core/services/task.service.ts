import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private endpoint = 'tasks';

  constructor(private apiService: ApiService) {}

  getAllTasks(): Observable<any[]> {
    return this.apiService.get<any[]>(this.endpoint);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/${taskId}`);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${taskId}`);
  }
}