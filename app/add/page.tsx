"use client";

import { Plus, Sparkles, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Item = {
  name: string;
  price: number;
  quantity: number;
};

const NewListPage = () => {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Item[]>([
    { name: "", price: 0, quantity: 1 },
  ]);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!id) return;

    const fetchList = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/lists/${id}`);
        if (!res.ok) throw new Error();

        const data = await res.json();

        setTitle(data.title);
        setItems(data.items);
      } catch {
        toast.error("Failed to load list for editing");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [id]);


  const addItem = () => {
    setItems([...items, { name: "", price: 0, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const saveList = async ()=>{
    const loading = toast.loading("Saving list...");
      try {
        setLoading(true);
    
        const res = await fetch(
          isEdit ? `/api/lists/${id}` : "/api/lists",
          {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              items,
            }),
          }
        );
    
        if (!res.ok) {
          toast.error("Something went wrong", { id: loading });
          return;
        }
    
        toast.success(isEdit ? "List updated" : "List created");
        window.location.href = "/lists";
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Create new list
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add items manually, we’ll help you remember the rest.
        </p>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          List title
        </label>
        <input
          type="text"
          placeholder="e.g. Weekly groceries, Office setup, Travel packing"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Items */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-slate-700">Items</h2>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 rounded-xl border border-slate-200 bg-white p-3"
          >
            <input
              type="text"
              placeholder="Item name"
              value={item.name}
              onChange={(e) =>
                updateItem(index, "name", e.target.value)
              }
              className="col-span-5 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="₦ Price"
              value={item.price}
              onChange={(e) =>
                updateItem(index, "price", Number(e.target.value))
              }
              className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                updateItem(index, "quantity", Number(e.target.value))
              }
              className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={() => removeItem(index)}
              className="col-span-2 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} />
          Add item
        </button>
      </section>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">

        <div>
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-lg font-semibold text-slate-900">
            ₦{total.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-white">
            <Sparkles size={16} />
            AI suggestions
          </button>

          <button onClick={saveList} className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Save list
          </button>
        </div>

      </div>

    </main>
  );
};

export default NewListPage;
