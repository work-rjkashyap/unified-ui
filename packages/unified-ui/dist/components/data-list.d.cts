import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const dataListVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DataListOrientation = "horizontal" | "vertical";
type DataListSize = "sm" | "md" | "lg";
interface DataListItem {
    term: ReactNode;
    detail: ReactNode;
    key?: string;
}
interface DataListProps {
    items: DataListItem[];
    orientation?: DataListOrientation;
    size?: DataListSize;
    dividers?: boolean;
    animated?: boolean;
    className?: string;
}
interface DataListTermProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children?: ReactNode;
}
interface DataListDetailProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children?: ReactNode;
}
declare const DataListTerm: react.ForwardRefExoticComponent<DataListTermProps & react.RefAttributes<HTMLElement>>;
declare const DataListDetail: react.ForwardRefExoticComponent<DataListDetailProps & react.RefAttributes<HTMLElement>>;
declare const DataList: react.ForwardRefExoticComponent<DataListProps & react.RefAttributes<HTMLDListElement>>;

export { DataList, DataListDetail, type DataListDetailProps, type DataListItem, type DataListOrientation, type DataListProps, type DataListSize, DataListTerm, type DataListTermProps, dataListVariants };
