"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import toast from "react-hot-toast";
import { Trophy } from "lucide-react";
import MatchCard from "@/components/admin_components/MatchCard";

const emptyForm = {
  home: "",
  away: "",
  oddA: 1.5,
  draw: 3.0,
  oddB: 1.5,
  time: "",
  category: "",
  status: "upcoming",
  scoreA: 0,
  scoreB: 0,
};

export default function MatchesPage() {
  const {
    matches,
    categories,
    sports,
    addMatch,
    updateMatch,
    deleteMatch,
  } = useAdminData();
  const [showModal, setShowModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  // filter categories by selected sport
  React.useEffect(() => {
    if (!selectedSport) {
      setFilteredCategories(categories);
      return;
    }
    const filtered = categories.filter((cat) => {
      const sportId = cat.sport?._id || cat.sport;
      return sportId === selectedSport;
    });
    setFilteredCategories(filtered);
  }, [selectedSport, categories]);

  const openCreateModal = () => {
    setEditingMatch(null);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    const defaultTime = tomorrow.toISOString().slice(0, 16);

    setFormData({
      ...emptyForm,
      time: defaultTime,
    });
    setSelectedSport("");
    setShowModal(true);
  };

  const openEditModal = (match) => {
    setEditingMatch(match);

    let formattedTime = "";
    if (match.time) {
      try {
        const date = new Date(match.time);
        formattedTime = date.toISOString().slice(0, 16);
      } catch {
        formattedTime = "";
      }
    }

    setFormData({
      home: match.home || match.teamA || "",
      away: match.away || match.teamB || "",
      oddA: Array.isArray(match.odds) ? match.odds[0] : (match.oddA || 1.5),
      draw: Array.isArray(match.odds) ? match.odds[1] : (match.draw || 3.0),
      oddB: Array.isArray(match.odds) ? match.odds[2] : (match.oddB || 1.5),
      time: formattedTime,
      category: match.category?._id || match.category || "",
      status: match.status || "upcoming",
      scoreA: match.scoreA || 0,
      scoreB: match.scoreB || 0,
    });

    setSelectedSport(match.category?.sport?._id || "");
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const categoryObj = categories.find((c) => c._id === formData.category);
      // Trouver la league associée à la catégorie
      let leagueId = null;
      if (categoryObj && categoryObj.leagueId) {
        leagueId = categoryObj.leagueId;
      }
      if (editingMatch) {
        updateMatch(editingMatch._id, {
          ...formData,
          home: formData.home,
          away: formData.away,
          time: new Date(formData.time).toISOString(),
          category: categoryObj || null,
          leagueId: leagueId || formData.leagueId || "",
          odds: [formData.oddA || 1.5, formData.draw || 3.0, formData.oddB || 1.5],
        });
        toast.success("Match updated!");
      } else {
        const newMatch = {
          _id: `match-${Date.now()}`,
          ...formData,
          home: formData.home,
          away: formData.away,
          time: new Date(formData.time).toISOString(),
          category: categoryObj || null,
          leagueId: leagueId || formData.leagueId || "",
          odds: [formData.oddA || 1.5, formData.draw || 3.0, formData.oddB || 1.5],
        };
        addMatch(newMatch);
        toast.success("Match created!");
      }
      setShowModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this match?")) return;
    deleteMatch(id);
    toast.success("Match deleted!");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Matches Management
          </h1>
          <p style={{ color: "#8892a4" }}>
            Create and manage betting matches
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-3 py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-200 hover:scale-105 text-sm"
        >
          + Add Match
        </button>
      </div>

      {/* Matches list / empty */}
      {matches.length === 0 ? (
        <div
          className="text-center py-20 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-slate-400" />
          </div>
          <div className="text-white text-xl font-semibold">
            No matches yet
          </div>
          <div style={{ color: "#8892a4" }}>
            Create your first match
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard
              key={match._id}
              match={match}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-8 max-h-screen overflow-y-auto"
            style={{
              background: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {editingMatch ? "Edit Match" : "Create New Match"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sport filter */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8892a4" }}
                >
                  Filter by Sport
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => {
                    setSelectedSport(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      category: "",
                    }));
                  }}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <option value="" style={{ background: "#1a1a2e" }}>
                    All Sports
                  </option>
                  {sports.map((s) => (
                    <option
                      key={s._id}
                      value={s._id}
                      style={{ background: "#1a1a2e" }}
                    >
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8892a4" }}
                >
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <option value="" style={{ background: "#1a1a2e" }}>
                    Select Category
                  </option>
                  {filteredCategories.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      style={{ background: "#1a1a2e" }}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Teams */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#8892a4" }}
                  >
                    Team A *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teamA}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamA: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    placeholder="Home team"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#8892a4" }}
                  >
                    Team B *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teamB}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamB: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    placeholder="Away team"
                  />
                </div>
              </div>

              {/* Odds */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#8892a4" }}
                  >
                    Odd A (V1) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={formData.oddA}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oddA: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#8892a4" }}
                  >
                    Draw (X) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={formData.draw}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        draw: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#8892a4" }}
                  >
                    Odd B (V2) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={formData.oddB}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oddB: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              </div>

              {/* Match Time */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8892a4" }}
                >
                  Match Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      time: e.target.value,
                    })
                  }
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    colorScheme: "dark",
                  }}
                />
                <p
                  className="mt-1 text-xs"
                  style={{ color: "#8892a4" }}
                >
                  Select both date AND time (e.g. 02/18/2026, 03:00 PM)
                </p>
              </div>

              {/* Status */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8892a4" }}
                >
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <option value="upcoming" style={{ background: "#1a1a2e" }}>
                    Upcoming
                  </option>
                  <option value="live" style={{ background: "#1a1a2e" }}>
                    Live
                  </option>
                  <option value="finished" style={{ background: "#1a1a2e" }}>
                    Finished
                  </option>
                </select>
              </div>

              {/* Scores when live/finished */}
              {(formData.status === "live" ||
                formData.status === "finished") && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#8892a4" }}
                    >
                      Score A
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.scoreA}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          scoreA: parseInt(e.target.value || "0", 10),
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#8892a4" }}
                    >
                      Score B
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.scoreB}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          scoreB: parseInt(e.target.value || "0", 10),
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl font-medium text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#8892a4",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 disabled:opacity-50 text-xs"
                >
                  {submitting
                    ? "Saving..."
                    : editingMatch
                    ? "Update Match"
                    : "Create Match"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}