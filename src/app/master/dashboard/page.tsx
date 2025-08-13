// app/master/dashboard/page.tsx
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, Variants } from 'framer-motion';

// --- Types simulés
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
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
};

type SermonItem = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  mediaType: 'video' | 'audio' | 'text';
};

type Announcement = {
  id: string;
  title: string;
  createdAt: string;
  excerpt: string;
};

// --- Variants d'animation
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
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

// --- Helpers
const getAcronym = (name?: string) =>
  (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 3); // → “CMB”

// --- Page d'accueil du tableau de bord
export default function DashboardHomePage() {
  const [church] = useState<ChurchProfile>({
    id: 'cmb',
    name: 'Centre Missionnaire de Binza (CMB)',
    slug: 'centre-missionnaire-de-binza',
    logoUrl: '',
    colors: { primary: '#003366', secondary: '#FFCC66' },
    location: 'Binza, Kinshasa — RDC',
  });

    // Fonction de déconnexion
  const handleLogout = () => {
    // Ici vous ajouteriez la logique de déconnexion
    // Par exemple : suppression du token, redirection, etc.
    console.log('Déconnexion effectuée');
    // window.location.href = '/login'; // Redirection après déconnexion
  };

  

  const stats = useMemo(
    () => [
      { label: 'Membres', value: 348, icon: '👥', trend: 'up' as const },
      { label: 'Événements ce mois', value: 12, icon: '📅', trend: 'same' as const },
      { label: 'Sermons publiés', value: 5, icon: '📖', trend: 'up' as const },
      { label: 'Annonces actives', value: 3, icon: '📢', trend: 'down' as const },
    ],
    []
  );

  const upcomingEvents: EventItem[] = [
    { id: 'e1', title: 'Culte du mercredi', date: '2025-08-20T15:00:00Z', location: 'Annexe' },
    { id: 'e2', title: 'Culte du jeudi', date: '2025-08-21T15:00:00Z', location: 'Annexe' },
    { id: 'e3', title: 'Culte Dominical', date: '2025-08-24T07:30:00Z', location: 'Salle principale' },
  ];

  const recentSermons: SermonItem[] = [
    { id: 's1', title: "Votre vie est-elle digne de l'évangile?", speaker: 'Frère BRANHAM', date: '1963-06-30', mediaType: 'audio' },
    { id: 's2', title: 'Le temps est proche', speaker: 'Frère FRANK', date: '1974-01-01', mediaType: 'audio' },
    { id: 's3', title: 'La Loi et la Grâce', speaker: 'Frère NTUMBA', date: '2025-04-27', mediaType: 'text' },
  ];

  const announcements: Announcement[] = [
    {
      id: 'a1',
      title: "Collecte spéciale Construction",
      createdAt: '2025-08-02T10:00:00Z',
      excerpt: 'Nous organisons une collecte pour le projet de la construction du temple...',
    },
    {
      id: 'a2',
      title: 'Collecte spéciale Convention',
      createdAt: '2025-08-01T14:15:00Z',
      excerpt: 'Nous organisons une collecte pour la convention qui aura lieu en décembre 2025...',
    },
  ];

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header / AppBar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="border-b bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm"
      >
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
                  {getAcronym(church.name)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">{church.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{church.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`https://yambopeto.com/`}
              className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors shadow-sm flex items-center gap-2
                         border-gray-300 hover:bg-gray-50
                         dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Voir le site public"
              target="_blank"
            >
              <span>🌐</span> Site web
            </Link>
            <Link
              href={`/dashboard/${church.id}/settings`}
              className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: church.colors?.primary, boxShadow: `0 4px 14px -2px ${church.colors?.primary}80` }}
            >
              Personnaliser
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Contenu */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions rapides */}
        <motion.section
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <QuickAction
            title="Ajouter un sermon"
            href={`/master/dashboard/sermons`}
            badge="Nouveau"
            accent={church.colors?.primary}
            icon="📖"
          />
          <QuickAction
            title="Programmer un culte"
            href={`/master/dashboard/programmes`}
            accent={church.colors?.primary}
            icon="📅"
          />
          <QuickAction
            title="Publier une annonce"
            href={`/master/dashboard/announcements`}
            icon="📢"
          />
          <QuickAction title="Gérer la page" href={`/master/dashboard/settings`} targetBlank icon="⚙️" />
        </motion.section>

        {/* Statistiques */}
        <motion.section
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
        >
          {stats.map((s, index) => (
            <StatCard key={s.label} label={s.label} value={s.value} accent={church.colors?.primary} icon={s.icon} trend={s.trend} custom={index} />
          ))}
        </motion.section>

        {/* Grille principale */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne 1-2 */}
          <div className="lg:col-span-2 space-y-6">
            <Panel title="Prochains Services (Cultes)" accent={church.colors?.primary}>
              <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
                {upcomingEvents.map((ev) => (
                  <motion.li
                    key={ev.id}
                    className="py-4 px-1 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    whileHover={{ x: 5 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10% 0px' }}
                    variants={fadeIn}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-lg flex flex-col items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: church.colors?.primary }}
                      >
                        {new Date(ev.date).getDate()}
                        <span className="text-xs font-normal">{new Date(ev.date).toLocaleString('fr-FR', { month: 'short' })}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{ev.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="inline-block w-4">🕒</span> {fmt(ev.date)} · {ev.location}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/${church.id}/content/events/${ev.id}`}
                      className="text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Détails
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <Link
                  href={`/master/dashboard/programmes`}
                  className="text-sm font-medium inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
                  style={{ color: church.colors?.primary }}
                >
                  Voir tout <span>→</span>
                </Link>
              </div>
            </Panel>

            <Panel title="Sermons récents" accent={church.colors?.secondary}>
              <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
                {recentSermons.map((s) => (
                  <motion.li
                    key={s.id}
                    className="py-4 px-1 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    whileHover={{ x: 5 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10% 0px' }}
                    variants={fadeIn}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl ${
                          s.mediaType === 'video'
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300'
                            : s.mediaType === 'audio'
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}
                      >
                        {s.mediaType === 'video' ? '🎥' : s.mediaType === 'audio' ? '🎧' : '📄'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{s.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {s.speaker} · {new Date(s.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/${church.id}/content/sermons/${s.id}`}
                      className="text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Ouvrir
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <Link
                  href={`dashboard/sermons`}
                  className="text-sm font-medium inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
                  style={{ color: church.colors?.secondary }}
                >
                  Voir tout <span>→</span>
                </Link>
              </div>
            </Panel>
          </div>

          {/* Colonne 3 */}
          <div className="space-y-6">
            <Panel title="Annonces">
              <ul className="space-y-3">
                {announcements.map((a, i) => (
                  <motion.li
                    key={a.id}
                    whileHover={{ scale: 1.02 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10% 0px' }}
                    variants={fadeIn}
                    custom={i}
                    className="rounded-xl p-4 hover:shadow-sm transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                               border border-gray-200 bg-white
                               dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
                        <span className="text-blue-600 dark:text-blue-300">📢</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{a.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(a.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{a.excerpt}</p>
                        <div className="mt-3 text-right">
                          <Link
                            href={`/dashboard/${church.id}/content/announcements/${a.id}`}
                            className="text-sm font-medium inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            Lire la suite <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <Link
                  href={`dashboard/announcements`}
                  className="text-sm font-medium inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Voir tout <span>→</span>
                </Link>
              </div>
            </Panel>

            <Panel title="Aperçu du thème">
              <ThemePreview primary={church.colors?.primary} secondary={church.colors?.secondary} />
              <div className="mt-4 text-right">
                <Link
                  href={`/master/dashboard/settings`}
                  className="px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                  style={{ backgroundColor: church.colors?.primary, boxShadow: `0 4px 14px -2px ${church.colors?.primary}80` }}
                >
                  <span>🎨</span> Modifier le thème
                </Link>
              </div>
            </Panel>

            <Panel title="Verset du jour">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-5 rounded-xl
                           bg-gradient-to-br from-blue-50 to-blue-100
                           dark:from-neutral-800 dark:to-neutral-800"
              >
                <blockquote className="italic text-gray-800 dark:text-gray-100 text-lg leading-relaxed">
                  « Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance. »
                </blockquote>
                <p className="mt-3 text-right font-medium text-gray-700 dark:text-gray-300">— Jérémie 29:11</p>
              </motion.div>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">Mise à jour quotidienne à 6h</div>
            </Panel>
          </div>
        </section>
      </div>
    </main>
  );
}

// --- Composants UI ---
interface PanelProps {
  title: string;
  children: React.ReactNode;
  accent?: string;
}
function Panel({ title, children, accent }: PanelProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="rounded-2xl p-6 hover:shadow-md transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                 bg-white border border-gray-200
                 dark:bg-neutral-900 dark:border-neutral-800"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">{title}</h2>
        {accent && <div className="h-1 w-8 rounded-full" style={{ backgroundColor: accent }} />}
      </div>
      {children}
    </motion.div>
  );
}

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
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(100, Math.max(10, Number(value) / 5))}%`, backgroundColor: accent }}
          />
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

interface QuickActionProps {
  title: string;
  href: string;
  badge?: string;
  accent?: string;
  targetBlank?: boolean;
  icon?: string;
}
function QuickAction(props: QuickActionProps) {
  const { title, href, badge, accent, targetBlank, icon } = props;

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <Link
        href={href}
        target={targetBlank ? '_blank' : undefined}
        className="group relative flex flex-col justify-between rounded-xl border border-gray-200 dark:border-neutral-800
                   bg-white dark:bg-neutral-900 p-5 min-h-[150px] shadow-sm hover:shadow-md transition-all"
      >
        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: accent || '#2563eb' }}
          >
            {badge}
          </span>
        )}

        {/* Titre & sous-titre */}
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Gestion rapide</p>
        </div>

        {/* Icône & bulle décorative */}
        <div className="mt-4 relative">
          {icon && <span className="text-3xl relative z-10">{icon}</span>}
          <div
            className="absolute -bottom-3 -right-3 h-14 w-14 rounded-full opacity-10"
            style={{ backgroundColor: accent || '#2563eb' }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

interface ThemePreviewProps {
  primary?: string;
  secondary?: string;
}
function ThemePreview({ primary, secondary }: ThemePreviewProps) {
  return (
    <div
      className="rounded-xl border p-4
                 bg-gradient-to-br from-gray-50 to-white
                 dark:from-neutral-900 dark:to-neutral-950
                 border-gray-200 dark:border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-10 w-10 rounded-lg border border-gray-300 dark:border-neutral-700 shadow-inner flex items-center justify-center"
          style={{ backgroundColor: primary }}
        >
          <span className="text-xs text-white font-bold">P</span>
        </div>
        <div
          className="h-10 w-10 rounded-lg border border-gray-300 dark:border-neutral-700 shadow-inner flex items-center justify-center"
          style={{ backgroundColor: secondary }}
        >
          <span className="text-xs text-white font-bold">S</span>
        </div>
        <div className="h-10 w-10 rounded-lg border border-gray-300 dark:border-neutral-700 shadow-inner bg-white dark:bg-neutral-800 flex items-center justify-center">
          <span className="text-xs text-gray-700 dark:text-gray-300 font-bold">B</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full" style={{ backgroundColor: primary }} />
        <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: secondary }} />
        <div className="h-3 w-1/2 rounded-full bg-gray-300 dark:bg-neutral-700" />
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Primaire</span>
        <span>Secondaire</span>
        <span>Neutre</span>
      </div>
    </div>
  );
}
