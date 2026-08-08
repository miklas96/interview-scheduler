import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { JobDetails } from '../../../models/kanban.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-item',
  imports: [CommonModule],
  templateUrl: './kanban-item.html',
  styleUrl: './kanban-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItem {
  item = input.required<JobDetails>();
  delete = output<void>();

  onDelete(event: Event) {
    event.stopPropagation(); // Ważne! Żeby nie otwierać dialogu edycji przy usuwaniu
    this.delete.emit();
  }
}
