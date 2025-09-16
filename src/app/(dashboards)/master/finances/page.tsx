'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiDollarSign, FiTrendingUp, FiTrendingDown, FiDownload, FiPieChart, FiBarChart2 } from 'react-icons/fi';

export default function FinancesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('overview');

  const financialData = {
    income: 8420,
    expenses: 5230,
    balance: 3190,
    growth: 5.2,
    transactions: [
      { id: 1, type: 'income', amount: 1200, description: 'Dons du dimanche', date: '15 juin 2023', category: 'Dons' },
      { id: 2, type: 'expense', amount: 450, description: 'Loyer', date: '14 juin 2023', category: 'Frais fixes' },
      { id: 3, type: 'income', amount: 500, description: 'Dons en ligne', date: '12 juin 2023', category: 'Dons' },
      { id: 4, type: 'expense', amount: 320, description: 'Équipement audio', date: '10 juin 2023', category: 'Équipement' },
      { id: 5, type: 'income', amount: 800, description: 'Événement spécial', date: '8 juin 2023', category: 'Événements' },
    ],
    categories: [
      { name: 'Dons', amount: 4500, percentage: 53, color: 'bg-blue-500' },
      { name: 'Événements', amount: 2200, percentage: 26, color: 'bg-green-500' },
      { name: 'Autres', amount: 1720, percentage: 21, color: 'bg-purple-500' },
    ],
    expensesByCategory: [
      { name: 'Frais fixes', amount: 2200, percentage: 42, color: 'bg-red-500' },
      { name: 'Équipement', amount: 1500, percentage: 29, color: 'bg-yellow-500' },
      { name: 'Programmes', amount: 980, percentage: 19, color: 'bg-blue-500' },
      { name: 'Autres', amount: 550, percentage: 10, color: 'bg-gray-500' },
    ]
  };

  const periodOptions = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' },
  ];

  const viewOptions = [
    { value: 'overview', label: 'Aperçu', icon: <FiPieChart /> },
    { value: 'transactions', label: 'Transactions', icon: <FiBarChart2 /> },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finances</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez les finances de votre église</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            <FiDownload className="text-lg" />
            <span>Exporter</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus className="text-lg" />
            <span>Nouvelle transaction</span>
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {viewOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedView(option.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedView === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </motion.button>
          ))}
        </div>
        <div className="flex-1"></div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
        >
          {periodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenus</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${financialData.income.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiTrendingUp className="text-2xl text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <FiTrendingUp className="text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+{financialData.growth}% ce mois</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dépenses</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${financialData.expenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <FiTrendingDown className="text-2xl text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <FiTrendingDown className="text-red-600 dark:text-red-400 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">-2.3% ce mois</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Solde</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${financialData.balance.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiDollarSign className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <FiTrendingUp className="text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">+7.5% ce mois</span>
          </div>
        </motion.div>
      </div>

      {selectedView === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Revenus par catégorie</h3>
            <div className="space-y-4">
              {financialData.categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{category.percentage}% du total</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Dépenses par catégorie</h3>
            <div className="space-y-4">
              {financialData.expensesByCategory.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{category.percentage}% du total</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Dernières transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Catégorie</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {financialData.transactions.map((transaction) => (
                  <motion.tr 
                    key={transaction.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}