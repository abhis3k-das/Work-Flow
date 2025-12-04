import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PERMISSION_GROUPS, PermissionKey } from "@/lib/constants/permission";
import { Dispatch, SetStateAction, useState } from "react";

export default function CustomRoleForm({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [showOnlyGranted, setShowOnlyGranted] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionKey[]>([]);

  const updateNewPrem = (val: boolean, key: PermissionKey) => {
    if (!val) {
      const updatedList = selectedPermissions.filter((el) => el !== key);
      setSelectedPermissions(updatedList);
    } else {
      setSelectedPermissions((prev) => [...prev, key]);
    }
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="pb-10">
        <DrawerHeader className="flex items-center justify-between gap-4 border-b p-4">
          <DrawerTitle className="text-lg">Custom Role & Permissions Form</DrawerTitle>

          {/* Top-right toggle: Show only granted */}
          <label className="text-muted-foreground flex items-center gap-2 self-end text-xs">
            <Checkbox checked={showOnlyGranted} onCheckedChange={(val) => setShowOnlyGranted(Boolean(val))} />
            <span>Show only granted</span>
          </label>
        </DrawerHeader>

        <ScrollArea className="h-[420px] px-4 py-4">
          <div className="space-y-6">
            {PERMISSION_GROUPS.map((group) => {
              // Filter permissions in this group if "show only granted" is ON
              const groupPerms = group.permissions.filter((perm) => {
                const granted = selectedPermissions.includes(perm.key);
                return showOnlyGranted ? granted : true;
              });

              if (groupPerms.length === 0) {
                // When filter is on and this group has no granted perms → skip
                return null;
              }

              return (
                <div key={group.module}>
                  <h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">{group.label}</h3>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {groupPerms.map((perm) => {
                      return (
                        <div key={perm.key} className="bg-muted/30 flex items-start gap-2 rounded-md border px-3 py-2">
                          <Checkbox onCheckedChange={(val) => updateNewPrem(Boolean(val), perm.key)} />
                          <div className="text-xs">
                            <div className="font-medium">{perm.label}</div>
                            <div className="text-muted-foreground text-[10px]">{perm.key}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex justify-end border-t p-4">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <Button className="ml-2 bg-blue-500 text-white hover:bg-blue-600">Submit</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
