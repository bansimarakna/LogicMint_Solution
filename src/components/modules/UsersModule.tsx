import { useState } from "react";
import { Trash2, Plus, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

interface UsersModuleProps {
  users: UserData[];
  onAddUser: (user: UserData) => void;
  onDeleteUser: (id: number) => void;
}

const UsersModule = ({ users, onAddUser, onDeleteUser }: UsersModuleProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onAddUser({
      id: Date.now(),
      ...formData,
    });
    setFormData({ name: "", email: "", mobile: "", address: "" });
    setFormOpen(false);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Add User Form */}
      <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>Create a new user account</CardDescription>
            </div>
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </CardHeader>

        {formOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name *</label>
              <Input
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile *</label>
              <Input
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className={errors.mobile ? "border-destructive" : ""}
              />
              {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address *</label>
              <Input
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 glow-button py-2"
              >
                Add User
              </button>
              <button
                onClick={() => {
                  setFormOpen(false);
                  setErrors({});
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-primary/20 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Users List */}
      <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Users List ({users.length})</CardTitle>
          <CardDescription>All registered users</CardDescription>
        </CardHeader>

        <CardContent>
          {users.length === 0 ? (
            <div className="p-8 text-center">
              <User size={32} className="mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">No users yet. Create your first user!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Mobile</th>
                    <th className="text-left py-3 px-4 font-semibold">Address</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.mobile}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.address}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersModule;
