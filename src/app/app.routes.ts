import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { TaskDetailComponent } from './features/task-detail/task-detail.component';
import { TaskNewComponent } from './features/task-new/task-new.component';
import { TaskComponent } from './features/task/task.component';


export const routes: Routes = [
  
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },

  { path: 'tasks/new', component: TaskNewComponent, canActivate: [AuthGuard] },

  { path: 'tasks/:id/edit', component: TaskNewComponent, canActivate: [AuthGuard] },

  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '/login' },

];
