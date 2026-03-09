"use client";

import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  TooltipProvider,
} from "@work-rjkashyap/unified-ui";
import {
  Bell,
  ChevronDown,
  Cloud,
  Copy,
  CreditCard,
  Edit,
  Eye,
  EyeOff,
  Keyboard,
  Layers,
  LifeBuoy,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  PlusCircle,
  Send,
  Settings,
  Share2,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { BentoCard } from "./preview-area";

// ---------------------------------------------------------------------------
// OverlaysPreview — dense bento grid, no empty space
// ---------------------------------------------------------------------------

export function OverlaysPreview() {
  const [sendEmail, setSendEmail] = useState(true);

  return (
    <TooltipProvider>
      <div className="grid grid-cols-6 gap-3">
        {/* ── Row 1 — Dialogs (3/6) + Dropdowns (3/6) ── */}
        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Dialogs"
            description="Modal dialogs for focused tasks and confirmations"
            icon={MessageSquare}
          >
            <div className="flex flex-wrap gap-2">
              {/* Invite Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="primary"
                    size="sm"
                    iconLeft={<UserPlus className="size-3.5" />}
                  >
                    Invite member
                  </Button>
                </DialogTrigger>
                <DialogContent size="sm">
                  <DialogHeader>
                    <DialogTitle>Invite member</DialogTitle>
                    <DialogDescription>
                      Invite a teammate and choose their role for this
                      workspace.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="colleague@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="contributor">
                            Contributor
                          </SelectItem>
                          <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Switch
                      label="Send invite email"
                      description="If disabled, you can copy the invite link from the members page."
                      checked={sendEmail}
                      onCheckedChange={setSendEmail}
                    />
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" size="sm">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft={<Send className="size-3.5" />}
                    >
                      Send invite
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Assign Owner Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft={<User className="size-3.5" />}
                  >
                    Assign owner
                  </Button>
                </DialogTrigger>
                <DialogContent size="sm">
                  <DialogHeader>
                    <DialogTitle>Assign owner</DialogTitle>
                    <DialogDescription>
                      Choose a new owner for this project.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody className="space-y-4">
                    <div className="space-y-2">
                      <Label>Owner</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="olivia">Olivia Martin</SelectItem>
                          <SelectItem value="jackson">Jackson Lee</SelectItem>
                          <SelectItem value="isabella">
                            Isabella Nguyen
                          </SelectItem>
                          <SelectItem value="william">William Kim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assign-note">Note</Label>
                      <Textarea
                        id="assign-note"
                        placeholder="Add an optional note..."
                        rows={3}
                      />
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" size="sm">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button variant="primary" size="sm">
                      Assign
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </BentoCard>
        </div>

        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Dropdown Menus"
            description="Contextual actions, navigation, and option selection"
            icon={Layers}
          >
            <div className="flex flex-wrap gap-2">
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="pl-1"
                    iconLeft={<Avatar name="Sofia Davis" size="xs" />}
                    iconRight={
                      <ChevronDown className="size-3.5 text-muted-foreground" />
                    }
                  >
                    Sofia Davis
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Sofia Davis
                      </p>
                      <p className="text-xs text-muted-foreground leading-none">
                        sofia@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="size-4" />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="size-4" />
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="size-4" />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="size-4" />
                    Keyboard shortcuts
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserPlus className="size-4" />
                    Invite users
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PlusCircle className="size-4" />
                    New team
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LifeBuoy className="size-4" />
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Cloud className="size-4" />
                    API
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="danger">
                    <LogOut className="size-4" />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft={<MoreHorizontal className="size-4" />}
                  >
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="start">
                  <DropdownMenuItem>
                    <Edit className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="size-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="size-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Visibility</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value="public">
                    <DropdownMenuRadioItem value="public">
                      <Eye className="size-4" />
                      Public
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="private">
                      <EyeOff className="size-4" />
                      Private
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="danger">
                    <Trash2 className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </BentoCard>
        </div>

        {/* ── Row 2 — Notification Popover (3/6) + Share Popover (3/6) ── */}
        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Notifications"
            description="Rich floating notification panel"
            icon={Bell}
          >
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative inline-flex">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft={<Bell className="size-3.5" />}
                  >
                    Notifications
                  </Button>
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground pointer-events-none">
                    2
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h4 className="text-sm font-semibold">Notifications</h4>
                  <Badge variant="primary" size="sm">
                    2 new
                  </Badge>
                </div>
                <div className="divide-y divide-border max-h-64 overflow-y-auto">
                  {[
                    {
                      title: "New comment on your post",
                      description:
                        "Olivia Martin commented on your recent update.",
                      time: "2 min ago",
                      unread: true,
                    },
                    {
                      title: "Deployment succeeded",
                      description:
                        "Your latest deployment to production completed.",
                      time: "15 min ago",
                      unread: true,
                    },
                    {
                      title: "You were mentioned",
                      description:
                        "Jackson Lee mentioned you in #design-system.",
                      time: "1 hour ago",
                      unread: false,
                    },
                    {
                      title: "Weekly report ready",
                      description:
                        "Your workspace activity report for this week.",
                      time: "3 hours ago",
                      unread: false,
                    },
                  ].map((notification, i) => (
                    <div
                      key={i}
                      className={`px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                        notification.unread ? "bg-primary-muted/30" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notification.unread && (
                          <span className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                        )}
                        <div
                          className={`min-w-0 ${!notification.unread ? "ml-4" : ""}`}
                        >
                          <p className="text-sm font-medium leading-tight">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            {notification.description}
                          </p>
                          <p className="text-[11px] text-muted-foreground/70 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    className="text-xs"
                  >
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </BentoCard>
        </div>

        <div className="col-span-6 md:col-span-3">
          <BentoCard
            title="Share"
            description="Rich sharing panel with access list"
            icon={Share2}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  iconLeft={<Share2 className="size-3.5" />}
                >
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="start">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold">
                      Share this project
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Anyone with the link can view this project.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      size="sm"
                      value="https://app.example.com/p/abc123"
                      readOnly
                      className="flex-1 text-xs"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      iconOnly
                      aria-label="Copy link"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                  </div>
                  <div className="border-t border-border pt-3 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      People with access
                    </p>
                    {[
                      {
                        name: "Olivia Martin",
                        email: "olivia@example.com",
                        role: "Owner",
                      },
                      {
                        name: "Jackson Lee",
                        email: "jackson@example.com",
                        role: "Editor",
                      },
                      {
                        name: "Sofia Davis",
                        email: "sofia@example.com",
                        role: "Viewer",
                      },
                    ].map((person) => (
                      <div
                        key={person.email}
                        className="flex items-center gap-2"
                      >
                        <Avatar name={person.name} size="xs" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium leading-none truncate">
                            {person.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {person.email}
                          </p>
                        </div>
                        <Badge variant="outline" size="sm">
                          {person.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </BentoCard>
        </div>
      </div>
    </TooltipProvider>
  );
}
