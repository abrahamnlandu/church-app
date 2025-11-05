'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-12 text-center">
          {/* Icône */}
          <div className="mb-8 flex justify-center">
  <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-2xl">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  </div>
</div>

          {/* Titre et description */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-blue-600 dark:text-blue-400">Church</span> App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto">
            La plateforme numérique complète pour connecter et gérer votre communauté Ecclésiastique
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/publics/signup"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:-translate-y-0.5 text-lg"
            >
              Créer une église
            </Link>
            <Link
              href="/publics/login"
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-300 px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium border border-gray-200 dark:border-gray-600 hover:-translate-y-0.5 text-lg"
            >
              Se connecter
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Rejoignez plus de <span className="font-bold text-blue-600 dark:text-blue-400">500 communautés</span> déjà connectées
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}