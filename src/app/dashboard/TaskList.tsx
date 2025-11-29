'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table';

const MyTaskList = [
  {
    id: 1,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '22-10-2025',
    overdue: true,
  },
  {
    id: 2,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '18-10-2025',
    overdue: true,
  },
  {
    id: 3,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '14-10-2025',
    overdue: true,
  },
  {
    id: 4,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '10-10-2025',
    overdue: false,
  },
  {
    id: 5,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '09-10-2025',
    overdue: false,
  },
  {
    id: 6,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '08-10-2025',
    overdue: false,
  },
  {
    id: 7,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '10-10-2025',
    overdue: false,
  },
  {
    id: 8,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '09-10-2025',
    overdue: false,
  },
  {
    id: 9,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '08-10-2025',
    overdue: false,
  },
  {
    id: 10,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '10-10-2025',
    overdue: false,
  },
  {
    id: 11,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '09-10-2025',
    overdue: false,
  },
  {
    id: 12,
    title: 'Increase the faceamount range',
    project: 'iCover workbench',
    date: '08-10-2025',
    overdue: false,
  },
];

export default function TaskList() {
  return (
    <>
      <Card className="pad w-full">
        <CardTitle>My Tasks</CardTitle>

        {/* Scroll wrapper */}
        <div className="h-[300px] overflow-y-auto rounded-md border">
          <Table className="m-0 rounded-md p-0">
            <TableBody>
              {MyTaskList.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="block font-bold">{task.title}</span>
                        <span className="block text-xs">{task.project}</span>
                      </div>
                      <div className={task.overdue ? 'text-red-500' : ''}>{task.date}</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
