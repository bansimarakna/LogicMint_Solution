import { useState } from "react";
import { Trash2, Plus, Package, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ItemData {
  id: number;
  itemName: string;
  itemCode: string;
  unit: string;
  materialType: string;
  quantity: number;
  price: number;
  description: string;
}

interface CatalogModuleProps {
  items: ItemData[];
  onAddItem: (item: ItemData) => void;
  onDeleteItem: (id: number) => void;
}

const CatalogModule = ({ items, onAddItem, onDeleteItem }: CatalogModuleProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    unit: "",
    materialType: "",
    quantity: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.itemName.trim()) newErrors.itemName = "Item name is required";
    if (!formData.itemCode.trim()) newErrors.itemCode = "Item code is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (!formData.materialType.trim()) newErrors.materialType = "Material type is required";
    if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0)
      newErrors.quantity = "Valid quantity is required";
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0)
      newErrors.price = "Valid price is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onAddItem({
      id: Date.now(),
      itemName: formData.itemName,
      itemCode: formData.itemCode,
      unit: formData.unit,
      materialType: formData.materialType,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      description: formData.description,
    });
    setFormData({ itemName: "", itemCode: "", unit: "", materialType: "", quantity: "", price: "", description: "" });
    setFormOpen(false);
    setErrors({});
  };

  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      {/* Add Item Form */}
      <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add New Item</CardTitle>
              <CardDescription>Add products to your catalog</CardDescription>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Item Name *</label>
                <Input
                  placeholder="Enter item name"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className={errors.itemName ? "border-destructive" : ""}
                />
                {errors.itemName && <p className="text-xs text-destructive">{errors.itemName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Item Code *</label>
                <Input
                  placeholder="e.g., SKU-001"
                  value={formData.itemCode}
                  onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
                  className={errors.itemCode ? "border-destructive" : ""}
                />
                {errors.itemCode && <p className="text-xs text-destructive">{errors.itemCode}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit *</label>
                <Input
                  placeholder="e.g., Kg, Litre, Piece"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className={errors.unit ? "border-destructive" : ""}
                />
                {errors.unit && <p className="text-xs text-destructive">{errors.unit}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Material Type *</label>
                <Input
                  placeholder="e.g., Plastic, Metal, Wood"
                  value={formData.materialType}
                  onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                  className={errors.materialType ? "border-destructive" : ""}
                />
                {errors.materialType && <p className="text-xs text-destructive">{errors.materialType}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity *</label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className={errors.quantity ? "border-destructive" : ""}
                />
                {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price *</label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Input
                placeholder="Enter item description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
            </div>

            <div className="flex gap-2 pt-4">
              <button onClick={handleSubmit} className="flex-1 glow-button py-2">
                Add Item
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

      {/* Inventory Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{items.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Items</p>
          </CardContent>
        </Card>
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Total Stock</p>
          </CardContent>
        </Card>
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
            <p className="text-sm text-muted-foreground mt-2">Inventory Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Items List */}
      <Card className="border border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Catalog Items ({items.length})</CardTitle>
          <CardDescription>All products in your catalog</CardDescription>
        </CardHeader>

        <CardContent>
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <Package size={32} className="mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">No items yet. Add your first item!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left py-3 px-4 font-semibold">Item Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Unit</th>
                    <th className="text-left py-3 px-4 font-semibold">Material</th>
                    <th className="text-left py-3 px-4 font-semibold">Qty</th>
                    <th className="text-left py-3 px-4 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Total Value</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="py-3 px-4 font-medium">{item.itemName}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.itemCode}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.unit}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.materialType}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4">{formatCurrency(item.price)}</td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(item.quantity * item.price)}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs max-w-xs truncate">{item.description}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-all">
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => onDeleteItem(item.id)}
                            className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                            title="Delete item"
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CatalogModule;
