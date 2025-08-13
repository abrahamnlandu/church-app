
import { useState } from 'react';
import { FiPlus, FiTrash2, FiChevronRight, FiChevronLeft, FiUpload } from 'react-icons/fi';

export default function ChurchSignupPage() {
  const [step, setStep] = useState(1);
  const [meetingDays, setMeetingDays] = useState([{ day: '', start: '', end: '' }]);
  const [colors, setColors] = useState({
    primary: '#003366',
    secondary: '#ffcc66',
    neutral: '#f5f5f5'
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const addMeetingDay = () => {
    setMeetingDays([...meetingDays, { day: '', start: '', end: '' }]);
  };

  const removeMeetingDay = (index) => {
    const newDays = [...meetingDays];
    newDays.splice(index, 1);
    setMeetingDays(newDays);
  };

  const handleMeetingDayChange = (index, field, value) => {
    const newDays = [...meetingDays];
    newDays[index][field] = value;
    setMeetingDays(newDays);
  };

  const handleColorChange = (colorType, value) => {
    setColors({ ...colors, [colorType]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003366]/5 to-white dark:from-[#003366]/10 dark:to-[#0a0a0a] py-10">
      <form className="w-full max-w-3xl mx-4 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-[#003366]/10 dark:border-[#ffcc66]/10">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-[#003366] dark:text-[#ffcc66]' : 'text-gray-400'}`}>
              Informations de base
            </span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-[#003366] dark:text-[#ffcc66]' : 'text-gray-400'}`}>
              Description
            </span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-[#003366] dark:text-[#ffcc66]' : 'text-gray-400'}`}>
              Horaires & Contacts
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-[#003366] h-2.5 rounded-full dark:bg-[#ffcc66]" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#003366] dark:text-[#ffcc66]">Informations de base</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Remplissez les informations essentielles de votre église</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="church-name" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                  Nom de l'église *
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
                <label htmlFor="abbreviation" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                  Abréviation
                </label>
                <input
                  id="abbreviation"
                  type="text"
                  placeholder="Ex: ESP"
                  className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#003366] dark:text-[#ffcc66] mb-4">Charte graphique</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="primary-color" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Couleur principale
                  </label>
                  <div className="flex items-center">
                    <input
                      id="primary-color"
                      type="color"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="ml-2 px-3 py-2 rounded-lg border border-[#003366]/20 dark:border-[#ffcc66]/30 dark:bg-gray-800 dark:text-white w-24"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="secondary-color" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Couleur secondaire
                  </label>
                  <div className="flex items-center">
                    <input
                      id="secondary-color"
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="ml-2 px-3 py-2 rounded-lg border border-[#003366]/20 dark:border-[#ffcc66]/30 dark:bg-gray-800 dark:text-white w-24"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="neutral-color" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Couleur neutre
                  </label>
                  <div className="flex items-center">
                    <input
                      id="neutral-color"
                      type="color"
                      value={colors.neutral}
                      onChange={(e) => handleColorChange('neutral', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colors.neutral}
                      onChange={(e) => handleColorChange('neutral', e.target.value)}
                      className="ml-2 px-3 py-2 rounded-lg border border-[#003366]/20 dark:border-[#ffcc66]/30 dark:bg-gray-800 dark:text-white w-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="logo" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                Logo de l'église
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 dark:text-gray-300">
                    <label
                      htmlFor="logo-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-[#003366] dark:text-[#ffcc66] hover:text-[#003366]/80 dark:hover:text-[#ffcc66]/80 focus-within:outline-none"
                    >
                      <span>Téléverser un fichier</span>
                      <input id="logo-upload" name="logo-upload" type="file" className="sr-only" />
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
                className="flex items-center bg-gradient-to-r from-[#003366] to-[#003366]/90 hover:from-[#003366]/90 hover:to-[#003366] text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Suivant <FiChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Description */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#003366] dark:text-[#ffcc66]">Description de l'église</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Décrivez votre église et ses fondements</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                Description de l'église/ASBL *
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                placeholder="Décrivez votre église, son histoire, sa mission..."
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="faith-basis" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                Fondement de la foi (en quelques mots) *
              </label>
              <textarea
                id="faith-basis"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                placeholder="Ex: Nous croyons en Jésus-Christ comme notre Sauveur..."
                required
              ></textarea>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#003366] dark:text-[#ffcc66] mb-4">Informations de contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Adresse *
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Adresse complète"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Email de contact *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="contact@eglise.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Site web
                  </label>
                  <input
                    id="website"
                    type="url"
                    placeholder="https://www.eglise.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="youtube" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Chaîne YouTube
                  </label>
                  <input
                    id="youtube"
                    type="url"
                    placeholder="https://youtube.com/eglise"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Page Facebook
                  </label>
                  <input
                    id="facebook"
                    type="url"
                    placeholder="https://facebook.com/eglise"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="webradio" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Web Radio (si applicable)
                  </label>
                  <input
                    id="webradio"
                    type="url"
                    placeholder="https://radio.eglise.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Numéro de téléphone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+243 XX XXX XX XX"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tech-contact" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Contact technique (secondaire)
                  </label>
                  <input
                    id="tech-contact"
                    type="tel"
                    placeholder="+243 XX XXX XX XX"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                <FiChevronLeft className="mr-1" /> Précédent
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center bg-gradient-to-r from-[#003366] to-[#003366]/90 hover:from-[#003366]/90 hover:to-[#003366] text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Suivant <FiChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Meetings & Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#003366] dark:text-[#ffcc66]">Horaires et dons</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Configurez les horaires de culte et les informations financières</p>
            </div>

            <div>
              <label htmlFor="languages" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                Les réunions sont diffusées en combien de langues ? *
              </label>
              <input
                id="languages"
                type="number"
                min="1"
                placeholder="Ex: 2"
                className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                required
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#003366] dark:text-[#ffcc66] mb-4">Horaire hebdomadaire des cultes *</h3>
              
              {meetingDays.map((day, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
                  <div className="md:col-span-4">
                    <label htmlFor={`day-${index}`} className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                      Jour
                    </label>
                    <select
                      id={`day-${index}`}
                      value={day.day}
                      onChange={(e) => handleMeetingDayChange(index, 'day', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
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
                    <label htmlFor={`start-${index}`} className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                      Heure de début
                    </label>
                    <input
                      id={`start-${index}`}
                      type="time"
                      value={day.start}
                      onChange={(e) => handleMeetingDayChange(index, 'start', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <label htmlFor={`end-${index}`} className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                      Heure de fin
                    </label>
                    <input
                      id={`end-${index}`}
                      type="time"
                      value={day.end}
                      onChange={(e) => handleMeetingDayChange(index, 'end', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex items-end h-full">
                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={addMeetingDay}
                        className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        <FiPlus className="mr-1" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeMeetingDay(index)}
                        className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        <FiTrash2 className="mr-1" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#003366] dark:text-[#ffcc66] mb-4">Coordonnées bancaires/mobile money</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bank-name" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Nom de la banque
                  </label>
                  <input
                    id="bank-name"
                    type="text"
                    placeholder="Ex: Rawbank"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="account-number" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Numéro de compte
                  </label>
                  <input
                    id="account-number"
                    type="text"
                    placeholder="Ex: CD1234567890"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="mobile-money" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Numéro Mobile Money
                  </label>
                  <input
                    id="mobile-money"
                    type="text"
                    placeholder="Ex: +243 XX XXX XX XX"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="payment-reference" className="block text-sm font-medium text-[#003366] dark:text-[#ffcc66]/90 mb-1">
                    Référence pour paiement
                  </label>
                  <input
                    id="payment-reference"
                    type="text"
                    placeholder="Ex: Don/Offrande/Dîme"
                    className="w-full px-4 py-3 rounded-lg border border-[#003366]/20 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/30 dark:border-[#ffcc66]/30 dark:focus:border-[#ffcc66] dark:bg-gray-800 dark:text-white transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                <FiChevronLeft className="mr-1" /> Précédent
              </button>
              <button
                type="submit"
                className="flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Finaliser la création <FiUpload className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}