import { Switch } from "./ui/switch";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
            <Switch
                checked={theme === "dark"}
                onCheckedChange={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                }
            />
        </div>
    );
}