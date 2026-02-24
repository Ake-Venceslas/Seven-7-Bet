
"use client";

import { User, Trophy, Layers, Calendar, Folder, BarChart2 } from "lucide-react";

export default function AdminDashboardPage() {
  // Replace with real admin name from auth context
  const adminName = "Admin Name";

  // Dummy stats (replace with real data)
  const stats = [
    { label: "Sports", value: 8, icon: <Trophy className="h-7 w-7 text-emerald-400" /> },
    { label: "Ligues", value: 15, icon: <Layers className="h-7 w-7 text-blue-400" /> },
    { label: "Matchs", value: 120, icon: <Calendar className="h-7 w-7 text-yellow-400" /> },
    { label: "Catégories", value: 6, icon: <Folder className="h-7 w-7 text-pink-400" /> },
  ];

  const sections = [
    {
      label: "Gérer les Sports",
      desc: "Ajoutez, modifiez ou supprimez les sports disponibles.",
      icon: <Trophy className="h-8 w-8 text-emerald-400" />,
      href: "./sports",
    },
    {
      label: "Gérer les Ligues",
      desc: "Organisez les ligues et tournois.",
      icon: <Layers className="h-8 w-8 text-blue-400" />,
      href: "./leagues",
    },
    {
      label: "Gérer les Matchs",
      desc: "Planifiez et gérez les matchs.",
      icon: <Calendar className="h-8 w-8 text-yellow-400" />,
      href: "./matches",
    },
    {
      label: "Gérer les Catégories",
      desc: "Classez les ligues par catégorie.",
      icon: <Folder className="h-8 w-8 text-pink-400" />,
      href: "./categories",
    },
  ];

  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-[#181824] to-[#232946] py-12 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-5">
            <User className="h-12 w-12 text-emerald-400" />
          </span>
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1 leading-tight">
              Bienvenue, <span className="text-emerald-400">{adminName}</span>
            </h1>
            <p className="text-slate-400 text-lg">Panneau d'administration</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-[#232946] rounded-xl px-5 py-3 border border-emerald-500/20 shadow">
            <BarChart2 className="h-6 w-6 text-emerald-400" />
            <span className="text-white font-semibold text-lg">Statistiques</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#232946] rounded-2xl p-6 flex flex-col items-center border border-white/5 shadow hover:scale-105 transition-transform">
            <div>{stat.icon}</div>
            <div className="text-2xl font-bold text-white mt-2">{stat.value}</div>
            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <a
            key={section.label}
            href={section.href}
            className="flex items-center gap-5 bg-[#20203a] rounded-2xl p-8 border border-emerald-500/10 shadow-lg hover:border-emerald-400/40 hover:scale-[1.03] transition-all group"
            style={{ textDecoration: 'none' }}
          >
            <span className="bg-[#232946] rounded-xl p-4 flex items-center justify-center">
              {section.icon}
            </span>
            <div>
              <div className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{section.label}</div>
              <div className="text-slate-400 text-base mt-1">{section.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Prono Admin Panel. Tous droits réservés.
      </div>
    </section>
  );
}