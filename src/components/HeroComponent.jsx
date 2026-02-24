
import React from "react";
import { useAdminData } from "@/context/AdminDataContext";

const filters = ["Hier", "Aujourd'hui", "Demain", "dd-mm-yy"];
const matchTypes = [
  { label: "Tout Les Matchs", active: true },
  { label: "Live", active: false },
  { label: "Résultats des Matchs", active: false },
];

function HeroComponent({ selectedSportId, onSportSelect }) {
  const { sports, leagues } = useAdminData();
  // Example tags: you can add tags to AdminDataContext if needed
  const tags = [];
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1400px] mx-auto mt-8 px-2">
      {/* Main content */}
      <div className="flex-1">
        {/* Sports */}
        <div className="flex gap-3 mb-3">
          {sports.map((s) => (
            <button
              key={s._id}
              onClick={() => onSportSelect(s._id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-base font-semibold border shadow-sm transition-all duration-200
                ${
                  selectedSportId === s._id
                    ? "bg-[#3C8A8E] text-white border-[#3C8A8E] scale-105 shadow-lg"
                    : "bg-white text-[#3C8A8E] border-[#3C8A8E] hover:bg-[#3C8A8E] hover:text-white hover:scale-105 hover:shadow-lg"
                }
              `}
            >
              <span className="text-xl">{s.icon || "🏆"}</span> {s.name}
            </button>
          ))}
        </div>
        {/* Leagues */}
        <div className="flex flex-wrap gap-3 mb-4">
          {leagues
            .filter((l) => l.sportId === selectedSportId)
            .map((l) => (
              <span
                key={l._id}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-semibold border shadow-sm bg-white text-[#3C8A8E] border-[#3C8A8E]"
              >
                {l.icon && (
                  <span className="text-2xl">{l.icon}</span>
                )} {l.name}
              </span>
            ))}
        </div>
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {filters.map((f, i) => (
            <button
              key={f}
              className="px-5 py-1.5 rounded-full cursor-pointer text-base font-semibold border shadow-sm transition-all duration-200 bg-white text-[#3C8A8E] border-[#3C8A8E] flex items-center gap-2 hover:bg-[#3C8A8E] hover:text-white hover:scale-105 hover:shadow-lg"
            >
              {f === "dd-mm-yy" ? (
                <>
                  <span className="material-icons-outlined">calendrier</span> {f}
                </>
              ) : (
                f
              )}
            </button>
          ))}
        </div>
        {/* Title & Subtitle */}
        <h2 className="text-2xl font-semibold mb-2">
          Voici toute nos prédictions de paris .
        </h2>
        {/* Match type buttons */}
        <div className="flex gap-4 mb-6 mt-6">
          {matchTypes.map((m, i) => (
            <button
              key={m.label}
              className={`px-5 py-1.5 rounded-full cursor-pointer text-base font-semibold border shadow-sm transition-all duration-200
                ${
                  m.active
                    ? "bg-[#3C8A8E] text-white border-[#3C8A8E] scale-105 shadow-lg"
                    : "bg-white text-[#3C8A8E] border-[#3C8A8E] hover:bg-[#3C8A8E] hover:text-white hover:scale-105 hover:shadow-lg"
                }
              `}
            >
              {m.label}
            </button>
          ))}
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-4 mb-4">
          {tags.map((t, i) => (
            <span
              key={t}
              className="px-4 py-1.5 rounded-full cursor-pointer text-base font-semibold border shadow-sm transition-all duration-200 bg-white text-[#3C8A8E] border-[#3C8A8E] mb-2 hover:bg-[#3C8A8E] hover:text-white hover:scale-105 hover:shadow-lg"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* Right side: Banner */}
      <div className="w-full lg:w-105 shrink-0 flex items-center justify-center">
        <img
          src="/logo 2.webp"
          alt="Banner"
          className="rounded-xl shadow-lg w-full h-[420px] object-cover"
        />
      </div>
    </div>
  );
}

export default HeroComponent;
