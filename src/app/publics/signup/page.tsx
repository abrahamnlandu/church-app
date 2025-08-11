export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003366]/5 to-white dark:from-[#003366]/10 dark:to-[#0a0a0a]">
      <form className="w-full max-w-md mx-4 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-[#003366]/10 dark:border-[#ffcc66]/10">
        <div className="text-center mb-8">
          <div className="mx-auto flex justify-center mb-4">
            <div className="bg-[#003366]/10 dark:bg-[#ffcc66]/10 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#003366] dark:text-[#ffcc66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#003366] dark:text-[#ffcc66]">Créer votre église</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Commencez votre parcours numérique</p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="church-name" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
              Nom de l'église
            </label>
            <input
              id="church-name"
              type="text"
              placeholder="Ex: Église Saint-Pierre"
              className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
              Email administrateur
            </label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#003366] to-[#003366]/90 hover:from-[#003366]/90 hover:to-[#003366] text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium mt-4"
          >
            Créer mon église
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Déjà un compte?{' '}
            <a href="/publics/login" className="text-[#003366] dark:text-[#ffcc66] font-medium hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}