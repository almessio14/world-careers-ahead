
import { QuizQuestion, QuizResult } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Cosa ti appassiona di più?',
    options: [
      'Analizzare dati e tendenze economiche',
      'Aiutare le persone e le comunità',
      'Negoziare e trovare soluzioni diplomatiche',
      'Gestire investimenti e mercati finanziari'
    ],
    weights: {
      'economist': 4,
      'development': 1,
      'diplomat': 2,
      'finance': 3
    }
  },
  {
    id: '2',
    question: 'In quale ambiente preferisci lavorare?',
    options: [
      'Uffici moderni in centri finanziari',
      'Organizzazioni internazionali e sul campo',
      'Ambasciate e istituzioni governative',
      'Università e centri di ricerca'
    ],
    weights: {
      'finance': 4,
      'development': 3,
      'diplomat': 2,
      'economist': 1
    }
  },
  {
    id: '3',
    question: 'Quale soft skill è il tuo punto di forza?',
    options: [
      'Comunicazione e leadership',
      'Analisi critica e problem solving',
      'Empatia e comprensione culturale',
      'Negoziazione e persuasione'
    ],
    weights: {
      'diplomat': 1,
      'economist': 2,
      'development': 3,
      'finance': 4
    }
  },
  {
    id: '4',
    question: 'Quanto ti piace viaggiare per lavoro?',
    options: [
      'Moltissimo, voglio lavorare in tutto il mondo',
      'Abbastanza, qualche viaggio mi va bene',
      'Poco, preferisco una base fissa',
      'Per niente, voglio rimanere nella mia città'
    ],
    weights: {
      'development': 4,
      'diplomat': 3,
      'economist': 2,
      'finance': 1
    }
  },
  {
    id: '5',
    question: 'Cosa ti motiva di più nel lavoro?',
    options: [
      'Fare la differenza nel mondo',
      'Guadagnare bene e crescere professionalmente',
      'Influenzare le politiche globali',
      'Scoprire nuove conoscenze e ricercare'
    ],
    weights: {
      'development': 4,
      'finance': 3,
      'diplomat': 2,
      'economist': 1
    }
  }
];

export const quizResults: Record<string, QuizResult> = {
  'economist': {
    careerType: 'Economista/Ricercatore',
    description: 'Hai una mentalità analitica e ti piace studiare i fenomeni economici. Saresti perfetto come economista internazionale o ricercatore.',
    recommendedCareers: ['1', '5'] // Economista Internazionale, Consulente Sviluppo
  },
  'development': {
    careerType: 'Cooperazione Internazionale',
    description: 'Ti muove la passione per aiutare gli altri e creare un impatto positivo nel mondo. Le carriere nella cooperazione fanno per te.',
    recommendedCareers: ['2', '5'] // Funzionario ONU, Consulente Sviluppo
  },
  'diplomat': {
    careerType: 'Diplomazia e Relazioni',
    description: 'Hai ottime capacità comunicative e diplomatiche. Potresti eccellere nelle relazioni internazionali e nella diplomazia.',
    recommendedCareers: ['4', '2'] // Diplomatico UE, Funzionario ONU
  },
  'finance': {
    careerType: 'Finanza e Business',
    description: 'Sei orientato ai risultati e interessato ai mercati. Le carriere nella finanza internazionale sono ideali per te.',
    recommendedCareers: ['3', '6'] // Analista Finanziario, Trade Specialist
  }
};
