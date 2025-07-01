
export interface NewQuizQuestion {
  id: string;
  question: string;
  options: string[];
  weights: number[]; // Array di 6 numeri per le macrocategorie
}

export interface SpecificQuestion {
  id: string;
  question: string;
  options: string[];
  weights: number[]; // Array per le sottocategorie specifiche
}

export interface MacroCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: string[];
}

export interface SubcategoryResult {
  id: string;
  name: string;
  description: string;
  details: string;
}

// Livello 1 - 7 domande generali
export const level1Questions: NewQuizQuestion[] = [
  {
    id: 'q1',
    question: 'Quale ambiente lavorativo ti ispira di più?',
    options: [
      'Numeri, mercati e investimenti',
      'Risolvere problemi aziendali',
      'Politica, diritto e relazioni internazionali',
      'Creatività, imprese e innovazione'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3], // A: Finance, Consulting, Policy, Business, Entrepreneurship, Academic
      [2, 3, 1, 3, 1, 2], // B
      [1, 1, 3, 1, 1, 3], // C
      [1, 1, 1, 3, 3, 1]  // D
    ]
  },
  {
    id: 'q2',
    question: 'Cosa ti viene più naturale quando partecipi a una sfida di gruppo?',
    options: [
      'Lavorare con numeri e grafici',
      'Suddividere compiti e guidare il gruppo',
      'Parlare con gli altri per trovare un accordo',
      'Proporre un\'idea originale'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3],
      [2, 3, 1, 3, 1, 2],
      [1, 1, 3, 1, 1, 3],
      [1, 1, 1, 3, 3, 1]
    ]
  },
  {
    id: 'q3',
    question: 'Immagina la tua giornata ideale al lavoro:',
    options: [
      'Gestire risorse e profitti',
      'Risolvere problemi complessi',
      'Lavorare per cambiare le regole',
      'Creare qualcosa di nuovo'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3],
      [2, 3, 1, 3, 1, 2],
      [1, 1, 3, 1, 1, 3],
      [1, 1, 1, 3, 3, 1]
    ]
  },
  {
    id: 'q4',
    question: 'Cosa ti viene meglio?',
    options: [
      'Analisi e attenzione ai dettagli',
      'Problem solving e comunicazione',
      'Negoziazione e mediazione',
      'Creatività e leadership'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3],
      [2, 3, 1, 3, 1, 2],
      [1, 1, 3, 1, 1, 3],
      [1, 1, 1, 3, 3, 1]
    ]
  },
  {
    id: 'q5',
    question: 'In quale ambito ti senti più portato?',
    options: [
      'Far fruttare risorse economiche',
      'Guidare le aziende',
      'Influenzare decisioni pubbliche',
      'Start-up e innovazione'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3],
      [2, 3, 1, 3, 1, 2],
      [1, 1, 3, 1, 1, 3],
      [1, 1, 1, 3, 3, 1]
    ]
  },
  {
    id: 'q6',
    question: 'Come affronti un problema complicato?',
    options: [
      'Calcolo rischi e benefici',
      'Analizzo il processo',
      'Provo a influenzare la situazione',
      'Trovo un\'idea nuova'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3],
      [2, 3, 1, 3, 1, 2],
      [1, 1, 3, 1, 1, 3],
      [1, 1, 1, 3, 3, 1]
    ]
  },
  {
    id: 'q7',
    question: 'Giornata tipo ideale?',
    options: [
      'Numeri e strategie',
      'Interazione continua',
      'Relazioni istituzionali',
      'Innovazione e decisioni'
    ],
    weights: [
      [3, 1, 0, 2, 1, 3],
      [2, 3, 1, 3, 1, 2],
      [1, 1, 3, 1, 1, 3],
      [1, 1, 1, 3, 3, 1]
    ]
  }
];

// Macro categorie
export const macroCategories: MacroCategory[] = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'Sei orientato verso il mondo finanziario, con focus su investimenti, mercati e analisi quantitative.',
    icon: '💰',
    subcategories: ['IB', 'PE', 'VC', 'HF', 'Quant', 'AM']
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Ti attrae il problem-solving strategico e il lavoro con grandi aziende per ottimizzare performance.',
    icon: '📊',
    subcategories: ['MBB', 'Big4']
  },
  {
    id: 'policy',
    name: 'Policy & Public Affairs',
    description: 'Sei interessato alle relazioni internazionali, diplomazia e impatto su politiche pubbliche.',
    icon: '🌍',
    subcategories: ['Dipl', 'Org_Int', 'Policy']
  },
  {
    id: 'business',
    name: 'Business & Industries',
    description: 'Ti piace lavorare in grandi aziende, gestire prodotti e guidare crescita in contesti strutturati.',
    icon: '🏢',
    subcategories: ['Big_Tech', 'PM', 'Corporate']
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    description: 'Hai spirito imprenditoriale e ti attrae creare, innovare e costruire nuove realtà aziendali.',
    icon: '🚀',
    subcategories: ['Start_up', 'CFO']
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Sei orientato verso ricerca, insegnamento e produzione di conoscenza nel campo economico.',
    icon: '📚',
    subcategories: ['Ricercatore', 'Giornalista']
  }
];

// Livello 2 - Domande specifiche per categoria
export const level2Questions: Record<string, SpecificQuestion[]> = {
  finance: [
    {
      id: 'f1',
      question: 'Quale attività ti attrae di più?',
      options: [
        'Fusioni e acquisizioni',
        'Investire in aziende o startup',
        'Trading sui mercati',
        'Ottimizzare portafogli finanziari'
      ],
      weights: [
        [3, 1, 0, 0, 0, 0], // IB, PE, VC, HF, Quant, AM
        [1, 3, 2, 0, 0, 1],
        [0, 0, 0, 3, 1, 2],
        [0, 0, 0, 1, 3, 3]
      ]
    },
    {
      id: 'f2',
      question: 'In quale area ti senti più a tuo agio?',
      options: [
        'Relazioni con clienti corporate',
        'Analisi di bilanci e valutazioni',
        'Monitoraggio mercati in tempo reale',
        'Costruire portafogli diversificati'
      ],
      weights: [
        [3, 1, 0, 0, 0, 0],
        [1, 3, 2, 0, 0, 1],
        [0, 0, 0, 3, 1, 2],
        [0, 0, 0, 1, 3, 3]
      ]
    },
    {
      id: 'f3',
      question: 'Cosa ti entusiasma di più nel lavoro?',
      options: [
        'Chiudere operazioni milionarie',
        'Trasformare aziende esistenti',
        'Scommettere su startup innovative',
        'Massimizzare rendimenti a lungo termine'
      ],
      weights: [
        [3, 1, 0, 0, 0, 0],
        [1, 3, 1, 0, 0, 1],
        [0, 1, 3, 0, 0, 1],
        [0, 0, 0, 2, 3, 3]
      ]
    }
  ],
  consulting: [
    {
      id: 'c1',
      question: 'Quale aspetto della consulenza ti interessa di più?',
      options: [
        'Definire strategie top-level',
        'Ottimizzare processi operativi',
        'Risolvere problemi finanziari',
        'Innovare modelli di business'
      ],
      weights: [
        [3, 1], // MBB, Big4
        [1, 3],
        [0, 3],
        [2, 1]
      ]
    },
    {
      id: 'c2',
      question: 'In che modo affronti un progetto difficile?',
      options: [
        'Scomponendolo in fasi strategiche',
        'Analizzando ogni dato',
        'Cercando alternative creative',
        'Seguendo metodi testati'
      ],
      weights: [
        [3, 1],
        [1, 3],
        [2, 1],
        [0, 3]
      ]
    },
    {
      id: 'c3',
      question: 'Cosa ti appassiona del lavoro in consulenza?',
      options: [
        'Influenzare CEO',
        'Migliorare performance aziendali',
        'Guidare trasformazioni',
        'Risolvere crisi complesse'
      ],
      weights: [
        [3, 1],
        [1, 3],
        [2, 2],
        [1, 2]
      ]
    }
  ],
  policy: [
    {
      id: 'p1',
      question: 'Quale carriera ti affascina di più?',
      options: [
        'Ambasciatore/Diplomatico',
        'Manager in organizzazioni internazionali',
        'Policy maker',
        'Comunicazione politica'
      ],
      weights: [
        [3, 1, 1], // Dipl, Org_Int, Policy
        [1, 3, 2],
        [0, 1, 3],
        [1, 2, 2]
      ]
    },
    {
      id: 'p2',
      question: 'Come preferisci influenzare la società?',
      options: [
        'Mediazione tra stati',
        'Campagne globali',
        'Scrittura leggi',
        'Educazione pubblica'
      ],
      weights: [
        [3, 1, 0],
        [1, 3, 1],
        [0, 1, 3],
        [1, 2, 2]
      ]
    },
    {
      id: 'p3',
      question: 'Cosa ti entusiasma nel settore pubblico?',
      options: [
        'Risolvere crisi internazionali',
        'Lavorare su temi globali',
        'Creare politiche nazionali',
        'Comunicare riforme'
      ],
      weights: [
        [3, 1, 0],
        [1, 3, 1],
        [0, 1, 3],
        [1, 2, 2]
      ]
    }
  ],
  entrepreneurship: [
    {
      id: 'e1',
      question: 'Quale ruolo in una startup ti attira di più?',
      options: [
        'Lanciare un\'idea rivoluzionaria',
        'Motore operativo',
        'Sviluppare un prodotto innovativo',
        'Controllo costi e budget'
      ],
      weights: [
        [3, 1], // Start_up, CFO
        [2, 3],
        [3, 2],
        [1, 3]
      ]
    },
    {
      id: 'e2',
      question: 'Qual è la tua forza principale?',
      options: [
        'Trovare finanziamenti',
        'Gestire i conti',
        'Anticipare bisogni',
        'Strategie a lungo termine'
      ],
      weights: [
        [3, 1],
        [1, 3],
        [3, 2],
        [1, 3]
      ]
    },
    {
      id: 'e3',
      question: 'Cosa ti motiva in un progetto?',
      options: [
        'Lanciare qualcosa di nuovo',
        'Migliorare l\'efficienza',
        'Convincere investitori',
        'Previsioni economiche'
      ],
      weights: [
        [3, 1],
        [1, 3],
        [3, 2],
        [1, 3]
      ]
    }
  ],
  business: [
    {
      id: 'b1',
      question: 'Quale area lavorativa ti attira di più?',
      options: [
        'Tecnologia d\'avanguardia',
        'Gestione progetti complessi',
        'Efficienza interna',
        'Sviluppo team'
      ],
      weights: [
        [3, 1, 1], // Big_Tech, PM, Corporate
        [1, 3, 2],
        [0, 1, 3],
        [2, 2, 2]
      ]
    },
    {
      id: 'b2',
      question: 'Quale competenza ti rappresenta meglio?',
      options: [
        'Innovazione di prodotto',
        'Coordinamento tempistiche',
        'Ottimizzazione risorse',
        'Leadership cross-funzionale'
      ],
      weights: [
        [3, 1, 1],
        [1, 3, 1],
        [0, 1, 3],
        [2, 2, 2]
      ]
    },
    {
      id: 'b3',
      question: 'Cosa ti entusiasma di più?',
      options: [
        'Tecnologie rivoluzionarie',
        'Progetti iconici',
        'Redditività',
        'Trasformazioni aziendali'
      ],
      weights: [
        [3, 1, 1],
        [1, 3, 1],
        [0, 1, 3],
        [2, 2, 2]
      ]
    }
  ],
  academic: [
    {
      id: 'a1',
      question: 'Quale profilo ti rappresenta di più?',
      options: [
        'Studioso',
        'Reporter',
        'Analista',
        'Comunicatore'
      ],
      weights: [
        [3, 1], // Ricercatore, Giornalista
        [1, 3],
        [3, 2],
        [1, 3]
      ]
    },
    {
      id: 'a2',
      question: 'Quale attività ti incuriosisce di più?',
      options: [
        'Scrivere articoli tecnici',
        'Intervistare e raccontare',
        'Studiare tendenze',
        'Spiegare temi complessi'
      ],
      weights: [
        [3, 1],
        [1, 3],
        [2, 2],
        [1, 3]
      ]
    },
    {
      id: 'a3',
      question: 'Cosa ti entusiasma nel lavoro ideale?',
      options: [
        'Fare ricerca',
        'Dare voce',
        'Interpretare i cambiamenti',
        'Scrivere in tempo reale'
      ],
      weights: [
        [3, 0],
        [1, 3],
        [2, 2],
        [0, 3]
      ]
    }
  ]
};

// Risultati delle sottocategorie
export const subcategoryResults: Record<string, SubcategoryResult> = {
  // Finance
  IB: {
    id: 'IB',
    name: 'Investment Banking',
    description: 'Advisor per M&A, IPO e grandi transazioni corporate',
    details: 'Lavorerai su deal multimiliardari, advisory strategica e capital markets. Ambiente ad alta pressione con compensation elevata.'
  },
  PE: {
    id: 'PE',
    name: 'Private Equity',
    description: 'Investimenti in aziende mature con focus su value creation',
    details: 'Acquisirai e svilupperai aziende attraverso capitale proprio, con focus su crescita operativa e exit strategiche.'
  },
  VC: {
    id: 'VC',
    name: 'Venture Capital',
    description: 'Finanziamento di startup innovative in fase early-stage',
    details: 'Identificherai e finanzierai le startup del futuro, lavorando a stretto contatto con founder e innovatori.'
  },
  HF: {
    id: 'HF',
    name: 'Hedge Funds',
    description: 'Gestione di fondi speculativi ad alto rendimento',
    details: 'Strategie di investimento sofisticate per massimizzare i rendimenti attraverso diversi strumenti finanziari.'
  },
  Quant: {
    id: 'Quant',
    name: 'Quantitative Finance',
    description: 'Modelli matematici per trading e gestione del rischio',
    details: 'Svilupperai algoritmi di trading e modelli di pricing utilizzando matematica avanzata e programmazione.'
  },
  AM: {
    id: 'AM',
    name: 'Asset Management',
    description: 'Gestione professionale di portafogli di investimento',
    details: 'Costruirai e gestirai portafogli diversificati per clienti istituzionali e privati.'
  },
  
  // Consulting
  MBB: {
    id: 'MBB',
    name: 'Top Tier Strategy (MBB)',
    description: 'McKinsey, Bain, BCG - strategia per Fortune 500',
    details: 'Consulenza strategica di alto livello per le maggiori multinazionali e governi. Crescita rapida e network globale.'
  },
  Big4: {
    id: 'Big4',
    name: 'Big Four Consulting',
    description: 'Deloitte, PwC, EY, KPMG - servizi integrati',
    details: 'Ampia gamma di servizi: audit, tax, advisory, digital transformation. Ottime opportunità di specializzazione.'
  },
  
  // Policy
  Dipl: {
    id: 'Dipl',
    name: 'Diplomatic Career',
    description: 'Carriera diplomatica in ambasciate e consolati',
    details: 'Rappresenterai il tuo paese all\'estero, gestendo relazioni bilaterali e promuovendo interessi nazionali.'
  },
  Org_Int: {
    id: 'Org_Int',
    name: 'International Organizations',
    description: 'ONU, UE, organismi internazionali',
    details: 'Lavorerai su temi globali: pace, sviluppo, diritti umani. Impatto su scala mondiale attraverso cooperazione multilaterale.'
  },
  Policy: {
    id: 'Policy',
    name: 'Policy Research & Analysis',
    description: 'Think tank, ricerca e analisi di politiche pubbliche',
    details: 'Analizzerai e influenzerai politiche pubbliche attraverso ricerca e advocacy in centri studi prestigiosi.'
  },
  
  // Business
  Big_Tech: {
    id: 'Big_Tech',
    name: 'Big Tech Companies',
    description: 'FAANG/MAMAA - Google, Meta, Amazon, Apple',
    details: 'Lavorerai per i giganti tecnologici globali su prodotti utilizzati da miliardi di persone.'
  },
  PM: {
    id: 'PM',
    name: 'Product Management',
    description: 'Gestione e sviluppo di prodotti digitali',
    details: 'Definirai roadmap di prodotto, lavorerai con engineering e design per creare soluzioni innovative.'
  },
  Corporate: {
    id: 'Corporate',
    name: 'Corporate Strategy',
    description: 'Strategia aziendale in grandi corporation',
    details: 'Guiderai iniziative strategiche, M&A e trasformazioni aziendali in multinazionali consolidate.'
  },
  
  // Entrepreneurship
  Start_up: {
    id: 'Start_up',
    name: 'Startup Founder',
    description: 'Fondare e guidare startup innovative',
    details: 'Creerai prodotti disruptive, gestirai team di sviluppo e cercherai investimenti per la crescita.'
  },
  CFO: {
    id: 'CFO',
    name: 'Startup CFO',
    description: 'Chief Financial Officer per startup in crescita',
    details: 'Gestirai finanze, fundraising e strategia finanziaria per startup ad alto potenziale di crescita.'
  },
  
  // Academic
  Ricercatore: {
    id: 'Ricercatore',
    name: 'Economic Researcher',
    description: 'Ricercatore economico accademico',
    details: 'Condurrai ricerca originale in economia, pubblicherai su riviste peer-reviewed e influenzerai il dibattito accademico.'
  },
  Giornalista: {
    id: 'Giornalista',
    name: 'Economic Journalist',
    description: 'Giornalista economico specializzato',
    details: 'Analizzerai e comunicherai trend economici al pubblico attraverso media tradizionali e digitali.'
  }
};
