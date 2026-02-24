
"use client";

import React from 'react'
import NavComponent from '@/components/NavComponent'
import HeroComponent from '@/components/HeroComponent'
import BodyComponent from '@/components/BodyComponent'
import FooterComponent from '@/components/FooterComponent'
import { useState } from 'react';

// Exemple de données dynamiques (à remplacer par un fetch API plus tard)
const sports = [
  { _id: '1', name: 'Football', icon: '⚽' },
  { _id: '2', name: 'Tennis', icon: '🎾' },
  { _id: '3', name: 'Basketball', icon: '🏀' },
];
const leagues = [
  { _id: '10', name: 'Premier League', sportId: '1', flag: '🏴' },
  { _id: '11', name: 'La Liga', sportId: '1', flag: '🇪🇸' },
  { _id: '12', name: 'Serie A', sportId: '1', flag: '🇮🇹' },
  { _id: '13', name: 'Ligue 1', sportId: '1', flag: '🇫🇷' },
  { _id: '14', name: 'Bundesliga', sportId: '1', flag: '🇩🇪' },
  { _id: '20', name: 'ATP Masters', sportId: '2', flag: '🎾' },
  { _id: '30', name: 'NBA', sportId: '3', flag: '🏀' },
];
const tags = [
  'Double Chance',
  'Plus de 1.5 Buts',
  'Score Exact',
  'Nuls',
  'Plus de 2.5 Buts',
  'Deux Equipes Marquent',
  'Gagner Une Mi-Temps',
  'HT/FT',
  'Combines',
  'Mi-Temps Avec Le Plus de Buts',
  'Corners',
  'Statistiques des Joueurs',
];
const matches = [
  {
    _id: '100',
    leagueId: '10',
    home: 'Manchester City',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    away: 'Real Madrid',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    time: '15:00',
    odds: ['1.90', '3.74', '4.52'],
    btts: { oui: '1.60', non: '2.20' },
    totals: {
      plus: ['1.10', '1.30', '1.60', '2.10', '2.80', '4.00', '6.00'],
      moins: ['7.00', '5.00', '3.00', '2.00', '1.50', '1.20', '1.10'],
    },
    ft: '1X',
    outcome: '2 - 1',
    perc: ['55%', '31%', '14%'],
    expert: 'MICON',
    expertImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    premium: true,
  },
  {
    _id: '101',
    leagueId: '11',
    home: 'FC Barcelona',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    away: 'Atletico Madrid',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
    time: '18:00',
    odds: ['2.10', '3.20', '3.80'],
    btts: { oui: '1.70', non: '2.10' },
    totals: {
      plus: ['1.20', '1.40', '1.80', '2.30', '3.00', '4.50', '7.00'],
      moins: ['6.00', '4.50', '2.80', '1.90', '1.40', '1.10', '1.05'],
    },
    ft: '1X',
    outcome: '1 - 1',
    perc: ['50%', '30%', '20%'],
    expert: 'MICON',
    expertImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    premium: false,
  },
];

function Page() {
  const [selectedSportId, setSelectedSportId] = useState(sports[0]._id);
  const filteredLeagues = leagues.filter((l) => l.sportId === selectedSportId);
  const [selectedLeagueId, setSelectedLeagueId] = useState(filteredLeagues[0]?._id || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  // Mettre à jour la ligue sélectionnée quand le sport change
  const handleSportSelect = (sportId) => {
    setSelectedSportId(sportId);
    const firstLeague = leagues.find((l) => l.sportId === sportId);
    setSelectedLeagueId(firstLeague ? firstLeague._id : '');
    setSelectedCategoryId('');
  };
  const handleLeagueSelect = (leagueId) => {
    setSelectedLeagueId(leagueId);
    setSelectedCategoryId('');
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      <NavComponent />
      <HeroComponent
        sports={sports}
        leagues={leagues}
        tags={tags}
        selectedSportId={selectedSportId}
        onSportSelect={handleSportSelect}
      />
      <BodyComponent
        leagues={leagues}
        matches={matches}
        selectedSportId={selectedSportId}
        selectedLeagueId={selectedLeagueId}
        selectedCategoryId={selectedCategoryId}
        onLeagueSelect={handleLeagueSelect}
        onCategorySelect={handleCategorySelect}
      />
      <FooterComponent />
    </div>
  );
}

export default Page;
