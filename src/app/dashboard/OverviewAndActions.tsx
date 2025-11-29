import { Card } from "@/components/ui/card";
import { CircleAlert, ClipboardCheck, FolderPlus, LucideIcon, PlusCircle } from "lucide-react";
import { OverviewAndActionsType } from "./types";

interface TopCardType {
  count: string;
  title: string;
  Icon: LucideIcon;
  type: "light" | "dark";
}

const TopCards = ({ count, title, Icon, type }: TopCardType) => {
  const bgVariant = type === "dark" ? "bg-white dark:bg-[#111]" : "bg-[#f5f5f5] dark:bg-[#202020]";

  return (
    <Card
      className={`relative flex h-24 w-full items-center justify-between overflow-hidden rounded-2xl border border-black/5 p-4 dark:border-white/10 ${bgVariant}`}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-semibold text-[#111] dark:text-white">{count}</span>
          <span className="text-sm whitespace-nowrap text-[#555] dark:text-white/70">{title}</span>
        </div>
        <div>
          <Icon className="h-8 w-8 text-black/40 dark:text-white/40" />
        </div>
      </div>
    </Card>
  );
};
export default function OverviewAndActions({ open_tasks, closed_tasks, open_issues, closed_issues }: OverviewAndActionsType) {
  return (
    <div className="grid w-full gap-4 md:grid-cols-[2fr_1fr]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TopCards count={String(open_tasks).padStart(2, "0")} title="Open Tasks" Icon={ClipboardCheck} type="dark" />
        <TopCards count={String(closed_tasks).padStart(2, "0")} title="Closed Tasks" Icon={ClipboardCheck} type="light" />
        <TopCards count={String(open_issues).padStart(2, "0")} title="Open Issues" Icon={CircleAlert} type="dark" />
        <TopCards count={String(closed_issues).padStart(2, "0")} title="Closed Issues" Icon={CircleAlert} type="light" />
      </div>

      <Card className="relative flex h-full items-center overflow-hidden rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-[#111]">
        <div className="flex w-full flex-col gap-3 xl:flex-row">
          <button className="customBtn">
            <PlusCircle className="h-4 w-4 text-black dark:text-white/80" />
            <span className="text-sm text-black dark:text-white/90">Task</span>
          </button>

          <button className="customBtn">
            <CircleAlert className="h-4 w-4 text-black dark:text-white/80" />
            <span className="text-sm text-black dark:text-white/90">Issue</span>
          </button>

          <button className="customBtn">
            <FolderPlus className="h-4 w-4 text-black dark:text-white/80" />
            <span className="text-sm text-black dark:text-white/90">New Project</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
