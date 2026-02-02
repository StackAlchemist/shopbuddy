"use client";

import { Plus, ListChecks, ShoppingCart, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type List = {
  _id: string;
  title: string;
  items: { name: string; price: number; quantity: number }[];
  createdAt?: string;
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

  // Calculate total items across all lists
  const totalItems = lists.reduce((sum, list) => sum + list.items.length, 0);

  // Calculate total estimated value
  const totalValue = lists.reduce(
    (sum, list) =>
      sum +
      list.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0),
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
              Your Lists
            </h1>
            <p className="mt-2 text-slate-600">
              Manage and organize all your shopping lists in one place
            </p>
          </div>

          <Link
            href="/add"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/40"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            New List
          </Link>
        </div>

        {/* Stats Cards */}
        {!loading && lists.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={<ListChecks className="w-5 h-5" />}
              label="Total Lists"
              value={lists.length.toString()}
              gradient="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={<ShoppingCart className="w-5 h-5" />}
              label="Total Items"
              value={totalItems.toString()}
              gradient="from-cyan-500 to-blue-600"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Est. Value"
              value={`₦${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              gradient="from-blue-600 to-indigo-600"
            />
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && lists.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

          <div className="relative text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
              <Sparkles size={32} className="animate-pulse" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              No lists yet
            </h3>
            <p className="mt-3 max-w-md mx-auto text-slate-600 leading-relaxed">
              Create your first list and let AI help you remember what you might have missed.
              Start shopping smarter today!
            </p>

            <Link
              href="/add"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 font-semibold text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/40"
            >
              <Plus size={20} />
              Create your first list
            </Link>
          </div>
        </div>
      )}

      {/* Lists Grid */}
      {!loading && lists.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list, index) => (
            <ListCard
              key={list._id}
              list={list}
              index={index}
            />
          ))}
        </section>
      )}
    </main>
  );
};

/* COMPONENTS */

function StatCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      <div className="relative flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ListCard({ list, index }: { list: List; index: number }) {
  const totalPrice = list.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Link
      href={`/lists/${list._id}`}
      className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:scale-[1.02] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity" />

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          {/* <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-shadow">
            <ShoppingCart size={20} />
          </div> */}
          
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
            {list.items.length} items
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {list.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            {formatDate(list.createdAt)}
          </span>
          <span className="font-semibold text-slate-900">
          ₦{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* View indicator */}
        <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
          View Details
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default ListsPage;