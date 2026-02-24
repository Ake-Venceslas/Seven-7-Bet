"use client";

import { Trophy, Pencil, Trash2 } from "lucide-react";

export default function SportCard({ sport, onEdit, onDelete }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        {/* Icon box */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(52,211,153,0.15)" }}
        >
          <Trophy className="h-6 w-6 text-emerald-400" />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(sport)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(sport._id, sport.name)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 text-red-400 border border-red-500/40 hover:bg-red-500/10 transition-all"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-white font-semibold text-lg ">{sport.name}</h3>

        {sport.description && (
          <p className="text-sm mt-1" style={{ color: "#8892a4" }}>
            {sport.description}
          </p>
        )}

        <div className="mt-3 text-xs" style={{ color: "#8892a4" }}>
          Created: {new Date(sport.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
