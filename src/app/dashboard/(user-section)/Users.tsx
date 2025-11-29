import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import { UserType } from "../types";

interface UserProps {
  users: UserType[];
  setSelectedUserId: (user: UserType["id"]) => void;
  selectedUserId: UserType["id"] | null;
}
export default function Users({ users, setSelectedUserId, selectedUserId }: UserProps) {
  return (
    <>
      <Card className="pad h-[400px] w-full">
        <CardTitle>Users</CardTitle>
        <div className="h-full overflow-y-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] p-4">Name</TableHead>
                <TableHead className="text-center">Open Task</TableHead>
                <TableHead className="text-center">Open Issues</TableHead>
                <TableHead className="text-center">
                  <span>Overdues</span>
                  <br />
                  <span className="text-muted-foreground text-xs">(Task/Issue)</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  style={{ backgroundColor: selectedUserId === user.id ? "rgba(59, 130, 246, 0.25)" : "" }}
                >
                  <TableCell className="pl-4">{user.name}</TableCell>
                  <TableCell className="text-center">{user.open_tasks}</TableCell>
                  <TableCell className="text-center">{user.open_issues}</TableCell>
                  <TableCell className="text-center">
                    {user.overdues.task} / {user.overdues.issue}
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
