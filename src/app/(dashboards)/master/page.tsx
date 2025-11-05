'use client';

import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiDollarSign,
  FiBell,
  FiVideo,
  FiCalendar,
  FiTrendingUp,
  FiUserCheck,
  FiUserPlus,
  FiEye,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiDownload
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Types pour les props du PieChart
interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index?: number;
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [exporting, setExporting] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Fonction pour exporter en PDF
  const exportToPDF = async () => {
    if (!dashboardRef.current) return;

    setExporting(true);
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`rapport-eglise-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      alert('Erreur lors de l\'exportation du PDF');
    } finally {
      setExporting(false);
    }
  };

  // Données pour les graphiques
  const financialData = [
    { name: 'Jan', income: 12000, expenses: 8500, balance: 3500 },
    { name: 'Fév', income: 11500, expenses: 7800, balance: 3700 },
    { name: 'Mar', income: 13500, expenses: 9200, balance: 4300 },
    { name: 'Avr', income: 11000, expenses: 7500, balance: 3500 },
    { name: 'Mai', income: 12500, expenses: 8200, balance: 4300 },
    { name: 'Juin', income: 14200, expenses: 8800, balance: 5400 },
  ];

  const memberGrowthData = [
    { name: 'Jan', membres: 22, nouveaux: 3 },
    { name: 'Fév', membres: 24, nouveaux: 2 },
    { name: 'Mar', membres: 25, nouveaux: 4 },
    { name: 'Avr', membres: 26, nouveaux: 1 },
    { name: 'Mai', membres: 28, nouveaux: 2 },
    { name: 'Juin', membres: 30, nouveaux: 5 },
  ];

  const sermonStatsData = [
    { name: 'La Puissance de la Foi', vues: 1245 },
    { name: 'La Grâce Divine', vues: 987 },
    { name: 'Vivre Sanctification', vues: 1567 },
    { name: 'Le Don de Prophétie', vues: 876 },
    { name: 'La Prière Efficace', vues: 1342 },
  ];

  const expenseCategories = [
    { name: 'Frais fixes', value: 45, color: '#3B82F6' },
    { name: 'Équipement', value: 25, color: '#10B981' },
    { name: 'Maintenance', value: 15, color: '#F59E0B' },
    { name: 'Personnel', value: 10, color: '#EF4444' },
    { name: 'Divers', value: 5, color: '#8B5CF6' },
  ];

  const audienceDistribution = [
    { name: 'Adulte', value: 65, color: '#3B82F6' },
    { name: 'Jeunesse', value: 20, color: '#10B981' },
    { name: 'Enfants', value: 10, color: '#F59E0B' },
    { name: 'Senior', value: 5, color: '#EF4444' },
  ];

  // Composant pour le label du PieChart avec typage correct
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: PieLabelProps) => {
    if (!percent) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Données synthétiques basées sur les pages fournies
  const dashboardData = useMemo(() => {
    const totalMembers = 30;
    const activeMembers = 22;
    const newMembersThisMonth = 5;
    const visitors = 3;

    const monthlyIncome = 12500;
    const monthlyExpenses = 8200;
    const financialBalance = monthlyIncome - monthlyExpenses;
    const incomeGrowth = 8.2;

    const totalAnnouncements = 24;
    const publishedAnnouncements = 18;
    const scheduledAnnouncements = 4;
    const draftAnnouncements = 2;

    const totalSermons = 20;
    const publishedSermons = 15;
    const totalSermonViews = 24567;

    const upcomingEvents = 8;
    const thisWeekEvents = 3;

    return {
      members: {
        total: totalMembers,
        active: activeMembers,
        new: newMembersThisMonth,
        visitors,
        growth: 12.5
      },
      finances: {
        income: monthlyIncome,
        expenses: monthlyExpenses,
        balance: financialBalance,
        growth: incomeGrowth
      },
      announcements: {
        total: totalAnnouncements,
        published: publishedAnnouncements,
        scheduled: scheduledAnnouncements,
        drafts: draftAnnouncements
      },
      preachings: {
        total: totalSermons,
        published: publishedSermons,
        views: totalSermonViews,
        growth: 15.3
      },
      events: {
        upcoming: upcomingEvents,
        thisWeek: thisWeekEvents
      }
    };
  }, [selectedPeriod]);

  // Activités récentes
  const recentActivities = [
    {
      id: 1,
      type: 'member',
      title: 'Nouveau membre inscrit',
      description: 'Jean Kabasele a rejoint l\'église',
      time: 'Il y a 2 heures',
      icon: FiUserPlus,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'finance',
      title: 'Don reçu',
      description: 'Don de $250 pour la construction',
      time: 'Il y a 5 heures',
      icon: FiDollarSign,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Annonce publiée',
      description: 'Nouvelle annonce sur la retraite spirituelle',
      time: 'Il y a 1 jour',
      icon: FiBell,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'preaching',
      title: 'Sermon téléchargé',
      description: 'Nouveau sermon par Pasteur John Doe',
      time: 'Il y a 2 jours',
      icon: FiVideo,
      color: 'text-orange-600'
    }
  ];

  // Statistiques de croissance
  const growthStats = [
    {
      title: 'Croissance des membres',
      value: `${dashboardData.members.growth}%`,
      change: 'positive',
      description: 'Ce mois-ci'
    },
    {
      title: 'Augmentation des revenus',
      value: `${dashboardData.finances.growth}%`,
      change: 'positive',
      description: 'Comparé au mois dernier'
    },
    {
      title: 'Vues des sermons',
      value: `${dashboardData.preachings.growth}%`,
      change: 'positive',
      description: 'Augmentation ce mois'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, description }: any) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <FiTrendingUp className="mr-1" />
              <span>{description}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`text-2xl ${color.replace('text', 'text')}`} />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }: any) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-start space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
    >
      <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
        <activity.icon className={`text-lg ${activity.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
      </div>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      ref={dashboardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aperçu général de votre église - {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToPDF}
            disabled={exporting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiDownload className="text-lg" />
            <span>{exporting ? 'Export...' : 'Exporter PDF'}</span>
          </motion.button>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total des Membres"
          value={dashboardData.members.total}
          icon={FiUsers}
          color="text-blue-600"
          description={`${dashboardData.members.active} actifs`}
        />
        <StatCard
          title="Revenus du Mois"
          value={`$${dashboardData.finances.income.toLocaleString()}`}
          icon={FiDollarSign}
          color="text-green-600"
          change="positive"
          description={`+${dashboardData.finances.growth}%`}
        />
        <StatCard
          title="Annonces Publiées"
          value={dashboardData.announcements.published}
          icon={FiBell}
          color="text-purple-600"
          description={`${dashboardData.announcements.total} au total`}
        />
        <StatCard
          title="Vues des Sermons"
          value={dashboardData.preachings.views.toLocaleString()}
          icon={FiVideo}
          color="text-orange-600"
          change="positive"
          description={`+${dashboardData.preachings.growth}%`}
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des finances */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Évolution Financière</h3>
            <FiBarChart2 className="text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Revenus" />
                <Area type="monotone" dataKey="expenses" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Dépenses" />
                <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={2} name="Solde" dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Graphique de croissance des membres */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Croissance des Membres</h3>
            <FiUsers className="text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="membres" fill="#3B82F6" name="Total Membres" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nouveaux" fill="#10B981" name="Nouveaux Membres" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Deuxième ligne de graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique camembert des dépenses */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Répartition des Dépenses</h3>
            <FiPieChart className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Pourcentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Graphique des sermons populaires */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sermons les Plus Populaires</h3>
            <FiVideo className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sermonStatsData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 100, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="vues" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Vues" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Graphique de distribution du public */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Distribution du Public</h3>
            <FiUserCheck className="text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {audienceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Pourcentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Section inférieure avec activités et statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités récentes */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activités Récentes</h3>
            <FiActivity className="text-gray-400" />
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </motion.div>

        {/* Statistiques de croissance */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tendances</h3>
            <FiTrendingUp className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {growthStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{stat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                </div>
                <div className={`flex items-center ${
                  stat.change === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <FiTrendingUp className="mr-1" />
                  <span className="font-semibold">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Résumé des modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Résumé Membres */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiUsers className="text-xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Membres</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Actifs</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {dashboardData.members.active}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Nouveaux</span>
              <span className="text-sm font-medium text-green-600">{dashboardData.members.new}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Visiteurs</span>
              <span className="text-sm font-medium text-yellow-600">{dashboardData.members.visitors}</span>
            </div>
          </div>
        </motion.div>

        {/* Résumé Finances */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiDollarSign className="text-xl text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Finances</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Revenus</span>
              <span className="text-sm font-medium text-green-600">
                ${dashboardData.finances.income.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Dépenses</span>
              <span className="text-sm font-medium text-red-600">
                ${dashboardData.finances.expenses.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Solde</span>
              <span className={`text-sm font-medium ${
                dashboardData.finances.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${dashboardData.finances.balance.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Résumé Contenu */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <FiVideo className="text-xl text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contenu</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sermons</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {dashboardData.preachings.published}/{dashboardData.preachings.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Annonces</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {dashboardData.announcements.published}/{dashboardData.announcements.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Événements</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {dashboardData.events.upcoming}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}