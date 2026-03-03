"use client";

// ============================================================================
// Unified UI — Steps Component
// ============================================================================
// A step indicator / wizard progress component for multi-step flows.
// Supports horizontal and vertical orientations, multiple variants,
// icon overrides, descriptions, and clickable steps.
//
// Features:
//   - Horizontal and vertical orientations
//   - Numbered, icon, or dot step indicators
//   - Status states: complete, active, upcoming
//   - Connector lines between steps
//   - Clickable steps for wizard navigation
//   - Optional step descriptions
//   - WCAG AA accessible: aria-current, role="list", keyboard navigation
//
// All visual values come from CSS custom properties. NEVER hardcode values.
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type ReactNode,
  useContext,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type StepsOrientation = "horizontal" | "vertical";
export type StepsVariant = "default" | "outline" | "dots";
export type StepStatus = "complete" | "active" | "upcoming";

export interface StepsProps extends ComponentPropsWithoutRef<"ol"> {
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

export interface StepProps extends ComponentPropsWithoutRef<"li"> {
  /** Optional custom icon to override the default number/check. */
  icon?: ReactNode;
  /** Optional title for the step. */
  title?: string;
  /** Optional description beneath the title. */
  description?: string;
  className?: string;
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface StepsContextValue {
  currentStep: number;
  orientation: StepsOrientation;
  variant: StepsVariant;
  totalSteps: number;
  onStepClick?: (index: number) => void;
}

const StepsContext = createContext<StepsContextValue>({
  currentStep: 0,
  orientation: "horizontal",
  variant: "default",
  totalSteps: 0,
});

// ---------------------------------------------------------------------------
// StepItem Context (carries per-step index)
// ---------------------------------------------------------------------------
const StepIndexContext = createContext<number>(0);

// ---------------------------------------------------------------------------
// Internal: Check icon
// ---------------------------------------------------------------------------
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Steps Root
// ---------------------------------------------------------------------------

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
export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  {
    currentStep,
    orientation = "horizontal",
    variant = "default",
    onStepClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Count the children to know total steps
  const childArray = Array.isArray(children)
    ? children
    : children
      ? [children]
      : [];
  const totalSteps = childArray.length;

  return (
    <StepsContext.Provider
      value={{ currentStep, orientation, variant, totalSteps, onStepClick }}
    >
      <ol
        ref={ref}
        aria-label="Steps"
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "flex-row items-start gap-0"
            : "flex-col gap-0",
          className,
        )}
        data-ds=""
        data-ds-component="steps"
        data-ds-orientation={orientation}
        {...rest}
      >
        {childArray.map((child, index) => (
          <StepIndexContext.Provider key={index} value={index}>
            {child}
          </StepIndexContext.Provider>
        ))}
      </ol>
    </StepsContext.Provider>
  );
});
Steps.displayName = "Steps";

// ---------------------------------------------------------------------------
// Step
// ---------------------------------------------------------------------------

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
export const Step = forwardRef<HTMLLIElement, StepProps>(function Step(
  { icon, title, description, className, children, ...rest },
  ref,
) {
  const { currentStep, orientation, variant, totalSteps, onStepClick } =
    useContext(StepsContext);
  const index = useContext(StepIndexContext);

  const status: StepStatus =
    index < currentStep
      ? "complete"
      : index === currentStep
        ? "active"
        : "upcoming";

  const isLast = index === totalSteps - 1;
  const isClickable = !!onStepClick;

  // Indicator content
  const indicatorContent =
    variant === "dots" ? null : status === "complete" &&
      variant !== "outline" ? (
      <CheckIcon />
    ) : (
      <span>{index + 1}</span>
    );

  const indicator = (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        "font-medium text-xs leading-none",
        "transition-colors duration-fast ease-standard",
        // Dot variant
        variant === "dots"
          ? cn(
              "size-2 rounded-full",
              status === "complete" && "bg-primary",
              status === "active" && "bg-primary",
              status === "upcoming" && "bg-border",
            )
          : cn(
              // Default & outline
              "size-7 rounded-full border-2",
              variant === "default"
                ? cn(
                    status === "complete" &&
                      "border-primary bg-primary text-primary-foreground",
                    status === "active" &&
                      "border-primary bg-background text-primary",
                    status === "upcoming" &&
                      "border-muted bg-background text-muted-foreground",
                  )
                : cn(
                    // outline variant
                    status === "complete" &&
                      "border-primary bg-primary/10 text-primary",
                    status === "active" &&
                      "border-primary bg-background text-primary",
                    status === "upcoming" &&
                      "border-muted bg-background text-muted-foreground",
                  ),
            ),
      )}
      aria-hidden={variant === "dots"}
    >
      {indicatorContent}
    </div>
  );

  const labelContent = (title || description) && (
    <div
      className={cn(
        orientation === "horizontal" ? "mt-2 text-center" : "ml-3 text-left",
      )}
    >
      {title && (
        <p
          className={cn(
            "text-sm font-medium leading-5",
            status === "active" && "text-foreground",
            status === "complete" && "text-foreground",
            status === "upcoming" && "text-muted-foreground",
          )}
        >
          {title}
        </p>
      )}
      {description && (
        <p className="text-xs leading-4 text-muted-foreground mt-0.5">
          {description}
        </p>
      )}
    </div>
  );

  // Connector line
  const connector = !isLast && (
    <div
      aria-hidden="true"
      className={cn(
        "flex-1 transition-colors duration-fast ease-standard",
        orientation === "horizontal"
          ? "mx-2 mt-3.5 h-px"
          : "ml-3.5 my-1 w-px self-stretch",
        index < currentStep ? "bg-primary" : "bg-border",
      )}
    />
  );

  const stepContent = (
    <>
      {orientation === "horizontal" ? (
        <div className="flex flex-col items-center">
          {indicator}
          {labelContent}
        </div>
      ) : (
        <div className="flex items-start">
          <div className="flex flex-col items-center">
            {indicator}
            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  "mt-1 w-px flex-1 self-stretch transition-colors duration-fast ease-standard",
                  "min-h-[24px]",
                  index < currentStep ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
          {labelContent}
        </div>
      )}
    </>
  );

  return (
    <li
      ref={ref}
      aria-current={status === "active" ? "step" : undefined}
      data-ds=""
      data-ds-component="step"
      data-ds-status={status}
      className={cn(
        orientation === "horizontal"
          ? "flex flex-1 items-start"
          : "flex flex-col",
        className,
      )}
      {...rest}
    >
      {orientation === "horizontal" ? (
        <>
          {isClickable ? (
            <button
              type="button"
              onClick={() => onStepClick(index)}
              className={cn(
                "flex flex-1 flex-col items-center",
                isClickable && "cursor-pointer",
                status === "upcoming" && !isClickable && "cursor-default",
              )}
              aria-label={
                title ? `Go to step: ${title}` : `Go to step ${index + 1}`
              }
            >
              {indicator}
              {labelContent}
            </button>
          ) : (
            <div className="flex flex-1 flex-col items-center">
              {indicator}
              {labelContent}
            </div>
          )}
          {connector}
        </>
      ) : (
        stepContent
      )}
    </li>
  );
});
Step.displayName = "Step";
