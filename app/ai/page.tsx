"use client";

import { Sparkles, ShoppingCart, Plane, Gift, ListPlus, Lock } from "lucide-react";
import { useState } from "react";

const quickActions = [
  {
    title: "Complete my grocery list",
    description: "Find items you may have forgotten",
    icon: ShoppingCart,
  },
  {
    title: "Plan a trip",
    description: "Generate a packing checklist",
    icon: Plane,
  },
  {
    title: "Event planning",
    description: "Create a checklist for events",
    icon: Gift,
  },
  {
    title: "Start from scratch",
    description: "Generate a new smart list",
    icon: ListPlus,
  },
];

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <div className="relative">
      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="mx-4 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            Coming Soon
          </h2>
          
          <p className="text-slate-600">
            AI Assistant is currently under development. Check back soon for smart list generation and planning features!
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Powered by AI</span>

            </div>
            <button
                onClick={() => window.location.href = "/lists"}
                className="rounded-full bg-blue-600 mt-4 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Go to lists
              </button>
          </div>
        </div>
      </div>

      {/* Blurred Content */}
      <main className="pointer-events-none mx-auto max-w-5xl select-none px-6 py-12 blur-sm">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={18} />
            </div>

            <h1 className="text-2xl font-semibold text-slate-900">
              AI Assistant
            </h1>
          </div>

          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Get smart suggestions, complete your lists, and plan faster with AI.
          </p>
        </div>

        {/* Quick actions */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-500 hover:shadow-sm"
            >
              <action.icon
                size={20}
                className="text-blue-600 transition group-hover:scale-105"
              />
              <h3 className="mt-3 font-medium text-slate-900">
                {action.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {action.description}
              </p>
            </button>
          ))}
        </section>

        {/* Custom prompt */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Or tell me what you're planning
          </label>

          <div className="flex gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Weekly groceries for 2 people"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
              Generate
            </button>
          </div>
        </section>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-medium text-slate-700">
              Suggestions
            </h2>

            <div className="space-y-3">
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="text-sm text-slate-900">{item}</span>

                  <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100">
                    Add
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Add all to list
              </button>
              <button className="rounded-full border border-slate-300 px-5 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Refine suggestions
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}