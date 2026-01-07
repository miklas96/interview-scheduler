import { Component, input } from '@angular/core';
import { Task } from '../../../models/kanban.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-item',
  imports: [CommonModule],
  templateUrl: './kanban-item.html',
  styleUrl: './kanban-item.css',
})
export class KanbanItem {
  item = input.required<Task>();
}
