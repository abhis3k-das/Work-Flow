import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { TasksType } from "./types";

export function TaskListArea({ tasks }: { tasks: TasksType[] }) {
  return (
    <div className="h-[300px] overflow-y-auto rounded-md border">
      <Table>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="pl-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="block font-bold">{task.title}</span>
                    <span className="block text-xs">{task.project}</span>
                  </div>
                  <div className={task.overdue ? "text-red-500" : ""}>{task.date}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default function TaskList({ tasks }: { tasks: TasksType[] }) {
  return (
    <>
      <Card className="pad w-full">
        <CardTitle>My Tasks</CardTitle>
        <TaskListArea tasks={tasks} />
      </Card>
    </>
  );
}
