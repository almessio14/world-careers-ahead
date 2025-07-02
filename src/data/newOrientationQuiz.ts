
export interface NewQuizQuestion {
  id: string;
  question: string;
  options: string[];
  weights: number[][]; // Array of arrays for each option's weights
}

export interface SpecificQuestion {
  id: string;
  question: string;
  options: string[];
  weights: number[][]; // Array of arrays for each option's weights
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
      'Lavorare con numeri e grafici per capire la situazione',
      'Suddividere compiti e guidare il gruppo',
      'Parlare con gli altri per trovare un accordo',
      'Proporre un\'idea originale e prendere l\'iniziativa'
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
    question: 'Immagina la tua giornata ideale al lavoro: cosa ti piacerebbe fare di più?',
    options: [
      'Gestire risorse e far crescere i profitti',
      'Risolvere problemi complessi e trovare soluzioni',
      'Lavorare per cambiare le regole e aiutare la società',
      'Creare qualcosa di nuovo che non esiste ancora'
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
    question: 'In quale di questi ambiti ti senti più portato a eccellere?',
    options: [
      'Controllare e far fruttare al meglio le risorse economiche',
      'Guidare le aziende verso nuovi traguardi',
      'Influenzare decisioni pubbliche e normative',
      'Dare vita a start-up o progetti innovativi'
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
    question: 'Quando incontri un problema complicato, come ti comporti?',
    options: [
      'Calcolo rischi e benefici per decidere in modo sicuro',
      'Analizzo il processo per capire dove migliorare',
      'Provo a influenzare chi può cambiare la situazione',
      'Trovo un\'idea nuova e passo subito all\'azione'
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
    question: 'Se dovessi scegliere una giornata tipo, quale ti suona meglio?',
    options: [
      'Focalizzato su numeri e strategie',
      'Variegato, con interazione continua',
      'Relazioni istituzionali e comunicazione',
      'Dinamico, innovazione e decisioni'
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
    name: 'FINANCE',
    description: 'Il mondo della finanza è fatto per chi ama l\'analisi, la strategia e l\'impatto concreto. Che tu voglia lavorare in banca d\'investimento, in fondi di private equity o nelle startup del futuro, troverai ambienti competitivi, ritmi alti e grandi opportunità di crescita (e guadagno).',
    icon: '💰',
    subcategories: ['IB', 'PE', 'VC', 'HF', 'Quant', 'AM']
  },
  {
    id: 'consulting',
    name: 'CONSULTING',
    description: 'Se ti piace risolvere problemi, lavorare in team e affrontare sfide sempre nuove, la consulenza è la tua palestra ideale. Dai bilanci alla strategia, ti confronterai con clienti reali, in progetti che cambiano di continuo e accelerano il tuo sviluppo professionale.',
    icon: '📊',
    subcategories: ['MBB', 'Big4']
  },
  {
    id: 'policy',
    name: 'POLICY & PUBLIC AFFAIRS',
    description: 'Vuoi contribuire al bene pubblico, influenzare decisioni politiche o rappresentare il tuo Paese? In questa area lavori in contesti internazionali, istituzionali e multilaterali, con un impatto diretto su società, economia e ambiente.',
    icon: '🌍',
    subcategories: ['Dipl', 'Org_Int', 'Policy']
  },
  {
    id: 'business',
    name: 'BUSINESS & INDUSTRIES',
    description: 'Grandi aziende e industrie innovative cercano menti brillanti per ruoli di gestione, analisi e operatività. Se vuoi vedere il risultato concreto del tuo lavoro e contribuire allo sviluppo di prodotti e servizi globali, questo è il tuo spazio.',
    icon: '🏢',
    subcategories: ['Big_Tech', 'PM', 'Corporate']
  },
  {
    id: 'entrepreneurship',
    name: 'ENTREPRENEURSHIP',
    description: 'Hai spirito di iniziativa, vuoi costruire qualcosa di tuo o guidare la crescita di un\'impresa? Dal lanciare una start-up al gestire le finanze aziendali, l\'imprenditorialità richiede visione, coraggio e capacità manageriali.',
    icon: '🚀',
    subcategories: ['Start_up', 'CFO']
  },
  {
    id: 'academic',
    name: 'ACADEMIC & MEDIA',
    description: 'Se ti appassiona il sapere, la ricerca o il racconto dei fatti, puoi seguire la via dell\'accademia o del giornalismo. Due mondi diversi, ma uniti dalla voglia di capire, spiegare e generare impatto culturale e sociale.',
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
        'Analizzando ogni dato per prendere decisioni concrete',
        'Cercando alternative creative con il team',
        'Seguendo metodi già testati e collaborando con i team operativi'
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
        'Influenzare scelte di dirigenti',
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
        'Legislatore o policy maker',
        'Esperto in comunicazione politica e istituzionale'
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
        'Essere il motore operativo che tiene tutto insieme',
        'Sviluppare un prodotto innovativo',
        'Tenere sotto controllo costi e budget'
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
        'Gestire i conti con precisione',
        'Anticipare bisogni',
        'Pianificare strategie a lungo termine'
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
        'Lanciare qualcosa che prima non esisteva',
        'Migliorare l\'efficienza del sistema aziendale',
        'Convincere investitori e partner',
        'Fare previsioni economiche accurate'
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
        'Lavorare sull\'efficienza interna e i risultati aziendali',
        'Sviluppo dei team e gestione delle persone'
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
        'Leadership'
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
      question: 'Cosa ti entusiasma maggiormente?',
      options: [
        'Creare tecnologie rivoluzionarie',
        'Guidare il lancio di nuovi prodotti',
        'Aumentare i guadagni',
        'Guidare trasformazioni aziendali'
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
        'Studioso che approfondisce temi complessi e li analizza',
        'Reporter che scopre e racconta ciò che accade nel mondo',
        'Analista che raccoglie dati complessi',
        'Comunicatore che divulga al grande pubblico'
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
        'Scrivere articoli tecnici e report approfonditi',
        'Intervistare persone e raccontare la realtà',
        'Studiare tendenze sociali e culturali',
        'Spiegare in modo chiaro temi complessi'
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
        'Fare ricerca e scoprire qualcosa di nuovo',
        'Dare voce a chi non ce l\'ha',
        'Interpretare e spiegare i cambiamenti del mondo',
        'Scrivere per informare in tempo reale'
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
