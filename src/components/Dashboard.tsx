import { useState, useEffect } from "react";
import { 
  Users, Package, ShoppingCart, LogOut, AlertCircle, 
  Moon, Sun, Settings, Briefcase, Menu, X 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UsersModule from "./modules/UsersModule";
import CatalogModule from "./modules/CatalogModule";
import SalesModule from "./modules/SalesModule";
import ConfigModule from "./modules/ConfigModule";
import EntityModule from "./modules/EntityModule";

// --- Interfaces (Tamara badha interfaces same rakhiya chhe) ---
interface UserData { id: number; name: string; email: string; mobile: string; address: string; }
interface ItemData { id: number; itemName: string; itemCode: string; unit: string; materialType: string; quantity: number; price: number; description: string; }
interface InvoiceData { id: number; invoiceNumber: string; customerName: string; email: string; items: Array<{ id: number; itemName: string; quantity: number; price: number }>; totalAmount: number; status: "pending" | "completed" | "paid"; date: string; }
interface Company { id: number; companyName: string; companyCode: string; address: string; logoUrl: string; gstNumber: string; panNumber: string; mobile: string; email: string; }
interface ConfigUser { id: number; fullName: string; userType: "Admin" | "Employee" | "Client"; username: string; password: string; mobile: string; email: string; }
interface Vendor { id: number; vendorName: string; vendorCode: string; companyName: string; contactPerson: string; mobile: string; email: string; address: string; city: string; state: string; pincode: string; country: string; gstNumber: string; panNumber: string; bankName: string; accountNumber: string; ifscCode: string; materialSupplyType: string; }
interface Transporter { id: number; transporterName: string; companyName: string; transporterCode: string; contactPerson: string; mobile: string; vehicleType: "Truck" | "Tempo"; vehicleNumber: string; driverName: string; driverMobile: string; licenseNumber: string; insuranceDetails: string; }
interface Customer { id: number; customerName: string; companyName: string; customerCode: string; contactPerson: string; mobile: string; email: string; billingAddress: string; shippingAddress: string; gstNumber: string; panNumber: string; pricingType: "Retail" | "Wholesale"; discountPercentage: number; preferredTransporter: string; deliveryInstructions: string; }

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState("config");
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- States (Badho data same rakhyo chhe) ---
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", mobile: "+91-9876-543-210", address: "123 MG Road, Bangalore, Karnataka" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", mobile: "+91-8765-432-109", address: "456 Park Street, Kolkata, West Bengal" },
  ]);

  const [items, setItems] = useState<ItemData[]>([
    { id: 1, itemName: "Laptop", itemCode: "SKU-001", unit: "Piece", materialType: "Electronics", quantity: 10, price: 50000, description: "High-performance business laptop" },
    { id: 2, itemName: "Mouse", itemCode: "SKU-002", unit: "Piece", materialType: "Electronics", quantity: 50, price: 1000, description: "Wireless optical mouse" },
  ]);

  const [invoices, setInvoices] = useState<InvoiceData[]>([
    { id: 1, invoiceNumber: "INV-001", customerName: "Infosys Ltd", email: "contact@infosys.com", items: [{ id: 1, itemName: "Laptop", quantity: 2, price: 50000 }], totalAmount: 105000, status: "paid", date: "2024-04-15" },
  ]);

  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, companyName: "Tech Solutions India Pvt Ltd", companyCode: "TECH-001", address: "123 Tech Park, Bangalore, Karnataka 560001", logoUrl: "https://example.com/logo.png", gstNumber: "18AABCT1234A1Z5", panNumber: "AABCT1234A", mobile: "+91-9876-543-210", email: "contact@techsolutions.com" },
  ]);

  const [configUsers, setConfigUsers] = useState<ConfigUser[]>([
    { id: 1, fullName: "Admin User", userType: "Admin", username: "admin@tech", password: "password123", mobile: "+91-9876-543-210", email: "admin@techsolutions.com" },
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 1, vendorName: "Electronics Wholesale Ltd", vendorCode: "VEN-001", companyName: "Tech Solutions India Pvt Ltd", contactPerson: "Amit Kumar", mobile: "+91-9999-999-999", email: "vendor1@electronics.com", address: "789 Industrial Area, Noida", city: "Noida", state: "Uttar Pradesh", pincode: "201301", country: "India", gstNumber: "09AABCT1234A1Z5", panNumber: "AABCT1234A", bankName: "HDFC Bank", accountNumber: "1234567890123456", ifscCode: "HDFC0001234", materialSupplyType: "Electronics Components" },
  ]);

  const [transporters, setTransporters] = useState<Transporter[]>([
    { id: 1, transporterName: "Fast Transport Services", companyName: "Tech Solutions India Pvt Ltd", transporterCode: "TRANS-001", contactPerson: "Vikram Patel", mobile: "+91-9111-111-111", vehicleType: "Truck", vehicleNumber: "MH-01-AB-1234", driverName: "John Driver", driverMobile: "+91-9222-222-222", licenseNumber: "DL0000020012345", insuranceDetails: "Policy #INS-2024-001" },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, customerName: "Acme Corporation", companyName: "Tech Solutions India Pvt Ltd", customerCode: "CUST-001", contactPerson: "Mr. Ramesh Gupta", mobile: "+91-9333-333-333", email: "ramesh@acmecorp.com", billingAddress: "123 Corporate Plaza, Bangalore", shippingAddress: "456 Business Park, Whitefield, Bangalore", gstNumber: "29AABCT1234A1Z5", panNumber: "AABCT1234A", pricingType: "Wholesale", discountPercentage: 10, preferredTransporter: "Fast Transport Services", deliveryInstructions: "Deliver on weekdays before 5 PM" },
  ]);

  // --- Theme Logic ---
  useEffect(() => {
  const root = window.document.documentElement;
  const saved = localStorage.getItem("theme") || "dark"; // Default dark રાખવા માટે
  
  if (saved === "dark") {
    root.classList.add("dark");
    setIsDark(true);
  } else {
    root.classList.remove("dark");
    setIsDark(false);
  }
}, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const modules = [
    { id: "config", name: "Configuration", icon: Settings, description: "Company & user configuration" },
    { id: "entity", name: "Entity Management", icon: Briefcase, description: "Vendors, transporters & customers" },
    { id: "users", name: "Employees", icon: Users, description: "Manage Your Employees" },
    { id: "catalog", name: "Catalog Module", icon: Package, description: "Manage products and inventory" },
    { id: "sales", name: "Sales Module", icon: ShoppingCart, description: "Track sales and transactions" },
  ];

  // --- Handlers ---
  const handleLogout = () => { localStorage.removeItem("isLoggedIn"); navigate("/"); };
  const handleAddUser = (user: UserData) => setUsers([...users, user]);
  const handleDeleteUser = (id: number) => setUsers(users.filter((u) => u.id !== id));
  const handleAddItem = (item: ItemData) => setItems([...items, item]);
  const handleDeleteItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const handleCreateInvoice = (invoice: InvoiceData) => setInvoices([...invoices, invoice]);
  const handleDeleteInvoice = (id: number) => setInvoices(invoices.filter((i) => i.id !== id));
  const handleAddCompany = (company: Company) => setCompanies([...companies, company]);
  const handleDeleteCompany = (id: number) => setCompanies(companies.filter((c) => c.id !== id));
  const handleAddConfigUser = (user: ConfigUser) => setConfigUsers([...configUsers, user]);
  const handleDeleteConfigUser = (id: number) => setConfigUsers(configUsers.filter((u) => u.id !== id));
  const handleAddVendor = (vendor: Vendor) => setVendors([...vendors, vendor]);
  const handleDeleteVendor = (id: number) => setVendors(vendors.filter((v) => v.id !== id));
  const handleAddTransporter = (transporter: Transporter) => setTransporters([...transporters, transporter]);
  const handleDeleteTransporter = (id: number) => setTransporters(transporters.filter((t) => t.id !== id));
  const handleAddCustomer = (customer: Customer) => setCustomers([...customers, customer]);
  const handleDeleteCustomer = (id: number) => setCustomers(customers.filter((c) => c.id !== id));

  const activeModuleData = modules.find((m) => m.id === activeModule);
  const ActiveIcon = activeModuleData?.icon || Users;

  // Sidebar Content (Re-usable for mobile and desktop)
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold glow-text">ERP Dashboard</h2>
          <p className="text-xs text-muted-foreground mt-1">Enterprise Resource Planning</p>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <nav className="space-y-3 flex-1">
        {modules.map((module) => {
          const ModuleIcon = module.icon;
          const isActive = activeModule === module.id;
          return (
            <button
              key={module.id}
              onClick={() => {
                setActiveModule(module.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? "bg-primary/20 border border-primary/40 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              }`}
            >
              <ModuleIcon size={20} />
              <p className="text-sm font-medium">{module.name}</p>
            </button>
          );
        })}
      </nav>

      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all border border-destructive/20 mt-8">
        <LogOut size={20} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      
      {/* --- Mobile Navbar --- */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <h2 className="text-xl font-bold glow-text">ERP System</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-primary/10 text-primary"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:block w-64 bg-background/80 backdrop-blur-sm border-r border-primary/20 p-6 fixed h-screen overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* --- Mobile Sidebar Overlay --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
          <SidebarContent />
        </div>
      )}

      {/* --- Main Content --- */}
      <main className={`flex-1 p-4 md:p-8 ${isMobileMenuOpen ? 'hidden' : 'block'} md:ml-64`}>
        
        {/* Demo Data Warning */}
        <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">Demo Data Notice</h3>
            <p className="text-xs md:text-sm text-yellow-600/80 dark:text-yellow-500/80 mt-1">
              This is a demonstration. All data will be cleared on refresh.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <ActiveIcon size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{activeModuleData?.name}</h1>
              <p className="text-sm text-muted-foreground">{activeModuleData?.description}</p>
            </div>
          </div>
        </div>

        {/* Module Content Container (Scrollable horizontal if table is too big) */}
        <div className="overflow-x-auto">
          {activeModule === "config" && (
            <ConfigModule
              companies={companies}
              configUsers={configUsers}
              onAddCompany={handleAddCompany}
              onDeleteCompany={handleDeleteCompany}
              onAddUser={handleAddConfigUser}
              onDeleteUser={handleDeleteConfigUser}
            />
          )}

          {activeModule === "entity" && (
            <EntityModule
              vendors={vendors}
              transporters={transporters}
              customers={customers}
              onAddVendor={handleAddVendor}
              onDeleteVendor={handleDeleteVendor}
              onAddTransporter={handleAddTransporter}
              onDeleteTransporter={handleDeleteTransporter}
              onAddCustomer={handleAddCustomer}
              onDeleteCustomer={handleDeleteCustomer}
            />
          )}

          {activeModule === "users" && (
            <UsersModule users={users} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />
          )}

          {activeModule === "catalog" && (
            <CatalogModule items={items} onAddItem={handleAddItem} onDeleteItem={handleDeleteItem} />
          )}

          {activeModule === "sales" && (
            <SalesModule
              invoices={invoices}
              onCreateInvoice={handleCreateInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              items={items.map((i) => ({ id: i.id, itemName: i.itemName, itemCode: i.itemCode, price: i.price }))}
              customers={users.map((e) => ({ id: e.id, name: e.name }))}
              transporters={transporters.map((t) => ({ id: t.id, name: t.transporterName, vehicle: t.vehicleNumber }))}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;