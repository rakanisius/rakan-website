/* =====================================================
   RAKAN Studio Workflow Registry
   SSOT — Workflow Data Only
===================================================== */

export type WorkflowStatus =
  | "draft"
  | "review"
  | "ready"
  | "published";

export interface WorkflowItem {
  id: WorkflowStatus;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export const workflow: WorkflowItem[] = [
  {
    id: "draft",
    title: "Draft",
    description: "Masih ditulis.",
    href: "/studio/writing",
    icon: "📝"
  },
  {
    id: "review",
    title: "Review",
    description: "Sedang dirapikan.",
    href: "/studio/writing?status=review",
    icon: "🔍"
  },
  {
    id: "ready",
    title: "Ready",
    description: "Siap dipublikasikan.",
    href: "/studio/writing?status=ready",
    icon: "✅"
  },
  {
    id: "published",
    title: "Published",
    description: "Sudah tayang di RAKAN.",
    href: "/studio/publish",
    icon: "🚀"
  }
];

/* =====================================================
   Compatibility Helpers
   (dipakai komponen lama)
===================================================== */

export function getWorkflowItems(): WorkflowItem[] {
  return workflow;
}

export function getWorkflowById(id: WorkflowStatus) {
  return workflow.find((item) => item.id === id);
}

export function getWorkflowIndex(id: WorkflowStatus) {
  return workflow.findIndex((item) => item.id === id);
}