'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiVideo, FiEdit, FiTrash2, FiCalendar } from 'react-icons/fi';

export default function PreachingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const preachings = [
    { id: 1, title: 'La puissance de la résurrection', preacher: 'Pasteur John Doe', date: '12 juin 2023', status: 'publié', views: 1245 },
    { id: 2, title: 'Marcher par l\'esprit', preacher: 'Pasteur Jane Smith', date: '5 juin 2023', status: 'brouillon', views: 0 },
    { id: 3, title: 'Le combat spirituel', preacher: 'Pasteur John Doe', date: '29 mai 2023', status: 'publié', views: 1567 },
    { id: 4, title: 'La foi qui vainc le monde', preacher: 'Pasteur Paul Martin', date: '22 mai 2023', status: 'programmé', views: 0 },
    { id: 5, title: 'La sanctification', preacher: 'Pasteur Jane Smith', date: '15 mai 2023', status: 'publié', views: 1342 },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'publié', label: 'Publié' },
    { value: 'brouillon', label: 'Brouillon' },
    { value: 'programmé', label: 'Programmé' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prédications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez vos prédications et messages</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="text-lg" />
          <span>Nouvelle prédication</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiVideo className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total des prédications</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiCalendar className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prédications publiées</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <FiVideo className="text-2xl text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vues totales</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24,567</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une prédication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <FiFilter className="text-lg" />
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Titre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prédicateur</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vues</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {preachings.map((preaching) => (
                <motion.tr 
                  key={preaching.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FiVideo />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{preaching.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{preaching.preacher}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{preaching.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      preaching.status === 'publié' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' 
                        : preaching.status === 'brouillon'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400'
                    }`}>
                      {preaching.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{preaching.views.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <FiEdit className="text-lg" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <FiTrash2 className="text-lg" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">24</span> prédications
          </p>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300"
            >
              Précédent
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-blue-600 border border-transparent rounded-md text-sm text-white"
            >
              1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300"
            >
              2
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300"
            >
              Suivant
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}