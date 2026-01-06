// kanban-board.component.ts
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanColumn, Task } from '../../../models/kanban.model';
import { COLUMNS_DATA } from '../../../../data/data';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanItem } from '../kanban-item/kanban-item';

@Component({
  selector: 'app-kanban-table',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanItem, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './kanban-table.html',
  styleUrls: ['./kanban-table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTable {
  columns = signal<KanbanColumn[]>(COLUMNS_DATA);

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Przeniesienie w ramach tej samej kolumny
      moveItemInArray(
        event.container.data, // Tablica, na której operujemy (Task[])
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Przeniesienie między różnymi kolumnami
      transferArrayItem(
        event.previousContainer.data, // Tablica źródłowa
        event.container.data, // Tablica docelowa
        event.previousIndex,
        event.currentIndex
      );
    }

    // WAŻNE: Wymuszamy aktualizację Signala, aby widok się odświeżył.
    // Ponieważ CDK zmutował tablice wewnątrz obiektów, tworzymy nową referencję do głównej tablicy.
    this.columns.update((cols) => [...cols]);
  }
}
