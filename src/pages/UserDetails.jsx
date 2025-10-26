import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../api/api";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function UserDetails() {
    const { id } = useParams();
    const nav = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("addedUsers")) || [];
        const edited = JSON.parse(localStorage.getItem("editedUsers")) || {};
        const localMatch = local.find(u => String(u.tempId) === String(id));
        if (localMatch) {
            const editedLocal = edited[localMatch.tempId] || {};
            setUser({ ...localMatch, ...editedLocal, company: editedLocal.company || localMatch.company });
            return;
        }
        getUser(id).then((res) => {
            const apiUser = res.data;
            const editedApi = edited[apiUser.id] || {};
            setUser({ ...apiUser, ...editedApi, company: editedApi.company || apiUser.company });
        }).catch(() => setUser(undefined));
    }, [id]);

    if (user === undefined) return <EmptyState text="User not found" />;
    if (!user) return <Loading />;

    const initial = (user.name?.[0] || "?").toUpperCase();

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl mx-auto border border-purple-200/50 dark:border-purple-900/30">
            <button onClick={() => nav(-1)} className="text-sm mb-4 text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200 transition-colors">← Back</button>
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white grid place-items-center text-base font-semibold shadow">
                    {initial}
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-purple-800 bg-clip-text text-transparent mb-1">{user.name}</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium text-purple-700 dark:text-purple-300">Email:</span> {user.email}</p>
                            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium text-purple-700 dark:text-purple-300">Phone:</span> {user.phone}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium text-purple-700 dark:text-purple-300">Company:</span> {user.company?.name}</p>
                            <p className="text-gray-600 dark:text-gray-300"><span className="font-medium text-purple-700 dark:text-purple-300">Website:</span> {user.website || "—"}</p>
                        </div>
                    </div>

                    {user.address && (
                        <div className="mt-5 p-4 rounded-lg border border-purple-200/60 dark:border-purple-900/30 bg-purple-50/40 dark:bg-purple-950/10">
                            <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-3">Address</h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                <div className="space-y-1">
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Street:</span> {user.address?.street || "—"}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Suite:</span> {user.address?.suite || "—"}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">City:</span> {user.address?.city || "—"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Zipcode:</span> {user.address?.zipcode || "—"}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Latitude:</span> {user.address?.geo?.lat || "—"}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Longitude:</span> {user.address?.geo?.lng || "—"}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default UserDetails;