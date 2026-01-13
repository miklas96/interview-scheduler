import {
  Component,
  signal,
  ChangeDetectionStrategy,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetails, KanbanColumn, Task } from '../../../models/kanban.model';
import { COLUMNS_DATA } from '../../../../data/data';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanItem } from '../kanban-item/kanban-item';
import { ButtonModule } from 'primeng/button';
import { KanbanItemDetails } from '../kanban-item-details/kanban-item-details';
import {
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-kanban-table',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanItem, ButtonModule, KanbanItemDetails],
  templateUrl: './kanban-table.html',
  styleUrls: ['./kanban-table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTable {
  showDialog = signal<boolean>(false);
  jobDetails = signal<JobDetails>({} as JobDetails);
  private firestore = inject(Firestore);

  columns: Signal<KanbanColumn[]> = toSignal(
    collectionData(collection(this.firestore, 'columns'), { idField: 'id' }).pipe(
      map((cols: any[]) => {
        return cols.sort((a, b) => a.order - b.order);
      }) // Zakładam, że dodasz pole 'order' w bazie
    ),
    { initialValue: COLUMNS_DATA }
  );
  @ViewChild(KanbanItemDetails) dialog!: KanbanItemDetails;

  openDetails(task: JobDetails) {
    this.dialog.show(task);
  }

  async onSave(updatedItem: JobDetails) {
    const allColumns = this.columns();
    const targetColumn = allColumns.find((col) =>
      col.items.some((item) => {
        console.log(item);
        return item.id === updatedItem.id;
      })
    );

    if (!targetColumn) {
      console.error('Nie znaleziono kolumny dla zadania o ID:', updatedItem.id);
      return;
    }

    // 2. Stwórz nową tablicę items z zaktualizowanym zadaniem
    const newItems = targetColumn.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    // 3. Zapisz zmianę w Firestore
    const colRef = doc(this.firestore, 'columns', targetColumn.id);

    try {
      await updateDoc(colRef, { items: newItems });
    } catch (err) {
      console.error('Błąd podczas zapisu do Firestore:', err);
    }
  }

  /**
   * Dodawanie nowego zadania.
   * W Firebase nie nadpisujemy całej tablicy, tylko aktualizujemy konkretny dokument kolumny.
   */
  async addTask(columnId: string, titleInput: HTMLInputElement) {
    const title = titleInput.value.trim();
    if (!title) return;

    const newTask: JobDetails = {
      id: Date.now(),
      jobName: title,
      offerUrl: '',
      meetingUrl: '',
      salaryMin: 0,
      salaryMax: 0,
      additionalInfo: '',
    };

    this.jobDetails.set(newTask);

    const colRef = doc(this.firestore, 'columns', columnId);

    // updateDoc wysyła zmianę do chmury.
    // arrayUnion dodaje element do tablicy w bazie.
    await updateDoc(colRef, {
      items: arrayUnion(newTask),
    });

    titleInput.value = '';
  }

  async removeItem(columnId: string, taskItem: JobDetails) {
    // 1. Namierzamy konkretną kolumnę w bazie (np. columns/todo)
    const colRef = doc(this.firestore, 'columns', columnId);

    try {
      // 2. Wysyłamy komendę do Firebase: "Usuń ten obiekt z tablicy items"
      await updateDoc(colRef, {
        items: arrayRemove(taskItem),
      });
      console.log('Usunięto z bazy!');
    } catch (err) {
      console.error('Błąd usuwania:', err);
    }
  }

  /**
   * Drag & Drop jest trudniejszy przy Firebase, bo musimy zaktualizować DWA dokumenty
   * (kolumnę źródłową i docelową) oraz zadbać o kolejność.
   * * Dla uproszczenia w tym przykładzie nadpisujemy całe tablice 'items' w dokumentach.
   */
  async onDrop(event: CdkDragDrop<JobDetails[]>) {
    // 1. Wykonaj logikę lokalnie (optymistyczne UI), żeby użytkownik nie czekał
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // Aktualizujemy tę jedną kolumnę w bazie
      const colId = this.getColumnIdByData(event.container.data);
      if (colId) {
        await updateDoc(doc(this.firestore, 'columns', colId), { items: event.container.data });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Aktualizujemy obie kolumny w bazie
      const prevColId = this.getColumnIdByData(event.previousContainer.data);
      const currColId = this.getColumnIdByData(event.container.data);

      if (prevColId && currColId) {
        // Wykonujemy te operacje równolegle
        await Promise.all([
          updateDoc(doc(this.firestore, 'columns', prevColId), {
            items: event.previousContainer.data,
          }),
          updateDoc(doc(this.firestore, 'columns', currColId), { items: event.container.data }),
        ]);
      }
    }
  }

  // Funkcja pomocnicza do znalezienia ID kolumny na podstawie jej tablicy zadań
  // (Wymaga, abyś w HTML przekazywał ID kolumny do cdkDropList, co jest lepszą praktyką)
  private getColumnIdByData(items: JobDetails[]): string | undefined {
    return this.columns().find((c) => c.items === items)?.id;
  }
}
