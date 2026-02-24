"use client";

import { Folder, Trophy, Pencil, Trash2 } from "lucide-react";

export default function LeagueCard({ league, onEdit, onDelete }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        {/* icon box */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(167,139,250,0.15)" }}
        >
          <Folder className="h-6 w-6 text-emerald-400" />
        </div>

        {/* actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(league)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(league._id, league.name)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 text-red-400 border border-red-500/40 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-white font-semibold text-lg">{league.name}</h3>

        <div className="mt-1 text-sm flex items-center gap-1 text-emerald-400">
          <Trophy className="h-4 w-4" />
          <span>{league.sport?.name || "No Sport"}</span>
        </div>

        <div className="mt-2 text-xs" style={{ color: "#8892a4" }}>
          Created: {new Date(league.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
