import { Link, useNavigate } from "react-router-dom";

function UserCard({ user }) {
    const nav = useNavigate();
    const initial = (user.name?.[0] || "?").toUpperCase();
    const id = user.id || user.tempId;

    return (
        <Link to={`/users/${id}`}>
            <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-transparent hover:border-purple-400/50 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white grid place-items-center text-sm font-semibold shadow">
                        {initial}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-medium text-purple-700 dark:text-purple-300 truncate">{user.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{user.email}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.phone}</p>
                <p className="text-xs text-gray-500 mt-1">{user.company?.name}</p>

                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nav(`/edit/${id}`); }}
                    className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md text-white bg-gradient-to-r from-purple-500 to-purple-700 shadow hover:shadow-md active:scale-[0.98] transition-all"
                >Edit</button>
            </div>
        </Link>
    );
}

export default UserCard;