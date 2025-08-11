export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#003366]/10 to-[#003366]/5">
      <div className="max-w-4xl mx-auto text-center px-4 py-32 sm:py-40">
        <div className="mb-8 flex justify-center">
          <div className="bg-[#003366]/10 p-4 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          <span className="text-[#003366] dark:text-[#ffcc66]">Church</span> App
        </h1>
        
        <p className="text-xl md:text-2xl text-[#003366]/80 dark:text-[#ffcc66]/90 max-w-2xl mx-auto leading-relaxed">
          La plateforme numérique complète pour connecter et gérer votre communauté paroissiale
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/publics/signup" 
            className="bg-[#003366] hover:bg-[#003366]/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:-translate-y-0.5"
          >
            Créer une église
          </a>
          <a 
            href="/publics/login" 
            className="bg-[#ffcc66] hover:bg-[#ffcc66]/90 text-[#003366] px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium border border-[#ffcc66] hover:-translate-y-0.5"
          >
            Se connecter
          </a>
        </div>
        
        <div className="mt-16 pt-8 border-t border-[#003366]/20 dark:border-[#ffcc66]/20">
          <p className="text-[#003366]/70 dark:text-[#ffcc66]/80">
            Rejoignez plus de <span className="font-bold text-[#003366] dark:text-[#ffcc66]">500 communautés</span> déjà connectées
          </p>
        </div>
      </div>
    </main>
  );
}