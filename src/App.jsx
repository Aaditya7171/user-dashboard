import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import AddUser from "./pages/AddUser";
import Header from "./components/Header";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Header />
      <div className="bg-gradient-to-r from-brand to-brand-dark/80 text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          Manage and view all users in one place
        </div>
      </div>
      <Toaster richColors position="top-right" closeButton />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<AddUser mode="edit" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;