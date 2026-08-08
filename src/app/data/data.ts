import { KanbanColumn } from '../shared/models/kanban.model';

export const COLUMNS_DATA: KanbanColumn[] = [
  {
    id: 'applied',
    title: 'Applied',
    items: [],
    order: 1,
  },
  {
    id: 'hr',
    title: 'HR Interview',
    items: [],
    order: 2,
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    items: [],
    order: 3,
  },
  {
    id: 'additional',
    title: 'Additional',
    items: [],
    order: 4,
  },
  {
    id: 'success',
    title: 'Offer',
    items: [],
    order: 5,
  },
  {
    id: 'fail',
    title: 'Rejected',
    items: [],
    order: 6,
  },
];
