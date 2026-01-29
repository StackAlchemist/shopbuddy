"use client";

import { Plus, ListChecks } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type List = {
  _id: string;
  title: string;
  items: { name: string; price: number; quantity: number }[];
};

const ListsPage = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  const getLists = async () => {
    const response = await fetch("/api/lists");
    if (!response.ok) {
      throw new Error("Failed to fetch lists");
    }
    return response.json();
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Your Lists
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and organize all your lists in one place
          </p>
        </div>

        <Link
          href="/add"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          New List
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-slate-500">Loading lists...</p>
      )}

      {/* Empty state */}
      {!loading && lists.length === 0 && (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <ListChecks size={22} />
          </div>

          <h3 className="text-lg font-medium text-slate-900">
            No lists yet
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Create your first list and let AI help you remember
            what you might have missed.
          </p>

          <Link
            href="/add"
            className="mt-5 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create your first list
          </Link>
        </div>
      )}

      {/* Lists */}
      {!loading && lists.length > 0 && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <div
              key={list._id}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow"
            >
              <h3 className="font-medium text-slate-900">
                {list.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {list.items.length} items
              </p>
              <Link href={`/lists/${list._id}`} className="text-blue-600 hover:text-blue-700">
                View List
              </Link>
            </div>
          ))}
        </section>
      )}

    </main>
  );
};

export default ListsPage;
