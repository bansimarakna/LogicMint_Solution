import { useState } from "react";
import { Trash2, Plus, Eye } from "lucide-react";
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

interface Vendor {
  id: number;
  vendorName: string;
  vendorCode: string;
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gstNumber: string;
  panNumber: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  materialSupplyType: string;
}

interface Transporter {
  id: number;
  transporterName: string;
  companyName: string;
  transporterCode: string;
  contactPerson: string;
  mobile: string;
  vehicleType: "Truck" | "Tempo";
  vehicleNumber: string;
  driverName: string;
  driverMobile: string;
  licenseNumber: string;
  insuranceDetails: string;
}

interface Customer {
  id: number;
  customerName: string;
  companyName: string;
  customerCode: string;
  contactPerson: string;
  mobile: string;
  email: string;
  billingAddress: string;
  shippingAddress: string;
  gstNumber: string;
  panNumber: string;
  pricingType: "Retail" | "Wholesale";
  discountPercentage: number;
  preferredTransporter: string;
  deliveryInstructions: string;
}

interface EntityModuleProps {
  vendors: Vendor[];
  transporters: Transporter[];
  customers: Customer[];
  onAddVendor: (vendor: Vendor) => void;
  onDeleteVendor: (id: number) => void;
  onAddTransporter: (transporter: Transporter) => void;
  onDeleteTransporter: (id: number) => void;
  onAddCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: number) => void;
}

const EntityModule = ({
  vendors,
  transporters,
  customers,
  onAddVendor,
  onDeleteVendor,
  onAddTransporter,
  onDeleteTransporter,
  onAddCustomer,
  onDeleteCustomer,
}: EntityModuleProps) => {
  const [activeTab, setActiveTab] = useState("vendor");
  const [vendorFormOpen, setVendorFormOpen] = useState(false);
  const [transporterFormOpen, setTransporterFormOpen] = useState(false);
  const [customerFormOpen, setCustomerFormOpen] = useState(false);

  const [vendorForm, setVendorForm] = useState({
    vendorName: "",
    vendorCode: "",
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gstNumber: "",
    panNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    materialSupplyType: "",
  });

  const [transporterForm, setTransporterForm] = useState({
    transporterName: "",
    companyName: "",
    transporterCode: "",
    contactPerson: "",
    mobile: "",
    vehicleType: "Truck" as "Truck" | "Tempo",
    vehicleNumber: "",
    driverName: "",
    driverMobile: "",
    licenseNumber: "",
    insuranceDetails: "",
  });

  const [customerForm, setCustomerForm] = useState({
    customerName: "",
    companyName: "",
    customerCode: "",
    contactPerson: "",
    mobile: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
    gstNumber: "",
    panNumber: "",
    pricingType: "Retail" as "Retail" | "Wholesale",
    discountPercentage: 0,
    preferredTransporter: "",
    deliveryInstructions: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateVendorForm = () => {
    const newErrors: Record<string, string> = {};
    if (!vendorForm.vendorName.trim()) newErrors.vendorName = "Vendor name is required";
    if (!vendorForm.vendorCode.trim()) newErrors.vendorCode = "Vendor code is required";
    if (!vendorForm.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!vendorForm.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!vendorForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vendorForm.email))
      newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTransporterForm = () => {
    const newErrors: Record<string, string> = {};
    if (!transporterForm.transporterName.trim())
      newErrors.transporterName = "Transporter name is required";
    if (!transporterForm.transporterCode.trim())
      newErrors.transporterCode = "Transporter code is required";
    if (!transporterForm.mobile.trim()) newErrors.mobile = "Mobile is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCustomerForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerForm.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!customerForm.customerCode.trim()) newErrors.customerCode = "Customer code is required";
    if (!customerForm.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!customerForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerForm.email))
      newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVendor = () => {
    if (!validateVendorForm()) return;
    onAddVendor({ id: Date.now(), ...vendorForm });
    setVendorForm({
      vendorName: "",
      vendorCode: "",
      companyName: "",
      contactPerson: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      gstNumber: "",
      panNumber: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      materialSupplyType: "",
    });
    setVendorFormOpen(false);
    setErrors({});
  };

  const handleAddTransporter = () => {
    if (!validateTransporterForm()) return;
    onAddTransporter({ id: Date.now(), ...transporterForm });
    setTransporterForm({
      transporterName: "",
      companyName: "",
      transporterCode: "",
      contactPerson: "",
      mobile: "",
      vehicleType: "Truck",
      vehicleNumber: "",
      driverName: "",
      driverMobile: "",
      licenseNumber: "",
      insuranceDetails: "",
    });
    setTransporterFormOpen(false);
    setErrors({});
  };

  const handleAddCustomer = () => {
    if (!validateCustomerForm()) return;
    onAddCustomer({ id: Date.now(), ...customerForm });
    setCustomerForm({
      customerName: "",
      companyName: "",
      customerCode: "",
      contactPerson: "",
      mobile: "",
      email: "",
      billingAddress: "",
      shippingAddress: "",
      gstNumber: "",
      panNumber: "",
      pricingType: "Retail",
      discountPercentage: 0,
      preferredTransporter: "",
      deliveryInstructions: "",
    });
    setCustomerFormOpen(false);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vendor">Vendors</TabsTrigger>
          <TabsTrigger value="transporter">Transporters</TabsTrigger>
          <TabsTrigger value="customer">Customers</TabsTrigger>
        </TabsList>

        {/* Vendor Tab */}
        <TabsContent value="vendor" className="space-y-6 mt-6">
          {/* Add Vendor Form */}
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add New Vendor</CardTitle>
                  <CardDescription>Create a new vendor record</CardDescription>
                </div>
                <button
                  onClick={() => setVendorFormOpen(!vendorFormOpen)}
                  className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>

            {vendorFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vendor Name *</label>
                    <Input
                      placeholder="Enter vendor name"
                      value={vendorForm.vendorName}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, vendorName: e.target.value })
                      }
                      className={errors.vendorName ? "border-destructive" : ""}
                    />
                    {errors.vendorName && (
                      <p className="text-xs text-destructive">{errors.vendorName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vendor Code *</label>
                    <Input
                      placeholder="Enter vendor code"
                      value={vendorForm.vendorCode}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, vendorCode: e.target.value })
                      }
                      className={errors.vendorCode ? "border-destructive" : ""}
                    />
                    {errors.vendorCode && (
                      <p className="text-xs text-destructive">{errors.vendorCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      placeholder="Enter company name"
                      value={vendorForm.companyName}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, companyName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <Input
                      placeholder="Enter contact person name"
                      value={vendorForm.contactPerson}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, contactPerson: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number *</label>
                    <Input
                      placeholder="Enter mobile number"
                      value={vendorForm.mobile}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, mobile: e.target.value })
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
                      value={vendorForm.email}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, email: e.target.value })
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      placeholder="Enter address"
                      value={vendorForm.address}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input
                      placeholder="Enter city"
                      value={vendorForm.city}
                      onChange={(e) => setVendorForm({ ...vendorForm, city: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Input
                      placeholder="Enter state"
                      value={vendorForm.state}
                      onChange={(e) => setVendorForm({ ...vendorForm, state: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pincode</label>
                    <Input
                      placeholder="Enter pincode"
                      value={vendorForm.pincode}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, pincode: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      placeholder="Enter country"
                      value={vendorForm.country}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, country: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">GST Number</label>
                    <Input
                      placeholder="Enter GST number"
                      value={vendorForm.gstNumber}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, gstNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PAN Number</label>
                    <Input
                      placeholder="Enter PAN number"
                      value={vendorForm.panNumber}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, panNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bank Name</label>
                    <Input
                      placeholder="Enter bank name"
                      value={vendorForm.bankName}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, bankName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Number</label>
                    <Input
                      placeholder="Enter account number"
                      value={vendorForm.accountNumber}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, accountNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">IFSC Code</label>
                    <Input
                      placeholder="Enter IFSC code"
                      value={vendorForm.ifscCode}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, ifscCode: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Material Supply Type</label>
                    <Input
                      placeholder="Enter material supply type"
                      value={vendorForm.materialSupplyType}
                      onChange={(e) =>
                        setVendorForm({ ...vendorForm, materialSupplyType: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddVendor}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                >
                  Add Vendor
                </button>
              </CardContent>
            )}
          </Card>

          {/* Vendors List */}
          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle>Vendors List ({vendors.length})</CardTitle>
              <CardDescription>All registered vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-medium">Vendor Name</th>
                      <th className="text-left py-3 px-4 font-medium">Code</th>
                      <th className="text-left py-3 px-4 font-medium">Company</th>
                      <th className="text-left py-3 px-4 font-medium">Mobile</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4">{vendor.vendorName}</td>
                        <td className="py-3 px-4">{vendor.vendorCode}</td>
                        <td className="py-3 px-4">{vendor.companyName}</td>
                        <td className="py-3 px-4">{vendor.mobile}</td>
                        <td className="py-3 px-4">{vendor.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => onDeleteVendor(vendor.id)}
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

        {/* Transporter Tab */}
        <TabsContent value="transporter" className="space-y-6 mt-6">
          {/* Add Transporter Form */}
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add New Transporter</CardTitle>
                  <CardDescription>Create a new transporter record</CardDescription>
                </div>
                <button
                  onClick={() => setTransporterFormOpen(!transporterFormOpen)}
                  className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>

            {transporterFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transporter Name *</label>
                    <Input
                      placeholder="Enter transporter name"
                      value={transporterForm.transporterName}
                      onChange={(e) =>
                        setTransporterForm({
                          ...transporterForm,
                          transporterName: e.target.value,
                        })
                      }
                      className={errors.transporterName ? "border-destructive" : ""}
                    />
                    {errors.transporterName && (
                      <p className="text-xs text-destructive">{errors.transporterName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transporter Code *</label>
                    <Input
                      placeholder="Enter transporter code"
                      value={transporterForm.transporterCode}
                      onChange={(e) =>
                        setTransporterForm({
                          ...transporterForm,
                          transporterCode: e.target.value,
                        })
                      }
                      className={errors.transporterCode ? "border-destructive" : ""}
                    />
                    {errors.transporterCode && (
                      <p className="text-xs text-destructive">{errors.transporterCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      placeholder="Enter company name"
                      value={transporterForm.companyName}
                      onChange={(e) =>
                        setTransporterForm({ ...transporterForm, companyName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <Input
                      placeholder="Enter contact person name"
                      value={transporterForm.contactPerson}
                      onChange={(e) =>
                        setTransporterForm({
                          ...transporterForm,
                          contactPerson: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number *</label>
                    <Input
                      placeholder="Enter mobile number"
                      value={transporterForm.mobile}
                      onChange={(e) =>
                        setTransporterForm({ ...transporterForm, mobile: e.target.value })
                      }
                      className={errors.mobile ? "border-destructive" : ""}
                    />
                    {errors.mobile && (
                      <p className="text-xs text-destructive">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vehicle Type</label>
                    <Select
  value={transporterForm.vehicleType}
  onValueChange={(value) =>
    setTransporterForm({
      ...transporterForm,
      vehicleType: value as "Truck" | "Tempo", // have error nahi ave
    })
  }
>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Truck">Truck</SelectItem>
                        <SelectItem value="Tempo">Tempo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vehicle Number</label>
                    <Input
                      placeholder="Enter vehicle number"
                      value={transporterForm.vehicleNumber}
                      onChange={(e) =>
                        setTransporterForm({ ...transporterForm, vehicleNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Driver Name</label>
                    <Input
                      placeholder="Enter driver name"
                      value={transporterForm.driverName}
                      onChange={(e) =>
                        setTransporterForm({ ...transporterForm, driverName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Driver Mobile</label>
                    <Input
                      placeholder="Enter driver mobile"
                      value={transporterForm.driverMobile}
                      onChange={(e) =>
                        setTransporterForm({ ...transporterForm, driverMobile: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">License Number</label>
                    <Input
                      placeholder="Enter license number"
                      value={transporterForm.licenseNumber}
                      onChange={(e) =>
                        setTransporterForm({ ...transporterForm, licenseNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Insurance Details</label>
                    <Input
                      placeholder="Enter insurance details"
                      value={transporterForm.insuranceDetails}
                      onChange={(e) =>
                        setTransporterForm({
                          ...transporterForm,
                          insuranceDetails: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddTransporter}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                >
                  Add Transporter
                </button>
              </CardContent>
            )}
          </Card>

          {/* Transporters List */}
          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle>Transporters List ({transporters.length})</CardTitle>
              <CardDescription>All registered transporters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Code</th>
                      <th className="text-left py-3 px-4 font-medium">Vehicle</th>
                      <th className="text-left py-3 px-4 font-medium">Driver</th>
                      <th className="text-left py-3 px-4 font-medium">Mobile</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transporters.map((transporter) => (
                      <tr
                        key={transporter.id}
                        className="border-b border-primary/10 hover:bg-primary/5"
                      >
                        <td className="py-3 px-4">{transporter.transporterName}</td>
                        <td className="py-3 px-4">{transporter.transporterCode}</td>
                        <td className="py-3 px-4">
                          {transporter.vehicleType}: {transporter.vehicleNumber}
                        </td>
                        <td className="py-3 px-4">{transporter.driverName}</td>
                        <td className="py-3 px-4">{transporter.mobile}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => onDeleteTransporter(transporter.id)}
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

        {/* Customer Tab */}
        <TabsContent value="customer" className="space-y-6 mt-6">
          {/* Add Customer Form */}
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add New Customer</CardTitle>
                  <CardDescription>Create a new customer record</CardDescription>
                </div>
                <button
                  onClick={() => setCustomerFormOpen(!customerFormOpen)}
                  className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>

            {customerFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Name *</label>
                    <Input
                      placeholder="Enter customer name"
                      value={customerForm.customerName}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, customerName: e.target.value })
                      }
                      className={errors.customerName ? "border-destructive" : ""}
                    />
                    {errors.customerName && (
                      <p className="text-xs text-destructive">{errors.customerName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Code *</label>
                    <Input
                      placeholder="Enter customer code"
                      value={customerForm.customerCode}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, customerCode: e.target.value })
                      }
                      className={errors.customerCode ? "border-destructive" : ""}
                    />
                    {errors.customerCode && (
                      <p className="text-xs text-destructive">{errors.customerCode}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      placeholder="Enter company name"
                      value={customerForm.companyName}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, companyName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <Input
                      placeholder="Enter contact person name"
                      value={customerForm.contactPerson}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, contactPerson: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number *</label>
                    <Input
                      placeholder="Enter mobile number"
                      value={customerForm.mobile}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, mobile: e.target.value })
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
                      value={customerForm.email}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, email: e.target.value })
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Billing Address</label>
                    <Input
                      placeholder="Enter billing address"
                      value={customerForm.billingAddress}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, billingAddress: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Shipping Address</label>
                    <Input
                      placeholder="Enter shipping address"
                      value={customerForm.shippingAddress}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, shippingAddress: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">GST Number</label>
                    <Input
                      placeholder="Enter GST number"
                      value={customerForm.gstNumber}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, gstNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PAN Number</label>
                    <Input
                      placeholder="Enter PAN number"
                      value={customerForm.panNumber}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, panNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pricing Type</label>
                    <Select
  value={customerForm.pricingType}
  onValueChange={(value) =>
    setCustomerForm({
      ...customerForm,
      pricingType: value as "Retail" | "Wholesale", // have error nahi ave
    })
  }
>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Wholesale">Wholesale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount %</label>
                    <Input
                      type="number"
                      placeholder="Enter discount percentage"
                      value={customerForm.discountPercentage}
                      onChange={(e) =>
                        setCustomerForm({
                          ...customerForm,
                          discountPercentage: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Transporter</label>
                    <Input
                      placeholder="Enter preferred transporter"
                      value={customerForm.preferredTransporter}
                      onChange={(e) =>
                        setCustomerForm({
                          ...customerForm,
                          preferredTransporter: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Delivery Instructions</label>
                    <Input
                      placeholder="Enter delivery instructions"
                      value={customerForm.deliveryInstructions}
                      onChange={(e) =>
                        setCustomerForm({
                          ...customerForm,
                          deliveryInstructions: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddCustomer}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                >
                  Add Customer
                </button>
              </CardContent>
            )}
          </Card>

          {/* Customers List */}
          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle>Customers List ({customers.length})</CardTitle>
              <CardDescription>All registered customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-medium">Customer Name</th>
                      <th className="text-left py-3 px-4 font-medium">Code</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Discount</th>
                      <th className="text-left py-3 px-4 font-medium">Mobile</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-primary/10 hover:bg-primary/5"
                      >
                        <td className="py-3 px-4">{customer.customerName}</td>
                        <td className="py-3 px-4">{customer.customerCode}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                            {customer.pricingType}
                          </span>
                        </td>
                        <td className="py-3 px-4">{customer.discountPercentage}%</td>
                        <td className="py-3 px-4">{customer.mobile}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => onDeleteCustomer(customer.id)}
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

export default EntityModule;
