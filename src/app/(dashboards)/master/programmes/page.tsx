'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiUser, 
  FiEdit, 
  FiTrash2, 
  FiSave,
  FiX,
  FiBell,
  FiRepeat,
  FiUsers,
  FiHeart,
  FiBook,
  FiMic,
  FiHome,
  FiStar
} from 'react-icons/fi';

type EventType = 'prayer' | 'communion' | 'convention' | 'seminar' | 'youth' | 'mothers' | 'couples' | 'custom';

interface ChurchEvent {
  id: number;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  theme: string;
  speakers: string[];
  description?: string;
  recurring: boolean;
  recurrencePattern?: 'weekly' | 'monthly' | 'yearly';
  customType?: string;
}

interface WorshipSchedule {
  id: number;
  day: string;
  time: string;
  service: string;
  description: string;
  duration: string;
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'schedule'>('events');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<WorshipSchedule | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Événements initiaux
  const [events, setEvents] = useState<ChurchEvent[]>([
    {
      id: 1,
      title: 'Réunion de Prières du Mercredi',
      type: 'prayer',
      date: '2025-06-18',
      time: '18:00',
      location: 'Sanctuaire Principal',
      theme: 'La puissance de la prière collective',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'weekly'
    },
    {
      id: 2,
      title: 'Sainte Cène du Premier Dimanche',
      type: 'communion',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },
    {
      id: 3,
      title: 'Convention Biblique Annuelle',
      type: 'convention',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },    {
      id: 3,
      title: 'Convention Biblique Annuelle',
      type: 'convention',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },    {
      id: 3,
      title: 'Convention Biblique Annuelle',
      type: 'convention',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },    {
      id: 3,
      title: 'Convention Biblique Annuelle',
      type: 'convention',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },    {
      id: 3,
      title: 'Convention Biblique Annuelle',
      type: 'convention',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },    {
      id: 3,
      title: 'Convention Biblique Annuelle',
      type: 'convention',
      date: '2025-07-06',
      time: '10:00',
      location: 'Sanctuaire Principal',
      theme: 'Souvenez-vous de la mort du Seigneur',
      speakers: ['Pasteur John Doe'],
      recurring: true,
      recurrencePattern: 'monthly'
    },
  ]);

  // Horaires des cultes
  const [worshipSchedules, setWorshipSchedules] = useState<WorshipSchedule[]>([
    {
      id: 1,
      day: 'Dimanche',
      time: '09:30',
      service: 'Culte du Matin',
      description: 'Culte principal de louange et d\'adoration',
      duration: '2h'
    },
    {
      id: 2,
      day: 'Dimanche',
      time: '17:00',
      service: 'Culte du Soir',
      description: 'Moments de prière et enseignements',
      duration: '1h30'
    },
    {
      id: 3,
      day: 'Mardi',
      time: '18:00',
      service: 'École du Dimanche',
      description: 'Enseignements bibliques pour tous les âges',
      duration: '1h30'
    },
    {
      id: 4,
      day: 'Mercredi',
      time: '18:00',
      service: 'Réunion de Prières',
      description: 'Intercession et prières pour les besoins',
      duration: '1h'
    },
    {
      id: 5,
      day: 'Vendredi',
      time: '19:00',
      service: 'Réunion des Jeunes',
      description: 'Activités et enseignements pour la jeunesse',
      duration: '2h'
    }
  ]);

  // Types d'événements
  const eventTypes = [
    { value: 'prayer', label: 'Réunion de Prières', icon: FiHeart, color: 'text-red-500' },
    { value: 'communion', label: 'Sainte Cène', icon: FiUsers, color: 'text-purple-500' },
    { value: 'convention', label: 'Convention Biblique', icon: FiBook, color: 'text-blue-500' },
    { value: 'seminar', label: 'Séminaire', icon: FiMic, color: 'text-green-500' },
    { value: 'youth', label: 'Réunion de Jeunes', icon: FiStar, color: 'text-yellow-500' },
    { value: 'mothers', label: 'Réunion de Mamans', icon: FiHome, color: 'text-pink-500' },
    { value: 'couples', label: 'Réunion de Couples', icon: FiHeart, color: 'text-red-500' },
    { value: 'custom', label: 'Autre Événement', icon: FiCalendar, color: 'text-gray-500' }
  ];

  // Formulaire d'événement
  const [eventForm, setEventForm] = useState<Omit<ChurchEvent, 'id'>>({
    title: '',
    type: 'prayer',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    location: '',
    theme: '',
    speakers: [],
    description: '',
    recurring: false,
    recurrencePattern: 'weekly'
  });

  // Formulaire d'horaire
  const [scheduleForm, setScheduleForm] = useState<Omit<WorshipSchedule, 'id'>>({
    day: 'Dimanche',
    time: '09:00',
    service: '',
    description: '',
    duration: '1h'
  });

  // Filtrage des événements
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.speakers.some(speaker => speaker.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const eventDate = new Date(event.date);
      const matchesMonth = eventDate.getMonth() === selectedMonth;
      const matchesYear = eventDate.getFullYear() === selectedYear;

      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [events, searchQuery, selectedMonth, selectedYear]);

  // Événements à venir (7 prochains jours)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  // Gestion des événements
  const handleCreateEvent = () => {
    const newEvent: ChurchEvent = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      ...eventForm
    };
    setEvents([...events, newEvent]);
    setShowEventForm(false);
    resetEventForm();
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    
    setEvents(events.map(event => 
      event.id === editingEvent.id 
        ? { ...editingEvent }
        : event
    ));
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleEditEvent = (event: ChurchEvent) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      location: event.location,
      theme: event.theme,
      speakers: event.speakers,
      description: event.description || '',
      recurring: event.recurring,
      recurrencePattern: event.recurrencePattern
    });
    setShowEventForm(true);
  };

  const resetEventForm = () => {
    setEventForm({
      title: '',
      type: 'prayer',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      location: '',
      theme: '',
      speakers: [],
      description: '',
      recurring: false,
      recurrencePattern: 'weekly'
    });
  };

  // Gestion des horaires
  const handleCreateSchedule = () => {
    const newSchedule: WorshipSchedule = {
      id: worshipSchedules.length > 0 ? Math.max(...worshipSchedules.map(s => s.id)) + 1 : 1,
      ...scheduleForm
    };
    setWorshipSchedules([...worshipSchedules, newSchedule]);
    setShowScheduleForm(false);
    resetScheduleForm();
  };

  const handleUpdateSchedule = () => {
    if (!editingSchedule) return;
    
    setWorshipSchedules(worshipSchedules.map(schedule => 
      schedule.id === editingSchedule.id 
        ? { ...editingSchedule }
        : schedule
    ));
    setEditingSchedule(null);
    setShowScheduleForm(false);
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet horaire ?')) {
      setWorshipSchedules(worshipSchedules.filter(schedule => schedule.id !== id));
    }
  };

  const handleEditSchedule = (schedule: WorshipSchedule) => {
    setEditingSchedule(schedule);
    setScheduleForm({
      day: schedule.day,
      time: schedule.time,
      service: schedule.service,
      description: schedule.description,
      duration: schedule.duration
    });
    setShowScheduleForm(true);
  };

  const resetScheduleForm = () => {
    setScheduleForm({
      day: 'Dimanche',
      time: '09:00',
      service: '',
      description: '',
      duration: '1h'
    });
  };

  // Fonctions utilitaires
  const getEventTypeInfo = (type: EventType) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const addSpeaker = () => {
    setEventForm({
      ...eventForm,
      speakers: [...eventForm.speakers, '']
    });
  };

  const updateSpeaker = (index: number, value: string) => {
    const newSpeakers = [...eventForm.speakers];
    newSpeakers[index] = value;
    setEventForm({
      ...eventForm,
      speakers: newSpeakers
    });
  };

  const removeSpeaker = (index: number) => {
    const newSpeakers = eventForm.speakers.filter((_, i) => i !== index);
    setEventForm({
      ...eventForm,
      speakers: newSpeakers
    });
  };

  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Événements & Programmation</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gérez les événements et les horaires des cultes de votre église
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowEventForm(true);
              setEditingEvent(null);
              resetEventForm();
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus className="text-lg" />
            <span>Nouvel Événement</span>
          </motion.button>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiCalendar className="text-lg" />
              <span>Événements</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FiClock className="text-lg" />
              <span>Horaires des Cultes</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'events' ? (
            <div className="space-y-6">
              {/* Statistiques et filtres */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                      <FiCalendar className="text-xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Événements ce mois</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {events.filter(e => new Date(e.date).getMonth() === selectedMonth).length}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                      <FiBell className="text-xl text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">À venir (7 jours)</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {upcomingEvents.length}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                      <FiRepeat className="text-xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Événements récurrents</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {events.filter(e => e.recurring).length}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                      <FiUsers className="text-xl text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Types d'événements</p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                        {new Set(events.map(e => e.type)).size}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Filtres et recherche */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un événement..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                  >
                    {months.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                  >
                    {[2024, 2025, 2026].map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Événements à venir */}
              {upcomingEvents.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Événements à venir (7 prochains jours)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {upcomingEvents.slice(0, 3).map(event => {
                      const typeInfo = getEventTypeInfo(event.type);
                      const Icon = typeInfo.icon;
                      
                      return (
                        <motion.div
                          key={event.id}
                          whileHover={{ y: -2 }}
                          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`p-2 rounded-lg ${typeInfo.color} bg-opacity-10`}>
                                <Icon className={`text-lg ${typeInfo.color}`} />
                              </div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                {typeInfo.label}
                              </span>
                            </div>
                            {event.recurring && (
                              <FiRepeat className="text-gray-400" />
                            )}
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {event.title}
                          </h4>
                          
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-gray-400" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiClock className="text-gray-400" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiMapPin className="text-gray-400" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          </div>
                          
                          {event.theme && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Thème:</p>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.theme}</p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Liste des événements */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tous les Événements ({filteredEvents.length})
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Événement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date & Heure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Lieu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Orateurs
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredEvents.map(event => {
                        const typeInfo = getEventTypeInfo(event.type);
                        const Icon = typeInfo.icon;
                        
                        return (
                          <motion.tr 
                            key={event.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`p-2 rounded-lg ${typeInfo.color} bg-opacity-10`}>
                                  <Icon className={`text-lg ${typeInfo.color}`} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {event.title}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {event.theme}
                                  </div>
                                  {event.recurring && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <FiRepeat className="text-xs text-gray-400" />
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {event.recurrencePattern === 'weekly' && 'Chaque semaine'}
                                        {event.recurrencePattern === 'monthly' && 'Chaque mois'}
                                        {event.recurrencePattern === 'yearly' && 'Chaque année'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {formatDate(event.date)}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.time}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {event.location}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {event.speakers.slice(0, 2).join(', ')}
                                {event.speakers.length > 2 && ` +${event.speakers.length - 2}`}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEditEvent(event)}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                >
                                  <FiEdit className="text-lg" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                >
                                  <FiTrash2 className="text-lg" />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun événement</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Commencez par créer votre premier événement.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* En-tête horaires */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Horaires Réguliers des Cultes</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gérez les horaires habituels des activités de l'église
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowScheduleForm(true);
                    setEditingSchedule(null);
                    resetScheduleForm();
                  }}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiPlus className="text-lg" />
                  <span>Nouvel Horaire</span>
                </motion.button>
              </div>

              {/* Grille des horaires par jour */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {daysOfWeek.map(day => {
                  const daySchedules = worshipSchedules.filter(schedule => schedule.day === day);
                  
                  return (
                    <motion.div
                      key={day}
                      whileHover={{ y: -2 }}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{day}</h4>
                      
                      {daySchedules.length > 0 ? (
                        <div className="space-y-4">
                          {daySchedules.map(schedule => (
                            <div key={schedule.id} className="border-l-4 border-blue-500 pl-4 py-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900 dark:text-white">
                                    {schedule.service}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {schedule.time} • {schedule.duration}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {schedule.description}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEditSchedule(schedule)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                  >
                                    <FiEdit className="text-sm" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDeleteSchedule(schedule.id)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                  >
                                    <FiTrash2 className="text-sm" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <FiClock className="mx-auto h-8 w-8 mb-2" />
                          <p className="text-sm">Aucun culte programmé</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de formulaire d'événement */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingEvent ? 'Modifier l\'événement' : 'Nouvel Événement'}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type d'événement *
                  </label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({...eventForm, type: e.target.value as EventType})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titre de l'événement *
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Réunion de prières du mercredi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Heure *
                  </label>
                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lieu/Adresse *
                </label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Sanctuaire principal, Salle de conférence..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Thème *
                </label>
                <input
                  type="text"
                  value={eventForm.theme}
                  onChange={(e) => setEventForm({...eventForm, theme: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: La puissance de la prière collective"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Orateurs/Intervenants
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addSpeaker}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    + Ajouter un orateur
                  </motion.button>
                </div>
                
                <div className="space-y-2">
                  {eventForm.speakers.map((speaker, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={speaker}
                        onChange={(e) => updateSpeaker(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Nom de l'orateur"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        className="px-3 py-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <FiX />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (optionnelle)
                </label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Description détaillée de l'événement..."
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={eventForm.recurring}
                    onChange={(e) => setEventForm({...eventForm, recurring: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Événement récurrent
                  </label>
                </div>

                {eventForm.recurring && (
                  <select
                    value={eventForm.recurrencePattern}
                    onChange={(e) => setEventForm({...eventForm, recurrencePattern: e.target.value as any})}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="weekly">Chaque semaine</option>
                    <option value="monthly">Chaque mois</option>
                    <option value="yearly">Chaque année</option>
                  </select>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowEventForm(false);
                  setEditingEvent(null);
                  resetEventForm();
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                disabled={!eventForm.title || !eventForm.location || !eventForm.theme}
              >
                <FiSave className="text-lg" />
                <span>{editingEvent ? 'Mettre à jour' : 'Créer l\'événement'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de formulaire d'horaire */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingSchedule ? 'Modifier l\'horaire' : 'Nouvel Horaire de Culte'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Jour de la semaine *
                </label>
                <select
                  value={scheduleForm.day}
                  onChange={(e) => setScheduleForm({...scheduleForm, day: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Heure *
                  </label>
                  <input
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Durée *
                  </label>
                  <select
                    value={scheduleForm.duration}
                    onChange={(e) => setScheduleForm({...scheduleForm, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="30min">30 minutes</option>
                    <option value="1h">1 heure</option>
                    <option value="1h30">1 heure 30</option>
                    <option value="2h">2 heures</option>
                    <option value="2h30">2 heures 30</option>
                    <option value="3h">3 heures</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type de culte/service *
                </label>
                <input
                  type="text"
                  value={scheduleForm.service}
                  onChange={(e) => setScheduleForm({...scheduleForm, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Culte du matin, École du dimanche..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm({...scheduleForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Description du culte..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowScheduleForm(false);
                  setEditingSchedule(null);
                  resetScheduleForm();
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={editingSchedule ? handleUpdateSchedule : handleCreateSchedule}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                disabled={!scheduleForm.service}
              >
                <FiSave className="text-lg" />
                <span>{editingSchedule ? 'Mettre à jour' : 'Créer l\'horaire'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}