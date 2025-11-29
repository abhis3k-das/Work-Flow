import { Card } from "@/components/ui/card";

import {
    CircleAlert,
    ClipboardCheck,
    FolderPlus,
    LucideIcon,
    PlusCircle,
} from "lucide-react";

interface TopCardType {
    count: string;
    title: string;
    Icon: LucideIcon;
    type: "light" | "dark";
}

const TopCards = ({ count, title, Icon, type }: TopCardType) => {
    const bgVariant = type === "dark"
            ? "bg-white dark:bg-[#111]"
            : "bg-[#f5f5f5] dark:bg-[#202020]";

    return (
        <Card
            className={`w-full relative overflow-hidden h-24 rounded-2xl p-4 flex items-center justify-between border border-black/5 dark:border-white/10 ${bgVariant}`}
        >
            <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold text-[#111] dark:text-white">
                        {count}
                    </span>
                    <span className="text-sm text-[#555] dark:text-white/70 whitespace-nowrap">
                        {title}
                    </span>
                </div>
                <div>
                    <Icon className="w-8 h-8 text-black/40 dark:text-white/40" />
                </div>
            </div>
        </Card>
    );
};
export default function OverviewAndActions() {
    return (
        <div className="w-full grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <TopCards count="29" title="Open Tasks" Icon={ClipboardCheck} type="dark" />
                <TopCards count="84" title="Closed Tasks" Icon={ClipboardCheck} type="light" />
                <TopCards count="04" title="Open Issues" Icon={CircleAlert} type="dark" />
                <TopCards count="27" title="Closed Issues" Icon={CircleAlert} type="light" />
            </div>

            <Card className="relative overflow-hidden rounded-2xl p-4 flex items-center h-full border border-black/5 bg-white dark:border-white/10 dark:bg-[#111]">
                <div className="flex flex-col xl:flex-row gap-3 w-full">
                    <button className="customBtn">
                        <PlusCircle className="w-4 h-4 text-black dark:text-white/80" />
                        <span className="text-sm text-black dark:text-white/90">Task</span>
                    </button>

                    <button className="customBtn">
                        <CircleAlert className="w-4 h-4 text-black dark:text-white/80" />
                        <span className="text-sm text-black dark:text-white/90">Issue</span>
                    </button>

                    <button className="customBtn">
                        <FolderPlus className="w-4 h-4 text-black dark:text-white/80" />
                        <span className="text-sm text-black dark:text-white/90">New Project</span>
                    </button>
                </div>
            </Card>
        </div>
    )
}