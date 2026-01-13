export type ColumnId = 'applied' | 'hr' | 'technical' | 'additional' | 'success' | 'fail';

export interface Task {
  id: number;
  title: string;
  tag: {
    label: string | null;
    type: 'design' | 'dev' | 'urgent' | 'qa' | 'general' | null;
  } | null;
  assignee: string; // Inicjały
}

export interface JobDetails {
  id: number;
  jobName: string;
  offerUrl: string;
  meetingUrl: string;
  salaryMin: number;
  salaryMax: number;
  additionalInfo?: string;
  salaryPeriod?: string;
}

export interface KanbanColumn {
  id: ColumnId;
  title: string;
  items: JobDetails[];
  order: number;
}
