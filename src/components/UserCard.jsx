import { Link } from "react-router-dom";

function UserCard({ user }) {
    return (
        <Link to={`/users/${user.id || user.tempId}`}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow hover:shadow-lg transition-transform hover:-translate-y-1">
                <h3 className="font-medium text-brand">{user.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.phone}</p>
                <p className="text-sm text-gray-500 mt-1">{user.company?.name}</p>
            </div>
        </Link>
    );
}

export default UserCard;