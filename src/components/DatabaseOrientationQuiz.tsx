
import { useState, useEffect } from 'react';
import { fetchInitialQuestions, fetchSecondaryQuestions } from '../services/quizService';

interface DatabaseOrientationQuizProps {
  onClose: () => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  weights: Record<string, Record<string, number>>;
}

const macroAreaResults = {
  finance: {
    name: 'Finance',
    description: 'Sei orientato verso il mondo finanziario, con focus su investimenti, mercati e analisi quantitative.',
    icon: '💰'
  },
  consulting: {
    name: 'Consulting',
    description: 'Ti attrae il problem-solving strategico e il lavoro con grandi aziende per ottimizzare performance.',
    icon: '📊'
  },
  policy: {
    name: 'Policy & Public Affairs',
    description: 'Sei interessato alle relazioni internazionali, diplomazia e impatto su politiche pubbliche.',
    icon: '🌍'
  },
  entrepreneurship: {
    name: 'Entrepreneurship',
    description: 'Hai spirito imprenditoriale e ti attrae creare, innovare e costruire nuove realtà aziendali.',
    icon: '🚀'
  },
  business: {
    name: 'Business & Industries',
    description: 'Ti piace lavorare in grandi aziende, gestire prodotti e guidare crescita in contesti strutturati.',
    icon: '🏢'
  },
  academic: {
    name: 'Academic & Media',
    description: 'Sei orientato verso ricerca, insegnamento e produzione di conoscenza nel campo economico.',
    icon: '📚'
  }
};

const microAreaResults = {
  // Finance
  ib: { name: 'Investment Banking', description: 'Advisor per M&A, IPO e grandi transazioni corporate' },
  pe: { name: 'Private Equity', description: 'Investimenti in aziende mature con focus su value creation' },
  vc: { name: 'Venture Capital', description: 'Finanziamento di startup innovative in fase early-stage' },
  hf: { name: 'Hedge Fund', description: 'Gestione di fondi speculativi e strategie di investimento alternative' },
  quant: { name: 'Quantitative Finance', description: 'Modelli matematici per trading e gestione del rischio' },
  am: { name: 'Asset Management', description: 'Gestione di portafogli e investimenti per clienti istituzionali' },
  
  // Consulting
  mbb: { name: 'MBB (McKinsey, Bain, BCG)', description: 'Strategia di alto livello per Fortune 500' },
  big4: { name: 'Big Four', description: 'Servizi integrati di audit, tax e advisory' },
  
  // Policy
  diplomat: { name: 'Diplomatico', description: 'Carriera diplomatica in ambasciate e consolati' },
  org_int: { name: 'Organizzazioni Internazionali', description: 'ONU, UE, organismi internazionali' },
  policy: { name: 'Policy Making', description: 'Analisi e sviluppo di politiche pubbliche' },
  
  // Business
  big_tech: { name: 'Big Tech', description: 'FAANG/MAMAA - Google, Meta, Amazon, Apple' },
  pm: { name: 'Project Manager', description: 'Gestione e sviluppo di prodotti e progetti' },
  corporate: { name: 'Corporate', description: 'Strategia aziendale in grandi corporation' },
  
  // Entrepreneurship
  startup: { name: 'Start-up', description: 'Fondare e sviluppare startup innovative' },
  cfo: { name: 'CFO', description: 'Chief Financial Officer per aziende in crescita' },
  
  // Academic
  researcher: { name: 'Ricercatore', description: 'Ricercatore economico accademico' },
  journalist: { name: 'Giornalista', description: 'Giornalista economico specializzato' }
};

const DatabaseOrientationQuiz = ({ onClose }: DatabaseOrientationQuizProps) => {
  const [phase, setPhase] = useState<'loading' | 'macro' | 'micro' | 'result' | 'error'>('loading');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [macroQuestions, setMacroQuestions] = useState<QuizQuestion[]>([]);
  const [microQuestions, setMicroQuestions] = useState<QuizQuestion[]>([]);
  const [macroAnswers, setMacroAnswers] = useState<string[]>([]);
  const [microAnswers, setMicroAnswers] = useState<string[]>([]);
  const [topMacroArea, setTopMacroArea] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<{ macroArea: string; microArea: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialQuestions = async () => {
      try {
        setError(null);
        console.log('Loading initial questions...');
        const questions = await fetchInitialQuestions();
        console.log('Loaded questions:', questions);
        setMacroQuestions(questions);
        setPhase('macro');
      } catch (error) {
        console.error('Failed to load questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load questions');
        setPhase('error');
      }
    };

    loadInitialQuestions();
  }, []);

  const handleMacroAnswer = async (optionIndex: number) => {
    const selectedOption = String.fromCharCode(65 + optionIndex); // A, B, C, D
    const newAnswers = [...macroAnswers, selectedOption];
    setMacroAnswers(newAnswers);

    if (currentQuestion < macroQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate macro area scores
      const scores = {
        finance: 0,
        consulting: 0,
        policy: 0,
        entrepreneurship: 0,
        business: 0,
        academic: 0
      };

      macroQuestions.forEach((question, qIndex) => {
        const answerOption = newAnswers[qIndex];
        const weights = question.weights[answerOption];
        if (weights) {
          Object.entries(weights).forEach(([category, weight]) => {
            if (scores.hasOwnProperty(category)) {
              scores[category as keyof typeof scores] += weight;
            }
          });
        }
      });

      console.log('Macro area scores:', scores);

      const topArea = Object.entries(scores).reduce((a, b) => 
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
      )[0];

      setTopMacroArea(topArea);
      
      // Load secondary questions
      try {
        console.log('Loading secondary questions for:', topArea);
        const secondaryQuestions = await fetchSecondaryQuestions(topArea);
        console.log('Loaded secondary questions:', secondaryQuestions);
        setMicroQuestions(secondaryQuestions);
        setPhase('micro');
        setCurrentQuestion(0);
      } catch (error) {
        console.error('Failed to load secondary questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load secondary questions');
        setPhase('error');
      }
    }
  };

  const handleMicroAnswer = (optionIndex: number) => {
    const selectedOption = String.fromCharCode(65 + optionIndex); // A, B, C, D
    const newAnswers = [...microAnswers, selectedOption];
    setMicroAnswers(newAnswers);

    if (currentQuestion < microQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate micro area scores
      if (!topMacroArea) return;

      const scores: Record<string, number> = {};

      // Initialize scores for all possible micro areas
      microQuestions.forEach(question => {
        Object.keys(question.weights.A || {}).forEach(key => {
          scores[key] = 0;
        });
      });

      microQuestions.forEach((question, qIndex) => {
        const answerOption = newAnswers[qIndex];
        const weights = question.weights[answerOption];
        if (weights) {
          Object.entries(weights).forEach(([category, weight]) => {
            scores[category] += weight;
          });
        }
      });

      console.log('Micro area scores:', scores);

      const topMicroArea = Object.entries(scores).reduce((a, b) => 
        scores[a[0]] > scores[b[0]] ? a : b
      )[0];

      setFinalResult({
        macroArea: topMacroArea,
        microArea: topMicroArea
      });
      setPhase('result');
    }
  };

  const resetQuiz = () => {
    setPhase('loading');
    setCurrentQuestion(0);
    setMacroAnswers([]);
    setMicroAnswers([]);
    setTopMacroArea(null);
    setFinalResult(null);
    setError(null);
    
    // Reload questions
    const loadInitialQuestions = async () => {
      try {
        const questions = await fetchInitialQuestions();
        setMacroQuestions(questions);
        setPhase('macro');
      } catch (error) {
        console.error('Failed to load questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load questions');
        setPhase('error');
      }
    };

    loadInitialQuestions();
  };

  if (phase === 'loading') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Caricamento domande dal database...</p>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Errore nel caricamento</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Riprova
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result' && finalResult) {
    const macroResult = macroAreaResults[finalResult.macroArea as keyof typeof macroAreaResults];
    const microResult = microAreaResults[finalResult.microArea as keyof typeof microAreaResults];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Il tuo profilo professionale!</h2>
            
            <div className="bg-primary/10 p-6 rounded-lg mb-4">
              <div className="flex items-center justify-center mb-3">
                <span className="text-3xl mr-3">{macroResult.icon}</span>
                <h3 className="text-xl font-semibold text-primary">{macroResult.name}</h3>
              </div>
              <p className="text-gray-700 mb-4">{macroResult.description}</p>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Specializzazione consigliata:</h4>
                <h5 className="text-lg font-medium text-primary mb-2">{microResult.name}</h5>
                <p className="text-sm text-gray-600">{microResult.description}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Rifai il quiz
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Esplora le carriere
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isMicroPhase = phase === 'micro';
  const questions = isMicroPhase ? microQuestions : macroQuestions;
  const currentQuestionData = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  if (!currentQuestionData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full text-center">
          <p>Errore nel caricamento delle domande</p>
          <button
            onClick={onClose}
            className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {isMicroPhase ? 'Specializzazione' : 'Quiz di Orientamento'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {isMicroPhase 
                  ? `Fase 2: ${macroAreaResults[topMacroArea! as keyof typeof macroAreaResults]?.name}`
                  : 'Fase 1: Macro-area'
                }
              </span>
              <span>Domanda {currentQuestion + 1} di {totalQuestions}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {currentQuestionData.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => isMicroPhase 
                  ? handleMicroAnswer(index) 
                  : handleMacroAnswer(index)
                }
                className="quiz-option w-full text-left"
              >
                <div className="flex items-start">
                  <span className="text-primary font-medium mr-3 mt-1">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseOrientationQuiz;
