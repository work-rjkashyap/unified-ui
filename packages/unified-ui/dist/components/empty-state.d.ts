import * as react from 'react';
import { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    animated?: boolean;
    className?: string;
    children?: ReactNode;
}
declare const EmptyState: react.ForwardRefExoticComponent<EmptyStateProps & react.RefAttributes<HTMLDivElement>>;

export { EmptyState, type EmptyStateProps };
