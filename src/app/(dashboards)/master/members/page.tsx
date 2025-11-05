'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiUsers, FiUserPlus, FiUserCheck, FiUserX, FiMail, FiEdit, FiTrash2, FiUser, FiDownload, FiFileText } from 'react-icons/fi';

type MemberStatus = 'active' | 'inactive' | 'visitor';
type MemberRole = 'member' | 'leader' | 'volunteer' | 'staff';
type MemberGroup = 'adult' | 'youth' | 'children' | 'senior';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: MemberStatus;
  role: MemberRole;
  group: MemberGroup;
}

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<MemberStatus | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<MemberRole | 'all'>('all');
  const [selectedGroup, setSelectedGroup] = useState<MemberGroup | 'all'>('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  // Données des membres avec noms congolais
  const allMembers: Member[] = [
    { id: 1, firstName: 'Jean', lastName: 'Kabasele', email: 'jean.kabasele@example.com', phone: '+243 81 123 4567', status: 'active', role: 'leader', group: 'adult' },
    { id: 2, firstName: 'Marie', lastName: 'Lubamba', email: 'marie.lubamba@example.com', phone: '+243 82 234 5678', status: 'active', role: 'member', group: 'adult' },
    { id: 3, firstName: 'Paul', lastName: 'Mbuyi', email: 'paul.mbuyi@example.com', phone: '+243 83 345 6789', status: 'active', role: 'volunteer', group: 'youth' },
    { id: 4, firstName: 'Julie', lastName: 'Ngombo', email: 'julie.ngombo@example.com', phone: '+243 84 456 7890', status: 'inactive', role: 'member', group: 'adult' },
    { id: 5, firstName: 'David', lastName: 'Tshibangu', email: 'david.tshibangu@example.com', phone: '+243 85 567 8901', status: 'active', role: 'staff', group: 'adult' },
    { id: 6, firstName: 'Sarah', lastName: 'Kalala', email: 'sarah.kalala@example.com', phone: '+243 86 678 9012', status: 'active', role: 'member', group: 'children' },
    { id: 7, firstName: 'Daniel', lastName: 'Mukuna', email: 'daniel.mukuna@example.com', phone: '+243 87 789 0123', status: 'visitor', role: 'member', group: 'adult' },
    { id: 8, firstName: 'Esther', lastName: 'Luboya', email: 'esther.luboya@example.com', phone: '+243 88 890 1234', status: 'active', role: 'volunteer', group: 'youth' },
    { id: 9, firstName: 'Samuel', lastName: 'Kanku', email: 'samuel.kanku@example.com', phone: '+243 89 901 2345', status: 'active', role: 'member', group: 'senior' },
    { id: 10, firstName: 'Ruth', lastName: 'Mpiana', email: 'ruth.mpiana@example.com', phone: '+243 90 012 3456', status: 'inactive', role: 'member', group: 'adult' },
    { id: 11, firstName: 'Joseph', lastName: 'Ilunga', email: 'joseph.ilunga@example.com', phone: '+243 91 123 4567', status: 'active', role: 'leader', group: 'adult' },
    { id: 12, firstName: 'Grace', lastName: 'Kasongo', email: 'grace.kasongo@example.com', phone: '+243 92 234 5678', status: 'active', role: 'member', group: 'youth' },
    { id: 13, firstName: 'Marc', lastName: 'Mbuyi', email: 'marc.mbuyi@example.com', phone: '+243 93 345 6789', status: 'visitor', role: 'member', group: 'adult' },
    { id: 14, firstName: 'Dorcas', lastName: 'Kabila', email: 'dorcas.kabila@example.com', phone: '+243 94 456 7890', status: 'active', role: 'volunteer', group: 'children' },
    { id: 15, firstName: 'Philippe', lastName: 'Lubango', email: 'philippe.lubango@example.com', phone: '+243 95 567 8901', status: 'active', role: 'member', group: 'adult' },
    { id: 16, firstName: 'Annie', lastName: 'Tshisekedi', email: 'annie.tshisekedi@example.com', phone: '+243 96 678 9012', status: 'inactive', role: 'member', group: 'adult' },
    { id: 17, firstName: 'Moïse', lastName: 'Katumbi', email: 'moise.katumbi@example.com', phone: '+243 97 789 0123', status: 'active', role: 'leader', group: 'adult' },
    { id: 18, firstName: 'Rachel', lastName: 'Mutinga', email: 'rachel.mutinga@example.com', phone: '+243 98 890 1234', status: 'active', role: 'member', group: 'youth' },
    { id: 19, firstName: 'Jonathan', lastName: 'Kasaï', email: 'jonathan.kasai@example.com', phone: '+243 99 901 2345', status: 'visitor', role: 'member', group: 'adult' },
    { id: 20, firstName: 'Prisca', lastName: 'Lomami', email: 'prisca.lomami@example.com', phone: '+243 80 012 3456', status: 'active', role: 'volunteer', group: 'children' },
    { id: 21, firstName: 'Simon', lastName: 'Kwilu', email: 'simon.kwilu@example.com', phone: '+243 81 112 2334', status: 'active', role: 'member', group: 'senior' },
    { id: 22, firstName: 'Hélène', lastName: 'Mbandaka', email: 'helene.mbandaka@example.com', phone: '+243 82 223 3445', status: 'inactive', role: 'member', group: 'adult' },
    { id: 23, firstName: 'Patrick', lastName: 'Ubangi', email: 'patrick.ubangi@example.com', phone: '+243 83 334 4556', status: 'active', role: 'staff', group: 'adult' },
    { id: 24, firstName: 'Suzanne', lastName: 'Kindu', email: 'suzanne.kindu@example.com', phone: '+243 84 445 5667', status: 'active', role: 'member', group: 'youth' },
    { id: 25, firstName: 'Jacques', lastName: 'Likasi', email: 'jacques.likasi@example.com', phone: '+243 85 556 6778', status: 'visitor', role: 'member', group: 'adult' },
    { id: 26, firstName: 'Marguerite', lastName: 'Kolwezi', email: 'marguerite.kolwezi@example.com', phone: '+243 86 667 7889', status: 'active', role: 'volunteer', group: 'children' },
    { id: 27, firstName: 'André', lastName: 'Mbuji', email: 'andre.mbuji@example.com', phone: '+243 87 778 8990', status: 'active', role: 'member', group: 'adult' },
    { id: 28, firstName: 'Cécile', lastName: 'Kananga', email: 'cecile.kananga@example.com', phone: '+243 88 889 9001', status: 'inactive', role: 'member', group: 'adult' },
    { id: 29, firstName: 'Gérard', lastName: 'Lualaba', email: 'gerard.lualaba@example.com', phone: '+243 89 990 0112', status: 'active', role: 'leader', group: 'adult' },
    { id: 30, firstName: 'Béatrice', lastName: 'Kikwit', email: 'beatrice.kikwit@example.com', phone: '+243 90 001 1223', status: 'active', role: 'member', group: 'youth' }
  ];

  // Filtrage des membres
  const filteredMembers = useMemo(() => {
    return allMembers.filter(member => {
      const matchesSearch = 
        member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phone.includes(searchQuery);
      
      const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
      const matchesRole = selectedRole === 'all' || member.role === selectedRole;
      const matchesGroup = selectedGroup === 'all' || member.group === selectedGroup;

      return matchesSearch && matchesStatus && matchesRole && matchesGroup;
    });
  }, [searchQuery, selectedStatus, selectedRole, selectedGroup]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const currentMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    return filteredMembers.slice(startIndex, endIndex);
  }, [filteredMembers, currentPage, membersPerPage]);

  // Statistiques
  const stats = useMemo(() => {
    const total = allMembers.length;
    const active = allMembers.filter(m => m.status === 'active').length;
    const inactive = allMembers.filter(m => m.status === 'inactive').length;
    const visitors = allMembers.filter(m => m.status === 'visitor').length;
    
    return { total, active, inactive, visitors };
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'visitor', label: 'Visiteur' },
  ];

  const roleOptions = [
    { value: 'all', label: 'Tous les rôles' },
    { value: 'member', label: 'Membre' },
    { value: 'leader', label: 'Responsable' },
    { value: 'volunteer', label: 'Bénévole' },
    { value: 'staff', label: 'Personnel' },
  ];

  const groupOptions = [
    { value: 'all', label: 'Tous les groupes' },
    { value: 'adult', label: 'Adulte' },
    { value: 'youth', label: 'Jeunesse' },
    { value: 'children', label: 'Enfants' },
    { value: 'senior', label: 'Senior' },
  ];

  const getStatusLabel = (status: MemberStatus) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'visitor': return 'Visiteur';
      default: return status;
    }
  };

  const getRoleLabel = (role: MemberRole) => {
    switch (role) {
      case 'member': return 'Membre';
      case 'leader': return 'Responsable';
      case 'volunteer': return 'Bénévole';
      case 'staff': return 'Personnel';
      default: return role;
    }
  };

  const getGroupLabel = (group: MemberGroup) => {
    switch (group) {
      case 'adult': return 'Adulte';
      case 'youth': return 'Jeunesse';
      case 'children': return 'Enfants';
      case 'senior': return 'Senior';
      default: return group;
    }
  };

  const getStatusColor = (status: MemberStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      case 'visitor': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
    }
  };

  // Génération du PDF
  const generatePDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Liste des Membres - Église</title>
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
          .active { background-color: #d4edda; color: #155724; }
          .inactive { background-color: #f8d7da; color: #721c24; }
          .visitor { background-color: #fff3cd; color: #856404; }
          .footer { 
            margin-top: 40px; 
            text-align: center; 
            font-size: 12px; 
            color: #666; 
            border-top: 1px solid #ddd;
            padding-top: 10px;
          }
          @media print {
            body { margin: 0; }
            .summary-item { border: 1px solid #000; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Liste des Membres - Église</h1>
          <p><strong>Date du rapport:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
          <p><strong>Total des membres:</strong> ${stats.total}</p>
        </div>
        
        <div class="summary">
          <div class="summary-item">
            <h3>Membres Actifs</h3>
            <p style="font-size: 24px; font-weight: bold; color: green;">${stats.active}</p>
          </div>
          <div class="summary-item">
            <h3>Membres Inactifs</h3>
            <p style="font-size: 24px; font-weight: bold; color: red;">${stats.inactive}</p>
          </div>
          <div class="summary-item">
            <h3>Visiteurs</h3>
            <p style="font-size: 24px; font-weight: bold; color: orange;">${stats.visitors}</p>
          </div>
        </div>
        
        <h2>Détail des Membres (${filteredMembers.length} membres)</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Nom Complet</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Groupe</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            ${filteredMembers.map(member => `
              <tr>
                <td>${member.firstName} ${member.lastName}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${getRoleLabel(member.role)}</td>
                <td>${getGroupLabel(member.group)}</td>
                <td class="${member.status}">${getStatusLabel(member.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer">
          <p>Généré automatiquement par le système de gestion des membres de l'Église</p>
          <p>Pour toute question, contactez l'administration</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    }
  };

  // Export Excel
  const exportToExcel = () => {
    // Créer le contenu CSV
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Rôle', 'Groupe', 'Statut'];
    const csvContent = [
      headers.join(','),
      ...filteredMembers.map(member => [
        member.lastName,
        member.firstName,
        member.email,
        member.phone,
        getRoleLabel(member.role),
        getGroupLabel(member.group),
        getStatusLabel(member.status)
      ].join(','))
    ].join('\n');

    // Créer et télécharger le fichier
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `membres_eglise_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Nouveau membre
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active' as MemberStatus,
    role: 'member' as MemberRole,
    group: 'adult' as MemberGroup
  });

  const handleAddMember = () => {
    // Ici on ajouterait le membre à la base de données
    console.log('Nouveau membre:', newMember);
    setShowAddMember(false);
    setNewMember({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'active',
      role: 'member',
      group: 'adult'
    });
    alert('Membre ajouté avec succès!');
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Membres</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez les membres de votre église</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiDownload className="text-lg" />
            <span>Excel</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePDF}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiFileText className="text-lg" />
            <span>PDF</span>
          </motion.button>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
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
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Visiteurs</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.visitors}</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
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
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as MemberStatus | 'all')}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as MemberRole | 'all')}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value as MemberGroup | 'all')}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            >
              {groupOptions.map((option) => (
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rôle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Groupe</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentMembers.map((member) => (
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
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {member.firstName} {member.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {member.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {member.phone}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getRoleLabel(member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getGroupLabel(member.group)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.status)}`}>
                      {getStatusLabel(member.status)}
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

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Affichage de <span className="font-medium">{(currentPage - 1) * membersPerPage + 1}</span> à{' '}
            <span className="font-medium">{Math.min(currentPage * membersPerPage, filteredMembers.length)}</span> sur{' '}
            <span className="font-medium">{filteredMembers.length}</span> membres
          </p>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </motion.button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <motion.button
                  key={pageNumber}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 border-transparent text-white'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {pageNumber}
                </motion.button>
              );
            })}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal d'ajout de membre */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau membre</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={newMember.firstName}
                    onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={newMember.lastName}
                    onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Statut
                  </label>
                  <select
                    value={newMember.status}
                    onChange={(e) => setNewMember({...newMember, status: e.target.value as MemberStatus})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="visitor">Visiteur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rôle
                  </label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value as MemberRole})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="member">Membre</option>
                    <option value="leader">Responsable</option>
                    <option value="volunteer">Bénévole</option>
                    <option value="staff">Personnel</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Groupe
                </label>
                <select
                  value={newMember.group}
                  onChange={(e) => setNewMember({...newMember, group: e.target.value as MemberGroup})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="adult">Adulte</option>
                  <option value="youth">Jeunesse</option>
                  <option value="children">Enfants</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ajouter
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
