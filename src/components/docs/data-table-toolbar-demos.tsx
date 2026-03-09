"use client";

import { Button, DataTableToolbar } from "@work-rjkashyap/unified-ui";
import type { ViewMode } from "@work-rjkashyap/unified-ui/components";
import { Plus } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Search only
// ---------------------------------------------------------------------------

export function DemoToolbarBasic() {
  const [search, setSearch] = useState("");
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search users..."
    />
  );
}

// ---------------------------------------------------------------------------
// With faceted filters
// ---------------------------------------------------------------------------

export function DemoToolbarFilters() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search users..."
      filters={[
        {
          id: "status",
          label: "Status",
          options: [
            { label: "Active", value: "active", count: 12 },
            { label: "Inactive", value: "inactive", count: 5 },
            { label: "Pending", value: "pending", count: 3 },
          ],
          selected: statusFilter,
        },
        {
          id: "role",
          label: "Role",
          options: [
            { label: "Admin", value: "admin", count: 3 },
            { label: "Editor", value: "editor", count: 8 },
            { label: "Viewer", value: "viewer", count: 9 },
          ],
          selected: roleFilter,
        },
      ]}
      onFilterChange={(id, selected) => {
        if (id === "status") setStatusFilter(selected);
        if (id === "role") setRoleFilter(selected);
      }}
      onClearFilters={() => {
        setStatusFilter([]);
        setRoleFilter([]);
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Column visibility
// ---------------------------------------------------------------------------

export function DemoToolbarColumns() {
  const [search, setSearch] = useState("");
  const [cols, setCols] = useState([
    { id: "name", label: "Name", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "role", label: "Role", visible: true },
    { id: "status", label: "Status", visible: false },
    { id: "created", label: "Created", visible: false },
  ]);
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search..."
      columns={cols}
      onColumnVisibilityChange={(id, visible) =>
        setCols((prev) =>
          prev.map((c) => (c.id === id ? { ...c, visible } : c)),
        )
      }
    />
  );
}

// ---------------------------------------------------------------------------
// View mode switcher
// ---------------------------------------------------------------------------

export function DemoToolbarViewMode() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search..."
      viewModes={["table", "grid", "list"]}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    />
  );
}

// ---------------------------------------------------------------------------
// Full featured
// ---------------------------------------------------------------------------

export function DemoToolbarFull() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [cols, setCols] = useState([
    { id: "name", label: "Name", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "role", label: "Role", visible: true },
    { id: "status", label: "Status", visible: false },
  ]);
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search projects..."
      filters={[
        {
          id: "status",
          label: "Status",
          options: [
            { label: "Active", value: "active", count: 24 },
            { label: "Archived", value: "archived", count: 8 },
            { label: "Draft", value: "draft", count: 5 },
          ],
          selected: statusFilter,
        },
      ]}
      onFilterChange={(id, selected) => {
        if (id === "status") setStatusFilter(selected);
      }}
      onClearFilters={() => setStatusFilter([])}
      columns={cols}
      onColumnVisibilityChange={(id, visible) =>
        setCols((prev) =>
          prev.map((c) => (c.id === id ? { ...c, visible } : c)),
        )
      }
      viewModes={["table", "grid"]}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      actions={
        <Button
          size="sm"
          variant="primary"
          iconLeft={<Plus className="size-4" />}
        >
          New
        </Button>
      }
    />
  );
}
