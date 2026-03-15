import * as react from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { VisuallyHidden as VisuallyHidden$1 } from 'radix-ui';

interface VisuallyHiddenProps extends ComponentPropsWithoutRef<typeof VisuallyHidden$1.Root> {
}
declare const VisuallyHidden: react.ForwardRefExoticComponent<VisuallyHiddenProps & react.RefAttributes<HTMLSpanElement>>;

export { VisuallyHidden, type VisuallyHiddenProps };
