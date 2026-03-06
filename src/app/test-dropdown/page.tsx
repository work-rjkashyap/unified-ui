"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Button,
} from "@work-rjkashyap/unified-ui";

export default function TestDropdownPage() {
  return (
    <div className="p-10 space-y-10">
      <h1 className="text-2xl font-bold">Dropdown Menu Test Page</h1>

      {/* Test 1: Basic (should work) */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">1. Basic (control — should work)</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Basic Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Test 2: Keyboard Shortcuts — child pattern */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          2. Keyboard Shortcuts (DropdownMenuShortcut as child)
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">File</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              New File
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Open
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Save
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Export
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Test 3: Keyboard Shortcuts — shortcut prop pattern */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          3. Keyboard Shortcuts (shortcut prop)
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">File (prop)</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem shortcut="⌘N">New File</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘O">Open</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘S">Save</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem shortcut="⇧⌘E">Export</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Test 4: Submenus */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">4. Submenus</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>New Tab</DropdownMenuItem>
            <DropdownMenuItem>New Window</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Messages</DropdownMenuItem>
                <DropdownMenuItem>Slack</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Print</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Test 5: Standalone DropdownMenuShortcut (no menu) */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          5. Standalone DropdownMenuShortcut render test
        </h2>
        <div className="flex items-center gap-4 p-3 border rounded">
          <span>Label</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </div>
      </section>
    </div>
  );
}
