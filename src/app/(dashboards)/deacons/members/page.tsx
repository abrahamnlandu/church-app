'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiUsers, FiUserPlus, FiUserCheck, FiUserX, FiMail, FiEdit, FiTrash2, FiUser } from 'react-icons/fi';

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);

  const members = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '+1234567890', 
      joinDate: '15 Jan 2022', 
      status: 'active', 
      role: 'Membre', 
      group: 'Adulte' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      phone: '+1234567891', 
      joinDate: '20 Feb 2022', 
      status: 'active', 
      role: 'Responsable', 
      group: 'Jeunesse' 
    },
    { 
      id: 3, 
      name: 'Paul Martin', 
      email: 'paul.martin@example.com', 
      phone: '+1234567892', 
      joinDate: '5 Mar 2022', 
      status: 'inactive', 
      role: 'Membre', 
      group: 'Adulte' 
    },
    { 
      id: 4, 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@example.com', 
      phone: '+1234567893', 
      joinDate: '12 Apr 2022', 
      status: 'active', 
      role: 'Bénévole', 
      group: 'Enfants' 
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      email: 'michael.brown@example.com', 
      phone: '+1234567894', 
      joinDate: '18 May 2022', 
      status: 'active', 
      role: 'Membre', 
      group: 'Adulte' 
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'visitor', label: 'Visiteur' },
  ];

  const roleOptions = [
    { value: 'member', label: 'Membre' },
    { value: 'leader', label: 'Responsable' },
    { value: 'volunteer', label: 'Bénévole' },
    { value: 'staff', label: 'Personnel' },
  ];

  const groupOptions = [
    { value: 'adult', label: 'Adulte' },
    { value: 'youth', label: 'Jeunesse' },
    { value: 'children', label: 'Enfants' },
    { value: 'senior', label: 'Senior' },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Membres</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez les membres de votre église</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddMember(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="text-lg" />
          <span>Nouveau membre</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiUsers className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total des membres</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">248</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiUserCheck className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Membres actifs</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">215</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <FiUserPlus className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nouveaux ce mois</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <FiUserX className="text-2xl text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Inactifs</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">33</p>
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
              placeholder="Rechercher un membre..."
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Membre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date d'adhésion</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rôle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Groupe</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {members.map((member) => (
                <motion.tr 
                  key={member.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <FiUser className="text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{member.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{member.joinDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{member.role}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{member.group}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                    }`}>
                      {member.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <FiMail className="text-lg" />
                      </motion.button>
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
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">248</span> membres
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