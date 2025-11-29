import { RecentActivityType } from "./types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function RecentActivity({ recentActivity }: { recentActivity: RecentActivityType[] }) {
  return (
    <>
      <div className="h-[300px] overflow-y-auto rounded-md border">
        <Table>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="pl-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold">{activity.description}</span>

                      <span className="flex items-center gap-1 text-xs">
                        {activity.project} | {activity.action}
                      </span>
                    </div>

                    <div className="font-medium">{activity.time}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
