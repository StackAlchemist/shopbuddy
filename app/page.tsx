import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingCart,
  Brain,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1 text-xs text-blue-600">
          <Sparkles size={14} />
          Smart shopping lists
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-slate-900">
          Shopping, <span className="text-blue-600">but smarter.</span>
        </h1>

        <p className="mt-6 text-slate-600 max-w-xl mx-auto text-lg">
          Create lists, add what you remember, and let AI suggest the rest.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/lists"
            className="rounded-full bg-blue-600 px-8 py-3 text-white text-sm font-medium hover:bg-blue-700"
          >
            Get started
          </Link>

          <Link
            href="/ai"
            className="rounded-full border px-8 py-3 text-sm font-medium hover:bg-slate-50"
          >
            See AI in action
          </Link>
        </div>

        {/* APP PREVIEW */}
        <div className="mt-20 max-w-5xl mx-auto">
          <Image
            src="/images/dashboard.png"
            alt="Shopping list dashboard"
            width={1200}
            height={700}
            priority
            className="rounded-2xl border shadow-xl"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-3">
          <Feature
            icon={<ShoppingCart />}
            title="Simple lists"
            text="Create and manage shopping lists without clutter."
          />
          <Feature
            icon={<Brain />}
            title="AI suggestions"
            text="Smart reminders for items you probably forgot."
          />
          <Feature
            icon={<Zap />}
            title="Fast & lightweight"
            text="Built for speed on any device."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          How it works
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10 text-center">
          <Step number="01" text="Create a list" />
          <Step number="02" text="Add what you remember" />
          <Step number="03" text="Let AI fill the gaps" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-gradient-to-b from-white to-blue-50">
        <h2 className="text-4xl font-semibold text-slate-900">
          Never forget an item again.
        </h2>

        <p className="mt-4 text-slate-600 text-lg">
          Start your first smart list in seconds.
        </p>

        <Link
          href="/lists"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-white text-sm font-medium hover:bg-blue-700"
        >
          <Sparkles size={16} />
          Create a list
        </Link>
      </section>
    </main>
  );
}

/* COMPONENTS */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
      <h3 className="mt-6 font-medium text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{text}</p>
    </div>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div>
      <div className="mx-auto text-sm text-blue-600 font-mono">
        {number}
      </div>
      <p className="mt-3 text-slate-700">{text}</p>
    </div>
  );
}
