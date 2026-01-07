export type ColumnId = 'applied' | 'hr' | 'technical' | 'additional' | 'success' | 'fail';

export interface Task {
  id: number;
  title: string;
  tag: {
    label: string;
    type: 'design' | 'dev' | 'urgent' | 'qa' | 'general';
  };
  assignee: string; // Inicjały
}

export interface KanbanColumn {
  id: ColumnId;
  title: string;
  items: Task[];
}
