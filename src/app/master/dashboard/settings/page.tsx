// app/master/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiBook, FiMic, FiBell, FiUsers, FiDollarSign, FiSettings, FiLogOut, FiUser, FiChevronDown, FiMenu, FiX, FiSave, FiGlobe, FiLock, FiMail, FiCreditCard, FiEye, FiMoon, FiSun } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    sermonReminders: true,
    eventReminders: true
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordChangeRequired: false,
    loginAlerts: true
  });

  const [formData, setFormData] = useState({
    churchName: 'Centre Miss. de Binza',
    language: 'fr',
    timezone: 'Africa/Kinshasa',
    email: 'contact@cmb.com',
    currency: 'USD',
  });

  const navItems = [
    { name: 'Accueil', icon: <FiHome />, path: '/master/dashboard' },
    { name: 'Événements', icon: <FiCalendar />, path: '/master/dashboard/programmes' },
    { name: 'Sermons', icon: <FiBook />, path: '/master/dashboard/sermons' },
    { name: 'Prédications', icon: <FiMic />, path: '/master/dashboard/preachings' },
    { name: 'Annonces', icon: <FiBell />, path: '/master/dashboard/announcements' },
    { name: 'Membres', icon: <FiUsers />, path: '/master/dashboard/members' },
    { name: 'Finances', icon: <FiDollarSign />, path: '/master/dashboard/finances' },
    { name: 'Paramètres', icon: <FiSettings />, path: '/master/dashboard/settings' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSecurity(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Paramètres sauvegardés:', formData);
    // Ajoutez ici la logique pour sauvegarder les paramètres
  };

  const handleLogout = () => {
    console.log('Déconnexion effectuée');
    // Ajoutez ici votre logique de déconnexion
  };

  const colorOptions = [
    { value: 'blue', name: 'Bleu', class: 'bg-blue-600' },
    { value: 'indigo', name: 'Indigo', class: 'bg-indigo-600' },
    { value: 'purple', name: 'Violet', class: 'bg-purple-600' },
    { value: 'pink', name: 'Rose', class: 'bg-pink-600' },
    { value: 'red', name: 'Rouge', class: 'bg-red-600' },
    { value: 'orange', name: 'Orange', class: 'bg-orange-600' },
    { value: 'yellow', name: 'Jaune', class: 'bg-yellow-600' },
    { value: 'green', name: 'Vert', class: 'bg-green-600' },
    { value: 'teal', name: 'Turquoise', class: 'bg-teal-600' },
    { value: 'cyan', name: 'Cyan', class: 'bg-cyan-600' },
  ];

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
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
                usePathname() === item.path
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
              <h1 className="text-xl font-semibold">Paramètres</h1>
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

        {/* Contenu des paramètres */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Onglets */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`px-6 py-4 border-b-2 font-medium whitespace-nowrap ${
                      activeTab === 'general'
                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
                    }`}
                  >
                    Général
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`px-6 py-4 border-b-2 font-medium whitespace-nowrap ${
                      activeTab === 'appearance'
                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
                    }`}
                  >
                    Apparence
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`px-6 py-4 border-b-2 font-medium whitespace-nowrap ${
                      activeTab === 'notifications'
                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
                    }`}
                  >
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`px-6 py-4 border-b-2 font-medium whitespace-nowrap ${
                      activeTab === 'security'
                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
                    }`}
                  >
                    Sécurité
                  </button>
                </nav>
              </div>

              {/* Contenu des onglets */}
              <div className="p-6">
                {/* Onglet Général */}
                {activeTab === 'general' && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium">Paramètres généraux</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nom de l'église
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiUser className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="churchName"
                              name="churchName"
                              value={formData.churchName}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email de contact
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiMail className="text-gray-400" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Langue
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiGlobe className="text-gray-400" />
                            </div>
                            <select
                              id="language"
                              name="language"
                              value={formData.language}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 appearance-none"
                            >
                              <option value="fr">Français</option>
                              <option value="en">English</option>
                              <option value="es">Español</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Fuseau horaire
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiGlobe className="text-gray-400" />
                            </div>
                            <select
                              id="timezone"
                              name="timezone"
                              value={formData.timezone}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 appearance-none"
                            >
                              <option value="Africa/Kinshasa">Kinshasa (GMT+1)</option>
                              <option value="Africa/Lagos">Lagos (GMT+1)</option>
                              <option value="Europe/Paris">Paris (GMT+2)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Devise
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiCreditCard className="text-gray-400" />
                            </div>
                            <select
                              id="currency"
                              name="currency"
                              value={formData.currency}
                              onChange={handleChange}
                              className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 appearance-none"
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="CDF">CDF (FC)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FiSave className="mr-2" />
                          Sauvegarder les modifications
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Onglet Apparence */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium">Personnalisation de l'apparence</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Mode sombre</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Activez le mode sombre pour une meilleure expérience nocturne
                          </p>
                        </div>
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            darkMode ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3">Couleur principale</h3>
                        <div className="grid grid-cols-5 gap-3">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => setPrimaryColor(color.value)}
                              className={`flex flex-col items-center ${primaryColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500 rounded-lg' : ''}`}
                            >
                              <div className={`h-10 w-10 rounded-lg ${color.class} flex items-center justify-center`}>
                                {primaryColor === color.value && <FiEye className="text-white" />}
                              </div>
                              <span className="text-xs mt-1">{color.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3">Prévisualisation</h3>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full ${colorOptions.find(c => c.value === primaryColor)?.class} flex items-center justify-center text-white`}>
                              <FiUser />
                            </div>
                            <div>
                              <p className="font-medium">Exemple de composant</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Ceci est une prévisualisation</p>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button className={`px-3 py-1 rounded-lg text-white ${colorOptions.find(c => c.value === primaryColor)?.class}`}>
                              Bouton
                            </button>
                            <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600">
                              Secondaire
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <button
                        onClick={() => console.log('Apparence sauvegardée')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiSave className="mr-2" />
                        Sauvegarder les modifications
                      </button>
                    </div>
                  </div>
                )}

                {/* Onglet Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium">Préférences de notifications</h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email"
                            name="email"
                            type="checkbox"
                            checked={notifications.email}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">
                            Notifications par email
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Recevez des notifications importantes par email
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="app"
                            name="app"
                            type="checkbox"
                            checked={notifications.app}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="app" className="font-medium text-gray-700 dark:text-gray-300">
                            Notifications dans l'application
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Recevez des notifications dans le tableau de bord
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="sermonReminders"
                            name="sermonReminders"
                            type="checkbox"
                            checked={notifications.sermonReminders}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="sermonReminders" className="font-medium text-gray-700 dark:text-gray-300">
                            Rappels de sermons
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Recevez des rappels pour les nouveaux sermons
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="eventReminders"
                            name="eventReminders"
                            type="checkbox"
                            checked={notifications.eventReminders}
                            onChange={handleNotificationChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="eventReminders" className="font-medium text-gray-700 dark:text-gray-300">
                            Rappels d'événements
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Recevez des rappels pour les événements à venir
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <button
                        onClick={() => console.log('Préférences de notifications sauvegardées')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiSave className="mr-2" />
                        Sauvegarder les modifications
                      </button>
                    </div>
                  </div>
                )}

                {/* Onglet Sécurité */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium">Paramètres de sécurité</h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="twoFactorAuth"
                            name="twoFactorAuth"
                            type="checkbox"
                            checked={security.twoFactorAuth}
                            onChange={handleSecurityChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="twoFactorAuth" className="font-medium text-gray-700 dark:text-gray-300">
                            Authentification à deux facteurs (2FA)
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Ajoutez une couche de sécurité supplémentaire à votre compte
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="passwordChangeRequired"
                            name="passwordChangeRequired"
                            type="checkbox"
                            checked={security.passwordChangeRequired}
                            onChange={handleSecurityChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="passwordChangeRequired" className="font-medium text-gray-700 dark:text-gray-300">
                            Changer le mot de passe périodiquement
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Requiert un changement de mot de passe tous les 90 jours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="loginAlerts"
                            name="loginAlerts"
                            type="checkbox"
                            checked={security.loginAlerts}
                            onChange={handleSecurityChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="loginAlerts" className="font-medium text-gray-700 dark:text-gray-300">
                            Alertes de connexion
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            Recevez une alerte lorsqu'une nouvelle connexion est détectée
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium">Sessions actives</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium">Chrome sur Windows</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Kinshasa, Congo • Dernière activité: il y a 2 heures
                              </p>
                            </div>
                            <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                              Déconnecter
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium">Safari sur iPhone</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Paris, France • Dernière activité: il y a 3 jours
                              </p>
                            </div>
                            <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                              Déconnecter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      <button
                        onClick={() => console.log('Paramètres de sécurité sauvegardés')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiSave className="mr-2" />
                        Sauvegarder les modifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section Paramètres avancés */}
            {activeTab === 'general' && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-red-600 dark:text-red-400">Zone dangereuse</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Ces actions sont irréversibles. Soyez certain de ce que vous faites.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg">
                      <div>
                        <h3 className="font-medium">Supprimer toutes les données</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cela supprimera toutes les données de votre église de manière permanente.
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-red-600 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Supprimer
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg">
                      <div>
                        <h3 className="font-medium">Désactiver le compte</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Votre compte sera désactivé et vous ne pourrez plus accéder au dashboard.
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-red-600 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Désactiver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}