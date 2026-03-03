// ============================================================================
// Unified UI — Composite Components Barrel Export
// ============================================================================


// ---------------------------------------------------------------------------
// Command
// ---------------------------------------------------------------------------
export {
	Command,
	type CommandGroup,
	type CommandItem,
	type CommandProps,
	CommandTrigger,
	type CommandTriggerProps,
} from "./command";

// ---------------------------------------------------------------------------
// ContextMenu
// ---------------------------------------------------------------------------
export {
	ContextMenu,
	ContextMenuCheckboxItem,
	type ContextMenuCheckboxItemProps,
	ContextMenuContent,
	type ContextMenuContentProps,
	ContextMenuGroup,
	type ContextMenuGroupProps,
	ContextMenuItem,
	type ContextMenuItemProps,
	type ContextMenuItemVariant,
	ContextMenuLabel,
	type ContextMenuLabelProps,
	type ContextMenuProps,
	ContextMenuRadioGroup,
	type ContextMenuRadioGroupProps,
	ContextMenuRadioItem,
	type ContextMenuRadioItemProps,
	ContextMenuSeparator,
	type ContextMenuSeparatorProps,
	ContextMenuShortcut,
	type ContextMenuShortcutProps,
	ContextMenuSub,
	ContextMenuSubContent,
	type ContextMenuSubContentProps,
	type ContextMenuSubProps,
	ContextMenuSubTrigger,
	type ContextMenuSubTriggerProps,
	ContextMenuTrigger,
	type ContextMenuTriggerProps,
} from "./context-menu";

// ---------------------------------------------------------------------------
// Menubar
// ---------------------------------------------------------------------------
export {
	Menubar,
	MenubarCheckboxItem,
	type MenubarCheckboxItemProps,
	MenubarContent,
	type MenubarContentProps,
	MenubarGroup,
	type MenubarGroupProps,
	MenubarItem,
	type MenubarItemProps,
	type MenubarItemVariant,
	MenubarLabel,
	type MenubarLabelProps,
	MenubarMenu,
	type MenubarMenuProps,
	type MenubarProps,
	MenubarRadioGroup,
	type MenubarRadioGroupProps,
	MenubarRadioItem,
	type MenubarRadioItemProps,
	MenubarSeparator,
	type MenubarSeparatorProps,
	MenubarShortcut,
	type MenubarShortcutProps,
	MenubarSub,
	MenubarSubContent,
	type MenubarSubContentProps,
	type MenubarSubProps,
	MenubarSubTrigger,
	type MenubarSubTriggerProps,
	MenubarTrigger,
	type MenubarTriggerProps,
} from "./menubar";

// ---------------------------------------------------------------------------
// NavigationMenu
// ---------------------------------------------------------------------------
export {
	NavigationMenu,
	NavigationMenuCardLink,
	type NavigationMenuCardLinkProps,
	NavigationMenuContent,
	type NavigationMenuContentProps,
	NavigationMenuIndicator,
	type NavigationMenuIndicatorProps,
	NavigationMenuItem,
	type NavigationMenuItemProps,
	NavigationMenuLink,
	type NavigationMenuLinkProps,
	NavigationMenuList,
	type NavigationMenuListProps,
	type NavigationMenuProps,
	NavigationMenuTrigger,
	type NavigationMenuTriggerProps,
	NavigationMenuViewport,
	type NavigationMenuViewportProps,
} from "./navigation-menu";

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------
export {
	Step,
	type StepProps,
	Steps,
	type StepsOrientation,
	type StepsProps,
	type StepsVariant,
	type StepStatus,
} from "./steps";

// Single entry point for all composite components. Import from here rather
// than from individual component files.
//
// Usage:
//   import { Button, Input, Card } from "@/design-system/components";
// ============================================================================

// ---------------------------------------------------------------------------
// Collapsible
// ---------------------------------------------------------------------------
export {
	Collapsible,
	CollapsibleContent,
	type CollapsibleContentProps,
	type CollapsibleProps,
	CollapsibleTrigger,
	type CollapsibleTriggerProps,
	useCollapsibleContext,
} from "./collapsible";

// ---------------------------------------------------------------------------
// DataTable
// ---------------------------------------------------------------------------
export {
	DataTable,
	type DataTableColumnMeta,
	type DataTableFacetedFilter,
	type DataTableProps,
	type UseDataTableOptions,
	type UseDataTableReturn,
	useDataTable,
	createColumnHelper,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	type RowSelectionState,
	type PaginationState,
	type Row,
} from "./data-table";

// ---------------------------------------------------------------------------
// FormField
// ---------------------------------------------------------------------------
export {
	FormField,
	type FormFieldControlProps,
	type FormFieldOrientation,
	type FormFieldProps,
	type FormFieldSize,
} from "./form-field";
// ---------------------------------------------------------------------------
// Accordion
// ---------------------------------------------------------------------------
export {
	Accordion,
	AccordionContent,
	type AccordionContentProps,
	AccordionItem,
	type AccordionItemProps,
	type AccordionMultipleProps,
	type AccordionProps,
	type AccordionSingleProps,
	type AccordionSize,
	AccordionTrigger,
	type AccordionTriggerProps,
	type AccordionVariant,
	accordionRootVariants,
	accordionTriggerVariants,
} from "./accordion";
// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------
export {
	Alert,
	type AlertProps,
	type AlertVariant,
	alertVariants,
} from "./alert";
// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------
export {
	Avatar,
	AvatarGroup,
	type AvatarGroupProps,
	type AvatarProps,
	type AvatarShape,
	type AvatarSize,
	type AvatarStatus,
	avatarVariants,
} from "./avatar";
// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------
export {
	Label,
	type LabelProps,
	type LabelSize,
	labelVariants,
} from "./label";
// ---------------------------------------------------------------------------
// Badge (continued below)
// ---------------------------------------------------------------------------
export {
	Badge,
	type BadgeProps,
	type BadgeSize,
	type BadgeVariant,
	badgeVariants,
} from "./badge";
// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------
export {
	Breadcrumb,
	BreadcrumbEllipsis,
	type BreadcrumbEllipsisProps,
	BreadcrumbItem,
	type BreadcrumbItemProps,
	BreadcrumbLink,
	type BreadcrumbLinkProps,
	BreadcrumbList,
	type BreadcrumbListProps,
	BreadcrumbNav,
	type BreadcrumbNavItem,
	type BreadcrumbNavProps,
	BreadcrumbPage,
	type BreadcrumbPageProps,
	type BreadcrumbProps,
	BreadcrumbSeparator,
	type BreadcrumbSeparatorProps,
} from "./breadcrumb";
// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
export {
	Button,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
} from "./button";
// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
export {
	Card,
	CardBody,
	type CardBodyProps,
	CardFooter,
	type CardFooterProps,
	CardHeader,
	type CardHeaderProps,
	type CardProps,
	type CardVariant,
	cardVariants,
} from "./card";
// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------
export {
	Checkbox,
	CheckboxGroup,
	type CheckboxGroupOrientation,
	type CheckboxGroupProps,
	type CheckboxProps,
	type CheckboxSize,
	checkboxVariants,
	useCheckboxGroupContext,
} from "./checkbox";
// ---------------------------------------------------------------------------
// Collapsible is exported above (alphabetical order)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Dialog
// ---------------------------------------------------------------------------
export {
	Dialog,
	DialogBody,
	type DialogBodyProps,
	DialogClose,
	type DialogCloseProps,
	DialogContent,
	type DialogContentProps,
	DialogDescription,
	type DialogDescriptionProps,
	DialogFooter,
	type DialogFooterProps,
	DialogHeader,
	type DialogHeaderProps,
	type DialogProps,
	type DialogSize,
	DialogTitle,
	type DialogTitleProps,
	DialogTrigger,
	type DialogTriggerProps,
	dialogContentVariants,
} from "./dialog";
// ---------------------------------------------------------------------------
// DropdownMenu
// ---------------------------------------------------------------------------
export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	type DropdownMenuCheckboxItemProps,
	DropdownMenuContent,
	type DropdownMenuContentProps,
	DropdownMenuGroup,
	type DropdownMenuGroupProps,
	DropdownMenuItem,
	type DropdownMenuItemProps,
	type DropdownMenuItemVariant,
	DropdownMenuLabel,
	type DropdownMenuLabelProps,
	type DropdownMenuProps,
	DropdownMenuRadioGroup,
	type DropdownMenuRadioGroupProps,
	DropdownMenuRadioItem,
	type DropdownMenuRadioItemProps,
	DropdownMenuSeparator,
	type DropdownMenuSeparatorProps,
	DropdownMenuShortcut,
	type DropdownMenuShortcutProps,
	DropdownMenuSub,
	DropdownMenuSubContent,
	type DropdownMenuSubContentProps,
	type DropdownMenuSubProps,
	DropdownMenuSubTrigger,
	type DropdownMenuSubTriggerProps,
	DropdownMenuTrigger,
	type DropdownMenuTriggerProps,
} from "./dropdown-menu";
// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------
export {
	Input,
	type InputProps,
	type InputSize,
	type InputVariant,
	inputVariants,
} from "./input";
// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
export {
	Pagination,
	paginationButtonVariants,
	type PaginationProps,
	type PaginationSize,
	type PaginationVariant,
} from "./pagination";
// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
export {
	Progress,
	type ProgressProps,
	type ProgressSize,
	type ProgressVariant,
	progressIndicatorVariants,
	progressTrackVariants,
} from "./progress";
// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------
export {
	Popover,
	PopoverArrow,
	type PopoverArrowProps,
	PopoverClose,
	type PopoverCloseProps,
	PopoverContent,
	type PopoverContentProps,
	type PopoverProps,
	PopoverTrigger,
	type PopoverTriggerProps,
} from "./popover";
// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------
export {
	RadioCard,
	type RadioCardProps,
	RadioGroup,
	RadioGroupItem,
	type RadioGroupItemProps,
	type RadioGroupProps,
	type RadioOrientation,
	type RadioSize,
	radioCardVariants,
	radioGroupVariants,
	radioIndicatorVariants,
} from "./radio";
// ---------------------------------------------------------------------------
// ScrollArea
// ---------------------------------------------------------------------------
export {
	ScrollArea,
	type ScrollAreaProps,
	type ScrollAreaType,
	ScrollBar,
	type ScrollBarOrientation,
	type ScrollBarProps,
	type ScrollBarSize,
	scrollbarThumbVariants,
	scrollbarVariants,
} from "./scroll-area";
// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------
export {
	Select,
	SelectContent,
	type SelectContentProps,
	SelectGroup,
	type SelectGroupProps,
	SelectItem,
	type SelectItemProps,
	SelectLabel,
	type SelectLabelProps,
	SelectScrollDownButton,
	type SelectScrollDownButtonProps,
	SelectScrollUpButton,
	type SelectScrollUpButtonProps,
	SelectSeparator,
	type SelectSeparatorProps,
	SelectTrigger,
	type SelectTriggerProps,
	SelectValue,
	type SelectSize,
	type SelectVariant,
	selectTriggerVariants,
} from "./select";
// ---------------------------------------------------------------------------
// Sheet
// ---------------------------------------------------------------------------
export {
	Sheet,
	SheetClose,
	type SheetCloseProps,
	SheetContent,
	type SheetContentProps,
	SheetDescription,
	type SheetDescriptionProps,
	SheetFooter,
	type SheetFooterProps,
	SheetHeader,
	type SheetHeaderProps,
	type SheetProps,
	type SheetSide,
	type SheetSize,
	SheetTitle,
	type SheetTitleProps,
	SheetTrigger,
	type SheetTriggerProps,
	sheetContentVariants,
} from "./sheet";
// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------
export {
	Spinner,
	type SpinnerProps,
	type SpinnerSize,
	type SpinnerVariant,
	spinnerVariants,
} from "./spinner";
// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------
export {
	Skeleton,
	SkeletonCircle,
	type SkeletonCircleProps,
	type SkeletonProps,
	SkeletonRect,
	type SkeletonRectProps,
	type SkeletonSize,
	SkeletonText,
	type SkeletonTextProps,
	type SkeletonTextSize,
	skeletonVariants,
} from "./skeleton";
// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------
export {
	Switch,
	type SwitchLabelPosition,
	type SwitchProps,
	type SwitchSize,
	switchThumbVariants,
	switchTrackVariants,
} from "./switch";
// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------
export {
	Table,
	type TableAlign,
	TableBody,
	type TableBodyProps,
	TableCaption,
	type TableCaptionProps,
	TableCell,
	type TableCellProps,
	type TableDensity,
	TableFooter,
	type TableFooterProps,
	TableHead,
	type TableHeadProps,
	TableHeader,
	type TableHeaderProps,
	type TableProps,
	TableRow,
	type TableRowProps,
	type TableSortDirection,
	tableRootVariants,
} from "./table";
// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
export {
	Toggle,
	type ToggleProps,
	type ToggleSize,
	type ToggleVariant,
	toggleVariants,
} from "./toggle";
// ---------------------------------------------------------------------------
// ToggleGroup
// ---------------------------------------------------------------------------
export {
	ToggleGroup,
	ToggleGroupItem,
	type ToggleGroupItemProps,
	type ToggleGroupMultipleProps,
	type ToggleGroupOrientation,
	type ToggleGroupProps,
	type ToggleGroupSingleProps,
	type ToggleGroupSize,
	type ToggleGroupVariant,
	toggleGroupItemVariants,
	toggleGroupVariants,
	useToggleGroupContext,
} from "./toggle-group";
// ---------------------------------------------------------------------------
// Tabs (continued below)
// ---------------------------------------------------------------------------
export {
	Tabs,
	TabsContent,
	type TabsContentProps,
	TabsList,
	type TabsListProps,
	type TabsOrientation,
	type TabsProps,
	type TabsSize,
	TabsTrigger,
	type TabsTriggerProps,
	type TabsVariant,
	tabsListVariants,
	tabsTriggerVariants,
} from "./tabs";
// ---------------------------------------------------------------------------
// Textarea
// ---------------------------------------------------------------------------
export {
	Textarea,
	type TextareaProps,
	type TextareaSize,
	type TextareaVariant,
	textareaVariants,
} from "./textarea";
// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------
export {
	ToastItem,
	type ToastItemProps,
	ToastProvider,
	type ToastProviderProps,
	type ToastAction,
	type ToastAPI,
	type ToastData,
	type ToastOptions,
	type ToastPosition,
	type ToastVariant,
	toastVariants,
	useToast,
} from "./toast";
// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------
export {
	Tooltip,
	type TooltipAlign,
	type TooltipProps,
	TooltipProvider,
	type TooltipProviderProps,
	type TooltipSide,
} from "./tooltip";
