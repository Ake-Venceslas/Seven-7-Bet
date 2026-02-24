"use client";

import { CalendarDays, Clock, Trophy, Trash2, Pencil } from "lucide-react";

const statusStyles = {
  upcoming: {
    bg: "rgba(52,211,153,0.15)",
    color: "#34d399",
    border: "rgba(52,211,153,0.3)",
    label: "UPCOMING",
  },
  live: {
    bg: "rgba(248,113,113,0.15)",
    color: "#f87171",
    border: "rgba(248,113,113,0.3)",
    label: "LIVE",
  },
  finished: {
    bg: "rgba(136,146,164,0.15)",
    color: "#8892a4",
    border: "rgba(136,146,164,0.3)",
    label: "FINISHED",
  },
};

export default function MatchCard({ match, onEdit, onDelete }) {
  const sc = statusStyles[match.status] || statusStyles.upcoming;

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Teams */}
          <div className="flex items-center gap-6 mb-3">
            <div className="text-center">
              <div className="text-white font-bold text-lg">{match.teamA}</div>
              <div
                style={{ color: "#34d399" }}
                className="text-sm font-semibold"
              >
                Odd: {match.oddA}
              </div>
            </div>

            <div className="px-4 py-1 rounded-lg text-gray-400 font-bold">
              VS
            </div>

            <div className="text-center">
              <div className="text-white font-bold text-lg">{match.teamB}</div>
              <div
                style={{ color: "#34d399" }}
                className="text-sm font-semibold"
              >
                Odd: {match.oddB}
              </div>
            </div>
          </div>

          {/* Meta */}
          <div
            className="flex gap-4 flex-wrap text-sm items-center"
            style={{ color: "#8892a4" }}
          >
            <span className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-emerald-400" />
              {match.category?.name || "No category"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              {new Date(match.time).toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5 text-emerald-400" />
              Score: {match.scoreA} - {match.scoreB}
            </span>
          </div>
        </div>

        {/* Right: status + actions */}
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: sc.bg,
              color: sc.color,
              border: `1px solid ${sc.border}`,
            }}
          >
            {sc.label}
          </span>
          <button
            onClick={() => onEdit(match)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(match._id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 text-red-400 border border-red-500/40 hover:bg-red-500/10 transition-all"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
