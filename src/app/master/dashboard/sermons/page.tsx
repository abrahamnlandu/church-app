// app/master/dashboard/sermons/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

// --- Types
type SermonItem = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  mediaType: 'video' | 'audio' | 'text';
  views?: number;
  likes?: number;
  published: boolean;
};

type ChurchProfile = {
  id: string;
  name: string;
  slug: string;
  colors?: {
    primary: string;
    secondary: string;
  };
};

// --- Animations
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};
const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

// --- Page des sermons (LISTE)
export default function SermonsPage() {
  const [church] = useState<ChurchProfile>({
    id: 'cmb',
    name: 'Centre Missionnaire de Binza (CMB)',
    slug: 'centre-missionnaire-de-binza',
    colors: { primary: '#003366', secondary: '#FFCC66' },
  });

  const [sermons, setSermons] = useState<SermonItem[]>([
    { id: 's1', title: "Votre vie est-elle digne de l'évangile?", speaker: 'Frère BRANHAM', date: '1963-06-30', mediaType: 'audio', views: 1245, likes: 89, published: true },
    { id: 's2', title: 'Le temps est proche', speaker: 'Frère FRANK', date: '1974-01-01', mediaType: 'audio', views: 876, likes: 54, published: true },
    { id: 's3', title: 'La Loi et la Grâce', speaker: 'Frère NTUMBA', date: '2025-04-27', mediaType: 'text', views: 432, likes: 23, published: true },
    { id: 's4', title: 'La nouvelle naissance', speaker: 'Frère KABEYA', date: '2025-07-15', mediaType: 'video', views: 0, likes: 0, published: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSermon, setNewSermon] = useState<Partial<SermonItem>>({
    title: '',
    speaker: '',
    mediaType: 'audio',
    published: true,
  });

  const handlePublishToggle = (id: string) => {
    setSermons((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !s.published } : s))
    );
  };

  const handleAddSermon = () => {
    if (!newSermon.title || !newSermon.speaker) return;
    const sermon: SermonItem = {
      id: `s${sermons.length + 1}`,
      title: newSermon.title || '',
      speaker: newSermon.speaker || '',
      date: new Date().toISOString().split('T')[0],
      mediaType: newSermon.mediaType || 'audio',
      views: 0,
      likes: 0,
      published: newSermon.published ?? false,
    };
    setSermons([sermon, ...sermons]);
    setNewSermon({ title: '', speaker: '', mediaType: 'audio', published: true });
    setIsModalOpen(false);
  };

  const fmtDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const primary = church.colors?.primary;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Entête STICKY */}
      <div className="sticky top-0 z-40 border-b bg-white dark:bg-neutral-900 dark:border-neutral-800/90 shadow-sm/50 backdrop-blur supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-neutral-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-700 flex items-center justify-center overflow-hidden shadow-inner"
              style={{ outline: `3px solid ${church.colors?.secondary}` }}
            >
              <span className="text-sm font-bold" style={{ color: primary }}>
                CMB
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">{church.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Binza, Kinshasa — RDC</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/master/dashboard`}
              className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors shadow-sm flex items-center gap-2
                         border-gray-300 hover:bg-gray-50
                         dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              ← Tableau de bord
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: primary, boxShadow: `0 4px 14px -2px ${primary}80` }}
            >
              + Nouveau Sermon
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerStagger}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <motion.div variants={fadeIn}>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gestion des Sermons</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Publiez, gérez et suivez les performances de vos sermons
            </p>
          </motion.div>

          <motion.button
            variants={fadeIn}
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            style={{ backgroundColor: primary, boxShadow: `0 4px 14px -2px ${primary}80` }}
          >
            <span>➕</span> Nouveau Sermon
          </motion.button>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        >
          <StatCard label="Sermons publiés" value={sermons.filter(s => s.published).length} accent={primary} icon="📖" trend="up" />
          <StatCard label="Brouillons" value={sermons.filter(s => !s.published).length} accent={primary} icon="📝" trend="same" />
          <StatCard label="Vues totales" value={sermons.reduce((acc, s) => acc + (s.views || 0), 0)} accent={primary} icon="👁️" trend="up" />
          <StatCard
            label="Moyenne de vues"
            value={Math.round(sermons.reduce((acc, s) => acc + (s.views || 0), 0) / Math.max(1, sermons.filter(s => s.published).length))}
            accent={primary}
            icon="📊"
            trend="down"
          />
        </motion.div>

        {/* Tableau des sermons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
              <thead className="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prédicateur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-800">
                {sermons.map((sermon, index) => (
                  <motion.tr key={sermon.id} variants={fadeIn} custom={index * 0.05} className={sermon.published ? '' : 'bg-gray-50 dark:bg-neutral-800/50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg">
                          {sermon.mediaType === 'video' ? (
                            <span className="text-red-500 text-xl">🎥</span>
                          ) : sermon.mediaType === 'audio' ? (
                            <span className="text-blue-500 text-xl">🎧</span>
                          ) : (
                            <span className="text-purple-500 text-xl">📄</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{sermon.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-300">{sermon.speaker}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{fmtDate(sermon.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sermon.mediaType === 'video'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : sermon.mediaType === 'audio'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}
                      >
                        {sermon.mediaType === 'video' ? 'Vidéo' : sermon.mediaType === 'audio' ? 'Audio' : 'Texte'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div className="text-sm text-gray-900 dark:text-gray-300 flex items-center gap-1">
                          <span>👁️</span> {sermon.views}
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-300 flex items-center gap-1">
                          <span>👍</span> {sermon.likes}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sermon.published
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}
                      >
                        {sermon.published ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handlePublishToggle(sermon.id)}
                          className={`px-3 py-1 rounded-md text-xs ${
                            sermon.published
                              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
                          }`}
                        >
                          {sermon.published ? 'Dépublier' : 'Publier'}
                        </button>
                        <Link
                          href={`/master/dashboard/sermons/${sermon.id}`}
                          className="px-3 py-1 rounded-md text-xs bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                        >
                          Ouvrir
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination (statique démo) */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Affichage <span className="font-medium">1</span> à <span className="font-medium">{sermons.length}</span> sur{' '}
            <span className="font-medium">{sermons.length}</span> sermons
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm bg-white text-gray-700 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-800">
              Précédent
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-sm bg-white text-gray-700 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-800">
              Suivant
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal d'ajout de sermon */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Nouveau Sermon</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre du sermon</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-gray-100"
                    value={newSermon.title}
                    onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prédicateur</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-gray-100"
                    value={newSermon.speaker}
                    onChange={(e) => setNewSermon({ ...newSermon, speaker: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de média</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['audio', 'video', 'text'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`px-3 py-2 rounded-md border text-sm ${
                          newSermon.mediaType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-700'
                        }`}
                        onClick={() => setNewSermon({ ...newSermon, mediaType: type as any })}
                      >
                        {type === 'audio' ? '🎧 Audio' : type === 'video' ? '🎥 Vidéo' : '📄 Texte'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="published"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
                    checked={newSermon.published ?? false}
                    onChange={(e) => setNewSermon({ ...newSermon, published: e.target.checked })}
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Publier immédiatement
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-800 px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-700"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm"
                style={{ backgroundColor: primary }}
                onClick={handleAddSermon}
              >
                Enregistrer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}

// --- Composant StatCard ---
interface StatCardProps {
  label: string;
  value: number | string;
  accent?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'same';
  custom?: number;
}

function StatCard({ label, value, accent, icon, trend, custom }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
    down: 'text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
    same: 'text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
  } as const;

  return (
    <motion.div
      custom={custom}
      variants={fadeIn}
      className="rounded-2xl p-5 hover:shadow-md transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                 bg-white border border-gray-200
                 dark:bg-neutral-900 dark:border-neutral-800"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        {icon && <span className="text-2xl p-2 rounded-lg bg-gray-100 dark:bg-neutral-800">{icon}</span>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-1.5 rounded-full bg-gray-200 dark:bg-neutral-800 flex-1 mr-2">
          <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(10, Number(value) / 5))}%`, backgroundColor: accent }} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendColors[trend]}`}>
            {trend === 'up' ? '↑ +12%' : trend === 'down' ? '↓ -5%' : '→ Stable'}
          </span>
        )}
      </div>
    </motion.div>
  );
}