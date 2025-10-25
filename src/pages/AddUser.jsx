import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { getUser } from "../api/api";

export default function AddUser({ mode = "add" }) {
    const nav = useNavigate();
    const { id } = useParams();
    const isEdit = mode === "edit";
    const [loading, setLoading] = useState(isEdit);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
    });

    useEffect(() => {
        if (!isEdit) return;
        const local = JSON.parse(localStorage.getItem("addedUsers")) || [];
        const edited = JSON.parse(localStorage.getItem("editedUsers")) || {};
        const localMatch = local.find(u => String(u.tempId) === String(id));
        if (localMatch) {
            const merged = { ...localMatch, ...(edited[localMatch.tempId] || {}) };
            setForm({
                name: merged.name || "",
                email: merged.email || "",
                phone: merged.phone || "",
                company: merged.company?.name || "",
                website: merged.website || "",
            });
            setLoading(false);
            return;
        }
        getUser(id).then(res => {
            const apiUser = res.data;
            const merged = { ...apiUser, ...(edited[apiUser.id] || {}) };
            setForm({
                name: merged.name || "",
                email: merged.email || "",
                phone: merged.phone || "",
                company: merged.company?.name || "",
                website: merged.website || "",
            });
        }).finally(() => setLoading(false));
    }, [id, isEdit]);

    const handleChange = (k, v) => {
        setForm({ ...form, [k]: v });
    };

    const submit = () => {
        if (!form.name || !form.email) return toast.error("Fill required fields");

        if (isEdit) {
            const key = id;
            const edited = JSON.parse(localStorage.getItem("editedUsers")) || {};
            const payload = { ...form, company: { name: form.company } };
            edited[key] = payload;
            localStorage.setItem("editedUsers", JSON.stringify(edited));
            toast.success("User updated");
            nav(`/users/${id}`);
            return;
        }

        const newUser = {
            tempId: Date.now(),
            ...form,
            company: { name: form.company },
        };

        const prev = JSON.parse(localStorage.getItem("addedUsers")) || [];
        localStorage.setItem("addedUsers", JSON.stringify([newUser, ...prev]));

        toast.success("User added");
        nav("/");
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-purple-200/50 dark:border-purple-900/30 transition-transform hover:shadow-lg">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-500 to-purple-800 bg-clip-text text-transparent">
                    {isEdit ? "Edit User" : "Add User"}
                </h2>

                {loading ? (
                    <div className="h-24 grid place-items-center text-sm text-gray-500">Loading...</div>
                ) : (
                    <div className="space-y-3">
                        <div>
                            <Label>Name</Label>
                            <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                        </div>

                        <div>
                            <Label>Company</Label>
                            <Input value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
                        </div>

                        <div>
                            <Label>Website</Label>
                            <Input value={form.website} onChange={(e) => handleChange("website", e.target.value)} />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 mt-4">
                    <Button onClick={submit} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow hover:shadow-md active:scale-[0.98] transition-all">
                        {isEdit ? "Save Changes" : "Submit"}
                    </Button>
                    <Button onClick={() => nav(-1)} variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-300">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
