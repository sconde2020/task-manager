import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Task } from '../../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    priority: 'LOW',
    dueDate: null,
    done: false,
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString(),
  };

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    });

    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    const mockTasks: Task[] = [mockTask];
    apiServiceSpy.get.and.returnValue(of(mockTasks));

    service.getAllTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('tasks');
  });

  it('should fetch a task by ID', () => {
    apiServiceSpy.get.and.returnValue(of(mockTask));

    service.getTaskById(1).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('tasks/1');
  });

  it('should delete a task by ID', () => {
    apiServiceSpy.delete.and.returnValue(of(undefined));

    service.deleteTask(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    expect(apiServiceSpy.delete).toHaveBeenCalledWith('tasks/1');
  });

  it('should create a new task', () => {
    apiServiceSpy.post.and.returnValue(of(mockTask));

    service.createTask(mockTask).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('tasks', mockTask);
  });

  it('should update a task by ID', () => {
    const updatedTask = { ...mockTask, title: 'Updated Task' };
    apiServiceSpy.put.and.returnValue(of(updatedTask));

    service.updateTask(1, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    expect(apiServiceSpy.put).toHaveBeenCalledWith('tasks/1', updatedTask);
  });
});