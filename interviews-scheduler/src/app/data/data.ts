import { KanbanColumn } from '../shared/models/kanban.model';

export const COLUMNS_DATA: KanbanColumn[] = [
  {
    id: 'applied',
    title: 'Applied',
    items: [
      { id: 3, title: 'Konfiguracja serwera', tag: { label: 'Dev', type: 'dev' }, assignee: 'PL' },
      { id: 4, title: 'Makiety UX', tag: { label: 'Design', type: 'design' }, assignee: 'AK' },
    ],
  },
  {
    id: 'hr',
    title: 'HR Interview',
    items: [
      { id: 5, title: 'Logowanie OAuth', tag: { label: 'Urgent', type: 'urgent' }, assignee: 'MK' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    items: [
      { id: 6, title: 'Code Review', tag: { label: 'Dev', type: 'dev' }, assignee: 'PL' },
      { id: 7, title: 'Testy E2E', tag: { label: 'QA', type: 'qa' }, assignee: 'AK' },
    ],
  },
  {
    id: 'additional',
    title: 'Additional',
    items: [
      {
        id: 8,
        title: 'Kickoff meeting',
        tag: { label: 'General', type: 'general' },
        assignee: 'ALL',
      },
    ],
  },
  {
    id: 'success',
    title: 'Offer',
    items: [
      {
        id: 8,
        title: 'Kickoff meeting',
        tag: { label: 'General', type: 'general' },
        assignee: 'ALL',
      },
    ],
  },
  {
    id: 'fail',
    title: 'Rejected',
    items: [
      {
        id: 8,
        title: 'Kickoff meeting',
        tag: { label: 'General', type: 'general' },
        assignee: 'ALL',
      },
    ],
  },
];
