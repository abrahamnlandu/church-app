'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSave, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCamera, 
  FiLock, 
  FiBell,
  FiShield,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
  FiEdit3
} from 'react-icons/fi';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@cmb.org',
    phone: '+243 81 123 4567',
    address: '123 Avenue de la Mission, Binza, Kinshasa',
    bio: 'Pasteur principal du Centre Missionnaire de Binza avec plus de 15 ans d\'expérience dans le ministère.',
    role: 'Pasteur Principal',
    department: 'Ministère',
    birthDate: '1980-05-15',
    gender: 'male',
    maritalStatus: 'married',
    joinDate: '2010-03-01'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true
  });

  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      announcements: true,
      events: true,
      sermons: false,
      financial: true
    },
    push: {
      enabled: true,
      announcements: true,
      events: true,
      messages: true
    },
    sms: {
      enabled: false,
      urgent: true,
      events: false
    }
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <FiUser /> },
    { id: 'security', label: 'Sécurité', icon: <FiLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
  ];

  const handleSaveProfile = () => {
    console.log('Profile saved:', profile);
    setIsEditing(false);
    // Ici, vous ajouteriez la logique pour sauvegarder le profil
    alert('Profil sauvegardé avec succès!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Réinitialiser les modifications si nécessaire
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (security.newPassword.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    console.log('Password changed');
    setSecurity({
      ...security,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Mot de passe changé avec succès!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Ici, vous traiteriez l'upload de l'image
      console.log('Image selected:', file);
      alert('Photo de profil mise à jour!');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Photo de profil et informations de base */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    {getInitials()}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 p-3 bg-blue-600 text-white rounded-full shadow-lg"
                  >
                    <FiCamera className="text-lg" />
                  </motion.button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Cliquez sur l'icône pour changer la photo
                </p>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  {!isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <FiEdit3 className="text-lg" />
                      <span>Modifier</span>
                    </motion.button>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{profile.role} • {profile.department}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Membre depuis {new Date(profile.joinDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prénom {isEditing && '*'}
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom {isEditing && '*'}
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email {isEditing && '*'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Genre
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({...profile, gender: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Adresse
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Décrivez-vous en quelques mots..."
              />
            </div>

            {/* Boutons d'action */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <FiCheck className="text-lg" />
                  <span>Sauvegarder</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-colors"
                >
                  <FiX className="text-lg" />
                  <span>Annuler</span>
                </motion.button>
              </div>
            )}
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Sécurité du compte
            </h3>
            
            {/* Changement de mot de passe */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Changer le mot de passe
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mot de passe actuel
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={security.currentPassword}
                      onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showCurrentPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={security.newPassword}
                      onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleChangePassword}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Changer le mot de passe
                </motion.button>
              </div>
            </div>

            {/* Authentification à deux facteurs */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Authentification à deux facteurs
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.twoFactorEnabled}
                    onChange={(e) => setSecurity({...security, twoFactorEnabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Alertes de sécurité */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Alertes de connexion
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Recevez des notifications pour les nouvelles connexions à votre compte
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.loginAlerts}
                    onChange={(e) => setSecurity({...security, loginAlerts: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Sessions actives */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sessions actives
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Chrome sur Windows</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kinshasa, Congo • Actif maintenant</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Déconnecter
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Safari sur iPhone</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Connecté il y a 2 heures</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Préférences de notification
            </h3>
            
            {/* Notifications par email */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications par email
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recevez des notifications importantes par email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email.enabled}
                    onChange={(e) => setNotifications({
                      ...notifications, 
                      email: {...notifications.email, enabled: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {notifications.email.enabled && (
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Annonces importantes</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email.announcements}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          email: {...notifications.email, announcements: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Événements à venir</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email.events}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          email: {...notifications.email, events: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Nouveaux sermons</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email.sermons}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          email: {...notifications.email, sermons: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Rapports financiers</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email.financial}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          email: {...notifications.email, financial: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications push */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications push
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recevez des notifications sur votre appareil
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push.enabled}
                    onChange={(e) => setNotifications({
                      ...notifications, 
                      push: {...notifications.push, enabled: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {notifications.push.enabled && (
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Annonces</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push.announcements}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          push: {...notifications.push, announcements: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Événements</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push.events}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          push: {...notifications.push, events: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Messages</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push.messages}
                        onChange={(e) => setNotifications({
                          ...notifications, 
                          push: {...notifications.push, messages: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications SMS */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications SMS
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recevez des notifications importantes par SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms.enabled}
                    onChange={(e) => setNotifications({
                      ...notifications, 
                      sms: {...notifications.sms, enabled: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mon Profil</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </motion.div>
  );
}