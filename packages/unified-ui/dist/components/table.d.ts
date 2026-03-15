import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

type TableDensity = "compact" | "comfortable";
type TableSortDirection = "asc" | "desc";
type TableAlign = "left" | "center" | "right";
declare const tableRootVariants: (props?: ({
    density?: "compact" | "comfortable" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TableProps extends React.HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableRootVariants> {
    /**
     * Row height density.
     * @default "comfortable"
     */
    density?: TableDensity;
    /**
     * Alternate row background color for readability.
     * @default false
     */
    striped?: boolean;
    /**
     * Highlight rows on hover.
     * @default false
     */
    hoverable?: boolean;
    /**
     * Add borders between cells.
     * @default false
     */
    bordered?: boolean;
    /**
     * Wrap the table in a horizontally-scrollable container
     * so it doesn't overflow on small screens.
     * @default true
     */
    responsive?: boolean;
    /** Additional CSS classes for the wrapper (when responsive). */
    wrapperClassName?: string;
    /** Additional CSS classes for the table element. */
    className?: string;
}
/**
 * Table — semantic `<table>` element with design-system tokens.
 *
 * Provides context for density, striping, hovering, and borders to all
 * sub-components.
 *
 * @example
 * ```tsx
 * <Table striped hoverable density="compact" bordered>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead align="right">Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Alice</TableCell>
 *       <TableCell align="right">$1,200</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
declare const Table: react.ForwardRefExoticComponent<TableProps & react.RefAttributes<HTMLTableElement>>;
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableHeader — wraps `<thead>` with design-system styles.
 */
declare const TableHeader: react.ForwardRefExoticComponent<TableHeaderProps & react.RefAttributes<HTMLTableSectionElement>>;
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableBody — wraps `<tbody>` with design-system styles.
 */
declare const TableBody: react.ForwardRefExoticComponent<TableBodyProps & react.RefAttributes<HTMLTableSectionElement>>;
interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableFooter — wraps `<tfoot>` with design-system styles.
 */
declare const TableFooter: react.ForwardRefExoticComponent<TableFooterProps & react.RefAttributes<HTMLTableSectionElement>>;
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /**
     * Whether this row is selected / highlighted.
     * @default false
     */
    selected?: boolean;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableRow — wraps `<tr>` with design-system styles.
 */
declare const TableRow: react.ForwardRefExoticComponent<TableRowProps & react.RefAttributes<HTMLTableRowElement>>;
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    /**
     * Text alignment within the cell.
     * @default "left"
     */
    align?: TableAlign;
    /**
     * Whether this column is sortable.
     * When true, renders a sort indicator and makes the header clickable.
     * @default false
     */
    sortable?: boolean;
    /**
     * Current sort direction. Only relevant when `sortable` is true.
     * - `"asc"` — ascending (renders up chevron)
     * - `"desc"` — descending (renders down chevron)
     * - `undefined` — not currently sorted (renders neutral indicator)
     */
    sorted?: TableSortDirection;
    /**
     * Callback fired when the sortable header is clicked.
     * Only relevant when `sortable` is true.
     */
    onSort?: () => void;
    /**
     * Whether the header should stick to the top of the scroll container.
     * @default false
     */
    sticky?: boolean;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableHead — wraps `<th>` with design-system styles.
 *
 * Supports sort indicators for sortable columns. The sort logic is
 * consumer-owned — this component only provides the visual indicator
 * and click handler.
 *
 * @example
 * ```tsx
 * <TableHead
 *   sortable
 *   sorted="asc"
 *   onSort={() => toggleSort("name")}
 * >
 *   Name
 * </TableHead>
 * ```
 */
declare const TableHead: react.ForwardRefExoticComponent<TableHeadProps & react.RefAttributes<HTMLTableCellElement>>;
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    /**
     * Text alignment within the cell.
     * @default "left"
     */
    align?: TableAlign;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableCell — wraps `<td>` with design-system styles.
 */
declare const TableCell: react.ForwardRefExoticComponent<TableCellProps & react.RefAttributes<HTMLTableCellElement>>;
interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableCaption — wraps `<caption>` with design-system styles.
 *
 * Renders at the bottom of the table by default (via `caption-bottom`
 * on the root `<table>`).
 */
declare const TableCaption: react.ForwardRefExoticComponent<TableCaptionProps & react.RefAttributes<HTMLTableCaptionElement>>;

export { Table, type TableAlign, TableBody, type TableBodyProps, TableCaption, type TableCaptionProps, TableCell, type TableCellProps, type TableDensity, TableFooter, type TableFooterProps, TableHead, type TableHeadProps, TableHeader, type TableHeaderProps, type TableProps, TableRow, type TableRowProps, type TableSortDirection, tableRootVariants };
