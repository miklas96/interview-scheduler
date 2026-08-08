import { Component } from '@angular/core';
import { KanbanTable } from './kanban-table/kanban-table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-kanban-wrapper',
  imports: [KanbanTable, ButtonModule],
  templateUrl: './kanban-wrapper.html',
  styleUrl: './kanban-wrapper.css',
})
export class KanbanWrapper {}
