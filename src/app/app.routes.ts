import { Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskNewComponent } from './components/task-new/task-new.component';

export const routes: Routes = [
  
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },

  { path: 'tasks/new', component: TaskNewComponent, canActivate: [AuthGuard] },

  { path: 'tasks/:id/edit', component: TaskNewComponent, canActivate: [AuthGuard] },

  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },

  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]  },

  { path: '**', redirectTo: '/login' },

];
