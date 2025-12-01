import { Card, CardTitle } from "@/components/ui/card";
import UserSection from "./(user-section)";
import IssuesList from "./IssuesList";
import OverviewAndActions from "./OverviewAndActions";
import TaskList from "./TaskList";
import { IssuesType, RecentActivityType, TasksType, UserType } from "./types";
import RecentActivity from "./RecentActivity";

const MyIssuesList: IssuesType[] = [
  {
    id: 1,
    title: "API throws 500 on coverage calculation",
    project: "iCover Workbench",
    date: "22-10-2025",
    overdue: true,
    severity: "critical",
  },
  {
    id: 2,
    title: "Wrong face amount validation for smoker",
    project: "iCover Workbench",
    date: "18-10-2025",
    overdue: true,
    severity: "high",
  },
  {
    id: 3,
    title: "Policy PDF download fails",
    project: "Document Vault",
    date: "14-10-2025",
    overdue: true,
    severity: "medium",
  },
];

const MyTaskList: TasksType[] = [
  {
    id: 1,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "22-10-2025",
    overdue: true,
  },
  {
    id: 2,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "18-10-2025",
    overdue: true,
  },
  {
    id: 3,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "14-10-2025",
    overdue: true,
  },
  {
    id: 4,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "10-10-2025",
    overdue: false,
  },
  {
    id: 5,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "09-10-2025",
    overdue: false,
  },
  {
    id: 6,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "08-10-2025",
    overdue: false,
  },
  {
    id: 7,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "10-10-2025",
    overdue: false,
  },
  {
    id: 8,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "09-10-2025",
    overdue: false,
  },
  {
    id: 9,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "08-10-2025",
    overdue: false,
  },
  {
    id: 10,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "10-10-2025",
    overdue: false,
  },
  {
    id: 11,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "09-10-2025",
    overdue: false,
  },
  {
    id: 12,
    title: "Increase the faceamount range",
    project: "iCover workbench",
    date: "08-10-2025",
    overdue: false,
  },
];

const UsersList: UserType[] = [
  {
    id: 1,
    name: "Abhisek Das",
    open_tasks: 18,
    open_issues: 7,
    overdues: {
      task: 3,
      issue: 2,
    },
  },
  {
    id: 2,
    name: "Employee 2",
    open_tasks: 18,
    open_issues: 7,
    overdues: {
      task: 3,
      issue: 2,
    },
  },
  {
    id: 3,
    name: "Employee 3",
    open_tasks: 18,
    open_issues: 7,
    overdues: {
      task: 3,
      issue: 2,
    },
  },
];

const RecentActivityList: RecentActivityType[] = [
  {
    id: 1,
    action: "Completed task",
    description: "Policy PDF generator refactored for performance",
    project: "Document Vault",
    time: "2025-10-25 14:45",
  },
  {
    id: 2,
    action: "Created issue",
    description: "Underwriter dashboard shows 0 results for valid filters",
    project: "Workbench Dashboard",
    time: "2025-10-24 11:20",
  },
  {
    id: 3,
    action: "Updated task",
    description: "Integrated QuickBooks SDK for transaction sync",
    project: "iCover Workbench",
    time: "2025-10-22 18:05",
  },
  {
    id: 4,
    action: "Commented",
    description: "Provided details on PDF memory leak issue",
    project: "Cyrus Backend",
    time: "2025-10-21 10:12",
  },
  {
    id: 5,
    action: "Reviewed PR",
    description: "Reviewed changes for team management module",
    project: "Workspace",
    time: "2025-10-20 17:45",
  },
  {
    id: 6,
    action: "Reviewed PR",
    description: "Reviewed changes for team management module",
    project: "Workspace",
    time: "2025-10-20 17:45",
  },
  {
    id: 7,
    action: "Reviewed PR",
    description: "Reviewed changes for team management module",
    project: "Workspace",
    time: "2025-10-20 17:45",
  },
  {
    id: 8,
    action: "Reviewed PR",
    description: "Reviewed changes for team management module",
    project: "Workspace",
    time: "2025-10-20 17:45",
  },
];
export default function Page() {
  return (
    <div className="flex w-full flex-col gap-6 overflow-y-auto">
      <OverviewAndActions open_issues={4} closed_issues={19} open_tasks={12} closed_tasks={48} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskList tasks={MyTaskList} />
        <IssuesList issues={MyIssuesList} />
      </div>
      <UserSection users={UsersList} />
      <Card className="pad">
        <CardTitle>Recent Activity</CardTitle>
        <RecentActivity recentActivity={RecentActivityList} />
      </Card>
    </div>
  );
}
