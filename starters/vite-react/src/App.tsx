import { Button } from "@work-rjkashyap/unified-ui/components";
import { Heading, Body } from "@work-rjkashyap/unified-ui/primitives";
import { useDSTheme } from "@work-rjkashyap/unified-ui/theme";

function App() {
    const { theme, setTheme } = useDSTheme();

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-8 text-foreground">
            <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8">
                <div className="space-y-2 text-center">
                    <Heading level={1}>Unified UI</Heading>
                    <Body color="muted">
                        Your starter project is ready. Start building!
                    </Body>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <Button variant="primary">Get Started</Button>
                    <Button
                        variant="secondary"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        Toggle Theme
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default App;
