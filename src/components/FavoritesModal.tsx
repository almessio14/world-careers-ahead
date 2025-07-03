
import { Heart, X, MapPin, Globe, DollarSign, Trophy, GraduationCap } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Career, University } from '../types';
import { Microarea } from '../data/careerExploration';

interface FavoritesModalProps {
  onClose: () => void;
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

const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { favorites, removeFavorite } = useFavorites();

  const careerFavorites = favorites.filter(fav => fav.type === 'career');
  const universityFavorites = favorites.filter(fav => fav.type === 'university');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-6 md:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in custom-scrollbar">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-[#14213d] flex items-center tracking-tight">
            <Heart className="h-6 w-6 md:h-7 md:w-7 text-[#fbbf24] mr-3 fill-current" />
            I tuoi Preferiti
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="text-6xl md:text-8xl mb-4 md:mb-6 opacity-50">💔</div>
            <h3 className="text-xl md:text-2xl font-light text-gray-600 mb-3">Nessun preferito ancora</h3>
            <p className="text-gray-500 font-light text-sm md:text-base">Inizia ad esplorare carriere e università per salvarle qui!</p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-10">
            {careerFavorites.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#14213d] mb-4 md:mb-6 flex items-center">
                  <span className="w-3 h-4 md:h-6 bg-[#fbbf24] rounded-full mr-3"></span>
                  Specializzazioni Salvate ({careerFavorites.length})
                </h3>
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                  {careerFavorites.map((fav) => {
                    const microarea = fav.data as unknown as Microarea;
                    return (
                      <div key={fav.id} className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-semibold text-[#14213d] mb-2 truncate">{microarea.name}</h4>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{microarea.description}</p>
                          </div>
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="text-[#fbbf24] hover:text-[#f59e0b] p-2 rounded-full hover:bg-[#fbbf24]/10 transition-all duration-200 ml-3 flex-shrink-0"
                          >
                            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                          </button>
                        </div>
                        
                        <div className="space-y-2 md:space-y-3">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 md:px-4 py-2 rounded-lg border border-blue-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-1 md:w-1.5 h-2 md:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-blue-900 mb-1">Aziende Leader</p>
                                <p className="text-xs text-blue-800 font-medium truncate">{microarea.companies || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 md:px-4 py-2 rounded-lg border border-green-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-1 md:w-1.5 h-2 md:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-green-900 mb-1">Compenso Medio</p>
                                <p className="text-sm text-green-800 font-bold">{microarea.salary || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {universityFavorites.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#14213d] mb-4 md:mb-6 flex items-center">
                  <span className="w-3 h-4 md:h-6 bg-[#fbbf24] rounded-full mr-3"></span>
                  Università Salvate ({universityFavorites.length})
                </h3>
                <div className="grid gap-4 md:gap-6">
                  {universityFavorites.map((fav) => {
                    const university = fav.data as University;
                    return (
                      <div key={fav.id} className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-3">
                              <span className="text-2xl mr-3">{getCountryFlag(university.country)}</span>
                              <div>
                                <h4 className="text-base md:text-lg font-semibold text-[#14213d] mb-1">{university.name}</h4>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{university.city}, {university.country}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                              {getUniversityDescription(university.id)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFavorite(fav.id)}
                            className="text-[#fbbf24] hover:text-[#f59e0b] p-2 rounded-full hover:bg-[#fbbf24]/10 transition-all duration-200 ml-3 flex-shrink-0"
                          >
                            <Heart className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-3 py-2 rounded-lg border border-purple-200">
                            <div className="flex items-center space-x-2">
                              <Trophy className="h-4 w-4 text-purple-600 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-purple-900">Ranking</p>
                                <p className="text-sm font-bold text-purple-800">#{university.ranking}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-50 to-green-100 px-3 py-2 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-green-900">Costo</p>
                                <p className="text-xs font-bold text-green-800 truncate">{university.tuitionFee}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-2 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-blue-900">Lingua</p>
                                <p className="text-xs font-bold text-blue-800">{university.language}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <Globe className="h-3 w-3 mr-1" />
                              <a 
                                href={university.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 underline truncate max-w-[200px]"
                              >
                                {university.website.replace('https://', '')}
                              </a>
                            </div>
                            {university.scholarships && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                🎓 Borse disponibili
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
