import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import {  of, throwError } from 'rxjs';
import { Task } from '../../../models/task';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  const mockTask: Task = {
    id: 1, 
    title: 'Test Task', 
    done: false, 
    createdAt: (new Date()).toDateString(), 
    updatedAt: (new Date()).toDateString(),
    description: '',
    priority: 'LOW',
    dueDate: null
  };

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskById', 'deleteTask']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task on init', () => {
    taskServiceSpy.getTaskById.and.returnValue(of(mockTask));
    component.ngOnInit();
    expect(taskServiceSpy.getTaskById).toHaveBeenCalledWith(1);
    expect(component.task).toEqual(mockTask);
  });

  it('should call deleteTask and navigate on success', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    taskServiceSpy.deleteTask.and.returnValue(of(undefined));
    component.deleteTask(1); 
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(1);
    tick(); 
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

  it('should not call deleteTask if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteTask(1);
    expect(taskServiceSpy.deleteTask).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should log error on deleteTask failure', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(console, 'error');
    taskServiceSpy.deleteTask.and.returnValue(throwError(() => new Error('fail')));
    component.deleteTask(1);
    expect(console.error).toHaveBeenCalledWith('Delete failed:', jasmine.any(Error));
  });
});