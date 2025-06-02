import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../models/task';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect

  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];    // displayed tasks after search/sort
  searchTerm: string = '';
  sortBy: string = '';
  currentPage = 0;
  pageSize = 6;
  
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
      this.filteredTasks = this.tasks;
      this.paginate();
    });
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  onSort(event: any): void {
    this.sortBy = event.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let tempTasks = [...this.tasks];
  
    const key = this.sortBy;  

    // Filter
    if (this.searchTerm) {
      tempTasks = tempTasks.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm)
      );
    }
  
    // Sort
    if (key === 'title') {
       tempTasks.sort((a, b) =>
         a.title.localeCompare(b.title)
      );
    }
    else if(key === 'createdAt' || key === 'updatedAt') {
      tempTasks.sort((a, b) => {
        return new Date(a[key]).getTime() - new Date(b[key]).getTime();
      });
    }
  
    // Pagination
    this.filteredTasks = tempTasks;
    this.paginate(); // 👉 after filtering/sorting, apply pagination
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyFilters();
    }
  }
  
  onNextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.tasks.length) {
      this.currentPage++;
      this.applyFilters();
    }
  }
  
  paginate(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.filteredTasks = this.filteredTasks.slice(start, end);
  }
  
  onPageSizeChange(event: any): void {
    this.pageSize = event.value;
    this.currentPage = 0; // Reset to first page when page size changes
    this.applyFilters(); // Update the displayed tasks if needed
  }
}
