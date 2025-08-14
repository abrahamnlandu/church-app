'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types
type ChurchProfile = {
  id: string;
  name: string;
  colors?: {
    primary: string;
    secondary: string;
  };
};

type Service = {
  id: string;
  title: string;
  day: 'dimanche' | 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi';
  time: string;
  location: string;
  description?: string;
  isRecurring: boolean;
};

type ScheduledService = {
  id: string;
  title: string;
  date: string; // ISO string
  time: string;
  location: string;
  speaker?: string;
  specialNote?: string;
  isSpecialEvent: boolean;
};

export default function ServicesPage() {
  const [church] = useState<ChurchProfile>({
    id: 'cmb',
    name: 'Centre Missionnaire de Binza (CMB)',
    colors: { primary: '#003366', secondary: '#FFCC66' },
  });

  // Horaires statiques des cultes
  const [staticServices, setStaticServices] = useState<Service[]>([
    {
      id: 's1',
      title: 'Culte Dominical',
      day: 'dimanche',
      time: '07:30',
      location: 'Salle principale',
      description: 'Culte principal de la semaine avec Sainte Cène',
      isRecurring: true
    },
    {
      id: 's2',
      title: 'École du Dimanche',
      day: 'dimanche',
      time: '09:30',
      location: 'Salle des enfants',
      description: 'Enseignement biblique pour les enfants',
      isRecurring: true
    },
    {
      id: 's3',
      title: 'Réunion de Prière',
      day: 'mercredi',
      time: '15:00',
      location: 'Annexe',
      isRecurring: true
    },
    {
      id: 's4',
      title: 'Étude Biblique',
      day: 'jeudi',
      time: '15:00',
      location: 'Annexe',
      isRecurring: true
    }
  ]);

  // Cultes programmés
  const [scheduledServices, setScheduledServices] = useState<ScheduledService[]>([
    {
      id: 'ss1',
      title: 'Culte Spécial de Réveil',
      date: '2025-08-25',
      time: '18:00',
      location: 'Salle principale',
      speaker: 'Pasteur Ntumba',
      specialNote: 'Apportez vos amis et famille',
      isSpecialEvent: true
    },
    {
      id: 'ss2',
      title: 'Culte Dominical',
      date: '2025-08-24',
      time: '07:30',
      location: 'Salle principale',
      isSpecialEvent: false
    },
    {
      id: 'ss3',
      title: 'Mariage de Jean et Marie',
      date: '2025-09-05',
      time: '10:00',
      location: 'Salle principale',
      isSpecialEvent: true
    }
  ]);

  // Form state
  const [newStaticService, setNewStaticService] = useState<Omit<Service, 'id'>>({
    title: '',
    day: 'dimanche',
    time: '07:00',
    location: 'Salle principale',
    isRecurring: true
  });

  const [newScheduledService, setNewScheduledService] = useState<Omit<ScheduledService, 'id'>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '07:00',
    location: 'Salle principale',
    isSpecialEvent: false
  });

  const [activeTab, setActiveTab] = useState<'static' | 'scheduled'>('static');
  const [showStaticForm, setShowStaticForm] = useState(false);
  const [showScheduledForm, setShowScheduledForm] = useState(false);

  // Handlers
  const addStaticService = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      ...newStaticService,
      id: `s${staticServices.length + 1}`
    };
    setStaticServices([...staticServices, newService]);
    setNewStaticService({
      title: '',
      day: 'dimanche',
      time: '07:00',
      location: 'Salle principale',
      isRecurring: true
    });
    setShowStaticForm(false);
  };

  const addScheduledService = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: ScheduledService = {
      ...newScheduledService,
      id: `ss${scheduledServices.length + 1}`
    };
    setScheduledServices([...scheduledServices, newService]);
    setNewScheduledService({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '07:00',
      location: 'Salle principale',
      isSpecialEvent: false
    });
    setShowScheduledForm(false);
  };

  const deleteStaticService = (id: string) => {
    setStaticServices(staticServices.filter(service => service.id !== id));
  };

  const deleteScheduledService = (id: string) => {
    setScheduledServices(scheduledServices.filter(service => service.id !== id));
  };

  // Helper functions
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getDayName = (day: string) => {
    const days: Record<string, string> = {
      'dimanche': 'Dimanche',
      'lundi': 'Lundi',
      'mardi': 'Mardi',
      'mercredi': 'Mercredi',
      'jeudi': 'Jeudi',
      'vendredi': 'Vendredi',
      'samedi': 'Samedi'
    };
    return days[day] || day;
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
              <span className="text-sm font-bold" style={{ color: church.colors?.primary }}>
                {church.name.split(/\s+/).map(w => w[0]).join('').slice(0, 3)}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">Gestion des Cultes</h1>
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

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-neutral-800 mb-6">
          <button
            onClick={() => setActiveTab('static')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === 'static' ? 'border-b-2 text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <span>🔄</span> Horaires Réguliers
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === 'scheduled' ? 'border-b-2 text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <span>📅</span> Cultes Programmés
          </button>
        </div>

        {/* Static Services Tab */}
        {activeTab === 'static' && (
          <div className="space-y-8">
            {/* Add Service Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowStaticForm(true)}
                className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                style={{ backgroundColor: church.colors?.primary }}
              >
                <span>➕</span> Ajouter un Culte Régulier
              </button>
            </div>

            {/* Add Static Service Form - Modal */}
            {showStaticForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 w-full max-w-md"
                >
                  <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Ajouter un Culte Régulier
                    </h2>
                    <button 
                      onClick={() => setShowStaticForm(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={addStaticService} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Titre du culte
                      </label>
                      <input
                        type="text"
                        value={newStaticService.title}
                        onChange={(e) => setNewStaticService({...newStaticService, title: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Jour de la semaine
                      </label>
                      <select
                        value={newStaticService.day}
                        onChange={(e) => setNewStaticService({...newStaticService, day: e.target.value as any})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      >
                        <option value="dimanche">Dimanche</option>
                        <option value="lundi">Lundi</option>
                        <option value="mardi">Mardi</option>
                        <option value="mercredi">Mercredi</option>
                        <option value="jeudi">Jeudi</option>
                        <option value="vendredi">Vendredi</option>
                        <option value="samedi">Samedi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Heure
                      </label>
                      <input
                        type="time"
                        value={newStaticService.time}
                        onChange={(e) => setNewStaticService({...newStaticService, time: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Lieu
                      </label>
                      <input
                        type="text"
                        value={newStaticService.location}
                        onChange={(e) => setNewStaticService({...newStaticService, location: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description (optionnelle)
                      </label>
                      <textarea
                        value={newStaticService.description || ''}
                        onChange={(e) => setNewStaticService({...newStaticService, description: e.target.value})}
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input
                          type="checkbox"
                          checked={newStaticService.isRecurring}
                          onChange={(e) => setNewStaticService({...newStaticService, isRecurring: e.target.checked})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                        />
                        Culte récurrent (chaque semaine)
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowStaticForm(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                        style={{ backgroundColor: church.colors?.primary }}
                      >
                        Ajouter le culte
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Static Services List */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <span>🔄</span> Horaires Réguliers des Cultes
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ces cultes ont lieu chaque semaine selon le même horaire
                </p>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-neutral-800">
                {staticServices.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    Aucun culte régulier n'a été configuré
                  </div>
                ) : (
                  staticServices.map((service) => (
                    <div key={service.id} className="p-6 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div
                              className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: church.colors?.primary }}
                            >
                              {getDayName(service.day).charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">{service.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {getDayName(service.day)} à {service.time} · {service.location}
                              </p>
                            </div>
                          </div>
                          {service.description && (
                            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                              {service.description}
                            </p>
                          )}
                          <div className="mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              service.isRecurring 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {service.isRecurring ? 'Récurrent' : 'Occasionnel'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                            Modifier
                          </button>
                          <button 
                            onClick={() => deleteStaticService(service.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Scheduled Services Tab */}
        {activeTab === 'scheduled' && (
          <div className="space-y-8">
            {/* Add Scheduled Service Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowScheduledForm(true)}
                className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                style={{ backgroundColor: church.colors?.primary }}
              >
                <span>📅</span> Programmer un Nouveau Culte
              </button>
            </div>

            {/* Add Scheduled Service Form - Modal */}
            {showScheduledForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 w-full max-w-md"
                >
                  <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Programmer un Nouveau Culte
                    </h2>
                    <button 
                      onClick={() => setShowScheduledForm(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={addScheduledService} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Titre du culte
                      </label>
                      <input
                        type="text"
                        value={newScheduledService.title}
                        onChange={(e) => setNewScheduledService({...newScheduledService, title: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newScheduledService.date}
                        onChange={(e) => setNewScheduledService({...newScheduledService, date: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Heure
                      </label>
                      <input
                        type="time"
                        value={newScheduledService.time}
                        onChange={(e) => setNewScheduledService({...newScheduledService, time: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Lieu
                      </label>
                      <input
                        type="text"
                        value={newScheduledService.location}
                        onChange={(e) => setNewScheduledService({...newScheduledService, location: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Prédicateur (optionnel)
                      </label>
                      <input
                        type="text"
                        value={newScheduledService.speaker || ''}
                        onChange={(e) => setNewScheduledService({...newScheduledService, speaker: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input
                          type="checkbox"
                          checked={newScheduledService.isSpecialEvent}
                          onChange={(e) => setNewScheduledService({...newScheduledService, isSpecialEvent: e.target.checked})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                        />
                        Événement spécial
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Note spéciale (optionnelle)
                      </label>
                      <textarea
                        value={newScheduledService.specialNote || ''}
                        onChange={(e) => setNewScheduledService({...newScheduledService, specialNote: e.target.value})}
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowScheduledForm(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                        style={{ backgroundColor: church.colors?.primary }}
                      >
                        Programmer le culte
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Scheduled Services List */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <span>📅</span> Cultes Programmés
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Liste des cultes et événements à venir
                </p>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-neutral-800">
                {scheduledServices.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    Aucun culte n'a été programmé
                  </div>
                ) : (
                  scheduledServices.map((service) => (
                    <div key={service.id} className="p-6 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div
                              className="h-12 w-12 rounded-lg flex flex-col items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: church.colors?.primary }}
                            >
                              {new Date(service.date).getDate()}
                              <span className="text-xs font-normal">
                                {new Date(service.date).toLocaleString('fr-FR', { month: 'short' })}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">{service.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(service.date)} à {service.time} · {service.location}
                              </p>
                            </div>
                          </div>
                          {service.speaker && (
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Prédicateur:</span> {service.speaker}
                            </p>
                          )}
                          {service.specialNote && (
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Note:</span> {service.specialNote}
                            </p>
                          )}
                          <div className="mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              service.isSpecialEvent 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {service.isSpecialEvent ? 'Événement Spécial' : 'Culte Régulier'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                            Modifier
                          </button>
                          <button 
                            onClick={() => deleteScheduledService(service.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}