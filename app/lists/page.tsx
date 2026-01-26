import { Plus, ListChecks } from "lucide-react";
import Link from "next/link";

const ListsPage = () => {
  const lists: any[] = []; // replace later with real data

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

        <Link href="/add" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus size={16} />
          New List
        </Link>
      </div>

      {/* Content */}
      {lists.length === 0 ? (
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

          <Link href="/add" className="mt-5 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Create your first list
          </Link>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* List cards go here */}
        </section>
      )}

    </main>
  );
};

export default ListsPage;
