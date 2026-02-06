"use client";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { buttonVariants } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type LanguageSelectProps = ComponentProps<"button">;

export function LanguageToggle(props: LanguageSelectProps): React.ReactElement {
  const context = useI18n();
  if (!context.locales) throw new Error("Missing `<I18nProvider />`");

  return (
    <Popover>
      <PopoverTrigger
        aria-label={context.text.chooseLanguage}
        {...props}
        className={cn(
          buttonVariants({
            color: "ghost",
            className: "gap-1.5 p-1.5",
          }),
          props.className,
        )}
      >
        {props.children}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-x-hidden p-1 bg-background/80 backdrop-blur-xl border-border/40 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="relative z-10">
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            {context.text.chooseLanguage}
          </p>
          <div className="flex flex-col gap-0.5">
            {context.locales.map((item) => (
              <button
                key={item.locale}
                type="button"
                className={cn(
                  "px-3 py-2 text-start text-xs font-medium rounded-lg transition-colors",
                  item.locale === context.locale
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent/50 hover:text-foreground",
                )}
                onClick={() => {
                  context.onChange?.(item.locale);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function LanguageToggleText(props: ComponentProps<"span">) {
  const context = useI18n();
  const text = context.locales?.find(
    (item) => item.locale === context.locale,
  )?.name;

  return <span {...props}>{text}</span>;
}
