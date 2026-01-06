import { Component, input, OnInit } from '@angular/core';
import { Task } from '../../../models/kanban.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-item',
  imports: [CommonModule],
  templateUrl: './kanban-item.html',
  styleUrl: './kanban-item.css',
})
export class KanbanItem implements OnInit {
  item = input.required<Task>();

  ngOnInit(): void {
    console.log('KanbanItem initialized with item:', this.item());
  }
}
