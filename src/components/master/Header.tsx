'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiBook, FiMic, FiBell, FiUsers, FiDollarSign, FiSettings, FiLogOut, FiUser, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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

  const handleLogout = () => {
    console.log('Déconnexion effectuée');
    // Ajoutez ici votre logique de déconnexion
  };

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
              <h1 className="text-xl font-semibold">
                {navItems.find((item) => item.path === pathname)?.name || 'Tableau de bord'}
              </h1>
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
                      <Link
                        href="/master/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600 dark:text-red-400"
                      >
                        <FiLogOut className="mr-2" />
                        Déconnexion
                      </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
    </div>
</div>
  )}