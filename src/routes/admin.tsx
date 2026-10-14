import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Belaisy Hair" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminApp,
});
