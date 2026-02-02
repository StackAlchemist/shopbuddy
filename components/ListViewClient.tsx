"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Receipt,
  Trash2,
  Download,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";

type Item = {
  name: string;
  price: number;
  quantity: number;
};

export default function ListViewClient({ id }: { id: string }) {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<
    "pdf" | "delete" | null
  >(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`/api/lists/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setList(data);
      } catch {
        toast.error("Failed to load list");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      setActionLoading("pdf");
      const res = await fetch(`/api/lists/${id}/pdf`);
      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${list.title}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setActionLoading(null);
    }
  };

  const handleEditList = () => {
    window.location.href = `/add?id=${id}`;
  };

  const handleDeleteList = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this list? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      setActionLoading("delete");
      const res = await fetch(`/api/lists/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      toast.success("List deleted");
      window.location.href = "/lists";
    } catch {
      toast.error("Failed to delete list");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 animate-pulse space-y-4">
        <div className="h-8 w-1/2 rounded bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-200" />
        <div className="space-y-3 pt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-slate-200" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ShoppingCart size={18} />
          </div>

          <h1 className="text-2xl font-semibold text-slate-900">
            {list.title}
          </h1>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {list.items.length} items
        </p>
      </div>

      {/* Items */}
      <div className="lg:col-span-2">
            <div className="rounded-lg bg-amber-50 p-8 font-mono text-sm shadow-sm">
              <div className="mb-4 border-b-2 border-dashed border-amber-900 pb-3 text-center text-xs font-semibold tracking-wide text-amber-900">
                ─────────────────────────────
              </div>
              
              <ul className="space-y-0">
                {list.items.map((item: Item) => (
                  <li key={item.name} className="space-y-1">
                    <div className="flex justify-between text-amber-950">
                      <span className="flex-1 truncate pr-4">{item.name}</span>
                      <span className="whitespace-nowrap font-semibold">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-amber-700">
                      {item.quantity} × ₦{item.price.toLocaleString()}
                    </div>
                    <div className="border-b border-dashed border-amber-300" />
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t-2 border-dashed border-amber-900 pt-3">
                <div className="flex justify-between text-amber-950">
                  <span className="font-semibold">TOTAL</span>
                  <span className="font-bold">₦{list.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 border-t-2 border-dashed border-amber-900 pt-3 text-center text-xs text-amber-700">
                ─────────────────────────────
              </div>
            </div>
          </div>

      {/* Total */}
      {/* <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Receipt size={16} />
          <span>Total</span>
        </div>

        <span className="text-lg font-semibold">
          ₦{list.total}
        </span>
      </div> */}

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={handleDownloadPDF}
          disabled={actionLoading === "pdf"}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Download size={16} />
          Download PDF
        </button>

        <button
          onClick={handleEditList}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={handleDeleteList}
          disabled={actionLoading === "delete"}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </main>
  );
}
