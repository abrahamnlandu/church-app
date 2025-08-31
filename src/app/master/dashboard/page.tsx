'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiBook, FiDollarSign, FiUsers, FiBell, FiMic, FiSettings, FiTrendingUp, FiArrowUp, FiArrowDown, FiEye, FiUser, FiVideo } from 'react-icons/fi';
import StatCard from '@/components/Dashboard/StatCard';

export default function DashboardPage() {
  // Données pour les graphiques
  const attendanceData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Participation moyenne',
        data: [120, 150, 180, 210, 240, 280],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const financeData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus',
        data: [5200, 6200, 7100, 7800, 8200, 8900],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Dépenses',
        data: [3800, 4200, 4800, 5100, 5300, 5200],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const memberGrowthData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Nouveaux membres',
        data: [12, 18, 15, 22, 25, 30],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const eventCategoriesData = {
    labels: ['Culte', 'Étude biblique', 'Jeunesse', 'Enfants', 'Autres'],
    datasets: [
      {
        data: [45, 20, 15, 12, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Données pour les sections de résumé
  const recentEvents = [
    { id: 1, title: 'Culte dominical', date: 'Dimanche, 08h30', location: 'Auditorium principal', participants: 1250 },
    { id: 2, title: 'Étude biblique', date: 'Mercredi, 19h00', location: 'Salle de réunion A', participants: 85 },
    { id: 3, title: 'Concert de louange', date: 'Samedi, 18h00', location: 'Auditorium principal', participants: 500 },
  ];

  const recentSermons = [
    { id: 1, title: 'La puissance de la foi', preacher: 'Pasteur John Doe', date: '12 juin 2023', duration: '45:12', listens: 1245 },
    { id: 2, title: 'Vivre dans la grâce', preacher: 'Pasteur Jane Smith', date: '5 juin 2023', duration: '38:45', listens: 987 },
    { id: 3, title: 'Le chemin de la sanctification', preacher: 'Pasteur John Doe', date: '29 mai 2023', duration: '52:30', listens: 1567 },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'Collecte spéciale', content: 'Pour la construction du nouveau bâtiment de notre église.', date: '15 juin 2023', author: 'Pasteur John Doe' },
    { id: 2, title: 'Retraite spirituelle', content: 'Une retraite spirituelle est organisée du 25 au 27 août.', date: '10 juin 2023', author: 'Pasteur Jane Smith' },
    { id: 3, title: 'Nouveaux horaires', content: 'À partir du mois prochain, le culte du dimanche matin débutera à 9h30.', date: '5 juin 2023', author: 'Pasteur John Doe' },
  ];

  const newMembers = [
    { id: 1, name: 'Michael Brown', joinDate: '18 mai 2023', avatar: 'MB', group: 'Adulte' },
    { id: 2, name: 'Sarah Johnson', joinDate: '12 mai 2023', avatar: 'SJ', group: 'Jeunesse' },
    { id: 3, name: 'Paul Martin', joinDate: '5 mai 2023', avatar: 'PM', group: 'Adulte' },
    { id: 4, name: 'Emma Wilson', joinDate: '28 avr. 2023', avatar: 'EW', group: 'Enfants' },
  ];

  const financialSummary = {
    income: 8420,
    expenses: 5230,
    balance: 3190,
    growth: 5.2,
  };

  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard 
          title="Membres actifs" 
          value="1,248" 
          change="+12% ce mois" 
          icon={<FiUsers className="text-blue-600 dark:text-blue-400" />} 
          color="blue" 
        />
        <StatCard 
          title="Événements" 
          value="24" 
          change="3 à venir" 
          icon={<FiCalendar className="text-green-600 dark:text-green-400" />} 
          color="green" 
        />
        <StatCard 
          title="Dons totaux" 
          value="$8,420" 
          change="+5% ce mois" 
          icon={<FiDollarSign className="text-purple-600 dark:text-purple-400" />} 
          color="purple" 
        />
        <StatCard 
          title="Sermons" 
          value="156" 
          change="+3 nouveaux" 
          icon={<FiBook className="text-orange-600 dark:text-orange-400" />} 
          color="orange" 
        />
      </motion.div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Participation aux services</h2>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>+22% ce mois</span>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={attendanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Finances de l'église</h2>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>+{financialSummary.growth}% ce mois</span>
            </div>
          </div>
          <div className="h-80">
            <Bar 
              data={financeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Résumé des événements et sermons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Prochains événements</h2>
            <Link href="/master/dashboard/programmes">
              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -2 }}
                className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <FiCalendar className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.date} • {event.location}</p>
                  <div className="mt-2 flex items-center">
                    <FiUser className="text-gray-400 mr-1 text-sm" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{event.participants} participants attendus</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Derniers sermons</h2>
            <Link href="/master/dashboard/sermons">
              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentSermons.map((sermon) => (
              <motion.div 
                key={sermon.id}
                whileHover={{ y: -2 }}
                className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg mr-4">
                  <FiMic className="text-purple-600 dark:text-purple-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{sermon.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Par {sermon.preacher} • {sermon.date}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{sermon.duration}</span>
                    <div className="flex items-center">
                      <FiEye className="text-gray-400 mr-1 text-sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{sermon.listens} écoutes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Résumé des annonces et nouveaux membres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Annonces récentes</h2>
            <Link href="/master/dashboard/announcements">
              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <motion.div 
                key={announcement.id}
                whileHover={{ y: -2 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{announcement.content}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Par {announcement.author}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Nouveaux membres</h2>
            <Link href="/master/dashboard/members">
              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {newMembers.map((member) => (
              <motion.div 
                key={member.id}
                whileHover={{ y: -2 }}
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">A rejoint le {member.joinDate}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {member.group}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Croissance des membres</h2>
          <div className="h-64">
            <Line 
              data={memberGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Répartition des événements</h2>
          <div className="h-64">
            <Doughnut 
              data={eventCategoriesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}