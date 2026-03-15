import * as react from 'react';
import { ReactNode } from 'react';

interface CarouselContextValue {
    current: number;
    total: number;
    prev: () => void;
    next: () => void;
    goTo: (index: number) => void;
    direction: "left" | "right";
    orientation: "horizontal" | "vertical";
}
declare function useCarouselContext(): CarouselContextValue;
interface CarouselProps {
    items: ReactNode[];
    defaultIndex?: number;
    index?: number;
    onIndexChange?: (i: number) => void;
    orientation?: "horizontal" | "vertical";
    autoplay?: boolean;
    autoplayInterval?: number;
    loop?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    className?: string;
    itemClassName?: string;
}
declare const Carousel: react.ForwardRefExoticComponent<CarouselProps & react.RefAttributes<HTMLDivElement>>;

export { Carousel, type CarouselProps, useCarouselContext };
