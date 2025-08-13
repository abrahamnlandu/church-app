'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types
type ChurchProfile = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  colors?: {
    primary: string;
    secondary: string;
  };
  location?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  social?: {
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
  };
};

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: string;
};

type SettingsTab = 'general' | 'appearance' | 'users' | 'integrations' | 'security';

// Composants
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [church, setChurch] = useState<ChurchProfile>({
    id: 'cmb',
    name: 'Centre Missionnaire de Binza (CMB)',
    slug: 'centre-missionnaire-de-binza',
    logoUrl: '',
    colors: { primary: '#003366', secondary: '#FFCC66' },
    location: 'Binza, Kinshasa — RDC',
    contact: {
      email: 'contact@cmb-rdc.org',
      phone: '+243 81 234 5678',
      address: 'Avenue de la Mission 123, Binza'
    },
    social: {
      facebook: 'https://facebook.com/cmb-rdc',
      youtube: 'https://youtube.com/cmb-rdc',
      whatsapp: 'https://wa.me/243812345678'
    }
  });

  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Pasteur Ntumba', email: 'pasteur@cmb-rdc.org', role: 'admin', lastLogin: '2025-08-10T14:30:00Z' },
    { id: 'u2', name: 'Frère Frank', email: 'frank@cmb-rdc.org', role: 'editor', lastLogin: '2025-08-11T09:15:00Z' },
    { id: 'u3', name: 'Sœur Marie', email: 'marie@cmb-rdc.org', role: 'viewer', lastLogin: '2025-08-05T16:45:00Z' }
  ]);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde ici
    alert('Paramètres généraux sauvegardés!');
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde ici
    alert('Paramètres d\'apparence sauvegardés!');
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout d'utilisateur ici
    alert('Nouvel utilisateur ajouté!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="border-b bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-700 flex items-center justify-center overflow-hidden shadow-inner"
              style={{ outline: `3px solid ${church.colors?.secondary}` }}
            >
              {church.logoUrl ? (
                <img src={church.logoUrl} alt={church.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold" style={{ color: church.colors?.primary }}>
                  {church.name.split(/\s+/).map(w => w[0]).join('').slice(0, 3)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">Paramètres</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{church.name}</p>
            </div>
          </div>

          <Link
            href={`/master/dashboard`}
            className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors shadow-sm flex items-center gap-2
                      border-gray-300 hover:bg-gray-50
                      dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {([
                { id: 'general', label: 'Général', icon: '⚙️' },
                { id: 'appearance', label: 'Apparence', icon: '🎨' },
                { id: 'users', label: 'Utilisateurs', icon: '👥' },
                { id: 'integrations', label: 'Intégrations', icon: '🔌' },
                { id: 'security', label: 'Sécurité', icon: '🔒' }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
                            ${activeTab === tab.id 
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800'}`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu du panneau */}
          <div className="flex-1">
            {/* Panneau Général */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <span>⚙️</span> Paramètres généraux
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Configurez les informations de base de votre église
                  </p>
                </div>

                <form onSubmit={handleSaveGeneral} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom de l'église
                      </label>
                      <input
                        type="text"
                        value={church.name}
                        onChange={(e) => setChurch({...church, name: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Slug/URL
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 text-sm">
                          yambopeto.com/
                        </span>
                        <input
                          type="text"
                          value={church.slug}
                          onChange={(e) => setChurch({...church, slug: e.target.value})}
                          className="flex-1 rounded-r-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Localisation
                      </label>
                      <input
                        type="text"
                        value={church.location}
                        onChange={(e) => setChurch({...church, location: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email de contact
                      </label>
                      <input
                        type="email"
                        value={church.contact?.email}
                        onChange={(e) => setChurch({
                          ...church, 
                          contact: {...church.contact, email: e.target.value}
                        })}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={church.contact?.phone}
                        onChange={(e) => setChurch({
                          ...church, 
                          contact: {...church.contact, phone: e.target.value}
                        })}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Adresse physique
                      </label>
                      <textarea
                        value={church.contact?.address}
                        onChange={(e) => setChurch({
                          ...church, 
                          contact: {...church.contact, address: e.target.value}
                        })}
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-neutral-800 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                      style={{ backgroundColor: church.colors?.primary }}
                    >
                      Sauvegarder les modifications
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Panneau Apparence */}
            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <span>🎨</span> Apparence
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Personnalisez les couleurs et le logo de votre site
                  </p>
                </div>

                <form onSubmit={handleSaveAppearance} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Couleur primaire
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={church.colors?.primary}
                          onChange={(e) => setChurch({
                            ...church, 
                            colors: {...church.colors, primary: e.target.value}
                          })}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {church.colors?.primary}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Couleur secondaire
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={church.colors?.secondary}
                          onChange={(e) => setChurch({
                            ...church, 
                            colors: {...church.colors, secondary: e.target.value}
                          })}
                          className="w-16 h-10 rounded-lg cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {church.colors?.secondary}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Logo de l'église
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                          {church.logoUrl ? (
                            <img src={church.logoUrl} alt="Logo actuel" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">Aucun logo</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setChurch({
                                    ...church,
                                    logoUrl: event.target?.result as string
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-lg file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Taille recommandée: 200×200 pixels (format PNG ou JPG)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Aperçu du thème
                      </label>
                      <div className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="h-10 w-10 rounded-lg border border-gray-300 dark:border-neutral-700 shadow-inner flex items-center justify-center"
                            style={{ backgroundColor: church.colors?.primary }}
                          >
                            <span className="text-xs text-white font-bold">P</span>
                          </div>
                          <div
                            className="h-10 w-10 rounded-lg border border-gray-300 dark:border-neutral-700 shadow-inner flex items-center justify-center"
                            style={{ backgroundColor: church.colors?.secondary }}
                          >
                            <span className="text-xs text-white font-bold">S</span>
                          </div>
                          <div className="h-10 w-10 rounded-lg border border-gray-300 dark:border-neutral-700 shadow-inner bg-white dark:bg-neutral-800 flex items-center justify-center">
                            <span className="text-xs text-gray-700 dark:text-gray-300 font-bold">B</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded-full" style={{ backgroundColor: church.colors?.primary }} />
                          <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: church.colors?.secondary }} />
                          <div className="h-3 w-1/2 rounded-full bg-gray-300 dark:bg-neutral-700" />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Primaire</span>
                          <span>Secondaire</span>
                          <span>Neutre</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-neutral-800 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                      style={{ backgroundColor: church.colors?.primary }}
                    >
                      Sauvegarder les modifications
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Panneau Utilisateurs */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <span>👥</span> Gestion des utilisateurs
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Gérez qui peut accéder à votre tableau de bord
                      </p>
                    </div>
                    <button
                      onClick={() => document.getElementById('add-user-modal')?.showModal()}
                      className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                      style={{ backgroundColor: church.colors?.primary }}
                    >
                      + Ajouter un utilisateur
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Nom
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Dernière connexion
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                : user.role === 'editor'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                              {user.role === 'admin' ? 'Administrateur' : user.role === 'editor' ? 'Éditeur' : 'Observateur'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(user.lastLogin).toLocaleString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              Modifier
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modale d'ajout d'utilisateur */}
                <dialog id="add-user-modal" className="rounded-xl p-0 w-full max-w-md backdrop:bg-black/50">
                  <form onSubmit={handleAddUser} className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl">
                    <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Ajouter un utilisateur</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rôle
                        </label>
                        <select
                          className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                          required
                        >
                          <option value="admin">Administrateur</option>
                          <option value="editor">Éditeur</option>
                          <option value="viewer">Observateur</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-neutral-800 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => document.getElementById('add-user-modal')?.close()}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                        style={{ backgroundColor: church.colors?.primary }}
                      >
                        Ajouter l'utilisateur
                      </button>
                    </div>
                  </form>
                </dialog>
              </motion.div>
            )}

            {/* Panneau Intégrations */}
            {activeTab === 'integrations' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <span>🔌</span> Intégrations
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Connectez votre site à des services externes
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                          <span className="text-xl">F</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">Facebook</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Connectez votre page Facebook
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm font-medium"
                      >
                        {church.social?.facebook ? 'Modifier' : 'Connecter'}
                      </button>
                    </div>
                    {church.social?.facebook && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Connecté à: <a href={church.social.facebook} className="text-blue-600 dark:text-blue-400" target="_blank">{church.social.facebook}</a>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-red-500 flex items-center justify-center text-white">
                          <span className="text-xl">Y</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">YouTube</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Connectez votre chaîne YouTube
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm font-medium"
                      >
                        {church.social?.youtube ? 'Modifier' : 'Connecter'}
                      </button>
                    </div>
                    {church.social?.youtube && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Connecté à: <a href={church.social.youtube} className="text-blue-600 dark:text-blue-400" target="_blank">{church.social.youtube}</a>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center text-white">
                          <span className="text-xl">W</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">WhatsApp</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Configurez votre groupe WhatsApp
                          </p>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm font-medium"
                      >
                        {church.social?.whatsapp ? 'Modifier' : 'Connecter'}
                      </button>
                    </div>
                    {church.social?.whatsapp && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Connecté à: <a href={church.social.whatsapp} className="text-blue-600 dark:text-blue-400" target="_blank">{church.social.whatsapp}</a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Panneau Sécurité */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <span>🔒</span> Sécurité
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Paramètres de sécurité et accès
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Connexion sécurisée</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Authentification à deux facteurs</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Ajoutez une couche de sécurité supplémentaire
                          </p>
                        </div>
                        <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm font-medium">
                          Activer
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Changer de mot de passe</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Mettez à jour votre mot de passe régulièrement
                          </p>
                        </div>
                        <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm font-medium">
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Sessions actives</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Chrome sur Windows</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Kinshasa, RDC · Connecté il y a 2 heures
                          </p>
                        </div>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
                          Déconnecter
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Safari sur iPhone</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Kinshasa, RDC · Connecté il y a 3 jours
                          </p>
                        </div>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
                          Déconnecter
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Zone dangereuse</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">Exporter les données</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Téléchargez une copie de toutes vos données
                          </p>
                        </div>
                        <button className="px-3 py-1 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 text-sm font-medium">
                          Exporter
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-700 dark:text-red-300">Supprimer le compte</p>
                          <p className="text-xs text-red-500 dark:text-red-400">
                            Cette action est irréversible
                          </p>
                        </div>
                        <button className="px-3 py-1 rounded-lg border border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium">
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}