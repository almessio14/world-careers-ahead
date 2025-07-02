
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

const Index = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'careers' | 'universities'>('quiz');
  const [showOrientationQuiz, setShowOrientationQuiz] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMicroarea, setSelectedMicroarea] = useState<Microarea | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onFavoritesClick={() => setShowFavorites(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'quiz' ? (
          <div>
            {/* Hero section solo per il quiz */}
            <div className="text-center mb-12">
              <div className="gradient-bg text-white p-8 rounded-xl shadow-lg mb-8">
                <h2 className="text-3xl font-bold mb-4">Scopri il Tuo Futuro Professionale</h2>
                <p className="text-xl mb-6 text-blue-100">
                  Rispondi al nostro quiz personalizzato per scoprire la carriera perfetta per te
                </p>
                <button
                  onClick={() => setShowOrientationQuiz(true)}
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors animate-bounce-light"
                >
                  🎯 Inizia il Quiz di Orientamento
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'careers' ? (
          <div>
            {/* Hero section per le carriere */}
            <div className="text-center mb-12">
              <div className="gradient-bg text-white p-8 rounded-xl shadow-lg mb-8">
                <h2 className="text-3xl font-bold mb-4">Esplora le Carriere Internazionali</h2>
                <p className="text-xl mb-6 text-blue-100">
                  Scopri opportunità professionali che cambieranno il mondo
                </p>
              </div>
            </div>

            {/* Disclaimer sugli stipendi */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 italic text-center">
                *Stipendi medi indicativi in Europa Occidentale/Nord America per posizioni entry level (2-3 anni)
              </p>
            </div>

            {/* Career Exploration Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {careerExplorationData.map((category) => (
                <CareerExplorationCard 
                  key={category.id} 
                  category={category}
                  onMicroareaClick={setSelectedMicroarea}
                />
              ))}
            </div>
          </div>
        ) : (
          <GlobeMap onUniversitySelect={setSelectedUniversity} />
        )}
      </main>

      {/* Modals */}
      {showOrientationQuiz && <NewOrientationQuiz onClose={() => setShowOrientationQuiz(false)} />}
      {selectedUniversity && (
        <UniversityModal
          university={selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
        />
      )}
      {selectedMicroarea && (
        <MicroareaModal
          microarea={selectedMicroarea}
          onClose={() => setSelectedMicroarea(null)}
        />
      )}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
    </div>
  );
};

export default Index;
