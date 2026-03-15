import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type StepsOrientation = "horizontal" | "vertical";
type StepsVariant = "default" | "outline" | "dots";
type StepStatus = "complete" | "active" | "upcoming";
interface StepsProps extends ComponentPropsWithoutRef<"ol"> {
    /** The index of the currently active step (0-based). */
    currentStep: number;
    /** Orientation of the steps. @default "horizontal" */
    orientation?: StepsOrientation;
    /** Visual variant. @default "default" */
    variant?: StepsVariant;
    /** Total number of steps — derived from children if not provided. */
    count?: number;
    /** Callback when a step is clicked (for clickable wizards). */
    onStepClick?: (index: number) => void;
    className?: string;
    children: ReactNode;
}
interface StepProps extends ComponentPropsWithoutRef<"li"> {
    /** Optional custom icon to override the default number/check. */
    icon?: ReactNode;
    /** Optional title for the step. */
    title?: string;
    /** Optional description beneath the title. */
    description?: string;
    className?: string;
    children?: ReactNode;
}
/**
 * Steps — a wizard progress indicator.
 *
 * Wrap `Step` components as children. The `currentStep` prop (0-based index)
 * drives the visual state of each step (complete, active, upcoming).
 *
 * @example
 * ```tsx
 * <Steps currentStep={1}>
 *   <Step title="Account" description="Create your account" />
 *   <Step title="Profile" description="Fill in your details" />
 *   <Step title="Confirm" description="Review and submit" />
 * </Steps>
 *
 * // Vertical orientation
 * <Steps currentStep={0} orientation="vertical">
 *   <Step title="Step 1" description="First step" />
 *   <Step title="Step 2" description="Second step" />
 * </Steps>
 *
 * // Clickable steps
 * <Steps currentStep={activeStep} onStepClick={setActiveStep}>
 *   <Step title="Step 1" />
 *   <Step title="Step 2" />
 *   <Step title="Step 3" />
 * </Steps>
 * ```
 */
declare const Steps: react.ForwardRefExoticComponent<StepsProps & react.RefAttributes<HTMLOListElement>>;
/**
 * Step — a single step in the Steps wizard.
 *
 * Must be a direct child of `Steps`. Automatically derives its visual state
 * (complete, active, upcoming) from the parent `currentStep` prop.
 *
 * @example
 * ```tsx
 * <Step title="Account" description="Set up your account" />
 *
 * // With a custom icon
 * <Step title="Upload" icon={<Upload className="size-4" />} />
 * ```
 */
declare const Step: react.ForwardRefExoticComponent<StepProps & react.RefAttributes<HTMLLIElement>>;

export { Step, type StepProps, type StepStatus, Steps, type StepsOrientation, type StepsProps, type StepsVariant };
