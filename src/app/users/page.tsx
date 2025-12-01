import PageTitle from "@/components/page-title";
import CopyWithTooltip from "@/components/tooltip-copy";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, LucideIcon, Trash2, User2, UserCheck2Icon, UserCircle2, UserCog2, UserPlus2, UserRoundXIcon } from "lucide-react";
import { useMemo } from "react";

interface TopCardType {
  count: string;
  title: string;
  Icon: LucideIcon;
  type: "light" | "dark";
  color?: string;
}

const TopCards = ({ count, title, Icon, type, color }: TopCardType) => {
  const bgVariant = type === "dark" ? "bg-white dark:bg-[#111]" : "bg-[#e5e5e5] dark:bg-[#303030]";

  return (
    <Card
      className={`relative flex h-24 w-full items-center justify-between overflow-hidden rounded-2xl border border-black/5 p-4 dark:border-white/10 ${bgVariant}`}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-semibold text-[#111] dark:text-white">{count}</span>
          <span className={`text-sm whitespace-nowrap ${color ?? "text-[#555] dark:text-white/70"}`}>{title}</span>
        </div>
        <div>
          <Icon className="h-8 w-8 text-black/40 dark:text-white/40" />
        </div>
      </div>
    </Card>
  );
};

const DUMMY_DATA = {
  total_users: 34,
  active_users: 30,
  admin_users: 4,
  members: 26,
  invited_users: 5,
  suspended_users: 3,
  users_list: [
    {
      id: 1,
      name: "Abhisek Das",
      profile_image: "",
      email: "abhisek@gmail.com",
      role: "Admin",
      designation: "Manager",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      profile_image: "",
      email: "priya.sharma@example.com",
      role: "Member",
      designation: "Product Designer",
      status: "active",
    },
    {
      id: 3,
      name: "Rohit Mehra",
      profile_image: "",
      email: "rohit.mehra@example.com",
      role: "Manager",
      designation: "Project Lead",
      status: "active",
    },
    {
      id: 4,
      name: "Sana Khan",
      profile_image: "",
      email: "sana.k@example.com",
      role: "Admin",
      designation: "Technical Lead",
      status: "suspended",
    },
    {
      id: 5,
      name: "Amit Patel",
      profile_image: "",
      email: "amit.patel@example.com",
      role: "Member",
      designation: "Frontend Developer",
      status: "invited",
    },
    {
      id: 6,
      name: "Neha Verma",
      profile_image: "",
      email: "neha.verma@example.com",
      role: "Guest",
      designation: "Client Reviewer",
      status: "active",
    },
    {
      id: 7,
      name: "Manish Gupta",
      profile_image: "",
      email: "manish.gupta@example.com",
      role: "Member",
      designation: "QA Engineer",
      status: "pending",
    },
    {
      id: 8,
      name: "Karan Singh",
      profile_image: "",
      email: "karan.singh@example.com",
      role: "Manager",
      designation: "Operations Lead",
      status: "active",
    },
    {
      id: 9,
      name: "Divya Nair",
      profile_image: "",
      email: "divya.nair@example.com",
      role: "Guest",
      designation: "External Consultant",
      status: "removed",
    },
    {
      id: 10,
      name: "Vikram Sahu",
      profile_image: "",
      email: "vikram.sahu@example.com",
      role: "Member",
      designation: "Backend Developer",
      status: "active",
    },
  ],
};
export default function UserPage() {
  const padStartText = useMemo(() => (val: number) => String(val).padStart(2, "0"), []);

  return (
    <>
      <PageTitle title="Users" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        <TopCards count={padStartText(DUMMY_DATA.total_users)} title="Total Users" Icon={User2} type="dark" />
        <TopCards count={padStartText(DUMMY_DATA.active_users)} title="Active Users" Icon={UserCheck2Icon} type="light" />
        <TopCards count={padStartText(DUMMY_DATA.admin_users)} title="Admin Users" Icon={UserCog2} type="dark" />
        <TopCards count={padStartText(DUMMY_DATA.members)} title="Members" Icon={User2} type="light" />
        <TopCards
          count={padStartText(DUMMY_DATA.invited_users)}
          title="Invited Users"
          Icon={UserPlus2}
          type="dark"
          color="text-green-500"
        />
        <TopCards
          count={padStartText(DUMMY_DATA.suspended_users)}
          title="Suspended Users"
          Icon={UserRoundXIcon}
          type="light"
          color="text-red-500"
        />
      </div>
      <Card className="mt-4">
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 dark:bg-[#111]">
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Email</TableCell>
                <TableCell className="font-bold">Role</TableCell>
                <TableCell className="font-bold">Designation</TableCell>
                <TableCell className="font-bold">Status</TableCell>
                <TableCell className="font-bold">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_DATA.users_list.map((el) => (
                <TableRow key={el.id}>
                  <TableCell className="pl-6">
                    <UserCircle2 />
                  </TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell className="max-w-[120px] pr-2">
                    <div className="flex items-center gap-2">
                      <div className="max-w-[200px] truncate whitespace-nowrap" title={el.email}>
                        {el.email}
                      </div>
                      <CopyWithTooltip text={el.email} />
                    </div>
                  </TableCell>
                  <TableCell>{el.role}</TableCell>
                  <TableCell>{el.designation}</TableCell>
                  <TableCell>
                    <Badge variant={"default"}>
                      <span>{el.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <Trash2 className="h-5 w-5 text-red-500" />
                      <Eye className="h-5 w-5" />
                    </div>
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
