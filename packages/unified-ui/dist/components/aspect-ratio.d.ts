import * as react from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { AspectRatio as AspectRatio$1 } from 'radix-ui';

interface AspectRatioProps extends ComponentPropsWithoutRef<typeof AspectRatio$1.Root> {
    className?: string;
}
declare const AspectRatio: react.ForwardRefExoticComponent<AspectRatioProps & react.RefAttributes<HTMLDivElement>>;

export { AspectRatio, type AspectRatioProps };
