import { useEffect, userState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../api/api";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function UserDetails() {
    const { id } = useParams();
    const nav = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(id).then((res) => setUser(res.data));
    }, [id]);

    if (!user) return <Loading />

    return (
        <div className="bg-white p-6 rounded-md shadow max-w-xl mx-auto">
            <button onClick={() => nav(-1)} className="text-blue-600 mb-4 text-sm">← Back</button>
            <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
            <div className="space-y-1 text-sm">
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Company: {user.company?.name}</p>
                <p>Website: {user.website}</p>
            </div>
        </div >
    );
}
export default UserDetails;