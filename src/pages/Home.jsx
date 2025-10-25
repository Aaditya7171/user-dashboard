import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function Home() {
    const [users, setUsers] = useState([]);
    const [localUsers, setLocalUsers] = useState(() => {
        return JSON.parse(localStorage.getItem("addedUsers")) || [];
    })
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
            setLoading(false);
        })
    }, []);

    const all = [...localUsers, ...users];
    const filtered = all.filter((u) =>
        `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <div>
            <h1 className="text-x1 font-semibold mb-4 text-brand">Users</h1>
            <SearchBar value={q} onChange={setQ} />
            {filtered.length === 0 && <EmptyState text="No users found." />}
            <div className="grid gap-4 sm:grid-cols-2 lg-grid-cols-3">
                {filtered.map((user) => (
                    <UserCard key={user.id || user.tempId} user={user} />
                ))}
            </div>
        </div>
    );
}

export default Home;