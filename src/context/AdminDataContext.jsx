"use client";
import React, { createContext, useContext, useState } from "react";

const AdminDataContext = createContext();

export function AdminDataProvider({ children }) {
  // Hydratation safe : charge localStorage uniquement côté client
  const [isMounted, setIsMounted] = useState(false);
  const [sports, setSports] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [matches, setMatches] = useState([]);

  React.useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedSports = localStorage.getItem("sports");
      const savedLeagues = localStorage.getItem("leagues");
      const savedCategories = localStorage.getItem("categories");
      const savedMatches = localStorage.getItem("matches");
      if (savedSports) setSports(JSON.parse(savedSports));
      if (savedLeagues) setLeagues(JSON.parse(savedLeagues));
      if (savedCategories) setCategories(JSON.parse(savedCategories));
      if (savedMatches) {
        // Correction automatique des anciens matchs sans odds et btts
        const parsedMatches = JSON.parse(savedMatches).map((m) => {
          let match = { ...m };
          if (!Array.isArray(match.odds)) {
            match.odds = [match.oddA || 1.5, match.oddB || 1.5, 1.5];
          }
          if (!match.btts) {
            match.btts = { oui: 2.0, non: 1.8 };
          }
          if (!match.totals) {
            match.totals = {
              plus: [1.7, 2.2, 3.0],
              moins: [1.3, 1.6, 2.1],
            };
          }
          return match;
        });
        setMatches(parsedMatches);
        // Sauvegarde la correction
        localStorage.setItem("matches", JSON.stringify(parsedMatches));
      }
    }
  }, []);

  // Sauvegarde dans localStorage à chaque modification
  React.useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("sports", JSON.stringify(sports));
    }
  }, [sports, isMounted]);
  React.useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("leagues", JSON.stringify(leagues));
    }
  }, [leagues, isMounted]);
  React.useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories, isMounted]);
  React.useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("matches", JSON.stringify(matches));
    }
  }, [matches, isMounted]);

  // CRUD functions for admin
  const addSport = (sport) => setSports((prev) => [sport, ...prev]);
  const updateSport = (id, data) => setSports((prev) => prev.map((s) => s._id === id ? { ...s, ...data } : s));
  const deleteSport = (id) => setSports((prev) => prev.filter((s) => s._id !== id));

  const addLeague = (league) => setLeagues((prev) => [league, ...prev]);
  const updateLeague = (id, data) => setLeagues((prev) => prev.map((l) => l._id === id ? { ...l, ...data } : l));
  const deleteLeague = (id) => setLeagues((prev) => prev.filter((l) => l._id !== id));

  const addCategory = (category) => setCategories((prev) => [category, ...prev]);
  const updateCategory = (id, data) => setCategories((prev) => prev.map((c) => c._id === id ? { ...c, ...data } : c));
  const deleteCategory = (id) => setCategories((prev) => prev.filter((c) => c._id !== id));

  const addMatch = (match) => setMatches((prev) => [match, ...prev]);
  const updateMatch = (id, data) => setMatches((prev) => prev.map((m) => m._id === id ? { ...m, ...data } : m));
  const deleteMatch = (id) => setMatches((prev) => prev.filter((m) => m._id !== id));

  return (
    <AdminDataContext.Provider
      value={{
        sports,
        leagues,
        categories,
        matches,
        addSport,
        updateSport,
        deleteSport,
        addLeague,
        updateLeague,
        deleteLeague,
        addCategory,
        updateCategory,
        deleteCategory,
        addMatch,
        updateMatch,
        deleteMatch,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  return useContext(AdminDataContext);
}
