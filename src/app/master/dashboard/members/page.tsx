// app/master/dashboard/members/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiCalendar, FiBook, FiMic, FiBell, FiUsers, FiDollarSign, FiSettings, 
  FiLogOut, FiUser, FiChevronDown, FiMenu, FiX, FiPlus, FiSearch, FiEdit, 
  FiTrash2, FiFilter, FiDownload, FiPrinter, FiPhone, FiMail, FiMapPin 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function MembersPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const pathname = usePathname();

  // État pour le formulaire d'ajout
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    memberSince: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  // Données fictives des membres
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      gender: 'male',
      birthDate: '1985-04-12',
      phone: '+243 81 234 5678',
      email: 'jean.dupont@example.com',
      address: '123 Avenue de l\'Église, Binza',
      memberSince: '2020-01-15',
      status: 'active',
      groups: ['Chœur', 'École du Dimanche']
    },
    {
      id: 2,
      firstName: 'Marie',
      lastName: 'Kabasele',
      gender: 'female',
      birthDate: '1992-08-25',
      phone: '+243 89 876 5432',
      email: 'marie.kab@example.com',
      address: '456 Rue de la Foi, Gombe',
      memberSince: '2019-05-20',
      status: 'active',
      groups: ['Femmes de foi', 'Intercession']
    },
    {
      id: 3,
      firstName: 'Paul',
      lastName: 'Mbuyi',
      gender: 'male',
      birthDate: '1978-11-03',
      phone: '+243 82 345 6789',
      email: 'paul.mbuyi@example.com',
      address: '789 Boulevard de l\'Espérance, Limete',
      memberSince: '2018-03-10',
      status: 'inactive',
      groups: ['Anciens', 'Enseignants']
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Ngoma',
      gender: 'female',
      birthDate: '1995-07-19',
      phone: '+243 81 111 2222',
      email: 'sarah.ngoma@example.com',
      address: '321 Allée de la Paix, Bandal',
      memberSince: '2021-02-28',
      status: 'active',
      groups: ['Jeunes adultes', 'Danse']
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Luboya',
      gender: 'male',
      birthDate: '1982-12-30',
      phone: '+243 84 555 6666',
      email: 'david.luboya@example.com',
      address: '654 Chemin de la Grâce, Ngaliema',
      memberSince: '2017-09-05',
      status: 'pending',
      groups: ['Pasteurs', 'Direction']
    }
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

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    
    setMembers([
      ...members,
      {
        id: newId,
        ...newMember,
        groups: []
      }
    ]);
    
    // Réinitialiser le formulaire
    setNewMember({
      firstName: '',
      lastName: '',
      gender: 'male',
      birthDate: '',
      phone: '',
      email: '',
      address: '',
      memberSince: new Date().toISOString().split('T')[0],
      status: 'active'
    });
    
    setIsAddModalOpen(false);
  };

  const handleDeleteMember = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredMembers = members.filter(member => {
    // Filtre par recherche
    const matchesSearch = 
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par statut
    const matchesFilter = 
      activeFilter === 'all' || 
      member.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const statusClasses = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
  };

  const genderIcons = {
    male: '♂',
    female: '♀'
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
              <h1 className="text-xl font-semibold">Membres</h1>
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
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un membre..."
                    className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="all">Tous les membres</option>
                    <option value="active">Actifs</option>
                    <option value="inactive">Inactifs</option>
                    <option value="pending">En attente</option>
                  </select>
                  <FiFilter className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <FiDownload className="mr-2" />
                  Exporter
                </button>
                <button className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <FiPrinter className="mr-2" />
                  Imprimer
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="mr-2" />
                  Ajouter un membre
                </button>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total membres</p>
                    <p className="text-2xl font-semibold">{members.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                    <FiUsers className="text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Membres actifs</p>
                    <p className="text-2xl font-semibold">{members.filter(m => m.status === 'active').length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    <FiUser className="text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nouveaux (30j)</p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                    <FiUser className="text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">En attente</p>
                    <p className="text-2xl font-semibold">{members.filter(m => m.status === 'pending').length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400">
                    <FiUser className="text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des membres */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Membre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Membre depuis
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Groupes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-300">{genderIcons[member.gender as keyof typeof genderIcons]}</span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  {member.firstName} {member.lastName}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(member.birthDate).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-200">{member.phone}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(member.memberSince).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {member.groups.map((group, idx) => (
                                <span key={idx} className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400">
                                  {group}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[member.status as keyof typeof statusClasses]}`}>
                              {member.status === 'active' ? 'Actif' : 
                               member.status === 'inactive' ? 'Inactif' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <div className="flex justify-end space-x-2">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1">
                                <FiEdit />
                              </button>
                              <button 
                                onClick={() => handleDeleteMember(member.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          Aucun membre trouvé
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Ajouter un nouveau membre</h2>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleAddMember}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={newMember.firstName}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={newMember.lastName}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Genre *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={newMember.gender}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      >
                        <option value="male">Masculin</option>
                        <option value="female">Féminin</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={newMember.birthDate}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={newMember.phone}
                          onChange={handleInputChange}
                          className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={newMember.email}
                          onChange={handleInputChange}
                          className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Adresse
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMapPin className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={newMember.address}
                          onChange={handleInputChange}
                          className="pl-10 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="memberSince" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Membre depuis *
                      </label>
                      <input
                        type="date"
                        id="memberSince"
                        name="memberSince"
                        required
                        value={newMember.memberSince}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      />
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Statut *
                      </label>
                      <select
                        id="status"
                        name="status"
                        required
                        value={newMember.status}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                      >
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                        <option value="pending">En attente</option>
                      </select>
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