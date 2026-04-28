import { useState } from "react";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Company {
  id: number;
  companyName: string;
  companyCode: string;
  address: string;
  logoUrl: string;
  gstNumber: string;
  panNumber: string;
  mobile: string;
  email: string;
}

interface User {
  id: number;
  fullName: string;
  userType: "Admin" | "Employee" | "Client";
  username: string;
  password: string;
  mobile: string;
  email: string;
}

interface ConfigModuleProps {
  companies: Company[];
  configUsers: User[];
  onAddCompany: (company: Company) => void;
  onDeleteCompany: (id: number) => void;
  onAddUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const ConfigModule = ({
  companies,
  configUsers,
  onAddCompany,
  onDeleteCompany,
  onAddUser,
  onDeleteUser,
}: ConfigModuleProps) => {
  const [activeTab, setActiveTab] = useState("company");
  const [companyFormOpen, setCompanyFormOpen] = useState(false);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    companyCode: "",
    address: "",
    logoUrl: "",
    gstNumber: "",
    panNumber: "",
    mobile: "",
    email: "",
  });

  const [userForm, setUserForm] = useState({
    fullName: "",
    userType: "Employee" as const,
    username: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCompanyForm = () => {
    const newErrors: Record<string, string> = {};
    if (!companyForm.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!companyForm.companyCode.trim()) newErrors.companyCode = "Company code is required";
    if (!companyForm.address.trim()) newErrors.address = "Address is required";
    if (!companyForm.gstNumber.trim()) newErrors.gstNumber = "GST number is required";
    if (!companyForm.panNumber.trim()) newErrors.panNumber = "PAN number is required";
    if (!companyForm.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!companyForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyForm.email))
      newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUserForm = () => {
    const newErrors: Record<string, string> = {};
    if (!userForm.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!userForm.username.trim()) newErrors.username = "Username is required";
    if (!userForm.password.trim()) newErrors.password = "Password is required";
    if (userForm.password !== userForm.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!userForm.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!userForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email))
      newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCompany = () => {
    if (!validateCompanyForm()) return;
    onAddCompany({
      id: Date.now(),
      ...companyForm,
    });
    setCompanyForm({
      companyName: "",
      companyCode: "",
      address: "",
      logoUrl: "",
      gstNumber: "",
      panNumber: "",
      mobile: "",
      email: "",
    });
    setCompanyFormOpen(false);
    setErrors({});
  };

  const handleAddUser = () => {
    if (!validateUserForm()) return;
    const { confirmPassword, ...userWithoutConfirm } = userForm;
    onAddUser({
      id: Date.now(),
      ...userWithoutConfirm,
    });
    setUserForm({
      fullName: "",
      userType: "Employee",
      username: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      email: "",
    });
    setUserFormOpen(false);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="company">Company Configuration</TabsTrigger>
          <TabsTrigger value="user">User Management</TabsTrigger>
        </TabsList>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-6 mt-6">
          {/* Add Company Form */}
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add New Company</CardTitle>
                  <CardDescription>Create a new company configuration</CardDescription>
                </div>
                <button
                  onClick={() => setCompanyFormOpen(!companyFormOpen)}
                  className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>

            {companyFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name *</label>
                    <Input
                      placeholder="Enter company name"
                      value={companyForm.companyName}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, companyName: e.target.value })
                      }
                      className={errors.companyName ? "border-destructive" : ""}
                    />
                    {errors.companyName && (
                      <p className="text-xs text-destructive">{errors.companyName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Code *</label>
                    <Input
                      placeholder="Enter company code"
                      value={companyForm.companyCode}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, companyCode: e.target.value })
                      }
                      className={errors.companyCode ? "border-destructive" : ""}
                    />
                    {errors.companyCode && (
                      <p className="text-xs text-destructive">{errors.companyCode}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Address *</label>
                    <Input
                      placeholder="Enter company address"
                      value={companyForm.address}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, address: e.target.value })
                      }
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-xs text-destructive">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <Input
                      placeholder="Enter logo URL"
                      value={companyForm.logoUrl}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, logoUrl: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">GST Number *</label>
                    <Input
                      placeholder="Enter GST number"
                      value={companyForm.gstNumber}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, gstNumber: e.target.value })
                      }
                      className={errors.gstNumber ? "border-destructive" : ""}
                    />
                    {errors.gstNumber && (
                      <p className="text-xs text-destructive">{errors.gstNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PAN Number *</label>
                    <Input
                      placeholder="Enter PAN number"
                      value={companyForm.panNumber}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, panNumber: e.target.value })
                      }
                      className={errors.panNumber ? "border-destructive" : ""}
                    />
                    {errors.panNumber && (
                      <p className="text-xs text-destructive">{errors.panNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number *</label>
                    <Input
                      placeholder="Enter mobile number"
                      value={companyForm.mobile}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, mobile: e.target.value })
                      }
                      className={errors.mobile ? "border-destructive" : ""}
                    />
                    {errors.mobile && (
                      <p className="text-xs text-destructive">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email ID *</label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={companyForm.email}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, email: e.target.value })
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddCompany}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                >
                  Add Company
                </button>
              </CardContent>
            )}
          </Card>

          {/* Companies List */}
          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle>Companies List ({companies.length})</CardTitle>
              <CardDescription>All registered companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-medium">Company Name</th>
                      <th className="text-left py-3 px-4 font-medium">Code</th>
                      <th className="text-left py-3 px-4 font-medium">GST Number</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => (
                      <tr key={company.id} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4">{company.companyName}</td>
                        <td className="py-3 px-4">{company.companyCode}</td>
                        <td className="py-3 px-4">{company.gstNumber}</td>
                        <td className="py-3 px-4">{company.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => onDeleteCompany(company.id)}
                              className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Tab */}
        <TabsContent value="user" className="space-y-6 mt-6">
          {/* Add User Form */}
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add New User</CardTitle>
                  <CardDescription>Create a new user account</CardDescription>
                </div>
                <button
                  onClick={() => setUserFormOpen(!userFormOpen)}
                  className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>

            {userFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      placeholder="Enter full name"
                      value={userForm.fullName}
                      onChange={(e) =>
                        setUserForm({ ...userForm, fullName: e.target.value })
                      }
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Type *</label>
                    <Select
                      value={userForm.userType}
                      onValueChange={(value) =>
                        setUserForm({
                          ...userForm,
                          userType: value as "Admin" | "Employee" | "Client",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                        <SelectItem value="Client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username *</label>
                    <Input
                      placeholder="Enter username"
                      value={userForm.username}
                      onChange={(e) =>
                        setUserForm({ ...userForm, username: e.target.value })
                      }
                      className={errors.username ? "border-destructive" : ""}
                    />
                    {errors.username && (
                      <p className="text-xs text-destructive">{errors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number *</label>
                    <Input
                      placeholder="Enter mobile number"
                      value={userForm.mobile}
                      onChange={(e) =>
                        setUserForm({ ...userForm, mobile: e.target.value })
                      }
                      className={errors.mobile ? "border-destructive" : ""}
                    />
                    {errors.mobile && (
                      <p className="text-xs text-destructive">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email ID *</label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password *</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={userForm.password}
                        onChange={(e) =>
                          setUserForm({ ...userForm, password: e.target.value })
                        }
                        className={errors.password ? "border-destructive" : ""}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password *</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={userForm.confirmPassword}
                        onChange={(e) =>
                          setUserForm({ ...userForm, confirmPassword: e.target.value })
                        }
                        className={errors.confirmPassword ? "border-destructive" : ""}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddUser}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                >
                  Add User
                </button>
              </CardContent>
            )}
          </Card>

          {/* Users List */}
          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle>Users List ({configUsers.length})</CardTitle>
              <CardDescription>All registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-medium">Full Name</th>
                      <th className="text-left py-3 px-4 font-medium">User Type</th>
                      <th className="text-left py-3 px-4 font-medium">Username</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configUsers.map((user) => (
                      <tr key={user.id} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4">{user.fullName}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                            {user.userType}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.username}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => onDeleteUser(user.id)}
                              className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigModule;
