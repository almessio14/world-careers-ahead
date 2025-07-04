
import { useState } from 'react';

export type QuizPhase = 'main' | 'specific' | 'result';

export interface QuizOption {
  text: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface QuizState {
  phase: QuizPhase;
  currentQuestionIndex: number;
  mainScores: Record<string, number>;
  specificScores: Record<string, number>;
  selectedCategory: string;
  currentSpecificQuestions: QuizQuestion[];
  specificQuestionIndex: number;
  showResults: boolean;
  finalMicroCategory: string;
}

export const useSimpleQuizLogic = () => {
  // Dati delle domande principali (prime 7)
  const mainQuestions: QuizQuestion[] = [
    {
      question: "Quale ambiente lavorativo ti ispira di più?",
      options: [
        { text: "Numeri, mercati e investimenti", scores: { Finance: 3, Consulting: 1, Policy: 0, Business: 1, Entrepreneurship: 1, Academic: 2 } },
        { text: "Risolvere problemi aziendali", scores: { Finance: 1, Consulting: 3, Policy: 1, Business: 3, Entrepreneurship: 0, Academic: 1 } },
        { text: "Politica, diritto e relazioni internazionali", scores: { Finance: 0, Consulting: 1, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 3 } },
        { text: "Creatività, imprese e innovazione", scores: { Finance: 0, Consulting: 0, Policy: 0, Business: 3, Entrepreneurship: 3, Academic: 0 } }
      ]
    },
    {
      question: "Cosa ti viene più naturale quando partecipi a una sfida di gruppo?",
      options: [
        { text: "Lavorare con numeri e grafici per capire la situazione", scores: { Finance: 3, Consulting: 0, Policy: 0, Business: 1, Entrepreneurship: 0, Academic: 3 } },
        { text: "Suddividere compiti e guidare il gruppo verso l'obiettivo", scores: { Finance: 1, Consulting: 3, Policy: 1, Business: 3, Entrepreneurship: 1, Academic: 1 } },
        { text: "Parlare con gli altri per trovare un accordo", scores: { Finance: 0, Consulting: 1, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 3 } },
        { text: "Proporre un'idea originale e prendere l'iniziativa", scores: { Finance: 0, Consulting: 1, Policy: 0, Business: 2, Entrepreneurship: 3, Academic: 0 } }
      ]
    },
    {
      question: "Immagina la tua giornata ideale al lavoro: cosa ti piacerebbe fare di più?",
      options: [
        { text: "Gestire risorse e far crescere i profitti", scores: { Finance: 3, Consulting: 0, Policy: 0, Business: 2, Entrepreneurship: 0, Academic: 2 } },
        { text: "Risolvere problemi complessi e trovare soluzioni", scores: { Finance: 1, Consulting: 3, Policy: 1, Business: 3, Entrepreneurship: 1, Academic: 1 } },
        { text: "Lavorare per cambiare le regole e aiutare la società", scores: { Finance: 0, Consulting: 0, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 3 } },
        { text: "Creare qualcosa di nuovo che non esiste ancora", scores: { Finance: 0, Consulting: 1, Policy: 0, Business: 2, Entrepreneurship: 3, Academic: 0 } }
      ]
    },
    {
      question: "Cosa ti viene meglio?",
      options: [
        { text: "Analisi e attenzione ai dettagli", scores: { Finance: 3, Consulting: 1, Policy: 0, Business: 1, Entrepreneurship: 0, Academic: 2 } },
        { text: "Problem solving e comunicazione", scores: { Finance: 1, Consulting: 3, Policy: 1, Business: 2, Entrepreneurship: 1, Academic: 1 } },
        { text: "Negoziazione e mediazione", scores: { Finance: 0, Consulting: 0, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 1 } },
        { text: "Creatività e leadership", scores: { Finance: 0, Consulting: 1, Policy: 0, Business: 3, Entrepreneurship: 3, Academic: 0 } }
      ]
    },
    {
      question: "In quale di questi ambiti ti senti più portato a eccellere?",
      options: [
        { text: "Controllare e far fruttare al meglio le risorse economiche", scores: { Finance: 3, Consulting: 0, Policy: 0, Business: 2, Entrepreneurship: 0, Academic: 1 } },
        { text: "Guidare le aziende verso nuovi traguardi", scores: { Finance: 1, Consulting: 3, Policy: 0, Business: 3, Entrepreneurship: 1, Academic: 0 } },
        { text: "Influenzare decisioni pubbliche e normative", scores: { Finance: 0, Consulting: 0, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 2 } },
        { text: "Dare vita a start-up o progetti innovativi", scores: { Finance: 0, Consulting: 1, Policy: 0, Business: 1, Entrepreneurship: 3, Academic: 0 } }
      ]
    },
    {
      question: "Quando incontri un problema complicato, come ti comporti?",
      options: [
        { text: "Calcolo rischi e benefici per decidere in modo sicuro", scores: { Finance: 3, Consulting: 1, Policy: 0, Business: 1, Entrepreneurship: 0, Academic: 1 } },
        { text: "Analizzo il processo per capire dove migliorare", scores: { Finance: 1, Consulting: 3, Policy: 1, Business: 3, Entrepreneurship: 1, Academic: 0 } },
        { text: "Provo a influenzare chi può cambiare la situazione", scores: { Finance: 0, Consulting: 0, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 2 } },
        { text: "Trovo un'idea nuova e passo subito all'azione", scores: { Finance: 0, Consulting: 1, Policy: 0, Business: 2, Entrepreneurship: 2, Academic: 0 } }
      ]
    },
    {
      question: "Se dovessi scegliere una giornata tipo, quale ti suona meglio?",
      options: [
        { text: "Focalizzato su numeri e strategie", scores: { Finance: 3, Consulting: 0, Policy: 0, Business: 1, Entrepreneurship: 0, Academic: 2 } },
        { text: "Variegato, con interazione continua", scores: { Finance: 1, Consulting: 3, Policy: 1, Business: 3, Entrepreneurship: 1, Academic: 1 } },
        { text: "Relazioni istituzionali e comunicazione", scores: { Finance: 0, Consulting: 0, Policy: 3, Business: 0, Entrepreneurship: 0, Academic: 2 } },
        { text: "Dinamico, innovazione e decisioni", scores: { Finance: 0, Consulting: 1, Policy: 0, Business: 2, Entrepreneurship: 2, Academic: 0 } }
      ]
    }
  ];

  // Domande specifiche per categoria
  const specificQuestions: Record<string, QuizQuestion[]> = {
    Finance: [
      {
        question: "Quale attività ti attrae di più?",
        options: [
          { text: "Fusioni e acquisizioni", scores: { IB: 3, PE: 1, VC: 0, HF: 0, Quant: 0, AM: 0 } },
          { text: "Investire in aziende o startup", scores: { IB: 1, PE: 3, VC: 2, HF: 0, Quant: 0, AM: 1 } },
          { text: "Trading sui mercati", scores: { IB: 0, PE: 0, VC: 0, HF: 3, Quant: 1, AM: 2 } },
          { text: "Ottimizzare portafogli finanziari", scores: { IB: 0, PE: 0, VC: 0, HF: 1, Quant: 2, AM: 2 } }
        ]
      },
      {
        question: "In quale area ti senti più a tuo agio?",
        options: [
          { text: "Relazioni con clienti corporate", scores: { IB: 3, PE: 1, VC: 0, HF: 0, Quant: 0, AM: 0 } },
          { text: "Analisi di bilanci e valutazioni", scores: { IB: 1, PE: 3, VC: 2, HF: 0, Quant: 0, AM: 1 } },
          { text: "Monitoraggio mercati in tempo reale", scores: { IB: 0, PE: 0, VC: 0, HF: 3, Quant: 1, AM: 2 } },
          { text: "Costruire portafogli diversificati", scores: { IB: 0, PE: 0, VC: 0, HF: 1, Quant: 2, AM: 2 } }
        ]
      },
      {
        question: "Cosa ti entusiasma di più nel lavoro?",
        options: [
          { text: "Chiudere operazioni milionarie", scores: { IB: 3, PE: 1, VC: 0, HF: 0, Quant: 0, AM: 0 } },
          { text: "Trasformare aziende esistenti", scores: { IB: 1, PE: 3, VC: 1, HF: 0, Quant: 0, AM: 1 } },
          { text: "Scommettere su startup innovative", scores: { IB: 0, PE: 1, VC: 3, HF: 0, Quant: 0, AM: 1 } },
          { text: "Massimizzare rendimenti a lungo termine", scores: { IB: 0, PE: 0, VC: 0, HF: 2, Quant: 2, AM: 2 } }
        ]
      }
    ],
    Consulting: [
      {
        question: "Quale aspetto della consulenza ti interessa di più?",
        options: [
          { text: "Definire strategie top-level", scores: { MBB: 3, Big4: 1 } },
          { text: "Ottimizzare processi operativi", scores: { MBB: 1, Big4: 3 } },
          { text: "Risolvere problemi finanziari", scores: { MBB: 0, Big4: 3 } },
          { text: "Innovare modelli di business", scores: { MBB: 2, Big4: 1 } }
        ]
      },
      {
        question: "In che modo affronti un progetto difficile?",
        options: [
          { text: "Scomponendolo in fasi strategiche", scores: { MBB: 3, Big4: 1 } },
          { text: "Analizzando ogni dato per prendere decisioni concrete", scores: { MBB: 1, Big4: 3 } },
          { text: "Cercando alternative creative con il team", scores: { MBB: 2, Big4: 1 } },
          { text: "Seguendo metodi già testati e collaborando con i team operativi", scores: { MBB: 0, Big4: 3 } }
        ]
      },
      {
        question: "Cosa ti appassiona del lavoro in consulenza?",
        options: [
          { text: "Influenzare CEO", scores: { MBB: 3, Big4: 1 } },
          { text: "Migliorare performance aziendali", scores: { MBB: 1, Big4: 3 } },
          { text: "Guidare trasformazioni", scores: { MBB: 2, Big4: 2 } },
          { text: "Risolvere crisi complesse", scores: { MBB: 1, Big4: 2 } }
        ]
      }
    ],
    Policy: [
      {
        question: "Quale carriera ti affascina di più?",
        options: [
          { text: "Ambasciatore/Diplomatico", scores: { Dipl: 3, Org_Int: 1, Policy: 1 } },
          { text: "Manager in organizzazioni internazionali", scores: { Dipl: 1, Org_Int: 3, Policy: 2 } },
          { text: "Legislatore o policy maker", scores: { Dipl: 0, Org_Int: 1, Policy: 3 } },
          { text: "Esperto in comunicazione politica e istituzionale", scores: { Dipl: 1, Org_Int: 2, Policy: 2 } }
        ]
      },
      {
        question: "Come preferisci influenzare la società?",
        options: [
          { text: "Mediazione tra stati", scores: { Dipl: 3, Org_Int: 1, Policy: 0 } },
          { text: "Campagne globali", scores: { Dipl: 1, Org_Int: 3, Policy: 1 } },
          { text: "Scrittura leggi", scores: { Dipl: 0, Org_Int: 1, Policy: 3 } },
          { text: "Educazione pubblica", scores: { Dipl: 1, Org_Int: 2, Policy: 2 } }
        ]
      },
      {
        question: "Cosa ti entusiasma nel settore pubblico?",
        options: [
          { text: "Risolvere crisi internazionali", scores: { Dipl: 3, Org_Int: 1, Policy: 0 } },
          { text: "Lavorare su temi globali", scores: { Dipl: 1, Org_Int: 3, Policy: 1 } },
          { text: "Creare politiche nazionali", scores: { Dipl: 0, Org_Int: 1, Policy: 3 } },
          { text: "Comunicare riforme", scores: { Dipl: 1, Org_Int: 2, Policy: 2 } }
        ]
      }
    ],
    Business: [
      {
        question: "Quale area lavorativa ti attira di più?",
        options: [
          { text: "Tecnologia d'avanguardia", scores: { Big_Tech: 3, PM: 1, Corporate: 1, Marketing: 1, HR: 0 } },
          { text: "Gestione progetti complessi", scores: { Big_Tech: 1, PM: 3, Corporate: 2, Marketing: 1, HR: 1 } },
          { text: "Lavorare su efficienza e risultati aziendali", scores: { Big_Tech: 0, PM: 1, Corporate: 3, Marketing: 1, HR: 1 } },
          { text: "Sviluppo dei team e gestione delle persone", scores: { Big_Tech: 1, PM: 2, Corporate: 2, Marketing: 1, HR: 3 } }
        ]
      },
      {
        question: "Quale competenza ti rappresenta meglio?",
        options: [
          { text: "Innovazione di prodotto", scores: { Big_Tech: 3, PM: 1, Corporate: 1, Marketing: 2, HR: 0 } },
          { text: "Coordinamento tempistiche", scores: { Big_Tech: 1, PM: 3, Corporate: 1, Marketing: 1, HR: 1 } },
          { text: "Ottimizzazione risorse", scores: { Big_Tech: 0, PM: 1, Corporate: 3, Marketing: 1, HR: 1 } },
          { text: "Leadership", scores: { Big_Tech: 2, PM: 2, Corporate: 2, Marketing: 1, HR: 2 } }
        ]
      },
      {
        question: "Cosa ti entusiasma maggiormente?",
        options: [
          { text: "Creare tecnologie rivoluzionarie", scores: { Big_Tech: 3, PM: 1, Corporate: 1, Marketing: 1, HR: 0 } },
          { text: "Seguire le fasi fino al lancio di un prodotto", scores: { Big_Tech: 1, PM: 3, Corporate: 1, Marketing: 1, HR: 1 } },
          { text: "Aumentare la redditività", scores: { Big_Tech: 0, PM: 1, Corporate: 3, Marketing: 2, HR: 1 } },
          { text: "Guidare trasformazioni aziendali", scores: { Big_Tech: 2, PM: 2, Corporate: 2, Marketing: 2, HR: 2 } }
        ]
      }
    ],
    Entrepreneurship: [
      {
        question: "Quale ruolo in una startup ti attira di più?",
        options: [
          { text: "Lanciare un'idea rivoluzionaria", scores: { "Start-up": 3, CFO: 1 } },
          { text: "Essere il motore operativo che tiene tutto insieme", scores: { "Start-up": 2, CFO: 3 } },
          { text: "Sviluppare un prodotto innovativo", scores: { "Start-up": 3, CFO: 2 } },
          { text: "Tenere sotto controllo costi e budget", scores: { "Start-up": 1, CFO: 3 } }
        ]
      },
      {
        question: "Qual è la tua forza principale?",
        options: [
          { text: "Trovare finanziamenti", scores: { "Start-up": 3, CFO: 1 } },
          { text: "Gestire i conti con precisione", scores: { "Start-up": 1, CFO: 3 } },
          { text: "Anticipare i bisogni del mercato", scores: { "Start-up": 3, CFO: 2 } },
          { text: "Pianificare strategie a lungo termine", scores: { "Start-up": 1, CFO: 3 } }
        ]
      },
      {
        question: "Cosa ti motiva di più nel creare un progetto?",
        options: [
          { text: "Lanciare qualcosa che prima non esisteva", scores: { "Start-up": 3, CFO: 1 } },
          { text: "Migliorare l'efficienza del sistema aziendale", scores: { "Start-up": 1, CFO: 3 } },
          { text: "Convincere investitori e partner", scores: { "Start-up": 3, CFO: 2 } },
          { text: "Fare previsioni economiche accurate", scores: { "Start-up": 1, CFO: 3 } }
        ]
      }
    ],
    Academic: [
      {
        question: "Quale profilo ti rappresenta di più?",
        options: [
          { text: "Studioso che approfondisce temi complessi e li analizza", scores: { Ricercatore: 3, Giornalista: 1 } },
          { text: "Reporter che scopre e racconta ciò che accade nel mondo", scores: { Ricercatore: 1, Giornalista: 3 } },
          { text: "Analista che raccoglie dati complessi", scores: { Ricercatore: 3, Giornalista: 2 } },
          { text: "Comunicatore che divulga al grande pubblico", scores: { Ricercatore: 1, Giornalista: 3 } }
        ]
      },
      {
        question: "Quale attività ti incuriosisce di più?",
        options: [
          { text: "Scrivere articoli tecnici e report approfonditi", scores: { Ricercatore: 3, Giornalista: 1 } },
          { text: "Intervistare persone e raccontare la realtà", scores: { Ricercatore: 1, Giornalista: 3 } },
          { text: "Studiare tendenze sociali e culturali", scores: { Ricercatore: 2, Giornalista: 2 } },
          { text: "Spiegare in modo chiaro temi complessi", scores: { Ricercatore: 1, Giornalista: 3 } }
        ]
      },
      {
        question: "Cosa ti entusiasma nel tuo lavoro ideale?",
        options: [
          { text: "Fare ricerca e scoprire qualcosa di nuovo", scores: { Ricercatore: 3, Giornalista: 0 } },
          { text: "Dare voce a chi non ce l'ha", scores: { Ricercatore: 1, Giornalista: 3 } },
          { text: "Interpretare e spiegare i cambiamenti del mondo", scores: { Ricercatore: 2, Giornalista: 2 } },
          { text: "Scrivere per informare in tempo reale", scores: { Ricercatore: 0, Giornalista: 3 } }
        ]
      }
    ]
  };

  const [state, setState] = useState<QuizState>({
    phase: 'main',
    currentQuestionIndex: 0,
    mainScores: { Finance: 0, Consulting: 0, Policy: 0, Business: 0, Entrepreneurship: 0, Academic: 0 },
    specificScores: {},
    selectedCategory: '',
    currentSpecificQuestions: [],
    specificQuestionIndex: 0,
    showResults: false,
    finalMicroCategory: ''
  });

  const categoryMapping: Record<string, string> = {
    Finance: 'finance',
    Consulting: 'consulting',
    Policy: 'policy',
    Business: 'business',
    Entrepreneurship: 'entrepreneurship',
    Academic: 'academic'
  };

  const selectMainAnswer = (optionIndex: number) => {
    const question = mainQuestions[state.currentQuestionIndex];
    const selectedOption = question.options[optionIndex];
    
    const newScores = { ...state.mainScores };
    for (const [category, score] of Object.entries(selectedOption.scores)) {
      newScores[category] += score;
    }
    
    if (state.currentQuestionIndex >= 6) {
      const winner = Object.keys(newScores).reduce((a, b) => 
        newScores[a] > newScores[b] ? a : b
      );
      
      const questionsForCategory = specificQuestions[winner];
      const firstQuestion = questionsForCategory[0];
      const categories = Object.keys(firstQuestion.options[0].scores);
      const initScores: Record<string, number> = {};
      categories.forEach(cat => initScores[cat] = 0);
      
      setState(prev => ({
        ...prev,
        mainScores: newScores,
        selectedCategory: winner,
        phase: 'specific',
        currentSpecificQuestions: questionsForCategory,
        specificScores: initScores
      }));
    } else {
      setState(prev => ({
        ...prev,
        mainScores: newScores,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const selectSpecificAnswer = (optionIndex: number) => {
    const question = state.currentSpecificQuestions[state.specificQuestionIndex];
    const selectedOption = question.options[optionIndex];
    
    const newScores = { ...state.specificScores };
    for (const [category, score] of Object.entries(selectedOption.scores)) {
      newScores[category] += score;
    }
    
    if (state.specificQuestionIndex >= 2) {
      const winner = Object.keys(newScores).reduce((a, b) => 
        newScores[a] > newScores[b] ? a : b
      );
      
      setState(prev => ({
        ...prev,
        specificScores: newScores,
        finalMicroCategory: winner,
        showResults: true,
        phase: 'result'
      }));
    } else {
      setState(prev => ({
        ...prev,
        specificScores: newScores,
        specificQuestionIndex: prev.specificQuestionIndex + 1
      }));
    }
  };

  const restartQuiz = () => {
    setState({
      phase: 'main',
      currentQuestionIndex: 0,
      mainScores: { Finance: 0, Consulting: 0, Policy: 0, Business: 0, Entrepreneurship: 0, Academic: 0 },
      specificScores: {},
      selectedCategory: '',
      currentSpecificQuestions: [],
      specificQuestionIndex: 0,
      showResults: false,
      finalMicroCategory: ''
    });
  };

  // Convert to format expected by existing components
  const getCurrentQuestion = () => {
    if (state.phase === 'main') {
      return mainQuestions[state.currentQuestionIndex];
    } else {
      return state.currentSpecificQuestions[state.specificQuestionIndex];
    }
  };

  const getTotalQuestions = () => {
    return state.phase === 'main' ? 7 : 3;
  };

  const getCurrentQuestionNumber = () => {
    if (state.phase === 'main') {
      return state.currentQuestionIndex + 1;
    } else {
      return state.specificQuestionIndex + 1;
    }
  };

  const getProgress = () => {
    if (state.phase === 'main') {
      return (state.currentQuestionIndex / 7) * 50; // First 50% for main questions
    } else {
      return 50 + (state.specificQuestionIndex / 3) * 50; // Second 50% for specific questions
    }
  };

  return {
    state,
    selectMainAnswer,
    selectSpecificAnswer,
    restartQuiz,
    getCurrentQuestion,
    getTotalQuestions,
    getCurrentQuestionNumber,
    getProgress,
    categoryMapping,
    mainQuestions
  };
};
