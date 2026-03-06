"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "../../lib/cn";

export function ThemeToggle({
	className,
	mode = "light-dark",
	...props
}: ComponentProps<"button"> & {
	mode?: "light-dark" | "light-dark-system";
}) {
	const { setTheme, theme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const value = mounted
		? mode === "light-dark"
			? resolvedTheme
			: theme
		: null;

	return (
		<button
			type="button"
			className={cn(
				"inline-flex size-8 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:text-fd-foreground focus-visible:outline-none",
				className,
			)}
			aria-label="Toggle theme"
			onClick={() => {
				if (mode === "light-dark-system") {
					const modes = ["light", "dark", "system"] as const;
					const next =
						modes[
							(modes.indexOf(
								theme as "light" | "dark" | "system",
							) +
								1) %
								3
						];
					setTheme(next);
				} else {
					setTheme(resolvedTheme === "light" ? "dark" : "light");
				}
			}}
			{...props}
		>
			<Sun
				className={cn(
					"size-4 transition-all duration-300",
					value !== "light" && "scale-0 rotate-90 opacity-0 absolute",
				)}
			/>
			<Moon
				className={cn(
					"size-4 transition-all duration-300",
					value !== "dark" && "scale-0 rotate-90 opacity-0 absolute",
				)}
			/>
		</button>
	);
}
