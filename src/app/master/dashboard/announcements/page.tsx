// app/master/dashboard/announcements/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiBook, FiMic, FiBell, FiUsers, FiDollarSign, FiSettings, FiLogOut, FiUser, FiChevronDown, FiMenu, FiX, FiPlus, FiSearch, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', icon: <FiHome />, path: '/master/dashboard' },
    { name: 'Événements', icon: <FiCalendar />, path: '/master/dashboard/programmes' },
    { name: 'Sermons', icon: <FiBook />, path: '/master/dashboard/sermons' },
    { name: 'Prédications', icon: <FiMic />, path: '/master/dashboard/sermons' },
    { name: 'Annonces', icon: <FiBell />, path: '/master/dashboard/announcements' },
    { name: 'Membres', icon: <FiUsers />, path: '/master/dashboard/members' },
    { name: 'Finances', icon: <FiDollarSign />, path: '/master/dashboard/finances' },
    { name: 'Paramètres', icon: <FiSettings />, path: '/master/dashboard/settings' },
  ];

  // Données de démonstration
  const announcements = [
    { 
      id: 1, 
      type: 'worship', 
      title: 'Culte de dimanche prochain', 
      content: 'Le culte de dimanche prochain aura lieu à 9h30 avec une prédication spéciale sur le thème "La foi en action".', 
      date: '15/06/2023', 
      status: 'active',
      scheduledDate: '18/06/2023 09:30'
    },
    { 
      id: 2, 
      type: 'event', 
      title: 'Retraite spirituelle', 
      content: 'Inscrivez-vous pour la retraite spirituelle du mois de juillet. Places limitées.', 
      date: '10/06/2023', 
      status: 'active',
      scheduledDate: '15/07/2023 08:00'
    },
    { 
      id: 3, 
      type: 'general', 
      title: 'Collecte spéciale', 
      content: 'Une collecte spéciale sera organisée ce dimanche pour soutenir le projet de construction.', 
      date: '05/06/2023', 
      status: 'expired',
      scheduledDate: '11/06/2023 10:00'
    },
    { 
      id: 4, 
      type: 'meeting', 
      title: 'Réunion des responsables', 
      content: 'Tous les responsables sont conviés à une réunion importante vendredi à 18h.', 
      date: '01/06/2023', 
      status: 'expired',
      scheduledDate: '09/06/2023 18:00'
    },
  ];

  const handleLogout = () => {
    console.log('Déconnexion effectuée');
    // Ajoutez ici votre logique de déconnexion
  };

  const filteredAnnouncements = announcements
    .filter(announcement => 
      activeTab === 'all' || announcement.type === activeTab
    )
    .filter(announcement => 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const announcementTypes = [
    { id: 'all', name: 'Toutes les annonces' },
    { id: 'worship', name: 'Cultes' },
    { id: 'event', name: 'Événements' },
    { id: 'general', name: 'Communiqués' },
    { id: 'meeting', name: 'Réunions' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Menu latéral - Version desktop */}
      <div className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              CMB
            </div>
            <div>
              <h1 className="font-bold">Centre Miss. de Binza</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tableau de bord</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg md:hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  CMB
                </div>
                <h1 className="font-bold">Centre Missionnaire</h1>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                <FiX className="text-xl" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.path
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <FiLogOut />
                <span>Déconnexion</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiMenu className="text-xl" />
            </button>

            <div className="flex-1 md:ml-6">
              <h1 className="text-xl font-semibold">Annonces</h1>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <FiUser className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="hidden md:inline">Admin</span>
                <FiChevronDown className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-medium">Admin</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">admin@eglise.com</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/master/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FiUser className="mr-2" />
                        Mon profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600 dark:text-red-400"
                      >
                        <FiLogOut className="mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {/* En-tête et actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold">Gestion des annonces</h2>
                <p className="text-gray-500 dark:text-gray-400">Communiqués, cultes et événements</p>
              </div>
              <div className="flex gap-3">
                <Link 
                  href="/master/dashboard/announcements/new" 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiPlus />
                  <span>Nouvelle annonce</span>
                </Link>
              </div>
            </div>

            {/* Recherche et filtres */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Rechercher une annonce..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Onglets */}
              <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="flex flex-wrap -mb-px">
                  {announcementTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === type.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Liste des annonces */}
            <div className="space-y-4">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                      announcement.status === 'active'
                        ? 'border-blue-200 dark:border-blue-900/50'
                        : 'border-gray-200 dark:border-gray-700'
                    } overflow-hidden`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              announcement.type === 'worship'
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400'
                                : announcement.type === 'event'
                                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400'
                                : announcement.type === 'meeting'
                                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-400'
                                : 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-400'
                            }`}>
                              {announcement.type === 'worship' ? 'Culte' : 
                               announcement.type === 'event' ? 'Événement' : 
                               announcement.type === 'meeting' ? 'Réunion' : 'Communiqué'}
                            </span>
                            {announcement.status === 'active' && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400">
                                Actif
                              </span>
                            )}
                            {announcement.status === 'expired' && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                Expiré
                              </span>
                            )}
                          </div>
                          <h3 className="mt-2 text-lg font-semibold">{announcement.title}</h3>
                          <p className="mt-1 text-gray-600 dark:text-gray-300">{announcement.content}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4 flex items-center space-x-3">
                          <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                            <FiEdit2 />
                          </button>
                          <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1" />
                        <span>
                          {announcement.status === 'active' 
                            ? `Programmé pour le ${announcement.scheduledDate}` 
                            : `A eu lieu le ${announcement.scheduledDate}`}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Publié le {announcement.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Aucune annonce trouvée</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredAnnouncements.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <button 
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled
                >
                  Précédent
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page 1 sur 1
                </div>
                <button 
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}