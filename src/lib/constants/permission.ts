type PermissionDesciption = { key: string; description: string };

const DASHBOARD_MODULE: PermissionDesciption[] = [
  { key: "dashboard.view.all", description: "View all details" },
  { key: "dashboard.view.projects", description: "View only project specific details" },
] as const;

const USER_MODULE: PermissionDesciption[] = [
  {
    key: "user.delete",
    description: "Delete any user from the workspace.",
  },
  {
    key: "user.view",
    description: "View all users in the workspace.",
  },
  {
    key: "user.invite",
    description: "Invite new members to the workspace.",
  },
  {
    key: "user.roles.create",
    description: "Create new roles and manage their permissions.",
  },
  {
    key: "user.teams.manage",
    description: "Create, edit, and assign users to teams.",
  },
  {
    key: "user.activity.team.view",
    description: "View activity logs for users within the same team.",
  },
  {
    key: "user.activity.full.view",
    description: "View all workspace-level user activity logs.",
  },
  {
    key: "user.access-control.manage",
    description: "Manage access control rules and role-based permissions.",
  },
] as const;

const PROJECT_MODULE: PermissionDesciption[] = [
  {
    key: "projects.view.all",
    description: "View all projects across the workspace.",
  },
  {
    key: "projects.view.team",
    description: "View projects belonging only to the user's team.",
  },
  {
    key: "projects.create",
    description: "Create new projects.",
  },
  {
    key: "projects.edit",
    description: "Edit project details such as name, description, or settings.",
  },
  {
    key: "projects.delete",
    description: "Delete an entire project.",
  },
  {
    key: "projects.task.view",
    description: "View tasks inside any accessible project.",
  },
  {
    key: "projects.task.edit",
    description: "Edit any task inside a project.",
  },
  {
    key: "projects.task.delete",
    description: "Delete tasks from a project.",
  },
  {
    key: "projects.task.create",
    description: "Create new tasks inside a project.",
  },
  {
    key: "projects.templates.manage",
    description: "Create and manage project task templates.",
  },
  {
    key: "projects.setting.manage",
    description: "Manage project settings including members, workflow, and automation.",
  },
] as const;

const VAULT_MODULE: PermissionDesciption[] = [
  {
    key: "vault.view.all",
    description: "View all files and folders in the workspace vault.",
  },
  {
    key: "vault.view.project",
    description: "View files and folders only inside assigned projects.",
  },
  {
    key: "vault.edit",
    description: "Upload, rename, or update files inside the vault.",
  },
  {
    key: "vault.delete",
    description: "Delete files or folders (move to recycle bin).",
  },
  {
    key: "vault.share",
    description: "Share files or folders with other users or teams.",
  },
  {
    key: "vault.folders.manage",
    description: "Create, rename, and organize folders inside the vault.",
  },
  {
    key: "vault.recycle.manage",
    description: "Manage recycle bin items (restore or permanently delete).",
  },
  {
    key: "vault.setting.manage",
    description: "Configure vault settings such as permissions and storage rules.",
  },
] as const;

const CHAT_MODULE: PermissionDesciption[] = [
  {
    key: "chat.channel.all",
    description: "Access all chat channels in the workspace.",
  },
  {
    key: "chat.channel.create",
    description: "Create new chat channels.",
  },
  {
    key: "chat.channel.manage",
    description: "Manage channel settings, members, and permissions.",
  },
  {
    key: "chat.dm.use",
    description: "Send and receive direct messages with other members.",
  },
  {
    key: "chat.assistant.use",
    description: "Use AI assistant inside chat channels and direct messages.",
  },
  {
    key: "chat.pin.message",
    description: "Pin important messages inside a channel.",
  },
] as const;

export const PERMISSIONS: PermissionDesciption[] = [
  ...DASHBOARD_MODULE,
  ...USER_MODULE,
  ...PROJECT_MODULE,
  ...VAULT_MODULE,
  ...CHAT_MODULE,
] as const;

type PermissionObject = (typeof PERMISSIONS)[number];
export type PermissionKey = PermissionObject["key"];

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
  Owner: [...PERMISSIONS.map((el) => el.key)],
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
