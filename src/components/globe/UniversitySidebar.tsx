import { Heart } from 'lucide-react';
import { universitiesByCountry } from '../../data/universities';
import { University } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';

interface UniversitySidebarProps {
  selectedCountry: string | null;
  onClose: () => void;
  onUniversitySelect: (university: University) => void;
  onUniversityHover?: (university: University | null) => void;
  hoveredUniversity?: University | null;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const getCountryFlag = (countryCode: string): string => {
  const flagMap: Record<string, string> = {
    'USA': '🇺🇸',
    'Canada': '🇨🇦',
    'China': '🇨🇳',
    'Japan': '🇯🇵',
    'South Korea': '🇰🇷',
    'Singapore': '🇸🇬',
    'Italy': '🇮🇹',
    'Portugal': '🇵🇹',
    'Spain': '🇪🇸',
    'France': '🇫🇷',
    'Netherlands': '🇳🇱',
    'Belgium': '🇧🇪',
    'Switzerland': '🇨🇭',
    'Germany': '🇩🇪',
    'Austria': '🇦🇹',
    'Denmark': '🇩🇰',
    'Sweden': '🇸🇪',
    'Finland': '🇫🇮',
    'Norway': '🇳🇴',
    'UK': '🇬🇧',
    'Ireland': '🇮🇪'
  };
  
  return flagMap[countryCode] || '🌍';
};

const getUniversityDescription = (universityId: string): string => {
  const descriptions: Record<string, string> = {
    'harvard': '📚 Prestigiosissima università con un\'eccellente facoltà di Economia e Relazioni Internazionali.',
    'stanford': '🚀 Forte focus su innovazione e finanza, ottime connessioni con settore tech e venture capital.',
    'ucla': '🎓 Università pubblica top in economia e business, reputazione internazionale.',
    'berkeley': '📈 Università pubblica rinomata, focus su innovazione e sostenibilità.',
    'columbia': '🌐 Vicino a Wall Street, ottima per finanza e relazioni internazionali.',
    'yale': '🎓 Ivy League con eccellenza in economia e scienze politiche.',
    'uchicago': '📊 Rinomata per approccio quantitativo in economia e finanza.',
    'mit': '🔬 Università di alto livello, focus su finanza quantitativa e imprenditorialità.',
    'wharton': '🏦 Business school leader per finanza e gestione.',
    'princeton': '📖 Economia teorica e politica economica di eccellenza.',
    'nyu': '📈 Università top nel cuore di New York, posizione strategica per Wall Street.',
    'bu': '🌍 Buoni programmi in economia e business, posizione in hub finanziario.',
    'toronto': '🎓 Top università pubblica, forti programmi in economia e finanza.',
    'mcgill': '🌐 Ambiente bilingue, eccellenza in economia e relazioni internazionali.',
    'ubc': '🌱 Focus su economia sostenibile e commercio internazionale.',
    'peking': '🎓 Università top in Cina, con programmi internazionali in economia e management, forte reputazione in Asia.',
    'tsinghua': '🏛 Università leader per ingegneria e business, programma di economia molto competitivo, collaborazioni globali.',
    'fudan': '🌟 Rinomata per programmi in economia, finanza e business internazionale, importante polo commerciale cinese.',
    'tokyo': '🏯 Prima università giapponese, con programmi di economia e relazioni internazionali di livello internazionale.',
    'kyoto': '🎓 Università pubblica di alto livello, forte nelle scienze sociali e politiche, ambiente storico e culturale unico.',
    'osaka': '🌐 Programmi interdisciplinari con economia e scienze sociali, buona reputazione in ambito business.',
    'hitotsubashi': '📊 Specializzata in economia, commercio e management, è considerata una delle migliori università giapponesi per business e finanza.',
    'snu': '🏆 La migliore università coreana, con programmi di economia e relazioni internazionali riconosciuti a livello mondiale.',
    'yonsei': '🎓 Prestigiosa università privata, noto polo per business e economia con ampie collaborazioni internazionali.',
    'nus': '🌏 Università leader in Asia, forte in economia, finanza e management, con programmi molto internazionali e collegamenti con il mondo business globale.',
    'cityu': '🌆 Università dinamica e internazionale, programmi in economia e business con forte impronta asiatica.',
    'bocconi': '🎓 Leader italiano in economia, finanza e management, con forte orientamento internazionale e buone collaborazioni aziendali.',
    'padova': '🏛 Storica università pubblica con programmi solidi in economia e scienze politiche, ambiente di studio tradizionale ma stimolante.',
    'cafoscari': '🌍 Nota per economia internazionale, commercio e studi europei, posizione unica in città storica e turistica.',
    'sapienza': '🎓 Grande università pubblica con programmi in economia, diritto e relazioni internazionali, forte presenza storica e culturale.',
    'nova': '🌐 Università moderna con forte crescita nei programmi di economia, business e relazioni internazionali.',
    'ulisboa': '🏛 Ampia offerta formativa in economia, commercio e studi europei, con ambiente internazionale.',
    'esade': '🎓 Prestigiosa business school privata, riconosciuta per finanza e management, forte network in Europa e America Latina.',
    'ie': '🌍 Internazionale, con programmi in business, finanza e relazioni internazionali, noto per innovazione e imprenditorialità.',
    'uam': '🏛 Università pubblica con programmi di economia e relazioni internazionali riconosciuti, ambiente dinamico.',
    'sciencespo': '🎓 Top scuola di scienze politiche e relazioni internazionali, con programmi forti anche in economia e business.',
    'essec': '🏆 Business school rinomata, con programmi in finanza, management e consulenza.',
    'hec': '🎓 Business school d\'eccellenza in Europa, con network globale e forte orientamento al top management.',
    'escp': '🌍 Business school con forti programmi internazionali, campus in più paesi europei.',
    'erasmus': '📈 Business school nota per finanza e commercio internazionale, campus moderno.',
    'uva': '🎓 Università pubblica con programmi di economia e relazioni internazionali di qualità, vivace ambiente urbano.',
    'maastricht': '🌐 Conosciuta per il modello di apprendimento PBL e forte internazionalizzazione.',
    'groningen': '🎓 Offre programmi solidi in economia, business e scienze sociali con approccio internazionale.',
    'kuleuven': '🏛 Antica università con ottimi programmi in economia e business, forte presenza europea.',
    'ghent': '🎓 Università pubblica con programmi di economia e scienze sociali riconosciuti.',
    'stgallen': '🏆 Rinomata business school, forte in economia, finanza e management internazionale.',
    'uzh': '🌍 Università pubblica con buoni programmi in economia e business.',
    'iheid': '🎓 Specializzata in relazioni internazionali e studi globali, ambiente internazionale.',
    'mannheim': '🎓 Nota per economia e management, tra le migliori in Germania.',
    'lmu': '🏛 Grande università pubblica con programmi solidi in economia e scienze sociali.',
    'goethe': '🏦 Ottima posizione finanziaria, campus nel cuore della finanza europea.',
    'wu': '🌍 Business school leader in Austria con ottimi programmi in economia e finanza.',
    'cbs': '🏆 Business school internazionale di alto livello, forte in finanza e business sostenibile.',
    'sse': '🌱 Nota per finanza e imprenditorialità, ambiente dinamico e internazionale.',
    'helsinki': '🎓 Università pubblica con programmi solidi in economia e scienze sociali.',
    'bi': '🏢 Business school privata leader in Norvegia, programmi in finanza, economia e management.',
    'lse': '🌍 Università leader mondiale per economia, scienze politiche e relazioni internazionali.',
    'oxford': '🎓 Storica università con programmi eccellenti in economia e politiche pubbliche.',
    'cambridge': '📚 Eccellenza accademica e programmi di economia e relazioni internazionali rinomati.',
    'warwick': '🏆 Buona reputazione in economia e business, con focus internazionale.',
    'kcl': '🌍 Programmi forti in economia e relazioni internazionali, ambiente multiculturale.',
    'tcd': '🎓 Università storica con programmi eccellenti in economia e business internazionale.',
    'ucd': '🌐 Offre ampi programmi in economia, finanza e management con forte rete internazionale.'
  };
  
  return descriptions[universityId] || '';
};

const UniversitySidebar = ({ 
  selectedCountry, 
  onClose, 
  onUniversitySelect, 
  onUniversityHover,
  hoveredUniversity,
  containerRef
}: UniversitySidebarProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!selectedCountry || !universitiesByCountry[selectedCountry]) {
    return null;
  }

  const handleFavoriteClick = (university: University, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id: university.id,
      type: 'university',
      data: university
    });
  };

  const handleUniversityHover = (university: University | null) => {
    if (onUniversityHover) {
      onUniversityHover(university);
    }
  };

  return (
    <div 
      className="absolute top-0 right-0 w-full sm:w-80 md:w-96 h-full bg-white/70 backdrop-blur-xl text-gray-800 transform transition-all duration-500 ease-out border-l border-gray-200 shadow-xl z-30 overflow-hidden"
    >
      {/* Header fisso */}
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {getCountryFlag(selectedCountry)} {selectedCountry}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
        >
          ✕
        </button>
      </div>
      
      {/* Contenuto scrollabile - altezza fissa per garantire scroll corretto */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ height: 'calc(100% - 88px)' }}>
        <div className="space-y-3 sm:space-y-4 pb-4">
          {universitiesByCountry[selectedCountry].map((university) => {
            const isHovered = hoveredUniversity?.id === university.id;
            
            return (
              <div
                key={university.id}
                className={`bg-white/90 p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 cursor-pointer ${
                  isHovered ? 'bg-yellow-50/90 border-yellow-400 shadow-lg scale-[1.02] ring-2 ring-yellow-300/50' : 'hover:bg-gray-50/90'
                }`}
                onMouseEnter={() => handleUniversityHover(university)}
                onMouseLeave={() => handleUniversityHover(null)}
                onClick={() => onUniversitySelect(university)}
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-800 leading-tight pr-2 flex-1">{university.name}</h4>
                  <button
                    onClick={(e) => handleFavoriteClick(university, e)}
                    className={`p-1 rounded-full transition-all duration-200 flex-shrink-0 ${
                      isFavorite(university.id) 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Heart 
                      size={16} 
                      fill={isFavorite(university.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                
                <div className="text-xs sm:text-sm space-y-1 sm:space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span className="text-xs sm:text-sm">{university.city}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">💰</span>
                    <span className="text-xs sm:text-sm text-gray-700">{university.tuitionFee}</span>
                  </div>
                  <div className="text-xs leading-relaxed text-gray-700 line-clamp-3">
                    {getUniversityDescription(university.id)}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🔗</span>
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline text-xs truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {university.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UniversitySidebar;
