import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/kanban-wrapper/kanban-wrapper').then((m) => m.KanbanWrapper),
  },
];
