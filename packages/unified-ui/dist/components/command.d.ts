import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface CommandItem {
    /** Unique identifier for the command. */
    id: string;
    /** The display label for the command. */
    label: string;
    /** Optional description shown below the label. */
    description?: string;
    /** Optional icon rendered before the label. */
    icon?: ReactNode;
    /** Optional keyboard shortcut hint. */
    shortcut?: string;
    /** Callback executed when the command is selected. */
    onSelect: () => void;
    /** Whether this command is disabled. */
    disabled?: boolean;
}
interface CommandGroup {
    /** Heading label for this group. */
    heading?: string;
    /** Commands in this group. */
    items: CommandItem[];
}
interface CommandProps {
    /** Whether the command palette is open. */
    open: boolean;
    /** Callback when open state changes. */
    onOpenChange: (open: boolean) => void;
    /** Groups of commands to display. */
    groups: CommandGroup[];
    /** Placeholder text for the search input. @default "Search commands..." */
    placeholder?: string;
    /** Text shown when no commands match. @default "No results found." */
    emptyText?: string;
    /** Custom keyboard shortcut to open (modifier + key). @default "k" */
    shortcutKey?: string;
}
interface CommandInputProps extends ComponentPropsWithoutRef<"input"> {
    className?: string;
}
/**
 * Command — a keyboard-navigable command palette modal.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * const groups = [
 *   {
 *     heading: "Navigation",
 *     items: [
 *       { id: "home", label: "Go to Home", icon: <Home />, onSelect: () => router.push("/") },
 *       { id: "docs", label: "Open Docs", icon: <BookOpen />, onSelect: () => router.push("/docs") },
 *     ],
 *   },
 *   {
 *     heading: "Actions",
 *     items: [
 *       { id: "new", label: "New Document", shortcut: "⌘N", onSelect: handleNew },
 *     ],
 *   },
 * ];
 *
 * return (
 *   <>
 *     <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
 *     <Command open={open} onOpenChange={setOpen} groups={groups} />
 *   </>
 * );
 * ```
 */
declare function Command({ open, onOpenChange, groups, placeholder, emptyText, shortcutKey, }: CommandProps): react_jsx_runtime.JSX.Element;
declare namespace Command {
    var displayName: string;
}
interface CommandTriggerProps {
    /** Label for the trigger button. @default "Search commands..." */
    label?: string;
    /** Called when the trigger button is clicked. */
    onClick: () => void;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * CommandTrigger — a search-bar-style button that opens the command palette.
 *
 * @example
 * ```tsx
 * <CommandTrigger onClick={() => setOpen(true)} label="Search..." />
 * ```
 */
declare const CommandTrigger: react.ForwardRefExoticComponent<CommandTriggerProps & react.RefAttributes<HTMLButtonElement>>;

export { Command, type CommandGroup, type CommandInputProps, type CommandItem, type CommandProps, CommandTrigger, type CommandTriggerProps };
