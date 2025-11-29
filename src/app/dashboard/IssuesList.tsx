import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { IssuesType } from "./types";

const SeverityBadge = ({ severity }: { severity: string }) => {
  switch (severity) {
    case "critical":
      return (
        <Badge variant="destructive" className="h-4">
          Critical
        </Badge>
      );
    case "high":
      return <Badge className="h-4 bg-red-500 text-white">High</Badge>;
    case "medium":
      return <Badge className="h-4 bg-orange-500 text-white">Medium</Badge>;
    case "low":
    default:
      return <Badge className="h-4 bg-gray-500 text-white">Low</Badge>;
  }
};

export function IssueListArea({ issues }: { issues: IssuesType[] }) {
  return (
    <div className="h-[300px] overflow-y-auto rounded-md border">
      <Table>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="pl-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold">{issue.title}</span>

                    <span className="flex items-center gap-1 text-xs">
                      {issue.project} | <SeverityBadge severity={issue.severity} />
                    </span>
                  </div>

                  <div className={issue.overdue ? "font-medium text-red-500" : "text-muted-foreground"}>{issue.date}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function IssueList({ issues }: { issues: IssuesType[] }) {
  return (
    <Card className="pad w-full">
      <CardTitle>My Issues</CardTitle>
      <IssueListArea issues={issues} />
    </Card>
  );
}
