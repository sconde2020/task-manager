import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { TaskDetailComponent } from './features/task/task-detail/task-detail.component';
import { TaskListComponent } from './features/task/task-list/task-list.component';
import { TaskNewComponent } from './features/task/task-new/task-new.component';


export const routes: Routes = [
  
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },

  { path: 'tasks/new', component: TaskNewComponent, canActivate: [AuthGuard] },

  { path: 'tasks/:id/edit', component: TaskNewComponent, canActivate: [AuthGuard] },

  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];
