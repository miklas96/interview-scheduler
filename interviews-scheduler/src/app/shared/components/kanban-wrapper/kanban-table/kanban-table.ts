import { Component, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanColumn, Task } from '../../../models/kanban.model';
import { COLUMNS_DATA } from '../../../../data/data';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanItem } from '../kanban-item/kanban-item';

@Component({
  selector: 'app-kanban-table',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanItem],
  templateUrl: './kanban-table.html',
  styleUrls: ['./kanban-table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTable {
  // Inicjalizacja z danych statycznych (fallback)
  columns = signal<KanbanColumn[]>(COLUMNS_DATA);

  constructor() {
    this.loadFromStorage();

    // Rejestrujemy efekt: każde uaktualnienie sygnału 'columns'
    // automatycznie zapisze nowe dane w localStorage.
    effect(() => {
      localStorage.setItem('kanban-board-data', JSON.stringify(this.columns()));
    });
  }

  // Ładowanie danych przy starcie
  private loadFromStorage() {
    const savedData = localStorage.getItem('kanban-board-data');
    if (savedData) {
      try {
        this.columns.set(JSON.parse(savedData));
      } catch (e) {
        console.error('Błąd odczytu localStorage', e);
      }
    }
  }

  // Logika dodawania nowego zadania
  addTask(columnId: string, titleInput: HTMLInputElement) {
    const title = titleInput.value.trim();
    if (!title) return;

    this.columns.update((cols) =>
      cols.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            items: [
              ...col?.items,
              {
                id: Date.now(), // Proste ID oparte na czasie
                title,
                tag: { label: 'General', type: 'general' }, // Domyślny tag
                assignee: 'ME', // Domyślny przypisany
              } as Task,
            ],
          };
        }
        return col;
      })
    );

    // Wyczyść pole po dodaniu
    titleInput.value = '';
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Wymuszamy aktualizację (co odpali też effect zapisu)
    this.columns.update((cols) => [...cols]);
  }
}
