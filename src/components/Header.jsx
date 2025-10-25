import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
    return (
        <header className="bg-purple-100 dark:bg-purple-900/80 backdrop-blur supports-[backdrop-filter]:bg-purple-100/70 dark:supports-[backdrop-filter]:bg-purple-900/60 shadow-sm">
            <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="font-semibold text-lg bg-gradient-to-r from-purple-500 to-purple-800 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                    User Dashboard
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        to="/add"
                        className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-800 shadow hover:shadow-md active:scale-[0.98] transition-all"
                    > Add User
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;