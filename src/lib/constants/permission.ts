const DASHBOARD_MODULE = ["dashboard.view.all", "dashboard.view.projects"] as const;

const USER_MODULE = [
  "user.delete",
  "user.view",
  "user.invite",
  "user.roles.create",
  "user.teams.manage",
  "user.activity.team.view",
  "user.activity.full.view",
  "user.access-control.manage",
] as const;

const PROJECT_MODULE = [
  "projects.view.all",
  "projects.view.team",
  "projects.create",
  "projects.edit",
  "projects.delete",
  "projects.task.view",
  "projects.task.edit",
  "projects.task.delete",
  "projects.task.create",
  "projects.templates.manage",
  "projects.setting.manage",
] as const;

const VAULT_MODULE = [
  "vault.view.all",
  "vault.view.project",
  "vault.edit",
  "vault.delete",
  "vault.share",
  "vault.folders.manage",
  "vault.recycle.manage",
  "vault.setting.manage",
] as const;

const CHAT_MODULE = [
  "chat.channel.all",
  "chat.channel.create",
  "chat.channel.manage",
  "chat.dm.use",
  "chat.assistant.use",
  "chat.pin.message",
] as const;

const PERMISSIONS = [...DASHBOARD_MODULE, ...USER_MODULE, ...PROJECT_MODULE, ...VAULT_MODULE, ...CHAT_MODULE] as const;

export type PermissionKey = (typeof PERMISSIONS)[number];

export const PERMISSION_GROUPS: { module: string; label: string; permissions: { key: PermissionKey; label: string }[] }[] = [
  {
    module: "dashboard",
    label: "Dashboard",
    permissions: [
      { key: "dashboard.view.all", label: "View full dashboard" },
      { key: "dashboard.view.projects", label: "View project widgets on dashboard" },
    ],
  },
  {
    module: "user",
    label: "Users",
    permissions: [
      { key: "user.view", label: "View users" },
      { key: "user.invite", label: "Invite users" },
      { key: "user.delete", label: "Delete users" },
      { key: "user.roles.create", label: "Create / assign roles" },
      { key: "user.teams.manage", label: "Manage teams / groups" },
      { key: "user.activity.team.view", label: "View team activity" },
      { key: "user.activity.full.view", label: "View full user activity (all users)" },
      { key: "user.access-control.manage", label: "Manage user access overrides" },
    ],
  },
  {
    module: "projects",
    label: "Projects",
    permissions: [
      { key: "projects.view.all", label: "View all projects" },
      { key: "projects.view.team", label: "View only team projects" },
      { key: "projects.create", label: "Create projects" },
      { key: "projects.edit", label: "Edit projects" },
      { key: "projects.delete", label: "Delete projects" },
      { key: "projects.task.view", label: "View tasks" },
      { key: "projects.task.create", label: "Create tasks" },
      { key: "projects.task.edit", label: "Edit tasks" },
      { key: "projects.task.delete", label: "Delete tasks" },
      { key: "projects.templates.manage", label: "Manage project templates" },
      { key: "projects.setting.manage", label: "Manage project settings" },
    ],
  },
  {
    module: "vault",
    label: "Vault",
    permissions: [
      { key: "vault.view.all", label: "View all vault files" },
      { key: "vault.view.project", label: "View project-specific vault files" },
      { key: "vault.edit", label: "Edit / move / rename files" },
      { key: "vault.delete", label: "Delete files" },
      { key: "vault.share", label: "Share files / folders" },
      { key: "vault.folders.manage", label: "Manage folders" },
      { key: "vault.recycle.manage", label: "Manage recycle bin" },
      { key: "vault.setting.manage", label: "Manage vault settings" },
    ],
  },
  {
    module: "chat",
    label: "Chat",
    permissions: [
      { key: "chat.channel.all", label: "View all channels" },
      { key: "chat.channel.create", label: "Create channels" },
      { key: "chat.channel.manage", label: "Manage channels (members, rename, archive)" },
      { key: "chat.dm.use", label: "Use direct messages" },
      { key: "chat.assistant.use", label: "Use AI chat assistant" },
      { key: "chat.pin.message", label: "Pin / unpin messages" },
    ],
  },
];

export const SYSTEM_ROLES = ["Owner", "Admin", "Member", "Viewer"] as const;

export type SystemRole = (typeof SYSTEM_ROLES)[number];

export const SYSTEM_ROLES_DETAILS: { [R in SystemRole]: PermissionKey[] } = {
  Owner: [...PERMISSIONS],
  Admin: [
    // Dashboard
    "dashboard.view.all",
    "dashboard.view.projects",

    // Users
    "user.view",
    "user.invite",
    "user.delete",
    "user.roles.create",
    "user.teams.manage",
    "user.activity.team.view",
    "user.activity.full.view",
    // NOT giving: 'user.access-control.manage' → Owner-only

    // Projects
    "projects.view.all",
    "projects.create",
    "projects.edit",
    "projects.delete",
    "projects.task.view",
    "projects.task.create",
    "projects.task.edit",
    "projects.task.delete",
    "projects.templates.manage",
    "projects.setting.manage",

    // Vault
    "vault.view.all",
    "vault.edit",
    "vault.delete",
    "vault.share",
    "vault.folders.manage",
    "vault.recycle.manage",
    "vault.setting.manage",

    // Chat
    "chat.channel.all",
    "chat.channel.create",
    "chat.channel.manage",
    "chat.dm.use",
    "chat.assistant.use",
    "chat.pin.message",
  ],
  Member: [
    // Dashboard
    "dashboard.view.projects",

    // Users
    "user.view",
    "user.activity.team.view",

    // Projects (TEAM scope only)
    "projects.view.team",
    "projects.create",
    "projects.edit",
    "projects.delete",
    "projects.task.view",
    "projects.task.create",
    "projects.task.edit",
    "projects.task.delete",

    // Vault (PROJECT scope only)
    "vault.view.project",
    "vault.edit",
    "vault.delete",
    "vault.share",

    // Chat
    "chat.channel.all", // can see team’s channels
    "chat.dm.use",
    "chat.assistant.use",
    "chat.pin.message",
  ],
  Viewer: [
    // Dashboard
    "dashboard.view.projects",

    // Users
    "user.view",

    // Projects
    "projects.view.team",
    "projects.task.view",

    // Vault
    "vault.view.project",

    // Chat
    "chat.channel.all",
  ],
};
