import IssuesList from './IssuesList';
import OverviewAndActions from './OverviewAndActions';
import TaskList from './TaskList';

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-6">
      <OverviewAndActions />
      <div className="flex w-full items-center justify-between gap-4">
        <TaskList />
        <IssuesList />
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
