'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiDollarSign, FiTrendingUp, FiTrendingDown, FiDownload, FiPieChart, FiBarChart2, FiFileText } from 'react-icons/fi';

// Types pour TypeScript
type Currency = 'USD' | 'CDF' | 'XAF' | 'EUR';
type PaymentMethod = 'Mpesa' | 'Orange Money' | 'Airtel Money' | 'RawBank' | 'Equity BCDC' | 'Cash';
type TransactionType = 'income' | 'expense';
type Period = 'all' | 'week' | 'month' | 'quarter' | 'year';

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
  paymentMethod: PaymentMethod;
  timestamp: Date;
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export default function FinancesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  // Taux de conversion
  const exchangeRates = {
    USD: 1,
    CDF: 2500,
    XAF: 600,
    EUR: 0.85
  };

  const currencySymbols = {
    USD: '$',
    CDF: 'FC ',
    XAF: 'FCFA ',
    EUR: '€'
  };

  const formatAmount = (amount: number): string => {
    const convertedAmount = amount * exchangeRates[selectedCurrency];
    return `${currencySymbols[selectedCurrency]}${convertedAmount.toLocaleString()}`;
  };

  // Données complètes des transactions avec dates en 2025
  const allTransactions: Transaction[] = [
    // Transactions de juin 2025 (mois en cours)
    { id: 1, type: 'income', amount: 2500, description: 'Dons du dimanche', date: '15 juin 2025', category: 'Dons', paymentMethod: 'Cash', timestamp: new Date(2025, 5, 15) },
    { id: 2, type: 'expense', amount: 800, description: 'Loyer', date: '14 juin 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 5, 14) },
    { id: 3, type: 'income', amount: 1200, description: 'Dons en ligne', date: '12 juin 2025', category: 'Dons', paymentMethod: 'Mpesa', timestamp: new Date(2025, 5, 12) },
    { id: 4, type: 'expense', amount: 450, description: 'Équipement audio', date: '10 juin 2025', category: 'Équipement', paymentMethod: 'Equity BCDC', timestamp: new Date(2025, 5, 10) },
    { id: 5, type: 'income', amount: 1800, description: 'Événement spécial', date: '8 juin 2025', category: 'Événements', paymentMethod: 'Orange Money', timestamp: new Date(2025, 5, 8) },
    { id: 6, type: 'income', amount: 900, description: 'Dons mensuels', date: '7 juin 2025', category: 'Dons', paymentMethod: 'Airtel Money', timestamp: new Date(2025, 5, 7) },
    { id: 7, type: 'expense', amount: 320, description: 'Fournitures bureau', date: '5 juin 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 5, 5) },
    { id: 8, type: 'income', amount: 1500, description: 'Dons spéciaux', date: '3 juin 2025', category: 'Dons', paymentMethod: 'Mpesa', timestamp: new Date(2025, 5, 3) },
    { id: 9, type: 'expense', amount: 200, description: 'Entretien', date: '1 juin 2025', category: 'Maintenance', paymentMethod: 'Cash', timestamp: new Date(2025, 5, 1) },

    // Transactions de mai 2025
    { id: 10, type: 'income', amount: 2200, description: 'Dons jeunesse', date: '30 mai 2025', category: 'Dons', paymentMethod: 'Orange Money', timestamp: new Date(2025, 4, 30) },
    { id: 11, type: 'expense', amount: 550, description: 'Électricité', date: '28 mai 2025', category: 'Frais fixes', paymentMethod: 'Equity BCDC', timestamp: new Date(2025, 4, 28) },
    { id: 12, type: 'income', amount: 1900, description: 'Dons culte', date: '25 mai 2025', category: 'Dons', paymentMethod: 'Airtel Money', timestamp: new Date(2025, 4, 25) },
    { id: 13, type: 'expense', amount: 420, description: 'Internet', date: '22 mai 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 4, 22) },
    { id: 14, type: 'income', amount: 1300, description: 'Dons en ligne', date: '20 mai 2025', category: 'Dons', paymentMethod: 'Mpesa', timestamp: new Date(2025, 4, 20) },
    { id: 15, type: 'expense', amount: 280, description: 'Nettoyage', date: '18 mai 2025', category: 'Maintenance', paymentMethod: 'Cash', timestamp: new Date(2025, 4, 18) },
    { id: 16, type: 'income', amount: 2100, description: 'Dons dimanche', date: '15 mai 2025', category: 'Dons', paymentMethod: 'Orange Money', timestamp: new Date(2025, 4, 15) },
    { id: 17, type: 'expense', amount: 380, description: 'Matériel culte', date: '12 mai 2025', category: 'Équipement', paymentMethod: 'Equity BCDC', timestamp: new Date(2025, 4, 12) },
    { id: 18, type: 'income', amount: 1100, description: 'Dons spéciaux', date: '10 mai 2025', category: 'Dons', paymentMethod: 'Airtel Money', timestamp: new Date(2025, 4, 10) },
    { id: 19, type: 'expense', amount: 240, description: 'Transport', date: '8 mai 2025', category: 'Frais divers', paymentMethod: 'Cash', timestamp: new Date(2025, 4, 8) },
    { id: 20, type: 'income', amount: 2700, description: 'Événement jeunesse', date: '5 mai 2025', category: 'Événements', paymentMethod: 'Mpesa', timestamp: new Date(2025, 4, 5) },

    // Transactions d'avril 2025
    { id: 21, type: 'expense', amount: 320, description: 'Impressions', date: '3 mai 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 4, 3) },
    { id: 22, type: 'income', amount: 1600, description: 'Dons mensuels', date: '1 mai 2025', category: 'Dons', paymentMethod: 'Orange Money', timestamp: new Date(2025, 4, 1) },
    { id: 23, type: 'expense', amount: 410, description: 'Réparations', date: '28 avril 2025', category: 'Maintenance', paymentMethod: 'Equity BCDC', timestamp: new Date(2025, 3, 28) },
    { id: 24, type: 'income', amount: 2300, description: 'Dons culte', date: '25 avril 2025', category: 'Dons', paymentMethod: 'Airtel Money', timestamp: new Date(2025, 3, 25) },
    { id: 25, type: 'expense', amount: 520, description: 'Salaire personnel', date: '22 avril 2025', category: 'Personnel', paymentMethod: 'RawBank', timestamp: new Date(2025, 3, 22) },
    { id: 26, type: 'income', amount: 3200, description: 'Campagne spéciale', date: '15 avril 2025', category: 'Événements', paymentMethod: 'Mpesa', timestamp: new Date(2025, 3, 15) },
    { id: 27, type: 'expense', amount: 220, description: 'Eau', date: '10 avril 2025', category: 'Frais fixes', paymentMethod: 'Cash', timestamp: new Date(2025, 3, 10) },
    { id: 28, type: 'income', amount: 1400, description: 'Dons réguliers', date: '5 avril 2025', category: 'Dons', paymentMethod: 'Orange Money', timestamp: new Date(2025, 3, 5) },
    { id: 29, type: 'expense', amount: 340, description: 'Formation', date: '1 avril 2025', category: 'Développement', paymentMethod: 'Equity BCDC', timestamp: new Date(2025, 3, 1) },

    // Transactions de mars 2025
    { id: 30, type: 'income', amount: 1800, description: 'Offrandes', date: '28 mars 2025', category: 'Dons', paymentMethod: 'Airtel Money', timestamp: new Date(2025, 2, 28) },
    { id: 31, type: 'expense', amount: 290, description: 'Frais bancaires', date: '25 mars 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 2, 25) },
    { id: 32, type: 'income', amount: 950, description: 'Dons individuels', date: '20 mars 2025', category: 'Dons', paymentMethod: 'Mpesa', timestamp: new Date(2025, 2, 20) },
    { id: 33, type: 'expense', amount: 180, description: 'Cables audio', date: '15 mars 2025', category: 'Équipement', paymentMethod: 'Cash', timestamp: new Date(2025, 2, 15) },
    { id: 34, type: 'income', amount: 2100, description: 'Culte de mars', date: '10 mars 2025', category: 'Dons', paymentMethod: 'Orange Money', timestamp: new Date(2025, 2, 10) },
    { id: 35, type: 'expense', amount: 470, description: 'Entretien bâtiment', date: '5 mars 2025', category: 'Maintenance', paymentMethod: 'Equity BCDC', timestamp: new Date(2025, 2, 5) },

    // Transactions de février 2025
    { id: 36, type: 'income', amount: 1950, description: 'Dons février', date: '28 février 2025', category: 'Dons', paymentMethod: 'Mpesa', timestamp: new Date(2025, 1, 28) },
    { id: 37, type: 'expense', amount: 310, description: 'Chauffage', date: '25 février 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 1, 25) },
    { id: 38, type: 'income', amount: 1250, description: 'Événement février', date: '20 février 2025', category: 'Événements', paymentMethod: 'Orange Money', timestamp: new Date(2025, 1, 20) },
    { id: 39, type: 'expense', amount: 190, description: 'Fournitures', date: '15 février 2025', category: 'Frais fixes', paymentMethod: 'Cash', timestamp: new Date(2025, 1, 15) },
    { id: 40, type: 'income', amount: 1750, description: 'Dons culte', date: '10 février 2025', category: 'Dons', paymentMethod: 'Airtel Money', timestamp: new Date(2025, 1, 10) },

    // Transactions de janvier 2025
    { id: 41, type: 'income', amount: 2850, description: 'Dons de début d\'année', date: '5 janvier 2025', category: 'Dons', paymentMethod: 'Mpesa', timestamp: new Date(2025, 0, 5) },
    { id: 42, type: 'expense', amount: 620, description: 'Loyer janvier', date: '1 janvier 2025', category: 'Frais fixes', paymentMethod: 'RawBank', timestamp: new Date(2025, 0, 1) }
  ];

  // Filtrer les transactions selon la période sélectionnée
  const filteredTransactions = useMemo(() => {
    if (selectedPeriod === 'all') {
      return allTransactions;
    }

    const now = new Date();
    const startDate = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return allTransactions.filter(transaction => 
      transaction.timestamp >= startDate && transaction.timestamp <= now
    );
  }, [selectedPeriod]);

  // Calculer les données financières basées sur les transactions filtrées
  const financialData = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;

    // Calculer les revenus par catégorie
    const incomeByCategory = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const categories: CategoryData[] = Object.entries(incomeByCategory).map(([name, amount], index) => {
      const percentage = income > 0 ? (amount / income) * 100 : 0;
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-indigo-500'];
      return {
        name,
        amount,
        percentage: Math.round(percentage),
        color: colors[index % colors.length]
      };
    });

    // Calculer les dépenses par catégorie
    const expensesByCategory = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const expenseCategories: CategoryData[] = Object.entries(expensesByCategory).map(([name, amount], index) => {
      const percentage = expenses > 0 ? (amount / expenses) * 100 : 0;
      const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-gray-500', 'bg-orange-500'];
      return {
        name,
        amount,
        percentage: Math.round(percentage),
        color: colors[index % colors.length]
      };
    });

    // Calculer les contributions par moyen de paiement
    const paymentMethods = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + t.amount;
        return acc;
      }, {} as Record<PaymentMethod, number>);

    const paymentMethodData: CategoryData[] = Object.entries(paymentMethods).map(([name, amount], index) => {
      const percentage = income > 0 ? (amount / income) * 100 : 0;
      const colors = ['bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 'bg-purple-500', 'bg-gray-500'];
      return {
        name: name as PaymentMethod,
        amount,
        percentage: Math.round(percentage),
        color: colors[index % colors.length]
      };
    });

    return {
      income,
      expenses,
      balance,
      growth: income > 0 ? 5.2 : 0,
      transactions: filteredTransactions,
      categories,
      expensesByCategory: expenseCategories,
      paymentMethods: paymentMethodData
    };
  }, [filteredTransactions]);

  const periodOptions = [
    { value: 'all', label: 'Toutes' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' },
  ];

  const viewOptions = [
    { value: 'overview', label: 'Aperçu', icon: <FiPieChart /> },
    { value: 'transactions', label: 'Transactions', icon: <FiBarChart2 /> },
    { value: 'payment-methods', label: 'Moyens de paiement', icon: <FiDollarSign /> },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'CDF', label: 'Franc Congolais' },
    { value: 'XAF', label: 'Franc CFA' },
    { value: 'EUR', label: 'Euro' },
  ];

  // Fonction pour générer le PDF
  const generateReport = () => {
    // Créer un contenu HTML pour le PDF
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rapport Financier - Église</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #333; 
            padding-bottom: 10px; 
          }
          .summary { 
            display: flex; 
            justify-content: space-around; 
            margin: 30px 0; 
            flex-wrap: wrap;
          }
          .summary-item { 
            text-align: center; 
            margin: 10px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            min-width: 150px;
          }
          .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
          }
          .table th, .table td { 
            border: 1px solid #ddd; 
            padding: 10px; 
            text-align: left; 
          }
          .table th { 
            background-color: #f2f2f2; 
            font-weight: bold;
          }
          .income { color: green; font-weight: bold; }
          .expense { color: red; font-weight: bold; }
          .footer { 
            margin-top: 40px; 
            text-align: center; 
            font-size: 12px; 
            color: #666; 
            border-top: 1px solid #ddd;
            padding-top: 10px;
          }
          .positive { color: green; }
          .negative { color: red; }
          @media print {
            body { margin: 0; }
            .summary-item { border: 1px solid #000; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Rapport Financier - Église</h1>
          <p><strong>Période:</strong> ${periodOptions.find(p => p.value === selectedPeriod)?.label}</p>
          <p><strong>Devise:</strong> ${currencyOptions.find(c => c.value === selectedCurrency)?.label}</p>
          <p><strong>Date du rapport:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        
        <div class="summary">
          <div class="summary-item">
            <h3>Revenus Totaux</h3>
            <p style="font-size: 24px; font-weight: bold;" class="positive">${formatAmount(financialData.income)}</p>
          </div>
          <div class="summary-item">
            <h3>Dépenses Totales</h3>
            <p style="font-size: 24px; font-weight: bold;" class="negative">${formatAmount(financialData.expenses)}</p>
          </div>
          <div class="summary-item">
            <h3>Solde Final</h3>
            <p style="font-size: 24px; font-weight: bold;" class="${financialData.balance >= 0 ? 'positive' : 'negative'}">${formatAmount(financialData.balance)}</p>
          </div>
        </div>
        
        <h2>Détail des Transactions (${financialData.transactions.length} transactions)</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Moyen de paiement</th>
              <th>Date</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            ${financialData.transactions.map(transaction => `
              <tr>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td>${transaction.paymentMethod}</td>
                <td>${transaction.date}</td>
                <td class="${transaction.type}">
                  ${transaction.type === 'income' ? '+' : '-'}${formatAmount(transaction.amount)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 30px;">
          <h3>Répartition des Revenus</h3>
          ${financialData.categories.map(category => `
            <div style="margin: 10px 0;">
              <div style="display: flex; justify-content: space-between;">
                <span>${category.name}</span>
                <span>${formatAmount(category.amount)} (${category.percentage}%)</span>
              </div>
              <div style="background: #f0f0f0; height: 10px; border-radius: 5px;">
                <div style="background: #4CAF50; height: 10px; border-radius: 5px; width: ${category.percentage}%"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 30px;">
          <h3>Répartition des Dépenses</h3>
          ${financialData.expensesByCategory.map(category => `
            <div style="margin: 10px 0;">
              <div style="display: flex; justify-content: space-between;">
                <span>${category.name}</span>
                <span>${formatAmount(category.amount)} (${category.percentage}%)</span>
              </div>
              <div style="background: #f0f0f0; height: 10px; border-radius: 5px;">
                <div style="background: #F44336; height: 10px; border-radius: 5px; width: ${category.percentage}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="footer">
          <p>Généré automatiquement par le système de gestion financière de l'Église</p>
          <p>Pour toute question, contactez l'administration</p>
        </div>
      </body>
      </html>
    `;

    // Ouvrir une nouvelle fenêtre pour l'impression
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Attendre que le contenu soit chargé avant d'imprimer
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        // Ne pas fermer automatiquement pour permettre à l'utilisateur de voir le PDF
      }, 500);
    }
  };

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
            onClick={generateReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiFileText className="text-lg" />
            <span>Rapport PDF</span>
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
        <div className="flex gap-2">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as Period)}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenus</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatAmount(financialData.income)}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiTrendingUp className="text-2xl text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <FiTrendingUp className="text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm text-green-600 dark:text-green-400">
              {financialData.transactions.filter(t => t.type === 'income').length} transactions
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dépenses</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatAmount(financialData.expenses)}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <FiTrendingDown className="text-2xl text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <FiTrendingDown className="text-red-600 dark:text-red-400 mr-1" />
            <span className="text-sm text-red-600 dark:text-red-400">
              {financialData.transactions.filter(t => t.type === 'expense').length} transactions
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Solde</h3>
              <p className={`text-2xl font-bold ${
                financialData.balance >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatAmount(financialData.balance)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              financialData.balance >= 0 
                ? 'bg-green-100 dark:bg-green-900/50' 
                : 'bg-red-100 dark:bg-red-900/50'
            }`}>
              {financialData.balance >= 0 ? (
                <FiTrendingUp className="text-2xl text-green-600 dark:text-green-400" />
              ) : (
                <FiTrendingDown className="text-2xl text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {financialData.balance >= 0 ? (
              <>
                <FiTrendingUp className="text-green-600 dark:text-green-400 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Solde positif
                </span>
              </>
            ) : (
              <>
                <FiTrendingDown className="text-red-600 dark:text-red-400 mr-1" />
                <span className="text-sm text-red-600 dark:text-red-400">Solde négatif</span>
              </>
            )}
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
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatAmount(category.amount)}</span>
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
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatAmount(category.amount)}</span>
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
      ) : selectedView === 'transactions' ? (
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Dernières transactions</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {financialData.transactions.length} transactions {periodOptions.find(p => p.value === selectedPeriod)?.label.toLowerCase()}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Catégorie</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Moyen de paiement</th>
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
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={transaction.type === 'income' ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'}>
                        {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Contributions par moyen de paiement</h3>
          <div className="space-y-4">
            {financialData.paymentMethods.map((method) => (
              <div key={method.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{method.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatAmount(method.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`${method.color} h-2 rounded-full`}
                    style={{ width: `${method.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{method.percentage}% du total</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}