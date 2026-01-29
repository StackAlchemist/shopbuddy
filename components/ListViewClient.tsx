// app/lists/[id]/ListViewClient.tsx
"use client";

import { useEffect, useState } from "react";

type Item = {
  name: string;
  price: number;
  quantity: number;
};

export default function ListViewClient({ id }: { id: string }) {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      const res = await fetch(`/api/lists/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch list");
      }
      const data = await res.json();
      setList(data);
      setLoading(false);
    };

    fetchList();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">{list.title}</h1>

      <p className="mt-2 text-sm text-slate-500">
        Total: ₦{list.total} • {list.items.length} items
      </p>

      <ul className="mt-6 space-y-3">
        {list.items.map((item: Item) => (
          <li
            key={item.name}
            className="flex justify-between rounded-lg border p-3"
          >
            <span>{item.name}</span>
            <span>
              {item.quantity} × ₦{item.price}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}