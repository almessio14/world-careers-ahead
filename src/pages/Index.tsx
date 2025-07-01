
import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CareerCard from '../components/CareerCard';
import Quiz from '../components/Quiz';
import DatabaseOrientationQuiz from '../components/DatabaseOrientationQuiz';
import GlobeMap from '../components/GlobeMap';
import UniversityModal from '../components/UniversityModal';
import FavoritesModal from '../components/FavoritesModal';
import { careers } from '../data/careers';
import { University } from '../types';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'careers' | 'universities'>('careers');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showOrientationQuiz, setShowOrientationQuiz] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onFavoritesClick={() => setShowFavorites(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'careers' ? (
          <div>
            {/* Hero section with quiz buttons */}
            <div className="text-center mb-12">
              <div className="gradient-bg text-white p-8 rounded-xl shadow-lg mb-8">
                <h2 className="text-3xl font-bold mb-4">Scopri il Tuo Futuro Professionale</h2>
                <p className="text-xl mb-6 text-blue-100">
                  Esplora carriere internazionali che cambieranno il mondo
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowOrientationQuiz(true)}
                    className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors animate-bounce-light"
                  >
                    🎯 Quiz di Orientamento
                  </button>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="bg-primary/20 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                  >
                    🌟 Quiz Veloce
                  </button>
                </div>
              </div>
            </div>

            {/* Careers grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career) => (
                <CareerCard key={career.id} career={career} />
              ))}
            </div>
          </div>
        ) : (
          <GlobeMap onUniversitySelect={setSelectedUniversity} />
        )}
      </main>

      {/* Modals */}
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      {showOrientationQuiz && <DatabaseOrientationQuiz onClose={() => setShowOrientationQuiz(false)} />}
      {selectedUniversity && (
        <UniversityModal
          university={selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
        />
      )}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
    </div>
  );
};

export default Index;
