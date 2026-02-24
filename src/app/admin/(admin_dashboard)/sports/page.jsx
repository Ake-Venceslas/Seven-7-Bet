"use client";

import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import toast from "react-hot-toast";
import { Trophy } from "lucide-react";
import SportCard from "@/components/admin_components/SportCard";

export default function SportsPage() {
  const {
    sports,
    addSport,
    updateSport,
    deleteSport,
  } = useAdminData();

  // Suppression d'un sport
  const handleDelete = (id) => {
    deleteSport(id);
    toast.success("Sport deleted!");
  };
  const [showModal, setShowModal] = useState(false);
  const [editingSport, setEditingSport] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

    const openCreateModal = () => {
      setEditingSport(null);
      setFormData({ name: "", description: "" });
      setShowModal(true);
    };

    const openEditModal = (sport) => {
      setEditingSport(sport);
      setFormData({
        name: sport.name,
        description: sport.description || "",
      });
      setShowModal(true);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        if (editingSport) {
          // ...existing code...
        } else {
          // Création d'un nouveau sport
          const newSport = {
            _id: Date.now().toString(), // id temporaire
            name: formData.name,
            description: formData.description,
          };
          addSport(newSport);
          toast.success("Sport created!");
          setShowModal(false);
        }
      } finally {
        setSubmitting(false);
      }
    };

    // ...existing code...

    return (
      <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Sports Management
          </h1>
          <p style={{ color: "#8892a4" }}>Manage all sports in the system</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-3 py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-200 hover:scale-105 text-sm"
        >
          + Add Sport
        </button>
      </div>

      {/* Sports Grid / Empty */}
      {sports.length === 0 ? (
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
          <div className="text-white text-xl font-semibold mb-2">
            No sports yet
          </div>
          <div style={{ color: "#8892a4" }}>
            Create your first sport to get started
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sports.map((sport) => (
            <SportCard
              key={sport._id}
              sport={sport}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8"
            style={{
              background: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {editingSport ? "Edit Sport" : "Create New Sport"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8892a4" }}
                >
                  Sport Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder="e.g. Football"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#8892a4" }}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  placeholder="Optional description..."
                />
              </div>
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
                  className="flex-1 py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 disabled:opacity-50 text-xs transition-all"
                >
                  {submitting
                    ? "Saving..."
                    : editingSport
                    ? "Update Sport"
                    : "Create Sport"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}