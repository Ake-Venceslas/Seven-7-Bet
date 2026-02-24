
"use client";

import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import toast from "react-hot-toast";
import { Folder } from "lucide-react";
import LeagueCard from "@/components/admin_components/LeagueCard";

export default function LeaguesPage() {
	const {
		leagues,
		sports,
		addLeague,
		updateLeague,
		deleteLeague,
	} = useAdminData();
	const [showModal, setShowModal] = useState(false);
	const [editingLeague, setEditingLeague] = useState(null);
	const [formData, setFormData] = useState({ name: "", sport: "" });
	const [submitting, setSubmitting] = useState(false);

	const openCreateModal = () => {
		setEditingLeague(null);
		setFormData({ name: "", sport: "" });
		setShowModal(true);
	};

	const openEditModal = (league) => {
		setEditingLeague(league);
		setFormData({
			name: league.name,
			sport: league.sport?._id || "",
		});
		setShowModal(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const selectedSport = sports.find((s) => s._id === formData.sport);
			if (editingLeague) {
				updateLeague(editingLeague._id, {
					name: formData.name,
					sport: selectedSport || null,
					sportId: formData.sport,
				});
				toast.success("League updated!");
			} else {
				const newLeague = {
					_id: `league-${Date.now()}`,
					name: formData.name,
					sport: selectedSport || null,
					sportId: formData.sport,
					createdAt: new Date().toISOString(),
				};
				addLeague(newLeague);
				toast.success("League created!");
			}
			setShowModal(false);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = (id, name) => {
		if (!confirm(`Delete "${name}"?`)) return;
		deleteLeague(id);
		toast.success("League deleted!");
	};

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold text-white">Leagues Management</h1>
					<p style={{ color: "#8892a4" }}>
						Organize sports into leagues (e.g. Premier League, NBA)
					</p>
				</div>
				<button
					onClick={openCreateModal}
					className="px-3 py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-colors text-sm"
				>
					+ Add League
				</button>
			</div>

			{/* List / empty */}
			{leagues.length === 0 ? (
				<div
					className="text-center py-20 rounded-2xl"
					style={{
						background: "rgba(255,255,255,0.03)",
						border: "1px solid rgba(255,255,255,0.07)",
					}}
				>
					<div className="flex items-center justify-center mb-4">
						<Folder className="h-12 w-12 text-slate-400" />
					</div>
					<div className="text-white text-xl font-semibold">
						No leagues yet
					</div>
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{leagues.map((league) => (
						<LeagueCard
							key={league._id}
							league={league}
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
							{editingLeague ? "Edit League" : "Create New League"}
						</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									className="block text-sm font-medium mb-2"
									style={{ color: "#8892a4" }}
								>
									Sport *
								</label>
								<select
									required
									value={formData.sport}
									onChange={(e) =>
										setFormData({
											...formData,
											sport: e.target.value,
										})
									}
									className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
									style={{
										background: "rgba(255,255,255,0.05)",
										border: "1px solid rgba(255,255,255,0.1)",
									}}
								>
									<option value="" style={{ background: "#1a1a2e" }}>
										Select Sport
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

							<div>
								<label
									className="block text-sm font-medium mb-2"
									style={{ color: "#8892a4" }}
								>
									League Name *
								</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
									style={{
										background: "rgba(255,255,255,0.05)",
										border: "1px solid rgba(255,255,255,0.1)",
									}}
									placeholder="e.g. Premier League"
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
									className="flex-1 py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 disabled:opacity-50 text-xs"
								>
									{submitting
										? "Saving..."
										: editingLeague
										? "Update"
										: "Create"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
