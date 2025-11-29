import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { UserType } from "../types";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState } from "react";
import { TaskListArea } from "../TaskList";
import { IssueListArea } from "../IssuesList";
import TimeLogs from "./Timelogs";
import RecentActivity from "../RecentActivity";
import { Menubar, MenubarMenu, MenubarContent, MenubarTrigger, MenubarCheckboxItem } from "@/components/ui/menubar";
import { ChevronRight } from "lucide-react";

const TEMP_USER_DATA = {
  name: "Abhisek",
  employeeId: "EMP-01",
  role: "Developer",
  team: "Development",

  tasks: [
    {
      id: 1,
      title: "API throws 500 on coverage calculation",
      project: "iCover Workbench",
      date: "22-10-2025",
      overdue: true,
      severity: "critical",
    },
    {
      id: 2,
      title: "Wrong face amount validation for smoker",
      project: "iCover Workbench",
      date: "18-10-2025",
      overdue: true,
      severity: "high",
    },
    {
      id: 3,
      title: "Policy PDF download fails",
      project: "Document Vault",
      date: "14-10-2025",
      overdue: true,
      severity: "medium",
    },
    {
      id: 4,
      title: "UI inconsistencies in Underwriting form",
      project: "iCover Workbench",
      date: "25-10-2025",
      overdue: false,
      severity: "low",
    },
    {
      id: 5,
      title: "Optimize MongoDB aggregation pipeline",
      project: "Cyrus Backend",
      date: "27-10-2025",
      overdue: false,
      severity: "medium",
    },
  ],

  issues: [
    {
      id: 1,
      title: "Face amount slider stuck at 50k",
      project: "iCover Workbench",
      date: "22-10-2025",
      overdue: true,
      severity: "high",
    },
    {
      id: 2,
      title: "Calendar component not loading on first render",
      project: "Workbench Dashboard",
      date: "21-10-2025",
      overdue: true,
      severity: "medium",
    },
    {
      id: 3,
      title: "Admin user permissions mismatch",
      project: "Workspace",
      date: "19-10-2025",
      overdue: false,
      severity: "critical",
    },
    {
      id: 4,
      title: "File upload returns 413 for 10MB files",
      project: "Document Vault",
      date: "25-10-2025",
      overdue: false,
      severity: "high",
    },
    {
      id: 5,
      title: "UI freeze when toggling theme",
      project: "Workspace Frontend",
      date: "26-10-2025",
      overdue: false,
      severity: "low",
    },
  ],

  recent_activity: [
    {
      id: 1,
      action: "Completed task",
      description: "Policy PDF generator refactored for performance",
      project: "Document Vault",
      time: "2025-10-25 14:45",
    },
    {
      id: 2,
      action: "Created issue",
      description: "Underwriter dashboard shows 0 results for valid filters",
      project: "Workbench Dashboard",
      time: "2025-10-24 11:20",
    },
    {
      id: 3,
      action: "Updated task",
      description: "Integrated QuickBooks SDK for transaction sync",
      project: "iCover Workbench",
      time: "2025-10-22 18:05",
    },
    {
      id: 4,
      action: "Commented",
      description: "Provided details on PDF memory leak issue",
      project: "Cyrus Backend",
      time: "2025-10-21 10:12",
    },
    {
      id: 5,
      action: "Reviewed PR",
      description: "Reviewed changes for team management module",
      project: "Workspace",
      time: "2025-10-20 17:45",
    },
  ],

  // Weekly timelog in minutes (Mon-Sun)
  timelogs: [240, 260, 180, 240, 240, 0, 0],
};

export default function UsersInfo({ userId }: { userId: UserType["id"] | null }) {
  const [view, setView] = useState<"Tasks" | "Issues" | "Timelogs" | "Recent Activity">("Tasks");

  if (!userId)
    return (
      <>
        <Card className="pad w-full">
          <CardTitle>Users Info</CardTitle>
          <CardDescription>Select an user.</CardDescription>
        </Card>
      </>
    );

  return (
    <>
      <Card className="pad h-[400px] w-full">
        <CardTitle>Users Info</CardTitle>
        <div className="relative -top-4 flex items-center justify-between">
          <CardDescription className="relative border">
            <div className="absolute -top-4 w-[200px]">
              <span>
                {TEMP_USER_DATA.name} | {TEMP_USER_DATA.employeeId}
              </span>
              <br />
              <span>
                {TEMP_USER_DATA.role} | {TEMP_USER_DATA.team}
              </span>
            </div>
          </CardDescription>
          <ButtonGroup className="hidden">
            <Button
              variant="outline"
              className={"h-8 p-4 text-xs " + (view === "Tasks" ? "bg-blue-500/25!" : "")}
              onClick={() => setView("Tasks")}
            >
              Tasks
            </Button>
            <Button
              variant="outline"
              className={"h-8 p-4 text-xs " + (view === "Issues" ? "bg-blue-500/25!" : "")}
              onClick={() => setView("Issues")}
            >
              Issues
            </Button>
            <Button
              variant="outline"
              className={"h-8 p-4 text-xs " + (view === "Timelogs" ? "bg-blue-500/25!" : "")}
              onClick={() => setView("Timelogs")}
            >
              Timelogs
            </Button>
            <Button
              variant="outline"
              className={"h-8 p-4 text-xs " + (view === "Recent Activity" ? "bg-blue-500/25!" : "")}
              onClick={() => setView("Recent Activity")}
            >
              Recent Activity
            </Button>
          </ButtonGroup>

          <Menubar className="block">
            <MenubarMenu>
              <MenubarTrigger>
                {view} <ChevronRight className="ml-1 h-4 w-4" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked={view === "Tasks"} onClick={() => setView("Tasks")}>
                  Tasks
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked={view === "Issues"} onClick={() => setView("Issues")}>
                  Issues
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked={view === "Timelogs"} onClick={() => setView("Timelogs")}>
                  Timelogs
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked={view === "Recent Activity"} onClick={() => setView("Recent Activity")}>
                  Recent Activity
                </MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        {view === "Tasks" && <TaskListArea tasks={TEMP_USER_DATA.tasks} />}
        {view === "Issues" && <IssueListArea issues={TEMP_USER_DATA.issues} />}
        {view === "Timelogs" && <TimeLogs timelogs={TEMP_USER_DATA.timelogs} />}
        {view === "Recent Activity" && <RecentActivity recentActivity={TEMP_USER_DATA.recent_activity} />}
      </Card>
    </>
  );
}
