import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../../core/services/task.service';
import { of } from 'rxjs';
import { Task } from '../../../models/task';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Task A',
      description: 'Desc A',
      priority: 'LOW',
      dueDate: null,
      done: false,
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z'
    },
    {
      id: 2,
      title: 'Task B',
      description: 'Desc B',
      priority: 'MEDIUM',
      dueDate: '2023-01-10T00:00:00Z',
      done: true,
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-04T00:00:00Z'
    },
    {
      id: 3,
      title: 'Task C',
      description: 'Desc C',
      priority: 'HIGH',
      dueDate: '2023-02-01T00:00:00Z',
      done: false,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-06T00:00:00Z'
    }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAllTasks']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ActivatedRoute, useValue: {} }
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

  describe('ngOnInit', () => {
    it('should fetch tasks on init', () => {
      expect(component.tasks.length).toBe(3);
      expect(component.filteredTasks.length).toBeLessThanOrEqual(component.pageSize);
    });
  });

  describe('onSearch', () => {
    it('should filter tasks by search term', () => {
        const event = { target: { value: 'task b' } };
        component.onSearch(event);
        expect(component.filteredTasks.length).toBe(1);
        expect(component.filteredTasks[0].title).toBe('Task B');
    });
  });
 
  describe('applyFilters', () => {
    it('should sort tasks by title', () => {
      component.sortBy = 'title';
      component.applyFilters();
      expect(component.filteredTasks[0].title).toBe('Task A');
    });

    it('should sort tasks by createdAt', () => {
      component.sortBy = 'createdAt';
      component.applyFilters();
      expect(component.filteredTasks[0].title).toBe('Task C');
    });
  });

  describe('onPageSizeChange', () => {
    it('should update page size and reset page', () => {
      const event = { value: 2 };
      component.onPageSizeChange(event);
      expect(component.pageSize).toBe(2);
      expect(component.currentPage).toBe(0);
    });
  });

  describe('onSort', () => {
    it('should set sortBy and call applyFilters()', () => {
      spyOn(component, 'applyFilters'); // Spy on applyFilters method
      const event = { value: 'title' };

      component.onSort(event);

      expect(component.sortBy).toBe('title'); // Verify sortBy is set
      expect(component.applyFilters).toHaveBeenCalled(); // Verify applyFilters is called
    });
  });

  describe('onPreviousPage', () => {
    it('should decrement currentPage and call applyFilters()', () => {
      spyOn(component, 'applyFilters'); // Spy on applyFilters method
      component.currentPage = 1; // Set to second page

      component.onPreviousPage();

      expect(component.currentPage).toBe(0); // Verify currentPage is decremented
      expect(component.applyFilters).toHaveBeenCalled(); // Verify applyFilters is called
    });
    it('should not decrement currentPage if already on the first page', () => {
      spyOn(component, 'applyFilters'); // Spy on applyFilters method
      component.currentPage = 0; // Already on the first page

      component.onPreviousPage();

      expect(component.currentPage).toBe(0); // Verify currentPage remains unchanged
      expect(component.applyFilters).not.toHaveBeenCalled(); // Verify applyFilters is not called
    });
  });

   describe('onNextPage', () => {
    it('should increment currentPage and call applyFilters()', () => {
      spyOn(component, 'applyFilters'); // Spy on applyFilters method
      component.currentPage = 0; // Set to first page
      component.pageSize = 1; // One task per page
      component.tasks = mockTasks;

      component.onNextPage();

      expect(component.currentPage).toBe(1); // Verify currentPage is incremented
      expect(component.applyFilters).toHaveBeenCalled(); // Verify applyFilters is called
    });

    it('should not increment currentPage if already on the last page', () => {
      spyOn(component, 'applyFilters'); // Spy on applyFilters method
      component.pageSize = 1; // One task per page
      component.currentPage = Math.ceil(mockTasks.length / component.pageSize) - 1; // Set to last page
      component.tasks = mockTasks;

      component.onNextPage();

      expect(component.currentPage).toBe(Math.ceil(mockTasks.length / component.pageSize) - 1); // Verify currentPage remains unchanged
      expect(component.applyFilters).not.toHaveBeenCalled(); // Verify applyFilters is not called
    });
  });
});
