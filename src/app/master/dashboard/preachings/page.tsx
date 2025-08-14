// app/master/dashboard/preachings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiBook, FiMic, FiBell, FiUsers, FiDollarSign, FiSettings, FiLogOut, FiUser, FiChevronDown, FiMenu, FiX, FiPlus, FiSearch, FiEdit, FiTrash2, FiUpload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PreachingsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();

  // État pour le formulaire d'ajout
  const [newPreaching, setNewPreaching] = useState({
    title: '',
    speaker: '',
    date: new Date().toISOString().split('T')[0],
    audioFile: null as File | null,
    description: ''
  });

  // Données fictives des prédications
  const [preachings, setPreachings] = useState([
    {
      id: 1,
      title: 'La puissance de la foi',
      speaker: 'Pasteur John Doe',
      date: '2023-06-15',
      duration: '45:22',
      downloads: 124
    },
    {
      id: 2,
      title: 'Vivre dans la grâce',
      speaker: 'Pasteur Jane Smith',
      date: '2023-06-08',
      duration: '38:15',
      downloads: 89
    },
    {
      id: 3,
      title: 'Le chemin de la sanctification',
      speaker: 'Pasteur David Johnson',
      date: '2023-06-01',
      duration: '52:40',
      downloads: 156
    },
  ]);

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

  const handleLogout = () => {
    console.log('Déconnexion effectuée');
    // Ajoutez ici votre logique de déconnexion
  };

  const handleAddPreaching = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = preachings.length > 0 ? Math.max(...preachings.map(p => p.id)) + 1 : 1;
    
    setPreachings([
      ...preachings,
      {
        id: newId,
        title: newPreaching.title,
        speaker: newPreaching.speaker,
        date: newPreaching.date,
        duration: '00:00', // À calculer à partir du fichier audio
        downloads: 0
      }
    ]);
    
    // Réinitialiser le formulaire
    setNewPreaching({
      title: '',
      speaker: '',
      date: new Date().toISOString().split('T')[0],
      audioFile: null,
      description: ''
    });
    
    setIsAddModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPreaching({
        ...newPreaching,
        audioFile: e.target.files[0]
      });
    }
  };

  const handleDeletePreaching = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette prédication ?')) {
      setPreachings(preachings.filter(p => p.id !== id));
    }
  };

  const filteredPreachings = preachings.filter(preaching =>
    preaching.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preaching.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-xl font-semibold">Prédications</h1>
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
            {/* Barre d'actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher une prédication..."
                  className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="mr-2" />
                Ajouter une prédication
              </button>
            </div>

            {/* Liste des prédications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Titre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Orateur
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Durée
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Téléchargements
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredPreachings.length > 0 ? (
                      filteredPreachings.map((preaching) => (
                        <tr key={preaching.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {preaching.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {preaching.speaker}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(preaching.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {preaching.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {preaching.downloads}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                              <FiEdit />
                            </button>
                            <button 
                              onClick={() => handleDeletePreaching(preaching.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          Aucune prédication trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal d'ajout */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Ajouter une prédication</h2>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleAddPreaching}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Titre de la prédication *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={newPreaching.title}
                        onChange={(e) => setNewPreaching({...newPreaching, title: e.target.value})}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="speaker" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Orateur *
                      </label>
                      <input
                        type="text"
                        id="speaker"
                        name="speaker"
                        required
                        value={newPreaching.speaker}
                        onChange={(e) => setNewPreaching({...newPreaching, speaker: e.target.value})}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={newPreaching.date}
                        onChange={(e) => setNewPreaching({...newPreaching, date: e.target.value})}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fichier audio *
                      </label>
                      <div className="flex items-center">
                        <label className="flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FiUpload className="mb-3 text-gray-400 text-xl" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              MP3, WAV (MAX. 100MB)
                            </p>
                          </div>
                          <input 
                            id="audioFile" 
                            name="audioFile" 
                            type="file" 
                            accept="audio/*" 
                            className="hidden" 
                            required
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {newPreaching.audioFile && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Fichier sélectionné: {newPreaching.audioFile.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={newPreaching.description}
                        onChange={(e) => setNewPreaching({...newPreaching, description: e.target.value})}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}