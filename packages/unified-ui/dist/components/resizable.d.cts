import * as react_jsx_runtime from 'react/jsx-runtime';
import { SeparatorProps, Panel, GroupProps, PanelProps } from 'react-resizable-panels';

interface ResizablePanelGroupProps extends Omit<GroupProps, "orientation"> {
    /** Resize direction — maps to the underlying `orientation` prop. */
    direction?: "horizontal" | "vertical";
}
declare function ResizablePanelGroup({ direction, className, ...rest }: ResizablePanelGroupProps): react_jsx_runtime.JSX.Element;
declare namespace ResizablePanelGroup {
    var displayName: string;
}
type ResizablePanelProps = PanelProps;
declare const ResizablePanel: typeof Panel;
interface ResizableHandleProps extends SeparatorProps {
    /** Show a visible grip handle in the center of the separator. */
    withHandle?: boolean;
}
declare function ResizableHandle({ withHandle, className, ...rest }: ResizableHandleProps): react_jsx_runtime.JSX.Element;
declare namespace ResizableHandle {
    var displayName: string;
}

export { ResizableHandle, type ResizableHandleProps, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, type ResizablePanelProps };
