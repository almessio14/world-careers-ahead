
import { useState } from 'react';

export type QuizPhase = 'main' | 'result';

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
  selectedCategory: string;
  showResults: boolean;
}

export const useSimpleQuizLogic = () => {
  // Dati delle domande principali (7 domande)
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

  const [state, setState] = useState<QuizState>({
    phase: 'main',
    currentQuestionIndex: 0,
    mainScores: { Finance: 0, Consulting: 0, Policy: 0, Business: 0, Entrepreneurship: 0, Academic: 0 },
    selectedCategory: '',
    showResults: false
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
      
      setState(prev => ({
        ...prev,
        mainScores: newScores,
        selectedCategory: winner,
        showResults: true,
        phase: 'result'
      }));
    } else {
      setState(prev => ({
        ...prev,
        mainScores: newScores,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const restartQuiz = () => {
    setState({
      phase: 'main',
      currentQuestionIndex: 0,
      mainScores: { Finance: 0, Consulting: 0, Policy: 0, Business: 0, Entrepreneurship: 0, Academic: 0 },
      selectedCategory: '',
      showResults: false
    });
  };

  // Convert to format expected by existing components
  const getCurrentQuestion = () => {
    return mainQuestions[state.currentQuestionIndex];
  };

  const getTotalQuestions = () => {
    return 7;
  };

  const getCurrentQuestionNumber = () => {
    return state.currentQuestionIndex + 1;
  };

  const getProgress = () => {
    return ((state.currentQuestionIndex + 1) / 7) * 100;
  };

  return {
    state,
    selectMainAnswer,
    restartQuiz,
    getCurrentQuestion,
    getTotalQuestions,
    getCurrentQuestionNumber,
    getProgress,
    categoryMapping,
    mainQuestions
  };
};
