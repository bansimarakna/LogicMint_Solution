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

// --- Interfaces ---
interface SalesModuleProps {
  invoices: any[];
  onCreateInvoice: (invoice: any) => void;
  onDeleteInvoice: (id: number) => void;
  items: Array<{ id: number; itemName: string; itemCode: string; price: number }>;
  customers: Array<{ id: number; name: string }>;
  transporters: Array<{ id: number; name: string; vehicle: string }>;
}

const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const SalesModule = ({ invoices, onCreateInvoice, onDeleteInvoice, items, customers, transporters }: SalesModuleProps) => {
  const [activeTab, setActiveTab] = useState("inquiry");

  // --- States ---
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [inquiryFormOpen, setInquiryFormOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ customerId: "", itemId: "", price: "", requiredDeliveryDate: "" });

  const [quotations, setQuotations] = useState<any[]>([]);
  const [quotationFormOpen, setQuotationFormOpen] = useState(false);
  const [quotationForm, setQuotationForm] = useState({ customerId: "", itemId: "", price: "", quantity: "" });

  const [salesOrders, setSalesOrders] = useState<any[]>([]);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ customerId: "", itemId: "", quantity: "", rate: "", deliverySchedule: "", gst: "18", discount: "0" });

  const [dispatches, setDispatches] = useState<any[]>([]);
  const [dispatchFormOpen, setDispatchFormOpen] = useState(false);
  const [dispatchForm, setDispatchForm] = useState({ salesOrderRef: "", transporterId: "", vehicleNo: "", itemQtyDispatch: "" });

  // --- Handlers ---
  const handleAddInquiry = () => {
    const cust = customers.find(c => c.id.toString() === inquiryForm.customerId);
    const itm = items.find(i => i.id.toString() === inquiryForm.itemId);
    if (!cust || !itm) return alert("Please select Customer and Item");

    setInquiries([...inquiries, {
      id: Date.now(),
      inquiryNo: `INQ-${Date.now().toString().slice(-4)}`,
      customerName: cust.name,
      item: itm.itemName,
      price: parseFloat(inquiryForm.price),
      requiredDeliveryDate: inquiryForm.requiredDeliveryDate,
    }]);
    setInquiryForm({ customerId: "", itemId: "", price: "", requiredDeliveryDate: "" });
    setInquiryFormOpen(false);
  };

  const handleAddQuotation = () => {
    const cust = customers.find(c => c.id.toString() === quotationForm.customerId);
    const itm = items.find(i => i.id.toString() === quotationForm.itemId);
    if (!cust || !itm) return alert("Please select Customer and Item");

    setQuotations([...quotations, {
      id: Date.now(),
      quotationNo: `QT-${Date.now().toString().slice(-4)}`,
      customerName: cust.name,
      item: itm.itemName,
      price: parseFloat(quotationForm.price),
      quantity: parseFloat(quotationForm.quantity),
      total: parseFloat(quotationForm.price) * parseFloat(quotationForm.quantity)
    }]);
    setQuotationForm({ customerId: "", itemId: "", price: "", quantity: "" });
    setQuotationFormOpen(false);
  };

  const handleAddSalesOrder = () => {
    const cust = customers.find(c => c.id.toString() === orderForm.customerId);
    const itm = items.find(i => i.id.toString() === orderForm.itemId);
    
    const qty = parseFloat(orderForm.quantity);
    const rate = parseFloat(orderForm.rate);
    const gst = parseFloat(orderForm.gst);
    const discount = parseFloat(orderForm.discount) || 0;
    const subtotal = qty * rate;
    const total = subtotal + (subtotal * gst / 100) - discount;

    setSalesOrders([...salesOrders, {
      id: Date.now(),
      salesOrderNo: `SO-${Date.now().toString().slice(-4)}`,
      customerName: cust?.name,
      itemList: itm?.itemName,
      quantity: qty,
      rate: rate,
      gst: gst,
      totalAmount: total
    }]);
    setOrderForm({ customerId: "", itemId: "", quantity: "", rate: "", deliverySchedule: "", gst: "18", discount: "0" });
    setOrderFormOpen(false);
  };

const [salesInvoices, setSalesInvoices] = useState<any[]>([]);
  const [invoiceFormOpen, setInvoiceFormOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ 
    customerName: "", 
    orderRef: "", 
    cgst: "9", 
    sgst: "9", 
    totalAmount: "" 
  });

  const handleAddSalesInvoice = () => {
    if (!invoiceForm.orderRef) return alert("Please select a Sales Order first");

    const newInvoice = {
      id: Date.now(),
      invoiceNo: `INV-${Date.now().toString().slice(-4)}`,
      customerName: invoiceForm.customerName,
      orderRef: invoiceForm.orderRef,
      totalAmount: parseFloat(invoiceForm.totalAmount),
      date: new Date().toLocaleDateString()
    };

    setSalesInvoices([...salesInvoices, newInvoice]);
    
    // Form reset karva mate
    setInvoiceForm({ 
      customerName: "", 
      orderRef: "", 
      cgst: "9", 
      sgst: "9", 
      totalAmount: "" 
    });
    setInvoiceFormOpen(false);
  };

  

  const handleTransporterChange = (id: string) => {
    const selectedTrans = transporters.find(t => t.id.toString() === id);
    setDispatchForm({ ...dispatchForm, transporterId: id, vehicleNo: selectedTrans ? selectedTrans.vehicle : "" });
  };

  const handleAddDispatch = () => {
    const trans = transporters.find(t => t.id.toString() === dispatchForm.transporterId);
    setDispatches([...dispatches, {
      id: Date.now(),
      deliveryNo: `DEL-${Date.now().toString().slice(-4)}`,
      salesOrderRef: dispatchForm.salesOrderRef,
      transporterName: trans?.name,
      vehicleNo: dispatchForm.vehicleNo,
      itemQtyDispatch: parseFloat(dispatchForm.itemQtyDispatch),
      dispatchDate: new Date().toLocaleDateString()
    }]);
    setDispatchForm({ salesOrderRef: "", transporterId: "", vehicleNo: "", itemQtyDispatch: "" });
    setDispatchFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="inquiry">Inquiry</TabsTrigger>
          <TabsTrigger value="quotation">Quotation</TabsTrigger>
          <TabsTrigger value="salesorder">Sales Order</TabsTrigger>
          <TabsTrigger value="dispatch">Dispatch</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
        </TabsList>

        {/* --- Inquiry Tab --- */}
        <TabsContent value="inquiry" className="space-y-6">
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add New Inquiry</CardTitle>
                  <CardDescription>Create a customer inquiry</CardDescription>
                </div>
                <button onClick={() => setInquiryFormOpen(!inquiryFormOpen)} className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>
            {inquiryFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer *</label>
                    <Select value={inquiryForm.customerId} onValueChange={(val) => setInquiryForm({...inquiryForm, customerId: val})}>
                      <SelectTrigger><SelectValue placeholder="Select Customer" /></SelectTrigger>
                      <SelectContent>{customers.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Item *</label>
                    <Select value={inquiryForm.itemId} onValueChange={(val) => {
                      const item = items.find(i => i.id.toString() === val);
                      setInquiryForm({...inquiryForm, itemId: val, price: item?.price.toString() || ""});
                    }}>
                      <SelectTrigger><SelectValue placeholder="Select Item" /></SelectTrigger>
                      <SelectContent>{items.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.itemName}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price *</label>
                    <Input type="number" value={inquiryForm.price} onChange={(e) => setInquiryForm({...inquiryForm, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Required Delivery Date *</label>
                    <Input type="date" value={inquiryForm.requiredDeliveryDate} onChange={(e) => setInquiryForm({...inquiryForm, requiredDeliveryDate: e.target.value})} />
                  </div>
                </div>
                <button onClick={handleAddInquiry} className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-white font-medium">Add Inquiry</button>
              </CardContent>
            )}
          </Card>
          <Card className="border border-primary/20">
            <CardHeader><CardTitle>Inquiries ({inquiries.length})</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm text-left">
                <thead className="border-b border-primary/20 font-medium">
                  <tr><th className="p-3">Inquiry No</th><th className="p-3">Customer</th><th className="p-3">Item</th><th className="p-3">Price</th><th className="p-3">Action</th></tr>
                </thead>
                <tbody>
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="border-b border-primary/10">
                      <td className="p-3">{inq.inquiryNo}</td><td className="p-3">{inq.customerName}</td><td className="p-3">{inq.item}</td><td className="p-3">{formatCurrency(inq.price)}</td>
                      <td className="p-3"><button onClick={() => setInquiries(inquiries.filter(i => i.id !== inq.id))} className="text-destructive"><Trash2 size={16}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Quotation Tab --- */}
        <TabsContent value="quotation" className="space-y-6">
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Add Quotation</CardTitle><CardDescription>Create a new quotation</CardDescription></div>
                <button onClick={() => setQuotationFormOpen(!quotationFormOpen)} className="p-2 bg-primary/10 rounded-lg"><Plus size={20}/></button>
              </div>
            </CardHeader>
            {quotationFormOpen && (
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Customer *</label>
                  <Select value={quotationForm.customerId} onValueChange={(val) => setQuotationForm({...quotationForm, customerId: val})}><SelectTrigger><SelectValue placeholder="Select Customer"/></SelectTrigger><SelectContent>{customers.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Item *</label>
                  <Select value={quotationForm.itemId} onValueChange={(val) => { const itm = items.find(i => i.id.toString() === val); setQuotationForm({...quotationForm, itemId: val, price: itm?.price.toString() || ""}); }}>
                    <SelectTrigger><SelectValue placeholder="Select Item"/></SelectTrigger><SelectContent>{items.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.itemName}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Price *</label><Input type="number" value={quotationForm.price} onChange={(e) => setQuotationForm({...quotationForm, price: e.target.value})}/></div>
                <div className="space-y-2"><label className="text-sm font-medium">Quantity *</label><Input type="number" value={quotationForm.quantity} onChange={(e) => setQuotationForm({...quotationForm, quantity: e.target.value})}/></div>
                <button onClick={handleAddQuotation} className="col-span-2 bg-primary text-white p-2 rounded-lg font-medium">Add Quotation</button>
              </CardContent>
            )}
          </Card>
          <Card className="border border-primary/20">
            <CardHeader><CardTitle>Quotations ({quotations.length})</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm text-left">
                <thead className="border-b border-primary/20 font-medium">
                  <tr><th className="p-3">Quotation No</th><th className="p-3">Customer</th><th className="p-3">Item</th><th className="p-3">Total</th><th className="p-3">Action</th></tr>
                </thead>
                <tbody>
                  {quotations.map(q => (
                    <tr key={q.id} className="border-b border-primary/10"><td className="p-3">{q.quotationNo}</td><td className="p-3">{q.customerName}</td><td className="p-3">{q.item}</td><td className="p-3 font-semibold">{formatCurrency(q.total)}</td><td className="p-3"><button onClick={() => setQuotations(quotations.filter(qt => qt.id !== q.id))} className="text-destructive"><Trash2 size={16}/></button></td></tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Sales Order Tab --- */}
        <TabsContent value="salesorder" className="space-y-6">
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Add Sales Order</CardTitle><CardDescription>Create a new order</CardDescription></div>
                <button onClick={() => setOrderFormOpen(!orderFormOpen)} className="p-2 bg-primary/10 rounded-lg"><Plus size={20}/></button>
              </div>
            </CardHeader>
            {orderFormOpen && (
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Customer *</label>
                  <Select value={orderForm.customerId} onValueChange={(val) => setOrderForm({...orderForm, customerId: val})}><SelectTrigger><SelectValue placeholder="Select Customer"/></SelectTrigger><SelectContent>{customers.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Item *</label>
                  <Select value={orderForm.itemId} onValueChange={(val) => { const itm = items.find(i => i.id.toString() === val); setOrderForm({...orderForm, itemId: val, rate: itm?.price.toString() || ""}); }}>
                    <SelectTrigger><SelectValue placeholder="Select Item"/></SelectTrigger><SelectContent>{items.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.itemName}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Quantity *</label><Input type="number" value={orderForm.quantity} onChange={(e) => setOrderForm({...orderForm, quantity: e.target.value})}/></div>
                <div className="space-y-2"><label className="text-sm font-medium">Rate *</label><Input type="number" value={orderForm.rate} onChange={(e) => setOrderForm({...orderForm, rate: e.target.value})}/></div>
                <div className="space-y-2"><label className="text-sm font-medium">GST %</label><Input type="number" value={orderForm.gst} onChange={(e) => setOrderForm({...orderForm, gst: e.target.value})}/></div>
                <div className="space-y-2"><label className="text-sm font-medium">Delivery Date</label><Input type="date" value={orderForm.deliverySchedule} onChange={(e) => setOrderForm({...orderForm, deliverySchedule: e.target.value})}/></div>
                <button onClick={handleAddSalesOrder} className="col-span-2 bg-primary text-white p-2 rounded-lg font-medium">Add Sales Order</button>
              </CardContent>
            )}
          </Card>
          <Card className="border border-primary/20">
            <CardHeader><CardTitle>Sales Orders ({salesOrders.length})</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm text-left">
                <thead className="border-b border-primary/20 font-medium">
                  <tr><th className="p-3">Order No</th><th className="p-3">Customer</th><th className="p-3">Qty</th><th className="p-3">Total</th><th className="p-3">Action</th></tr>
                </thead>
                <tbody>
                  {salesOrders.map(so => (
                    <tr key={so.id} className="border-b border-primary/10"><td className="p-3">{so.salesOrderNo}</td><td className="p-3">{so.customerName}</td><td className="p-3">{so.quantity}</td><td className="p-3 font-semibold">{formatCurrency(so.totalAmount)}</td><td className="p-3"><button onClick={() => setSalesOrders(salesOrders.filter(o => o.id !== so.id))} className="text-destructive"><Trash2 size={16}/></button></td></tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Dispatch Tab --- */}
        <TabsContent value="dispatch" className="space-y-6">
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Add New Dispatch</CardTitle><CardDescription>Create a dispatch record</CardDescription></div>
                <button onClick={() => setDispatchFormOpen(!dispatchFormOpen)} className="p-2 bg-primary/10 rounded-lg"><Plus size={20} /></button>
              </div>
            </CardHeader>
            {dispatchFormOpen && (
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium">Transporter *</label>
                  <Select value={dispatchForm.transporterId} onValueChange={handleTransporterChange}><SelectTrigger><SelectValue placeholder="Select Transporter" /></SelectTrigger><SelectContent>{transporters.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium">Vehicle Number</label><Input value={dispatchForm.vehicleNo} readOnly className="bg-muted cursor-not-allowed" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Sales Order Ref</label><Input placeholder="Order No" value={dispatchForm.salesOrderRef} onChange={(e) => setDispatchForm({...dispatchForm, salesOrderRef: e.target.value})} /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Dispatch Qty</label><Input type="number" placeholder="Quantity" value={dispatchForm.itemQtyDispatch} onChange={(e) => setDispatchForm({...dispatchForm, itemQtyDispatch: e.target.value})} /></div>
                <button onClick={handleAddDispatch} className="col-span-2 bg-primary text-white p-2 rounded-lg font-medium">Add Dispatch</button>
              </CardContent>
            )}
          </Card>
          <Card className="border border-primary/20">
            <CardHeader><CardTitle>Dispatches ({dispatches.length})</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm text-left">
                <thead className="border-b border-primary/20 font-medium">
                  <tr><th className="p-3">Delivery No</th><th className="p-3">Transporter</th><th className="p-3">Vehicle</th><th className="p-3">Qty</th><th className="p-3">Action</th></tr>
                </thead>
                <tbody>
                  {dispatches.map(d => (
                    <tr key={d.id} className="border-b border-primary/10"><td className="p-3">{d.deliveryNo}</td><td className="p-3">{d.transporterName}</td><td className="p-3">{d.vehicleNo}</td><td className="p-3">{d.itemQtyDispatch}</td><td className="p-3"><button onClick={() => setDispatches(dispatches.filter(disp => disp.id !== d.id))} className="text-destructive"><Trash2 size={16}/></button></td></tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

{/* --- INVOICE TAB UPDATED CODE --- */}
        <TabsContent value="invoice" className="space-y-6">
          <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add Sales Invoice</CardTitle>
                  <CardDescription>Generate invoice from Sales Orders</CardDescription>
                </div>
                <button
                  onClick={() => setInvoiceFormOpen(!invoiceFormOpen)}
                  className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </CardHeader>

            {invoiceFormOpen && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Sales Order *</label>
                    <Select 
                      onValueChange={(val) => {
                        const order = salesOrders.find(o => o.id.toString() === val);
                        if (order) {
                          setInvoiceForm({
                            ...invoiceForm,
                            orderRef: order.salesOrderNo,
                            customerName: order.customerName,
                            totalAmount: order.totalAmount.toString()
                          });
                        }
                      }}
                    >
                      <SelectTrigger><SelectValue placeholder="Choose an Order" /></SelectTrigger>
                      <SelectContent>
                        {salesOrders.length > 0 ? (
                          salesOrders.map((order) => (
                            <SelectItem key={order.id} value={order.id.toString()}>
                              {order.salesOrderNo} - {order.customerName}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="text-xs p-2 text-muted-foreground">No Sales Orders found</p>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Name</label>
                    <Input value={invoiceForm.customerName} readOnly placeholder="Auto-filled" className="bg-muted" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">CGST (9%)</label>
                    <Input value={invoiceForm.cgst} readOnly className="bg-muted" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">SGST (9%)</label>
                    <Input value={invoiceForm.sgst} readOnly className="bg-muted" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Total Payable Amount</label>
                    <Input value={invoiceForm.totalAmount ? formatCurrency(parseFloat(invoiceForm.totalAmount)) : ""} readOnly className="bg-muted font-bold text-primary" />
                  </div>
                </div>

                <button
                  onClick={handleAddSalesInvoice}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-white font-medium"
                >
                  Generate & Save Invoice
                </button>
              </CardContent>
            )}
          </Card>

          <Card className="border border-primary/20">
            <CardHeader><CardTitle>Sales Invoices Grid ({salesInvoices.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-primary/20 font-medium">
                      <th className="p-3">Invoice No</th>
                      <th className="p-3">Order Ref</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesInvoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-primary/10">
                        <td className="p-3">{inv.invoiceNo}</td>
                        <td className="p-3">{inv.orderRef}</td>
                        <td className="p-3">{inv.customerName}</td>
                        <td className="p-3 text-right font-semibold">{formatCurrency(inv.totalAmount)}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => setSalesInvoices(salesInvoices.filter(i => i.id !== inv.id))} className="text-destructive"><Trash2 size={16} /></button>
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

export default SalesModule;