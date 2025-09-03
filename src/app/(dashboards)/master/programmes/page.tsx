'use client';

import { motion } from 'framer-motion';

export default function ProgrammesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Événements</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Nouvel Événement
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <p>Contenu de la page des événements à venir...</p>
        {/* Ajoutez ici le contenu spécifique à la page des événements */}
      </div>
    </motion.div>
  );
}