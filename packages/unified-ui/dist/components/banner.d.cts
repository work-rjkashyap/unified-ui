import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const bannerVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | "primary" | null | undefined;
    position?: "inline" | "bottom" | "top" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BannerVariant = "default" | "info" | "success" | "warning" | "danger" | "primary";
type BannerPosition = "top" | "bottom" | "inline";
interface BannerProps {
    variant?: BannerVariant;
    position?: BannerPosition;
    dismissible?: boolean;
    onDismiss?: () => void;
    dismissLabel?: string;
    icon?: ReactNode;
    action?: ReactNode;
    visible?: boolean;
    defaultVisible?: boolean;
    className?: string;
    children?: ReactNode;
    id?: string;
    style?: React.CSSProperties;
    role?: string;
    "aria-label"?: string;
    "aria-live"?: "off" | "assertive" | "polite";
}
declare const Banner: react.ForwardRefExoticComponent<BannerProps & react.RefAttributes<HTMLDivElement>>;

export { Banner, type BannerPosition, type BannerProps, type BannerVariant, bannerVariants };
