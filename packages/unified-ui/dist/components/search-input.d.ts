import * as react from 'react';
import { InputHTMLAttributes } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const searchInputVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    variant?: "default" | "filled" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SearchInputSize = "sm" | "md" | "lg";
type SearchInputVariant = "default" | "filled";
interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onDebouncedChange?: (value: string) => void;
    debounce?: number;
    size?: SearchInputSize;
    variant?: SearchInputVariant;
    shortcut?: string;
    showClear?: boolean;
    loading?: boolean;
    className?: string;
}
declare const SearchInput: react.ForwardRefExoticComponent<SearchInputProps & react.RefAttributes<HTMLInputElement>>;

export { SearchInput, type SearchInputProps, type SearchInputSize, type SearchInputVariant, searchInputVariants };
