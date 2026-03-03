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
  type StepStatus,
  Steps,
  type StepsOrientation,
  type StepsProps,
  type StepsVariant,
} from "./steps";

// Single entry point for all composite components. Import from here rather
// than from individual component files.
//
// Usage:
//   import { Button, Input, Card } from "@/design-system/components";
// ============================================================================

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
// AlertDialog
// ---------------------------------------------------------------------------
export {
  AlertDialog,
  AlertDialogAction,
  type AlertDialogActionProps,
  AlertDialogCancel,
  type AlertDialogCancelProps,
  AlertDialogContent,
  type AlertDialogContentProps,
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
  AlertDialogFooter,
  type AlertDialogFooterProps,
  AlertDialogHeader,
  type AlertDialogHeaderProps,
  AlertDialogOverlay,
  type AlertDialogOverlayProps,
  AlertDialogPortal,
  AlertDialogTitle,
  type AlertDialogTitleProps,
  AlertDialogTrigger,
} from "./alert-dialog";
// ---------------------------------------------------------------------------
// AspectRatio
// ---------------------------------------------------------------------------
export {
  AspectRatio,
  type AspectRatioProps,
} from "./aspect-ratio";
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
// Banner
// ---------------------------------------------------------------------------
export {
  Banner,
  type BannerPosition,
  type BannerProps,
  type BannerVariant,
  bannerVariants,
} from "./banner";
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
// Calendar
// ---------------------------------------------------------------------------
export {
  Calendar,
  type CalendarMode,
  type CalendarProps,
  calendarDayVariants,
  type DateRange,
} from "./calendar";
// ---------------------------------------------------------------------------
// Callout
// ---------------------------------------------------------------------------
export {
  Callout,
  type CalloutProps,
  type CalloutVariant,
  calloutVariants,
} from "./callout";
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
// Carousel
// ---------------------------------------------------------------------------
export {
  Carousel,
  type CarouselProps,
  useCarouselContext,
} from "./carousel";
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
// Code
// ---------------------------------------------------------------------------
export {
  CodeBlock,
  type CodeBlockProps,
  type CodeVariant,
  codeBlockVariants,
  InlineCode as CodeInline,
  type InlineCodeProps as CodeInlineProps,
  inlineCodeVariants,
} from "./code";
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
  type ColumnDef,
  type ColumnFiltersState,
  createColumnHelper,
  DataTable,
  type DataTableColumnMeta,
  type DataTableFacetedFilter,
  type DataTableProps,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type UseDataTableOptions,
  type UseDataTableReturn,
  useDataTable,
  type VisibilityState,
} from "./data-table";
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
// Badge
// ---------------------------------------------------------------------------
export {
  Label,
  type LabelProps,
  type LabelSize,
  labelVariants,
} from "./label";
// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
export {
  Pagination,
  type PaginationProps,
  type PaginationSize,
  type PaginationVariant,
  paginationButtonVariants,
} from "./pagination";
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
  type SelectSize,
  SelectTrigger,
  type SelectTriggerProps,
  SelectValue,
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
  TableHeader,
  type TableHeaderProps,
  type TableHeadProps,
  type TableProps,
  TableRow,
  type TableRowProps,
  type TableSortDirection,
  tableRootVariants,
} from "./table";
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
  type ToastAction,
  type ToastAPI,
  type ToastData,
  ToastItem,
  type ToastItemProps,
  type ToastOptions,
  type ToastPosition,
  ToastProvider,
  type ToastProviderProps,
  type ToastVariant,
  toastVariants,
  useToast,
} from "./toast";
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

// ---------------------------------------------------------------------------
// ColorPicker — placeholder (P2, not yet built)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Combobox
// ---------------------------------------------------------------------------
export {
  Combobox,
  type ComboboxGroup,
  type ComboboxOption,
  type ComboboxProps,
  type ComboboxSize,
  type ComboboxVariant,
  comboboxTriggerVariants,
} from "./combobox";

// ---------------------------------------------------------------------------
// ConfirmDialog
// ---------------------------------------------------------------------------
export {
  ConfirmDialog,
  type ConfirmDialogProps,
  type ConfirmDialogVariant,
} from "./confirm-dialog";

// ---------------------------------------------------------------------------
// CopyButton
// ---------------------------------------------------------------------------
export {
  CopyButton,
  type CopyButtonProps,
  type CopyButtonSize,
  type CopyButtonVariant,
  copyButtonVariants,
} from "./copy-button";

// ---------------------------------------------------------------------------
// DataList
// ---------------------------------------------------------------------------
export {
  DataList,
  DataListDetail,
  type DataListDetailProps,
  type DataListItem,
  type DataListOrientation,
  type DataListProps,
  type DataListSize,
  DataListTerm,
  type DataListTermProps,
  dataListVariants,
} from "./data-list";

// ---------------------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------------------
export {
  DatePicker,
  type DatePickerMode,
  type DatePickerProps,
  type DatePickerSize,
} from "./date-picker";

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------
export {
  EmptyState,
  type EmptyStateProps,
} from "./empty-state";

// ---------------------------------------------------------------------------
// FileUpload
// ---------------------------------------------------------------------------
export {
  FileUpload,
  type FileUploadItem,
  type FileUploadProps,
  type FileUploadSize,
  fileUploadZoneVariants,
} from "./file-upload";

// ---------------------------------------------------------------------------
// HoverCard
// ---------------------------------------------------------------------------
export {
  HoverCard,
  HoverCardContent,
  type HoverCardContentProps,
  type HoverCardProps,
  HoverCardTrigger,
  type HoverCardTriggerProps,
} from "./hover-card";

// ---------------------------------------------------------------------------
// InputGroup
// ---------------------------------------------------------------------------
export {
  InputGroup,
  type InputGroupProps,
  type InputGroupSize,
  type InputGroupVariant,
} from "./input-group";

// ---------------------------------------------------------------------------
// Kbd
// ---------------------------------------------------------------------------
export {
  Kbd,
  type KbdProps,
  type KbdSize,
  kbdVariants,
} from "./kbd";

// ---------------------------------------------------------------------------
// NumberInput
// ---------------------------------------------------------------------------
export {
  NumberInput,
  type NumberInputProps,
  type NumberInputSize,
  type NumberInputVariant,
  numberInputVariants,
} from "./number-input";

// ---------------------------------------------------------------------------
// PinInput
// ---------------------------------------------------------------------------
export {
  PinInput,
  type PinInputProps,
  type PinInputSize,
  type PinInputType,
  type PinInputVariant,
  pinCellVariants,
} from "./pin-input";

// ---------------------------------------------------------------------------
// Resizable
// ---------------------------------------------------------------------------
export {
  ResizableHandle,
  type ResizableHandleProps,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelGroupProps,
  type ResizablePanelProps,
} from "./resizable";

// ---------------------------------------------------------------------------
// SearchInput
// ---------------------------------------------------------------------------
export {
  SearchInput,
  type SearchInputProps,
  type SearchInputSize,
  type SearchInputVariant,
  searchInputVariants,
} from "./search-input";

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
export {
  Sidebar,
  SidebarContent,
  type SidebarContentProps,
  SidebarFooter,
  type SidebarFooterProps,
  SidebarHeader,
  type SidebarHeaderProps,
  SidebarItem,
  type SidebarItemProps,
  SidebarMobileOverlay,
  type SidebarMobileOverlayProps,
  type SidebarProps,
  SidebarProvider,
  type SidebarProviderProps,
  SidebarSection,
  type SidebarSectionProps,
  SidebarToggle,
  type SidebarToggleProps,
  useSidebarContext,
} from "./sidebar";

// ---------------------------------------------------------------------------
// Slider
// ---------------------------------------------------------------------------
export {
  Slider,
  type SliderMark,
  type SliderOrientation,
  type SliderProps,
  type SliderSize,
  type SliderVariant,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderTrackVariants,
} from "./slider";

// ---------------------------------------------------------------------------
// Stat
// ---------------------------------------------------------------------------
export {
  Stat,
  type StatProps,
  type StatTrend,
  statVariants,
} from "./stat";

// ---------------------------------------------------------------------------
// Tag
// ---------------------------------------------------------------------------
export {
  Tag,
  type TagProps,
  type TagSize,
  type TagVariant,
  tagVariants,
} from "./tag";

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------
export {
  Timeline,
  type TimelineAlign,
  TimelineItem,
  type TimelineItemData,
  type TimelineItemProps,
  type TimelineItemStatus,
  type TimelineProps,
  type TimelineSize,
  type TimelineVariant,
} from "./timeline";

// ---------------------------------------------------------------------------
// VisuallyHidden
// ---------------------------------------------------------------------------
export {
  VisuallyHidden,
  type VisuallyHiddenProps,
} from "./visually-hidden";

// ---------------------------------------------------------------------------
// Carousel
// ---------------------------------------------------------------------------
// (already exported above)

// ---------------------------------------------------------------------------
// Resizable
// ---------------------------------------------------------------------------
// (already exported above)
