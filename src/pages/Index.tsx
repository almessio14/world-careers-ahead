import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CareerCard from '../components/CareerCard';
import CareerExplorationCard from '../components/CareerExplorationCard';
import MicroareaModal from '../components/MicroareaModal';
import NewOrientationQuiz from '../components/NewOrientationQuiz';
import GlobeMap from '../components/GlobeMap';
import UniversityModal from '../components/UniversityModal';
import FavoritesModal from '../components/FavoritesModal';
import { careers } from '../data/careers';
import { careerExplorationData, Microarea } from '../data/careerExploration';
import { University } from '../types';

export default function Index() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'careers' | 'universities'>('quiz');
  const [showOrientationQuiz, setShowOrientationQuiz] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMicroarea, setSelectedMicroarea] = useState<Microarea | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      <Header onFavoritesClick={() => setShowFavorites(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {activeTab === 'quiz' ? (
          <div className="animate-fade-in">
            {/* Hero section con design più pulito */}
            <div className="text-center mb-16">
              <div className="bg-gradient-to-r from-[#0A1D3A] via-[#14213d] to-[#0A1D3A] text-white p-12 rounded-3xl shadow-2xl mb-12 backdrop-blur-xl border border-white/10 w-full">
                <div className="max-w-5xl mx-auto">
                  <h1 className="text-6xl font-light text-white mb-4 tracking-tight font-sans">
                    Scopri il Tuo 
                    <span className="block text-[#fbbf24] font-medium mt-2 font-sans">Futuro Lavorativo</span>
                  </h1>
                  <p className="text-xl text-blue-100 font-light leading-relaxed max-w-3xl mx-auto mb-8 font-sans">
                    Trova la carriera perfetta per te attraverso il nostro quiz personalizzato
                  </p>
                  <button
                    onClick={() => setShowOrientationQuiz(true)}
                    className="bg-white text-[#14213d] px-10 py-4 rounded-full font-medium text-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl transform font-sans"
                  >
                    Avvia il Quiz
                  </button>
                </div>
              </div>
              
              {/* Testo informativo sotto il blocco navy */}
              <div className="max-w-4xl mx-auto mb-8">
                <p className="text-base mb-6 text-gray-700 font-light leading-relaxed font-sans">
                  Se ti interessano economia, finanza, relazioni internazionali o imprenditoria, ma non sai ancora quale strada intraprendere, questo quiz può aiutarti a fare chiarezza. Attraverso poche domande mirate, ti suggeriremo carriere in linea con i tuoi interessi, il tuo modo di pensare e il contesto lavorativo in cui potresti esprimerti al meglio.
                </p>
                <p className="text-base text-gray-600 font-light leading-relaxed font-sans">
                  Le carriere in questi ambiti sono altamente competitive. Frequentare una buona università è una base solida, ma non è sufficiente. Ciò che fa davvero la differenza è l'esperienza: stage, progetti, network, capacità di mettersi in gioco.
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'careers' ? (
          <div className="animate-fade-in">
            {/* Hero section ottimizzato con spaziature ridotte e stile navy */}
            <div className="text-center mb-12">
              <div className="bg-gradient-to-r from-[#0A1D3A] via-[#14213d] to-[#0A1D3A] text-white p-12 rounded-3xl shadow-2xl mb-12 backdrop-blur-xl border border-white/10">
                <div className="max-w-5xl mx-auto">
                  <h1 className="text-6xl font-light text-white mb-4 tracking-tight font-sans">
                    Esplora le 
                    <span className="block text-[#fbbf24] font-medium mt-2 font-sans">Carriere del Futuro</span>
                  </h1>
                  <p className="text-xl text-blue-100 font-light leading-relaxed max-w-3xl mx-auto mb-8 font-sans">
                    Scopri opportunità professionali innovative che stanno ridefinendo il mondo del lavoro
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer elegante con spaziatura ridotta */}
            <div className="mb-10">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                <p className="text-sm text-blue-800 text-center font-medium font-sans">
                  I dati salariali sono indicativi per posizioni entry-level (2-3 anni) in Europa Occidentale e Nord America
                </p>
              </div>
            </div>

            {/* Career Grid con spaziatura ottimizzata */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 items-start">
              {careerExplorationData.map((category, index) => (
                <div
                  key={category.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CareerExplorationCard 
                    category={category}
                    onMicroareaClick={setSelectedMicroarea}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <GlobeMap onUniversitySelect={setSelectedUniversity} />
          </div>
        )}
      </main>

      {/* Modals con backdrop premium */}
      {showOrientationQuiz && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/20">
          <NewOrientationQuiz onClose={() => setShowOrientationQuiz(false)} />
        </div>
      )}
      {selectedUniversity && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/20">
          <UniversityModal
            university={selectedUniversity}
            onClose={() => setSelectedUniversity(null)}
          />
        </div>
      )}
      {selectedMicroarea && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/20">
          <MicroareaModal
            microarea={selectedMicroarea}
            onClose={() => setSelectedMicroarea(null)}
          />
        </div>
      )}
      {showFavorites && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/20">
          <FavoritesModal onClose={() => setShowFavorites(false)} />
        </div>
      )}
    </div>
  );
};
