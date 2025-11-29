'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table';

const MyIssuesList = [
  {
    id: 1,
    title: 'API throws 500 on coverage calculation',
    project: 'iCover Workbench',
    date: '22-10-2025',
    overdue: true,
    severity: 'critical',
  },
  {
    id: 2,
    title: 'Wrong face amount validation for smoker',
    project: 'iCover Workbench',
    date: '18-10-2025',
    overdue: true,
    severity: 'high',
  },
  {
    id: 3,
    title: 'Policy PDF download fails',
    project: 'Document Vault',
    date: '14-10-2025',
    overdue: true,
    severity: 'medium',
  },
];

// Helper → severity badge styles
const SeverityBadge = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'critical':
      return (
        <Badge variant="destructive" className="h-4">
          Critical
        </Badge>
      );
    case 'high':
      return <Badge className="h-4 bg-red-500 text-white">High</Badge>;
    case 'medium':
      return <Badge className="h-4 bg-orange-500 text-white">Medium</Badge>;
    case 'low':
    default:
      return <Badge className="h-4 bg-gray-500 text-white">Low</Badge>;
  }
};

export default function IssueList() {
  return (
    <Card className="pad w-full">
      <CardTitle>My Issues</CardTitle>

      {/* Scroll wrapper */}
      <div className="h-[300px] overflow-y-auto rounded-md border">
        <Table className="m-0 rounded-md p-0">
          <TableBody>
            {MyIssuesList.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold">{issue.title}</span>

                      <span className="flex items-center gap-1 text-xs">
                        {issue.project} | <SeverityBadge severity={issue.severity} />
                      </span>
                    </div>

                    <div className={issue.overdue ? 'font-medium text-red-500' : 'text-muted-foreground'}>{issue.date}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
