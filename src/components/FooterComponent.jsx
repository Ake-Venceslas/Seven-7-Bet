import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-[#0B4A4D] text-white w-full pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-8">
        {/* Logo & description */}
        <div className="flex-1 min-w-[260px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-white">
              SEVE 7<span className="text-[#F7962B]"> BET</span>
            </span>
          </div>
          <p className="text-gray-200 text-base">
            Les paris sur le football sont divertissants, point final. Qu'il
            s'agisse d'une victoire éclatante ou d'une défaite cuisante, sans un
            minimum de conseils et de connaissances, les paris sur le football
            représentent une activité à haut risque. Chaque jour, les fans de
            football du monde entier recherchent activement des sites web et des
            plateformes proposant des pronostics précis et fiables pour les
            matchs à venir. Notre site de pronostics de football est conçu pour
            répondre à ce besoin en fournissant des analyses approfondies, des
            statistiques détaillées et des conseils d'experts pour vous aider à
            prendre des décisions éclairées lors de vos paris sur le football.
            {/* ...existing description... */}
          </p>
        </div>
        {/* Useful Links */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-2xl font-bold mb-4 text-white">LIEN UTILE</h3>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> PRÉDICTIONS D'AUJOURD'HUI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> PRÉDICTIONS DE DEMAIN
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> PRÉDICTIONS D'HIER
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> MON COMPTE
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> CONSEILLER EXPERT
            </li>
          </ul>
        </div>
        {/* Support Center */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-2xl font-bold mb-4 text-white">
            CENTRE DE SUPPORT
          </h3>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> COMMENT PAYER
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> MISE À JOUR DU MAIL
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> FAQS
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> PLAN TARIFAIRE
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
