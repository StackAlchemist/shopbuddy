import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingCart,
  Brain,
  Zap,
  ArrowRight,
  Check,
  Stars,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-white">
      
      {/* Animated background gradients - blue focused */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-32">
        
        {/* Badge */}
        <div className="flex justify-center animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30">
            <Sparkles size={16} className="animate-pulse" />
            AI-Powered Shopping Lists
          </span>
        </div>

        {/* Main headline */}
        <h1 className="mt-10 text-center text-6xl md:text-7xl lg:text-8xl font-black tracking-tight animate-fade-in-up">
          <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Shopping,
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent animate-gradient">
            but smarter.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-center text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Create lists, add what you remember, and let{" "}
          <span className="font-semibold text-blue-600">AI suggest the rest</span>.
          Never forget an item again.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap animate-fade-in-up animation-delay-400">
          <Link
            href="/lists"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 text-white text-lg font-semibold shadow-2xl shadow-blue-500/50 transition-all hover:shadow-blue-600/60 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get started free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/ai"
            className="rounded-full border-2 border-blue-600 bg-white px-10 py-4 text-lg font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            See AI in action
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex justify-center gap-8 text-sm text-slate-500 animate-fade-in animation-delay-600">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-blue-600" />
            Free forever
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-blue-600" />
            No credit card
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-blue-600" />
            AI-powered
          </div>
        </div>

        {/* APP PREVIEW with floating effect */}
        <div className="mt-24 max-w-6xl mx-auto animate-fade-in-up animation-delay-800">
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 rounded-3xl blur-2xl opacity-20" />
            
            <div className="relative rounded-3xl border-4 border-white shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/images/dashboard.png"
                alt="Shopping list dashboard"
                width={1200}
                height={700}
                priority
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES with gradient background */}
      <section className="relative py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6">
          
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              Everything you need
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Powerful features that make shopping effortless
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<ShoppingCart className="w-8 h-8" />}
              title="Simple lists"
              text="Create and manage shopping lists without clutter. Clean, intuitive interface designed for speed."
              gradient="from-blue-500 to-blue-600"
              delay="0"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI suggestions"
              text="Smart reminders for items you probably forgot. Our AI learns your shopping patterns."
              gradient="from-blue-600 to-cyan-500"
              delay="200"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Lightning fast"
              text="Built for speed on any device. Instant sync across all your devices, always up to date."
              gradient="from-cyan-500 to-blue-700"
              delay="400"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Visual step cards */}
      <section className="py-32 mx-auto max-w-7xl px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-600 to-blue-700 bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="mt-4 text-xl text-slate-600">
            Three simple steps to smarter shopping
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-1 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 -translate-y-1/2 z-0" />
          <div className="hidden md:block absolute top-1/2 right-0 w-1/3 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 -translate-y-1/2 z-0" />

          <StepCard
            number="01"
            title="Create a list"
            description="Start with a simple name. Groceries, party supplies, camping gear - anything you need."
            icon={<ShoppingCart className="w-6 h-6" />}
            gradient="from-blue-500 to-blue-600"
          />
          
          <StepCard
            number="02"
            title="Add what you remember"
            description="Quickly jot down items as they come to mind. No need to be complete."
            icon={<Brain className="w-6 h-6" />}
            gradient="from-blue-600 to-cyan-500"
          />
          
          <StepCard
            number="03"
            title="Let AI fill the gaps"
            description="Our AI analyzes your list and suggests items you might have forgotten."
            icon={<Stars className="w-6 h-6" />}
            gradient="from-cyan-500 to-blue-700"
          />
        </div>
      </section>

      {/* CTA Section with bold gradient */}
      <section className="relative py-32 overflow-hidden">
        
        {/* Gradient background - blue dominant */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl animate-blob animation-delay-2000" />

        <div className="relative text-center text-white px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Never forget an item again.
          </h2>

          <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of smart shoppers who never miss a thing.
          </p>

          <Link
            href="/lists"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-12 py-5 text-xl font-bold text-blue-600 shadow-2xl transition-all hover:scale-105 hover:shadow-white/50"
          >
            <Sparkles size={24} className="animate-pulse" />
            Start your first list
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-8 text-white/80">
            Free forever • No credit card required • Setup in 30 seconds
          </p>
        </div>
      </section>
    </main>
  );
}

/* COMPONENTS */

function FeatureCard({
  icon,
  title,
  text,
  gradient,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  gradient: string;
  delay: string;
}) {
  return (
    <div 
      className="group relative rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient accent on hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      <div className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-shadow`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
  gradient,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="relative z-10 group">
      {/* Number badge */}
      <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 text-3xl font-black transition-all`}>
        {number}
      </div>

      {/* Card */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        </div>
        
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}