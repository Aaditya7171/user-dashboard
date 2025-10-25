import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function AddUser() {
    const nav = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });

    const handleChange = (k, v) => {
        setForm({ ...form, [k]: v });
    };

    const submit = () => {
        if (!form.name || !form.email) return toast.error("Fill required fields");

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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-brand">Add User</h2>

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
            </div>

            <Button onClick={submit} className="bg-brand hover:bg-purple-700 text-white mt-4">
                Submit
            </Button>
        </div>
    );
}
