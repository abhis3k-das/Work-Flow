import {
  LayoutDashboard,
  Users,
  FolderKanban,
  //   Folder,
  MessageSquare,
  //   Bot,
  Workflow,
  FileStack,
  //   ListTree,
  //   AlertTriangle,
  History,
  Settings,
  Shield,
  CreditCard,
  Key,
  Mail,
  Database,
  Lock,
  LucideIcon,
} from 'lucide-react';

export interface MenuType {
  isCollaspible: boolean;
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}
export const SIDEBAR_ITEMS: MenuType[] = [
  {
    isCollaspible: false,
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    items: [],
  },

  {
    isCollaspible: true,
    title: 'Users',
    url: '/users',
    icon: Users,
    items: [
      { title: 'User List', url: '/users' },
      { title: 'Invite User', url: '/users/invite' },
      { title: 'Pending Invitation', url: '/users/pending' },
      { title: 'Roles & Permission', url: '/users/roles' },
      { title: 'Teams / Groups', url: '/users/teams' },
      { title: 'User Activity', url: '/users/activity' },
      { title: 'Access Control', url: '/users/access-control' },
    ],
  },

  {
    isCollaspible: true,
    title: 'Projects',
    url: '/projects',
    icon: FolderKanban,
    items: [
      { title: 'All Projects', url: '/projects' },
      { title: 'Create Project', url: '/projects/create' },
      { title: 'Board (Kanban)', url: '/projects/boards' },
      { title: 'Tasks', url: '/projects/tasks' },
      { title: 'Project Templates', url: '/projects/templates' },
      { title: 'Project Settings', url: '/projects/settings' },

      // Future
      //   { title: "AI Project Summaries", url: "/projects/ai-summaries", future: true },
      //   { title: "Gantt Charts", url: "/projects/gantt", future: true },
      //   { title: "Dependencies", url: "/projects/dependencies", future: true },
      //   { title: "Task Chat", url: "/projects/task-chat", future: true },
    ],
  },

  {
    isCollaspible: true,
    title: 'Vault',
    url: '/vault',
    icon: FileStack,
    items: [
      { title: 'All Files', url: '/vault' },
      { title: 'Upload', url: '/vault/upload' },
      { title: 'Folder Structure', url: '/vault/folders' },
      { title: 'Recent Files', url: '/vault/recent' },
      { title: 'Shared With Me', url: '/vault/shared' },
      { title: 'Recycle Bin', url: '/vault/recycle' },
      { title: 'Vault Settings', url: '/vault/settings' },
    ],
  },

  {
    isCollaspible: true,
    title: 'Chat',
    url: '/chat',
    icon: MessageSquare,
    items: [
      { title: 'All Channels', url: '/chat/channels' },
      { title: 'Direct Messages', url: '/chat/dm' },
      { title: 'Create Channel', url: '/chat/channels/create' },
      { title: 'AI Chat Assistant', url: '/chat/assistant' },
      { title: 'Pinned Messages', url: '/chat/pinned' },
    ],
  },

  {
    isCollaspible: true,
    title: 'Automations',
    url: '/automations',
    icon: Workflow,
    items: [
      { title: 'Automation List', url: '/automations' },
      { title: 'Create Automation', url: '/automations/create' },
      { title: 'Triggers', url: '/automations/triggers' },
      { title: 'Actions', url: '/automations/actions' },
      { title: 'AI Workflows', url: '/automations/ai' },
      { title: 'Scheduled Jobs', url: '/automations/scheduled' },
    ],
  },

  {
    isCollaspible: true,
    title: 'Logs',
    url: '/logs',
    icon: History,
    items: [
      { title: 'Audit Logs', url: '/logs/audit' },
      { title: 'System Logs', url: '/logs/system' },
      { title: 'Project Logs', url: '/logs/projects' },
      { title: 'Vault Logs', url: '/logs/vault' },
      { title: 'Error Logs', url: '/logs/errors' },
      { title: 'Login History', url: '/logs/login-history' },
    ],
  },

  {
    isCollaspible: true,
    title: 'Workspace Settings',
    url: '/settings',
    icon: Settings,
    items: [
      { title: 'General Settings', url: '/settings' },
      { title: 'Branding', url: '/settings/branding' },
      { title: 'Billing', url: '/settings/billing', icon: CreditCard },
      {
        title: 'API Keys / Integrations',
        url: '/settings/integrations',
        icon: Key,
      },
      {
        title: 'Access Control',
        url: '/settings/access-control',
        icon: Shield,
      },
      { title: 'SMTP Settings', url: '/settings/smtp', icon: Mail },
      { title: 'Storage Settings', url: '/settings/storage', icon: Database },
      {
        title: 'Security (2FA, IP Restriction)',
        url: '/settings/security',
        icon: Lock,
      },
    ],
  },
];
