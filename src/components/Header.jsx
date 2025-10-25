import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm">
            <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="font-semibold text-lg text-brand">
                    User Dashboard
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        to="/add"
                        className="bg-brand text-white px-3 py-1 rounded-md text-sm"
                    > Add User
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;