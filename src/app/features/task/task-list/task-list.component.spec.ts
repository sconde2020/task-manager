import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskService } from '../../../core/services/task.service';
import { of } from 'rxjs';
import { Task } from '../../../models/task';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Task A',
      description: 'Desc A',
      priority: 'low',
      dueDate: null,
      done: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z'
    },
    {
      id: 2,
      title: 'Task B',
      description: 'Desc B',
      priority: 'medium',
      dueDate: '2023-01-10T00:00:00Z',
      done: true,
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-04T00:00:00Z'
    },
    {
      id: 3,
      title: 'Task C',
      description: 'Desc C',
      priority: 'high',
      dueDate: '2023-02-01T00:00:00Z',
      done: false,
      createdAt: '2023-01-05T00:00:00Z',
      updatedAt: '2023-01-06T00:00:00Z'
    }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAllTasks']);

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(), 
        provideHttpClient(),
        { provide: TaskService, useValue: taskServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore Angular Material and Router elements
    }).compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    taskService.getAllTasks.and.returnValue(of(mockTasks));

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on init', () => {
    expect(component.tasks.length).toBe(3);
    expect(component.filteredTasks.length).toBeLessThanOrEqual(component.pageSize);
  });

  it('should filter tasks by search term', () => {
    const event = { target: { value: 'task b' } };
    component.onSearch(event);
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task B');
  });

  it('should sort tasks by title', () => {
    component.sortBy = 'title';
    component.applyFilters();
    expect(component.filteredTasks[0].title).toBe('Task A');
  });

  it('should sort tasks by createdAt', () => {
    component.sortBy = 'createdAt';
    component.applyFilters();
    expect(component.filteredTasks[0].title).toBe('Task A');
  });

  it('should paginate forward and backward', () => {
    component.pageSize = 1;
    component.filteredTasks = [...mockTasks];
    component.paginate();

    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task A');

    component.onNextPage();
    expect(component.currentPage).toBe(1);
  });

  it('should update page size and reset page', () => {
    const event = { value: 2 };
    component.onPageSizeChange(event);
    expect(component.pageSize).toBe(2);
    expect(component.currentPage).toBe(0);
  });
});
