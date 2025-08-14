'use client';

import { useState } from 'react';
import { FiPlus, FiTrash2, FiChevronRight, FiChevronLeft, FiUpload, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Culte = {
  day: string;
  start: string;
  end: string;
};

type Langue = {
  nom: string;
  selected: boolean;
};

export default function ChurchSignupPage() {
  const [step, setStep] = useState(1);
  const [cultes, setCultes] = useState<Culte[]>([{ day: '', start: '', end: '' }]);
  const [colors, setColors] = useState({
    primary: '#003366',
    secondary: '#ffcc66',
    neutral: '#f5f5f5'
  });
  const [nombreLangues, setNombreLangues] = useState(1);
  const [langues, setLangues] = useState<Langue[]>([
    { nom: 'Français', selected: true },
    { nom: 'Anglais', selected: false },
    { nom: 'Lingala', selected: false },
    { nom: 'Swahili', selected: false },
    { nom: 'Tshiluba', selected: false },
    { nom: 'Kikongo', selected: false },
    { nom: 'Espagnol', selected: false },
    { nom: 'Portugais', selected: false },
    { nom: 'Autres', selected: false }
  ]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const addCulte = () => {
    setCultes([...cultes, { day: '', start: '', end: '' }]);
  };

  const removeCulte = (index: number) => {
    const newDays = [...cultes];
    newDays.splice(index, 1);
    setCultes(newDays);
  };

  const handleCulteChange = (index: number, field: keyof Culte, value: string) => {
    const newDays = [...cultes];
    newDays[index][field] = value;
    setCultes(newDays);
  };

  const handleColorChange = (colorType: string, value: string) => {
    setColors({ ...colors, [colorType]: value });
  };

  const handleLangueChange = (index: number) => {
    const newLangues = [...langues];
    newLangues[index].selected = !newLangues[index].selected;
    
    const count = newLangues.filter(l => l.selected).length;
    
    if (count > nombreLangues) {
      newLangues[index].selected = false;
    } else {
      setLangues(newLangues);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Progress Bar */}
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
          <div className="flex justify-between items-center mb-2 text-sm font-medium">
            <span className={`${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              Informations
            </span>
            <span className={`${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              Description
            </span>
            <span className={`${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              Horaires
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Informations de base</h2>
                <p className="text-gray-600 dark:text-gray-300">Remplissez les informations essentielles de votre église</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de l'église *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Église Saint-Pierre"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Abréviation
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: ESP"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Charte graphique</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Couleur principale
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Couleur secondaire
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Couleur neutre
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={colors.neutral}
                        onChange={(e) => handleColorChange('neutral', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.neutral}
                        onChange={(e) => handleColorChange('neutral', e.target.value)}
                        className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo de l'église
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 dark:text-gray-300">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                        <span>Téléverser un fichier</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF jusqu'à 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  Suivant <FiChevronRight className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Description de l'église</h2>
                <p className="text-gray-600 dark:text-gray-300">Décrivez votre église et ses fondements</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description de l'église/ASBL *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Décrivez votre église, son histoire, sa mission..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fondement de la foi *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Ex: Nous croyons en Jésus-Christ comme notre Sauveur..."
                  required
                />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Contacts</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      placeholder="Adresse complète"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="contact@eglise.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site web
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.eglise.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      placeholder="+243 XX XXX XX XX"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  <FiChevronLeft className="mr-1" /> Précédent
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  Suivant <FiChevronRight className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Meetings & Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Horaires et dons</h2>
                <p className="text-gray-600 dark:text-gray-300">Configurez les horaires de culte et les informations financières</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Les réunions sont diffusées en combien de langues ? *
                </label>
                <input
                  type="number"
                  min="1"
                  max={langues.length}
                  value={nombreLangues}
                  onChange={(e) => setNombreLangues(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sélectionnez les langues (max {nombreLangues})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {langues.map((langue, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={langue.selected}
                        onChange={() => handleLangueChange(index)}
                        disabled={!langue.selected && langues.filter(l => l.selected).length >= nombreLangues}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {langue.nom}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Horaire hebdomadaire des cultes *</h3>
                
                {cultes.map((culte, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
                    <div className="md:col-span-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Jour
                      </label>
                      <select
                        value={culte.day}
                        onChange={(e) => handleCulteChange(index, 'day', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      >
                        <option value="">Sélectionnez un jour</option>
                        <option value="Dimanche">Dimanche</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="Jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                        <option value="Samedi">Samedi</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Heure de début
                      </label>
                      <input
                        type="time"
                        value={culte.start}
                        onChange={(e) => handleCulteChange(index, 'start', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Heure de fin
                      </label>
                      <input
                        type="time"
                        value={culte.end}
                        onChange={(e) => handleCulteChange(index, 'end', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex items-end h-full">
                      {index === 0 ? (
                        <button
                          type="button"
                          onClick={addCulte}
                          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg shadow hover:shadow-md transition-all font-medium"
                        >
                          <FiPlus className="mr-1" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeCulte(index)}
                          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg shadow hover:shadow-md transition-all font-medium"
                        >
                          <FiTrash2 className="mr-1" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Coordonnées bancaires</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom de la banque
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Rawbank"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro de compte
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: CD1234567890"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mobile Money
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: +243 XX XXX XX XX"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  <FiChevronLeft className="mr-1" /> Précédent
                </button>
                <button
                  type="submit"
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  Finaliser <FiUpload className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Login Link */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-center border-t border-gray-200 dark:border-gray-600">
          <a 
            href="/publics/login" 
            className="flex items-center justify-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FiLogIn className="mr-2" />
            Déjà un compte ? Se connecter
          </a>
        </div>
      </motion.div>
    </div>
  );
}