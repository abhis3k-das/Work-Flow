import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction } from "react";
import { PERMISSION_GROUPS, PermissionKey, SYSTEM_ROLES_DETAILS, SystemRole } from "@/lib/constants/permission";
import { Button } from "@/components/ui/button";

interface RolesAndPermissionType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedRole: SystemRole | null;
  showOnlyGranted: boolean;
  setShowOnlyGranted: Dispatch<SetStateAction<boolean>>;
}

export default function RolesAndPermissionDrawer({ props }: { props: RolesAndPermissionType }) {
  const { open, selectedRole, setOpen, setShowOnlyGranted, showOnlyGranted } = props;
  const selectedPermissions: PermissionKey[] = selectedRole ? SYSTEM_ROLES_DETAILS[selectedRole] : [];
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-0">
        <DrawerHeader className="flex items-center justify-between gap-4 border-b p-4">
          <DrawerTitle className="text-lg">{selectedRole} Permissions</DrawerTitle>

          {/* Top-right toggle: Show only granted */}
          <label className="text-muted-foreground flex items-center gap-2 self-end text-xs">
            <Checkbox checked={showOnlyGranted} onCheckedChange={(val) => setShowOnlyGranted(Boolean(val))} />
            <span>Show only granted</span>
          </label>
        </DrawerHeader>

        <ScrollArea className="h-[450px] px-4 py-4">
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
                      const checked = selectedPermissions.includes(perm.key);

                      return (
                        <div key={perm.key} className="bg-muted/30 flex items-start gap-2 rounded-md border px-3 py-2">
                          <Checkbox checked={checked} disabled />
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}
