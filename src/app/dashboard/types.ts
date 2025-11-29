export interface IssuesType {
  id: number;
  title: string;
  project: string;
  date: string;
  overdue: boolean;
  severity: string;
}

export interface OverviewAndActionsType {
  open_tasks: number;
  closed_tasks: number;
  open_issues: number;
  closed_issues: number;
}

export interface TasksType {
  id: number;
  title: string;
  project: string;
  date: string;
  overdue: boolean;
}

export interface UserType {
  id: number;
  name: string;
  open_tasks: number;
  open_issues: number;
  overdues: {
    task: number;
    issue: number;
  };
}

export interface RecentActivityType {
  id: number;
  action: string;
  description: string;
  project: string;
  time: string;
}
