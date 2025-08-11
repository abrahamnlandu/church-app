import Link from "next/link";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003366]/5 to-white dark:from-[#003366]/10 dark:to-[#0a0a0a]">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-10">
          <div className="mx-auto flex justify-center mb-4">
            <div className="bg-[#ffcc66]/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#003366] dark:text-[#ffcc66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#003366] dark:text-[#ffcc66]">Content de vous revoir</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Connectez-vous à votre espace d'administration</p>
        </div>

        <form className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-[#003366]/10 dark:border-[#ffcc66]/10">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                Email
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#003366] focus:ring-[#003366] border-[#003366]/30 rounded dark:bg-gray-800 dark:border-[#ffcc66]/30 dark:focus:ring-[#ffcc66]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#003366] dark:text-[#ffcc66]/80">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="/publics/forgot-password" className="font-medium text-[#003366] hover:text-[#003366]/80 dark:text-[#ffcc66] dark:hover:text-[#ffcc66]/80">
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <Link
            href="/master/dashboard"
            className="block w-full text-center bg-gradient-to-r from-[#ffcc66] to-[#ffcc66]/90 
                        hover:from-[#ffcc66]/90 hover:to-[#ffcc66] 
                        text-[#003366] py-3 rounded-lg shadow-md hover:shadow-lg 
                        transition-all duration-300 font-medium mt-4"
            >
            Se connecter
            </Link>

          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pas encore de compte?{' '}
            <a href="/publics/signup" className="text-[#003366] dark:text-[#ffcc66] font-medium hover:underline">
              Créer une église
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}