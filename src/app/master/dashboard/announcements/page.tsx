// app/master/dashboard/announcements/page.tsx
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

/* ===================== Types ===================== */
type ChurchProfile = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  colors?: { primary: string; secondary: string };
  location?: string;
};

type AnnouncementItem = {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  createdAt: string; // ISO
  startAt?: string;  // ISO
  endAt?: string;    // ISO
  published: boolean;
  pinned?: boolean;
  audience?: 'all' | 'youth' | 'choir' | 'workers';
  category?: 'collecte' | 'programme' | 'info' | 'autre';
};

/* ===================== Animations ===================== */
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};
const containerStagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };

/* ===================== Helpers ===================== */
const getAcronym = (name?: string) =>
  (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 3);

const fmtDateLong = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

function computeStatus(a: AnnouncementItem, now = new Date()): 'active' | 'scheduled' | 'expired' | 'draft' {
  if (!a.published) return 'draft';
  const start = a.startAt ? new Date(a.startAt) : null;
  const end = a.endAt ? new Date(a.endAt) : null;
  if (start && now < start) return 'scheduled';
  if (end && now > end) return 'expired';
  return 'active';
}

/* ===================== Page ===================== */
export default function AnnouncementsPage() {
  // Charte CMB
  const [church] = useState<ChurchProfile>({
    id: 'cmb',
    name: 'Centre Missionnaire de Binza (CMB)',
    slug: 'centre-missionnaire-de-binza',
    logoUrl: '',
    colors: { primary: '#003366', secondary: '#FFCC66' },
    location: 'Binza, Kinshasa — RDC',
  });

  // Données simulées (remplace plus tard par fetch API)
  const [items, setItems] = useState<AnnouncementItem[]>([
    {
      id: 'a1',
      title: 'Collecte spéciale Construction',
      excerpt: 'Soutien pour la construction du temple.',
      content: 'Nous lançons une collecte spéciale pour accélérer la construction du temple principal...',
      createdAt: '2025-08-02T10:00:00Z',
      startAt: '2025-08-05T08:00:00Z',
      endAt: '2025-08-31T20:00:00Z',
      published: true,
      pinned: true,
      category: 'collecte',
      audience: 'all',
    },
    {
      id: 'a2',
      title: 'Programme de la Convention de Décembre',
      excerpt: 'Dates, orateurs et thèmes.',
      content: 'La convention aura lieu du 12 au 18 décembre 2025...',
      createdAt: '2025-08-01T14:15:00Z',
      startAt: '2025-12-01T08:00:00Z',
      endAt: '2025-12-20T23:00:00Z',
      published: true,
      pinned: false,
      category: 'programme',
      audience: 'all',
    },
    {
      id: 'a3',
      title: 'Réunion des travailleurs',
      excerpt: 'Briefing avant la veillée.',
      content: 'Tous les frères et sœurs impliqués dans le service sont attendus samedi 17h...',
      createdAt: '2025-08-10T09:20:00Z',
      startAt: '2025-08-16T16:00:00Z',
      published: false,
      pinned: false,
      category: 'info',
      audience: 'workers',
    },
    {
      id: 'a4',
      title: 'Retraite spirituelle des jeunes',
      excerpt: 'Inscriptions ouvertes pour la retraite annuelle.',
      content: 'La retraite spirituelle des jeunes aura lieu du 25 au 27 septembre...',
      createdAt: '2025-08-03T11:30:00Z',
      startAt: '2025-09-25T08:00:00Z',
      endAt: '2025-09-27T18:00:00Z',
      published: true,
      pinned: true,
      category: 'programme',
      audience: 'youth',
    },
    {
      id: 'a5',
      title: 'Collecte pour les nécessiteux',
      excerpt: 'Soutien aux familles dans le besoin.',
      content: 'Une collecte spéciale est organisée pour aider les familles démunies...',
      createdAt: '2025-08-05T15:45:00Z',
      startAt: '2025-08-10T00:00:00Z',
      endAt: '2025-08-25T23:59:00Z',
      published: true,
      pinned: false,
      category: 'collecte',
      audience: 'all',
    },
    {
      id: 'a6',
      title: 'Répétition chorale exceptionnelle',
      excerpt: 'Préparation pour le concert de Noël.',
      content: 'Une répétition supplémentaire est prévue ce dimanche après le culte...',
      createdAt: '2025-08-08T13:20:00Z',
      startAt: '2025-08-15T14:00:00Z',
      published: true,
      pinned: false,
      category: 'info',
      audience: 'choir',
    },
    {
      id: 'a7',
      title: 'Formation des nouveaux convertis',
      excerpt: 'Session de formation biblique.',
      content: 'Les nouveaux membres sont invités à une session de formation...',
      createdAt: '2025-08-04T09:10:00Z',
      startAt: '2025-08-21T10:00:00Z',
      endAt: '2025-08-21T12:00:00Z',
      published: true,
      pinned: false,
      category: 'programme',
      audience: 'all',
    },
    {
      id: 'a8',
      title: 'Nettoyage du temple',
      excerpt: 'Journée de nettoyage communautaire.',
      content: 'Tous les membres sont invités à participer au nettoyage du temple...',
      createdAt: '2025-08-06T16:30:00Z',
      startAt: '2025-08-14T08:00:00Z',
      published: false,
      pinned: false,
      category: 'info',
      audience: 'all',
    },
    {
      id: 'a9',
      title: 'Concert de louange',
      excerpt: 'Soirée spéciale de louange et adoration.',
      content: 'Venez participer à une soirée de louange exceptionnelle...',
      createdAt: '2025-08-07T14:00:00Z',
      startAt: '2025-09-05T19:00:00Z',
      endAt: '2025-09-05T22:00:00Z',
      published: true,
      pinned: true,
      category: 'programme',
      audience: 'all',
    },
    {
      id: 'a10',
      title: 'Réunion des diacres',
      excerpt: 'Planification des activités du trimestre.',
      content: 'Les diacres sont convoqués pour une réunion importante...',
      createdAt: '2025-08-09T10:15:00Z',
      startAt: '2025-08-17T15:00:00Z',
      published: true,
      pinned: false,
      category: 'info',
      audience: 'workers',
    },
    {
      id: 'a11',
      title: 'Campagne d\'évangélisation',
      excerpt: 'Préparation pour la campagne de septembre.',
      content: 'Inscrivez-vous pour participer à la campagne d\'évangélisation...',
      createdAt: '2025-08-11T11:00:00Z',
      startAt: '2025-09-01T08:00:00Z',
      endAt: '2025-09-30T20:00:00Z',
      published: true,
      pinned: true,
      category: 'programme',
      audience: 'all',
    },
    {
      id: 'a12',
      title: 'Atelier de formation biblique',
      excerpt: 'Étude approfondie du livre des Romains.',
      content: 'Un atelier d\'étude biblique sera organisé chaque jeudi...',
      createdAt: '2025-08-12T17:00:00Z',
      startAt: '2025-09-02T18:00:00Z',
      endAt: '2025-12-16T20:00:00Z',
      published: true,
      pinned: false,
      category: 'programme',
      audience: 'all',
    },
  ]);

  // UI state
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'scheduled' | 'expired' | 'draft'>('all');
  const [category, setCategory] = useState<'all' | 'collecte' | 'programme' | 'info' | 'autre'>('all');
  const [sortBy, setSortBy] = useState<'created_desc' | 'created_asc' | 'start_desc' | 'start_asc'>('created_desc');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Modale
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState<Omit<AnnouncementItem, 'id'>>({
    title: '',
    excerpt: '',
    content: '',
    createdAt: new Date().toISOString(),
    startAt: '',
    endAt: '',
    published: true,
    pinned: false,
    category: 'autre',
    audience: 'all',
  });

  // Filtres + tri
  const filtered = useMemo(() => {
    const now = new Date();
    const ql = q.trim().toLowerCase();
    let list = items.filter((a) => {
      const s = computeStatus(a, now);
      const okStatus = status === 'all' ? true : s === status;
      const okCat = category === 'all' ? true : a.category === category;
      const okQ =
        !ql ||
        a.title.toLowerCase().includes(ql) ||
        (a.excerpt || '').toLowerCase().includes(ql) ||
        (a.content || '').toLowerCase().includes(ql);
      return okStatus && okCat && okQ;
    });

    list = list.sort((a, b) => {
      if (sortBy === 'created_desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'created_asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'start_desc') return new Date(b.startAt || b.createdAt).getTime() - new Date(a.startAt || a.createdAt).getTime();
      return new Date(a.startAt || a.createdAt).getTime() - new Date(b.startAt || b.createdAt).getTime();
    });

    // Les épinglées d’abord
    list = list.sort((a, b) => Number(b.pinned) - Number(a.pinned));

    return list;
  }, [items, q, status, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Accents
  const primary = church.colors?.primary || '#003366';
  const secondary = church.colors?.secondary || '#FFCC66';

  // Actions
  function togglePin(id: string) {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a)));
  }
  function togglePublish(id: string) {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, published: !a.published } : a)));
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((a) => a.id !== id));
  }
  function addAnnouncement() {
    if (!form.title.trim()) return;
    const newItem: AnnouncementItem = {
      id: `a${items.length + 1}`,
      ...form,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    setOpenModal(false);
    setForm({
      title: '',
      excerpt: '',
      content: '',
      createdAt: new Date().toISOString(),
      startAt: '',
      endAt: '',
      published: true,
      pinned: false,
      category: 'autre',
      audience: 'all',
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header sticky */}
      <div className="sticky top-0 z-40 border-b bg-white dark:bg-neutral-900 dark:border-neutral-800/90 shadow-sm/50 backdrop-blur supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-neutral-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-neutral-700 dark:to-neutral-700 flex items-center justify-center overflow-hidden shadow-inner"
              style={{ outline: `3px solid ${secondary}` }}
            >
              {church.logoUrl ? (
                <img src={church.logoUrl} alt={church.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold" style={{ color: primary }}>
                  {getAcronym(church.name)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">Annonces — {church.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{church.location}</p>
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
              onClick={() => setOpenModal(true)}
              className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: primary, boxShadow: `0 4px 14px -2px ${primary}80` }}
            >
              + Nouvelle annonce
            </button>
          </div>
        </div>
      </div>

      {/* Barre d’outils */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-2xl p-4 bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                        dark:bg-neutral-900 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
            <div className="flex-1 flex flex-wrap gap-3">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Rechercher une annonce…"
                className="w-full md:w-80 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800
                           px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:outline-none focus:ring-2 focus:ring-offset-0"
                style={{ outlineColor: primary }}
              />
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value as any); setPage(1); }}
                className="rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800
                           px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actives</option>
                <option value="scheduled">Planifiées</option>
                <option value="expired">Expirées</option>
                <option value="draft">Brouillons</option>
              </select>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value as any); setPage(1); }}
                className="rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800
                           px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="all">Toutes catégories</option>
                <option value="collecte">Collecte</option>
                <option value="programme">Programme</option>
                <option value="info">Information</option>
                <option value="autre">Autre</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800
                           px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="created_desc">Création (récent → ancien)</option>
                <option value="created_asc">Création (ancien → récent)</option>
                <option value="start_desc">Début (récent → ancien)</option>
                <option value="start_asc">Début (ancien → récent)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenModal(true)}
                className="px-3 py-2 rounded-lg text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
                style={{ backgroundColor: primary }}
              >
                + Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-6">
        {pageItems.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-700
                          bg-white/50 dark:bg-neutral-900/50">
            <p className="text-gray-700 dark:text-gray-300">Aucune annonce trouvée.</p>
            <button
              onClick={() => setOpenModal(true)}
              className="mt-4 px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: primary }}
            >
              Créer une annonce
            </button>
          </div>
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={containerStagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
          >
            {pageItems.map((a, i) => {
              const s = computeStatus(a);
              const badge =
                s === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  : s === 'scheduled'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : s === 'expired'
                  ? 'bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-gray-300'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';

              return (
                <motion.li
                  key={a.id}
                  variants={fadeIn}
                  custom={i}
                  className="rounded-2xl p-5 bg-white border border-gray-200 hover:shadow-md transition-all
                             dark:bg-neutral-900 dark:border-neutral-800 relative"
                >
                  {a.pinned && (
                    <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: primary }}>
                      📌 Épinglée
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                      <span className="text-blue-600 dark:text-blue-300">📢</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{a.title}</h3>
                      {a.excerpt && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{a.excerpt}</p>}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${badge}`}>
                          {s === 'active' ? 'Active' : s === 'scheduled' ? 'Planifiée' : s === 'expired' ? 'Expirée' : 'Brouillon'}
                        </span>
                        {a.category && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700">
                            #{a.category}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Créée {fmtDateLong(a.createdAt)}
                        {a.startAt && <> • Début {fmtDateLong(a.startAt)}</>}
                        {a.endAt && <> • Fin {fmtDateLong(a.endAt)}</>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/master/dashboard`} // remplace par un détail si tu crées la page de détail d’annonce
                      className="text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                      style={{ color: primary }}
                    >
                      Ouvrir
                    </Link>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePin(a.id)}
                        className="text-xs px-2 py-1 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                        title={a.pinned ? 'Désépingler' : 'Épingler'}
                      >
                        {a.pinned ? 'Retirer 📌' : 'Épingler 📌'}
                      </button>
                      <button
                        onClick={() => togglePublish(a.id)}
                        className="text-xs px-2 py-1 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                      >
                        {a.published ? 'Dépublier' : 'Publier'}
                      </button>
                      <button
                        className="text-xs px-2 py-1 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                        title="Éditer (bientôt)"
                      >
                        Éditer
                      </button>
                      <button
                        onClick={() => remove(a.id)}
                        className="text-xs px-2 py-1 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}

        {/* Pagination */}
        {filtered.length > pageSize && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
            >
              Précédent
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
            >
              Suivant
            </button>
          </div>
        )}
      </div>

      {/* Modale de création */}
      {openModal && (
        <CreateAnnouncementModal
          onClose={() => setOpenModal(false)}
          form={form}
          setForm={setForm}
          onCreate={addAnnouncement}
          primary={primary}
        />
      )}
    </main>
  );
}

/* ===================== Modale ===================== */
function CreateAnnouncementModal({
  onClose,
  form,
  setForm,
  onCreate,
  primary,
}: {
  onClose: () => void;
  form: Omit<AnnouncementItem, 'id'>;
  setForm: React.Dispatch<React.SetStateAction<Omit<AnnouncementItem, 'id'>>>;
  onCreate: () => void;
  primary: string;
}) {
  const canSubmit = form.title.trim().length > 2;

  return (
    <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-xl">
        <div className="p-5 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nouvelle annonce</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Titre</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Résumé (court)</label>
            <input
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Contenu</label>
            <textarea
              rows={5}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Début (optionnel)</label>
            <input
              type="datetime-local"
              value={form.startAt ? form.startAt.slice(0, 16) : ''}
              onChange={(e) => setForm((f) => ({ ...f, startAt: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Fin (optionnel)</label>
            <input
              type="datetime-local"
              value={form.endAt ? form.endAt.slice(0, 16) : ''}
              onChange={(e) => setForm((f) => ({ ...f, endAt: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as any }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="collecte">Collecte</option>
              <option value="programme">Programme</option>
              <option value="info">Information</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Audience</label>
            <select
              value={form.audience}
              onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value as any }))}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="all">Toute l’église</option>
              <option value="youth">Jeunesse</option>
              <option value="choir">Chorale</option>
              <option value="workers">Serviteurs</option>
            </select>
          </div>

          <div className="flex items-center gap-4 md:col-span-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
              />
              Publier immédiatement
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={(e) => setForm((f) => ({ ...f, pinned: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-neutral-800 dark:border-neutral-700"
              />
              Épingler en haut
            </label>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 dark:border-neutral-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
          >
            Annuler
          </button>
          <button
            disabled={!canSubmit}
            onClick={onCreate}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-60"
            style={{ backgroundColor: primary }}
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}
