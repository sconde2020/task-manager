import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskNewComponent } from './task-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { of } from 'rxjs';
import { Task } from '../../../models/task';

const mockEditTask: Task = {
  id: 1,
  title: 'Edit Task',
  description: 'Edit Desc',
  priority: 'HIGH',
  dueDate: '2025-06-10',
  done: false,
  createdAt: '2024-06-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z'
};

const mockNewTask: Task = {
  title: 'New Task',
  description: 'Desc',
  priority: 'LOW',
  dueDate: null,
  done: false,
  createdAt: '2024-06-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z'
};

describe('TaskNewComponent', () => {
  let component: TaskNewComponent;
  let fixture: ComponentFixture<TaskNewComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskById', 'createTask', 'updateTask']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue(null)
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form in create mode', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.value.title).toBe('');
  });

  it('should pre-fill the form in edit mode', fakeAsync(() => {
    activatedRouteStub.snapshot.paramMap.get.and.returnValue('1');
    taskServiceSpy.getTaskById.and.returnValue(of(mockEditTask));
    component.ngOnInit();
    tick();
    expect(component.isEditMode).toBeTrue();
    expect(component.taskId).toBe(1);
    expect(taskServiceSpy.getTaskById).toHaveBeenCalledWith(1);
    expect(component.taskForm.value.title).toBe('Edit Task');
  }));

  it('should call createTask and navigate on submit in create mode', fakeAsync(() => {
    component.taskForm.setValue({
      title: 'New Task',
      description: 'Desc',
      priority: 'LOW',
      dueDate: null
    });
    taskServiceSpy.createTask.and.returnValue(of(mockNewTask));
    component.isEditMode = false;
    component.onSubmit();
    tick();
    expect(taskServiceSpy.createTask).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

  it('should call updateTask and navigate on submit in edit mode', fakeAsync(() => {
    component.taskForm.setValue({
      title: 'Edit Task',
      description: 'Edit Desc',
      priority: 'HIGH',
      dueDate: null
    });
    component.isEditMode = true;
    component.taskId = 2;
    taskServiceSpy.updateTask.and.returnValue(of(mockEditTask));
    component.onSubmit();
    tick();
    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(2, jasmine.any(Object));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

  it('should not submit if form is invalid', () => {
    component.taskForm.setValue({
      title: '',
      description: '',
      priority: 'LOW',
      dueDate: null
    });
    component.onSubmit();
    expect(taskServiceSpy.createTask).not.toHaveBeenCalled();
    expect(taskServiceSpy.updateTask).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /tasks on cancel', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});