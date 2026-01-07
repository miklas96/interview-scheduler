import { Component } from '@angular/core';
import { KanbanTable } from './kanban-table/kanban-table';

@Component({
  selector: 'app-kanban-wrapper',
  imports: [KanbanTable],
  templateUrl: './kanban-wrapper.html',
  styleUrl: './kanban-wrapper.css',
})
export class KanbanWrapper {}
