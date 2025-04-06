import { Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TaskGuard } from './core/guards/task.guard';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

export const routes: Routes = [
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [TaskGuard]  },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '/login' },
];
