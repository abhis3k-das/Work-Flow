"use client";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { InviteForm } from "@/features/users/invite/components/invitation-form";
import type { Invitation } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface InviteClientProps {
  workspaceId: string;
  initialInvites: Invitation[];
}

export default function InviteClient({ workspaceId, initialInvites }: InviteClientProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex justify-between">
        <PageTitle title="Invite People" subTitle="Add teammates to your workspace and configure their access." />
        <SheetTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            Invite
          </Button>
        </SheetTrigger>
      </div>

      <Card className="mt-4 h-[500px] w-full overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="text-center">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell className="text-center">Role</TableCell>
              <TableCell className="text-center">Invited By</TableCell>
              <TableCell className="text-center">Expiry Date</TableCell>
              <TableCell className="text-center">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialInvites.map((el, index) => (
              <TableRow key={el.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell className="text-center">{el.role}</TableCell>
                <TableCell className="text-center">{el.invitedBy}</TableCell>
                <TableCell className="text-center">{el.expiresAt?.toDateString() ?? "-"}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <Trash2 className="h-4 w-4 cursor-pointer text-red-500" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invite Form</SheetTitle>
          <SheetDescription>Fill the details to invite.</SheetDescription>
          <InviteForm workspaceId={workspaceId} setOpen={setOpen} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
