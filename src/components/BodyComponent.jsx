"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

const blackBtn =
  "bg-black text-white font-semibold px-6 py-2 rounded-md text-lg mb-2";

const leagues = [
  { name: "Premier League", flag: "🇬🇧" },
  { name: "La Liga", flag: "🇪🇸" },
  { name: "Serie A", flag: "🇮🇹" },
  { name: "Bundesliga", flag: "🇩🇪" },
  { name: "Ligue 1", flag: "🇫🇷" },
  { name: "Ligue des Champions UEFA", flag: "🌐" },
  { name: "Ligue Europa UEFA", flag: "🌐" },
  { name: "Ligue Conférence UEFA", flag: "🌐" },
];

const matches = [
  // ...existing match data objects...
];

function BodyComponent({ selectedSportId, selectedLeagueId, onLeagueSelect }) {
  const { leagues, matches, categories } = useAdminData();
  const [showBet, setShowBet] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [betHistory, setBetHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('betHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [editIndex, setEditIndex] = useState(null);

  // Filtrer les ligues selon le sport sélectionné
  const filteredLeagues = leagues.filter((l) => l.sportId === selectedSportId);

  // Filtrer les matchs selon le sport ET la ligue sélectionnés
  const filteredMatches = matches.filter((m) => {
    // Trouver la catégorie du match
    let cat = m.category;
    if (cat && typeof cat === 'object' && cat.sport) {
      // cat.sport peut être un objet ou un id
      if (typeof cat.sport === 'object') {
        if (cat.sport._id !== selectedSportId) return false;
      } else {
        if (cat.sport !== selectedSportId) return false;
      }
    } else if (cat && typeof cat === 'string') {
      // Chercher la catégorie dans la liste
      const foundCat = categories.find((c) => c._id === cat);
      if (foundCat) {
        if (foundCat.sport !== selectedSportId && foundCat.sport?._id !== selectedSportId) return false;
      }
    }
    // Filtrer aussi par ligue si sélectionnée
    if (selectedLeagueId && m.leagueId !== selectedLeagueId) return false;
    return true;
  });

  const handleBetClick = (match) => {
    setSelectedMatch(match);
    setShowBet(true);
  };

  const closeBet = () => {
    setShowBet(false);
    setSelectedMatch(null);
  };

  // Ajoute le pari sélectionné à l'historique
  const handleSelectBet = (betType, value, cote) => {
    const newBet = {
      betType,
      value,
      cote,
      match: selectedMatch,
      date: new Date().toLocaleString(),
    };
    let updatedHistory;
    if (editIndex !== null && editIndex !== undefined) {
      updatedHistory = [...betHistory];
      updatedHistory[editIndex] = newBet;
      setEditIndex(null);
    } else {
      updatedHistory = [...betHistory, newBet];
    }
    setBetHistory(updatedHistory);
    if (typeof window !== 'undefined') {
      localStorage.setItem('betHistory', JSON.stringify(updatedHistory));
    }
    closeBet();
  };

  // Supprimer un pari
  const handleDeleteBet = (index) => {
    const updated = betHistory.filter((_, i) => i !== index);
    setBetHistory(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('betHistory', JSON.stringify(updated));
    }
  };

  // Modifier un pari (réouvre le pop-up sur le match concerné)
  const handleEditBet = (index) => {
    setSelectedMatch(betHistory[index].match);
    setShowBet(true);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-400 mx-auto mt-8 px-2">
      {/* Contenu principal : barre latérale + matchs + historique */}
      <div className="flex w-full gap-8">
        {/* Barre latérale */}
        <div className="w-[180px] bg-white rounded-t-2xl rounded-b-lg shadow-lg border border-gray-300 overflow-hidden">
          <div className="bg-gray-800 text-white text-lg font-semibold px-6 py-3">
            Ligues principales
          </div>
          {filteredLeagues.map((l) => (
            <div
              key={l._id}
              className={`bg-white px-6 py-2 border-b border-gray-200 flex items-center justify-between cursor-pointer ${l._id === selectedLeagueId ? "bg-[#3C8A8E]/10" : ""}`}
              onClick={() => onLeagueSelect(l._id)}
            >
              <span className="flex items-center gap-2 text-lg">
                <span>{l.flag || "🏆"}</span> {l.name}
              </span>
            </div>
          ))}
        </div>
        {/* Matchs */}
        <div className="flex-1">
          {filteredMatches.map((m, idx) => (
            <div
              key={m._id || idx}
              className="flex bg-white border-x border-b border-gray-300 rounded-2xl mb-6 overflow-hidden shadow hover:shadow-lg transition"
            >
              {/* Bloc principal match */}
              <div className="flex flex-1 items-center gap-6 p-6">
                {/* Logo et noms */}
                <div className="flex flex-col items-center min-w-[110px]">
                  <span className="font-bold text-lg text-center leading-tight">
                    {m.home}
                  </span>
                </div>
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-gray-400 font-bold">vs</span>
                  <span className="text-xl font-bold text-[#3C8A8E] mt-2">
                    {m.time}
                  </span>
                </div>
                <div className="flex flex-col items-center min-w-[110px]">
                  <span className="font-bold text-lg text-center leading-tight">
                    {m.away}
                  </span>
                </div>
                {/* Cotes */}
                <div className="flex flex-col items-center ml-8">
                  {/* Affichage dynamique des labels et cotes selon le sport */}
                  {(() => {
                    // Trouver le sport du match
                    let sportName = '';
                    let cat = m.category;
                    if (cat && typeof cat === 'object' && cat.sport) {
                      sportName = typeof cat.sport === 'object' ? cat.sport.name : '';
                    } else if (cat && typeof cat === 'string') {
                      const foundCat = categories.find((c) => c._id === cat);
                      if (foundCat && foundCat.sport && typeof foundCat.sport === 'object') {
                        sportName = foundCat.sport.name;
                      }
                    }
                    // Par défaut, on affiche V1/X/V2
                    if (sportName.toLowerCase().includes('tennis')) {
                      // Tennis : V1 / V2 uniquement
                      return (
                        <>
                          <div className="flex gap-8 mb-1">
                            <span className="text-xs font-bold text-gray-500">V1</span>
                            <span className="text-xs font-bold text-gray-500">V2</span>
                          </div>
                          <div className="flex gap-2 mb-2">
                            {Array.isArray(m.odds) ? (
                              <>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[0]}</span>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[2]}</span>
                              </>
                            ) : (
                              <span className="text-red-500 text-xs">Cotes non définies</span>
                            )}
                          </div>
                        </>
                      );
                    } else if (sportName.toLowerCase().includes('basket')) {
                      // Basket : V1 / V2 uniquement
                      return (
                        <>
                          <div className="flex gap-8 mb-1">
                            <span className="text-xs font-bold text-gray-500">V1</span>
                            <span className="text-xs font-bold text-gray-500">V2</span>
                          </div>
                          <div className="flex gap-2 mb-2">
                            {Array.isArray(m.odds) ? (
                              <>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[0]}</span>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[2]}</span>
                              </>
                            ) : (
                              <span className="text-red-500 text-xs">Cotes non définies</span>
                            )}
                          </div>
                        </>
                      );
                    } else {
                      // Foot ou autre : V1/X/V2
                      return (
                        <>
                          <div className="flex gap-8 mb-1">
                            <span className="text-xs font-bold text-gray-500">V1</span>
                            <span className="text-xs font-bold text-gray-500">X</span>
                            <span className="text-xs font-bold text-gray-500">V2</span>
                          </div>
                          <div className="flex gap-2 mb-2">
                            {Array.isArray(m.odds) ? (
                              <>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[0]}</span>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[1]}</span>
                                <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-base font-semibold">{m.odds[2]}</span>
                              </>
                            ) : (
                              <span className="text-red-500 text-xs">Cotes non définies</span>
                            )}
                          </div>
                        </>
                      );
                    }
                  })()}
                  <span className="bg-blue-900 text-white px-3 py-1 rounded text-base font-bold">
                    1XBET
                  </span>
                </div>
                {/* Bouton parier */}
                <div className="flex flex-col items-center ml-8">
                  <button
                    className="flex items-center gap-1 bg-gradient-to-r from-[#3C8A8E] to-[#43b0b4] text-white px-4 py-2 rounded-full font-semibold shadow-md hover:from-[#25666a] hover:to-[#3C8A8E] hover:scale-105 transition-all duration-150 text-base ring-1 ring-[#3C8A8E]/30 focus:outline-none focus:ring-2"
                    onClick={() => handleBetClick(m)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Parier
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Pop-up de pari */}
          {showBet && selectedMatch && (() => {
            // Trouver le sport du match
            let sportName = "";
            let cat = selectedMatch.category;

            if (cat && typeof cat === "object" && cat.sport) {
              sportName = typeof cat.sport === "object" ? cat.sport.name : "";
            } else if (cat && typeof cat === "string") {
              const foundCat = categories.find((c) => c._id === cat);
              if (
                foundCat &&
                foundCat.sport &&
                typeof foundCat.sport === "object"
              ) {
                sportName = foundCat.sport.name;
              }
            }

            const isFootball = sportName.toLowerCase().includes("foot");

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
                <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-sm max-h-[80vh] overflow-y-auto relative animate-fade-in">
                  <button
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black"
                    onClick={closeBet}
                  >
                    &times;
                  </button>

                  <div className="flex flex-col items-center mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-lg">
                        {selectedMatch.home}
                      </span>
                      <span className="font-semibold text-gray-500">vs</span>
                      <span className="font-bold text-lg">
                        {selectedMatch.away}
                      </span>
                    </div>
                    <div className="text-xl font-bold mb-2">
                      {selectedMatch.time}
                    </div>
                  </div>

                  {/* V1/X/V2 ou V1/V2 */}
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex flex-col items-center w-1/3">
                      <span className="font-bold text-lg">V1</span>
                      <button
                        onClick={() =>
                          handleSelectBet(
                            "V1",
                            selectedMatch.home,
                            selectedMatch.odds[0],
                          )
                        }
                        className="mt-2 text-[#3C8A8E] text-xl font-bold hover:underline"
                      >
                        {selectedMatch.odds[0]}
                      </button>
                      <span className="text-xs text-gray-500 mt-1">
                        Domicile
                      </span>
                    </div>

                    {isFootball && (
                      <div className="flex flex-col items-center w-1/3">
                        <span className="font-bold text-lg">X</span>
                        <button
                          onClick={() =>
                            handleSelectBet(
                              "X",
                              "Match Nul",
                              selectedMatch.odds[1],
                            )
                          }
                          className="mt-2 text-[#3C8A8E] text-xl font-bold hover:underline"
                        >
                          {selectedMatch.odds[1]}
                        </button>
                        <span className="text-xs text-gray-500 mt-1">
                          Match Nul
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col items-center w-1/3">
                      <span className="font-bold text-lg">V2</span>
                      <button
                        onClick={() =>
                          handleSelectBet(
                            "V2",
                            selectedMatch.away,
                            selectedMatch.odds[2],
                          )
                        }
                        className="mt-2 text-[#3C8A8E] text-xl font-bold hover:underline"
                      >
                        {selectedMatch.odds[2]}
                      </button>
                      <span className="text-xs text-gray-500 mt-1">
                        Extérieur
                      </span>
                    </div>
                  </div>

                  {/* Options avancées pour le football */}
                  {isFootball && (
                    <>
                      {/* Les deux équipes marquent */}
                      <div className="mb-4">
                        <div className="font-semibold mb-2">
                          Les deux équipes marquent ?
                        </div>
                        {selectedMatch.btts ? (
                          <div className="flex gap-4 justify-center">
                            <button
                              onClick={() =>
                                handleSelectBet(
                                  "Les deux équipes marquent",
                                  "OUI",
                                  selectedMatch.btts.oui,
                                )
                              }
                              className="bg-[#3C8A8E] text-white px-2 py-1 rounded-full font-semibold text-xs hover:bg-[#25666a]"
                            >
                              OUI{" "}
                              <span className="ml-1 text-yellow-200 font-bold">
                                / {selectedMatch.btts.oui}
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleSelectBet(
                                  "Les deux équipes marquent",
                                  "NON",
                                  selectedMatch.btts.non,
                                )
                              }
                              className="flex items-center gap-1 bg-gray-200 text-[#3C8A8E] px-3 py-1 rounded-full font-semibold hover:bg-gray-300"
                            >
                              NON{" "}
                              <span className="ml-1 text-gray-700 font-bold">
                                / {selectedMatch.btts.non}
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className="text-red-500 text-xs text-center">
                            Cotes BTTS non définies
                          </div>
                        )}
                      </div>

                      {/* Totals plus/moins */}
                      <div className="mb-2">
                        <div className="font-semibold mb-2">
                          Total de buts (plus de...)
                        </div>
                        {selectedMatch.totals ? (
                          <>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {selectedMatch.totals.plus.map((cote, i) => (
                                <button
                                  key={i}
                                  onClick={() =>
                                    handleSelectBet(
                                      "Total plus",
                                      `Plus de ${(i * 0.5 + 0.5).toFixed(
                                        1,
                                      )} buts`,
                                      cote,
                                    )
                                  }
                                  className="bg-[#3C8A8E] text-white px-3 py-1 rounded-full font-semibold text-sm hover:bg-[#25666a]"
                                >
                                  Plus de {(i * 0.5 + 0.5).toFixed(1)}{" "}
                                  <span className="ml-1 text-yellow-200 font-bold">
                                    / {cote}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="font-semibold mb-2 mt-4">
                              Total de buts (moins de...)
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedMatch.totals.moins.map((cote, i) => (
                                <button
                                  key={i}
                                  onClick={() =>
                                    handleSelectBet(
                                      "Total moins",
                                      `Moins de ${(i * 0.5 + 0.5).toFixed(
                                        1,
                                      )} buts`,
                                      cote,
                                    )
                                  }
                                  className="bg-[#3C8A8E] text-white px-3 py-1 rounded-full font-semibold text-sm hover:bg-[#25666a]"
                                >
                                  Moins de {(i * 0.5 + 0.5).toFixed(1)}{" "}
                                  <span className="ml-1 text-yellow-200 font-bold">
                                    / {cote}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-red-500 text-xs text-center">
                            Cotes Totals non définies
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Historique des paris */}
      <div className="w-full mt-8">
        <h2 className="text-lg font-bold mb-3">Historique des paris</h2>

        {betHistory.length === 0 ? (
          <div className="text-sm text-gray-500">
            Aucun pari enregistré pour le moment.
          </div>
        ) : (
          <ul className="space-y-3">
            {betHistory.map((bet, i) => (
              <li
                key={i}
                className="border border-gray-200 rounded-lg p-3 flex flex-col gap-1 bg-white"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{bet.match.home}</span>
                  <span className="text-gray-500">vs</span>
                  <span className="font-semibold">{bet.match.away}</span>
                </div>

                <div className="text-xs text-gray-500">
                  Heure : {bet.match.time}
                </div>

                <div className="text-sm font-medium">
                  Type :{" "}
                  <span className="text-[#3C8A8E]">{bet.betType}</span>
                </div>

                <div className="text-sm font-medium">
                  Choix :{" "}
                  <span className="text-[#3C8A8E]">{bet.value}</span>
                </div>

                <div className="text-sm font-medium">
                  Cote :{" "}
                  <span className="text-[#3C8A8E]">{bet.cote}</span>
                </div>

                <div className="text-xs text-gray-400">
                  Ajouté le : {bet.date}
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditBet(i)}
                    className="px-2 py-1 text-xs bg-yellow-200 text-yellow-900 rounded hover:bg-yellow-300"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteBet(i)}
                    className="px-2 py-1 text-xs bg-red-200 text-red-900 rounded hover:bg-red-300"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BodyComponent;