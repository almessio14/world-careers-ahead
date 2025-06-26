
export interface OrientationQuestion {
  id: string;
  question: string;
  options: string[];
  weights: Record<string, number>;
}

export interface SubsectionQuestion {
  id: string;
  question: string;
  options: string[];
  weights: Record<string, number>;
}

export interface MacroAreaResult {
  name: string;
  description: string;
  icon: string;
}

export interface SubsectionResult {
  name: string;
  description: string;
  details: string;
}

// Livello 1 - Domande macro-aree (7 domande)
export const macroAreaQuestions: OrientationQuestion[] = [
  {
    id: '1',
    question: 'Quale ambiente di lavoro ti attrae di più?',
    options: [
      'Uffici eleganti in grattacieli nel centro finanziario',
      'Studi di consulenza dinamici con team internazionali',
      'Istituzioni governative e organizzazioni internazionali',
      'Spazi di co-working innovativi e startup'
    ],
    weights: {
      finance: 3,
      consulting: 2,
      policy: 1,
      entrepreneurship: 3,
      business: 1,
      academic: 0
    }
  },
  {
    id: '2',
    question: 'Che tipo di sfide preferisci affrontare?',
    options: [
      'Analizzare mercati finanziari e fare investimenti',
      'Risolvere problemi complessi per grandi aziende',
      'Influenzare politiche pubbliche e normative',
      'Creare nuove soluzioni e prodotti innovativi'
    ],
    weights: {
      finance: 3,
      consulting: 3,
      policy: 2,
      entrepreneurship: 2,
      business: 1,
      academic: 1
    }
  },
  {
    id: '3',
    question: 'Quale aspetto del lavoro ti motiva maggiormente?',
    options: [
      'Alti guadagni e bonus performance',
      'Crescita professionale rapida e prestigio',
      'Impatto sociale e cambiamento sistemico',
      'Libertà creativa e indipendenza'
    ],
    weights: {
      finance: 3,
      consulting: 2,
      policy: 1,
      entrepreneurship: 3,
      business: 2,
      academic: 1
    }
  },
  {
    id: '4',
    question: 'Con che tipo di persone preferisci lavorare?',
    options: [
      'Trader, analisti finanziari e investitori',
      'Manager, CEO e dirigenti aziendali',
      'Diplomatici, funzionari pubblici e policy makers',
      'Imprenditori, innovatori e visionari'
    ],
    weights: {
      finance: 3,
      consulting: 2,
      policy: 2,
      entrepreneurship: 3,
      business: 1,
      academic: 0
    }
  },
  {
    id: '5',
    question: 'Quale tipo di formazione continua ti interessa?',
    options: [
      'Certificazioni finanziarie (CFA, FRM)',
      'MBA e programmi executive',
      'Corsi in relazioni internazionali e diritto',
      'Workshop su innovazione e tecnologia'
    ],
    weights: {
      finance: 3,
      consulting: 1,
      policy: 2,
      entrepreneurship: 2,
      business: 2,
      academic: 3
    }
  },
  {
    id: '6',
    question: 'Come ti vedi tra 10 anni?',
    options: [
      'Managing Director di una banca d\'investimento',
      'Partner di una big consulting firm',
      'Ambasciatore o alto funzionario internazionale',
      'CEO della mia startup di successo'
    ],
    weights: {
      finance: 3,
      consulting: 3,
      policy: 2,
      entrepreneurship: 3,
      business: 1,
      academic: 0
    }
  },
  {
    id: '7',
    question: 'Quale settore ti affascina di più?',
    options: [
      'Mercati finanziari e investimenti',
      'Strategia aziendale e ottimizzazione',
      'Governance globale e diplomazia',
      'Tecnologia e innovazione'
    ],
    weights: {
      finance: 3,
      consulting: 2,
      policy: 3,
      entrepreneurship: 2,
      business: 2,
      academic: 1
    }
  }
];

// Livello 2 - Domande subsection per ciascuna macro-area
export const subsectionQuestions: Record<string, SubsectionQuestion[]> = {
  finance: [
    {
      id: 'f1',
      question: 'Quale aspetto della finanza ti attrae di più?',
      options: [
        'Advisory per grandi M&A e IPO',
        'Investimenti in aziende mature con capitale proprio',
        'Finanziamento di startup innovative',
        'Trading algoritmico e modelli quantitativi'
      ],
      weights: {
        ib: 3,
        pe: 2,
        vc: 1,
        quant: 2
      }
    },
    {
      id: 'f2',
      question: 'Che tipo di rischio preferisci gestire?',
      options: [
        'Rischio di execution su grandi deal',
        'Rischio operativo di aziende in portafoglio',
        'Rischio tecnologico di startup early-stage',
        'Rischio di mercato attraverso modelli matematici'
      ],
      weights: {
        ib: 3,
        pe: 3,
        vc: 2,
        quant: 1
      }
    },
    {
      id: 'f3',
      question: 'Quale orizzonte temporale preferisci?',
      options: [
        'Transazioni veloci (3-6 mesi)',
        'Investimenti a medio termine (3-7 anni)',
        'Crescita a lungo termine (5-10 anni)',
        'Trading ad alta frequenza (millisecondi-giorni)'
      ],
      weights: {
        ib: 3,
        pe: 2,
        vc: 1,
        quant: 3
      }
    }
  ],

  consulting: [
    {
      id: 'c1',
      question: 'Quale tipo di consulting ti attira di più?',
      options: [
        'Strategia aziendale per Fortune 500',
        'Trasformazione digitale e ottimizzazione processi',
        'Due diligence finanziaria per M&A',
        'Consulenza fiscale e compliance'
      ],
      weights: {
        mbb: 3,
        big4: 1,
        boutique: 2,
        tech: 2
      }
    },
    {
      id: 'c2',
      question: 'Con che dimensione di clienti preferisci lavorare?',
      options: [
        'Multinazionali e governi',
        'Large corporate e mid-market',
        'Startup e scale-up tecnologiche',
        'PMI e family business'
      ],
      weights: {
        mbb: 3,
        big4: 2,
        boutique: 1,
        tech: 2
      }
    },
    {
      id: 'c3',
      question: 'Quale metodologia di lavoro preferisci?',
      options: [
        'Analisi strategica top-down',
        'Process improvement e best practices',
        'Design thinking e innovation',
        'Data analytics e automation'
      ],
      weights: {
        mbb: 3,
        big4: 2,
        boutique: 1,
        tech: 3
      }
    }
  ],

  policy: [
    {
      id: 'p1',
      question: 'Quale ambito delle relazioni internazionali ti interessa?',
      options: [
        'Diplomazia bilaterale e multilaterale',
        'Cooperazione allo sviluppo e aiuti umanitari',
        'Analisi geopolitica e policy research',
        'Commercio internazionale e regolamentazione'
      ],
      weights: {
        diplomat: 3,
        org_int: 2,
        policy: 1,
        trade: 2
      }
    },
    {
      id: 'p2',
      question: 'Dove ti vedi lavorare?',
      options: [
        'Ambasciate e consolati',
        'Organizzazioni internazionali (ONU, EU)',
        'Think tank e centri di ricerca',
        'Ministeri e istituzioni nazionali'
      ],
      weights: {
        diplomat: 3,
        org_int: 3,
        policy: 2,
        trade: 1
      }
    },
    {
      id: 'p3',
      question: 'Quale tipo di impatto vuoi avere?',
      options: [
        'Rappresentare il paese all\'estero',
        'Risolvere crisi umanitarie globali',
        'Influenzare decisioni politiche',
        'Facilitare accordi commerciali'
      ],
      weights: {
        diplomat: 3,
        org_int: 2,
        policy: 3,
        trade: 2
      }
    }
  ],

  entrepreneurship: [
    {
      id: 'e1',
      question: 'Quale tipo di impresa vorresti creare/dirigere?',
      options: [
        'Startup tecnologica innovativa',
        'Azienda manifatturiera sostenibile',
        'Piattaforma digitale/e-commerce',
        'Servizi finanziari innovativi'
      ],
      weights: {
        startup_tech: 3,
        startup_traditional: 2,
        startup_digital: 3,
        fintech: 2
      }
    },
    {
      id: 'e2',
      question: 'Quale ruolo preferisci in un\'azienda?',
      options: [
        'CEO - visione strategica generale',
        'CFO - gestione finanziaria e crescita',
        'CTO - innovazione tecnologica',
        'COO - operazioni e execution'
      ],
      weights: {
        startup_tech: 2,
        cfo: 3,
        startup_digital: 1,
        fintech: 2
      }
    },
    {
      id: 'e3',
      question: 'Quale fase di crescita aziendale preferisci?',
      options: [
        'Pre-seed: idea e prototipo',
        'Seed: primi clienti e ricavi',
        'Growth: scaling e espansione',
        'Maturity: ottimizzazione e exit'
      ],
      weights: {
        startup_tech: 3,
        startup_traditional: 1,
        startup_digital: 2,
        cfo: 2
      }
    }
  ],

  business: [
    {
      id: 'b1',
      question: 'Quale settore corporate ti attrae?',
      options: [
        'Big Tech (Google, Meta, Amazon)',
        'Consulting e servizi professionali',
        'Banche e servizi finanziari',
        'Manifatturiero e retail'
      ],
      weights: {
        big_tech: 3,
        corporate: 2,
        finance_corp: 1,
        traditional: 1
      }
    },
    {
      id: 'b2',
      question: 'Quale funzione aziendale preferisci?',
      options: [
        'Product Management e sviluppo',
        'Business Development e partnership',
        'Marketing e brand management',
        'Operations e supply chain'
      ],
      weights: {
        pm: 3,
        bd: 2,
        marketing: 2,
        ops: 1
      }
    },
    {
      id: 'b3',
      question: 'Quale tipo di progetti ti energizza?',
      options: [
        'Lanciare nuovi prodotti digitali',
        'Espandere in nuovi mercati',
        'Ottimizzare processi esistenti',
        'Guidare trasformazioni aziendali'
      ],
      weights: {
        pm: 3,
        bd: 2,
        ops: 1,
        corporate: 3
      }
    }
  ],

  academic: [
    {
      id: 'a1',
      question: 'Quale ambito accademico ti appassiona?',
      options: [
        'Ricerca economica e pubblicazioni',
        'Insegnamento universitario',
        'Giornalismo economico specializzato',
        'Think tank e policy research'
      ],
      weights: {
        researcher: 3,
        professor: 2,
        journalist: 2,
        analyst: 1
      }
    },
    {
      id: 'a2',
      question: 'Quale tipo di output preferisci produrre?',
      options: [
        'Paper accademici e ricerca originale',
        'Articoli e analisi per il pubblico',
        'Corsi e materiale didattico',
        'Report e briefing per decision makers'
      ],
      weights: {
        researcher: 3,
        journalist: 2,
        professor: 3,
        analyst: 2
      }
    },
    {
      id: 'a3',
      question: 'Con chi preferisci interagire?',
      options: [
        'Colleghi ricercatori e accademici',
        'Studenti e giovani professionisti',
        'Lettori e pubblico generale',
        'Policy makers e professionisti'
      ],
      weights: {
        researcher: 3,
        professor: 3,
        journalist: 2,
        analyst: 1
      }
    }
  ]
};

// Risultati macro-aree
export const macroAreaResults: Record<string, MacroAreaResult> = {
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
    name: 'Policy & Diplomacy',
    description: 'Sei interessato alle relazioni internazionali, diplomazia e impatto su politiche pubbliche.',
    icon: '🌍'
  },
  entrepreneurship: {
    name: 'Entrepreneurship',
    description: 'Hai spirito imprenditoriale e ti attrae creare, innovare e costruire nuove realtà aziendali.',
    icon: '🚀'
  },
  business: {
    name: 'Corporate Business',
    description: 'Ti piace lavorare in grandi aziende, gestire prodotti e guidare crescita in contesti strutturati.',
    icon: '🏢'
  },
  academic: {
    name: 'Academic & Research',
    description: 'Sei orientato verso ricerca, insegnamento e produzione di conoscenza nel campo economico.',
    icon: '📚'
  }
};

// Risultati subsection
export const subsectionResults: Record<string, SubsectionResult> = {
  // Finance subsections
  ib: {
    name: 'Investment Banking',
    description: 'Advisor per M&A, IPO e grandi transazioni corporate',
    details: 'Lavorerai su deal multimiliardari, advisory strategica e capital markets. Ambiente ad alta pressione con compensation elevata.'
  },
  pe: {
    name: 'Private Equity',
    description: 'Investimenti in aziende mature con focus su value creation',
    details: 'Acquisirai e svilupperai aziende attraverso capitale proprio, con focus su crescita operativa e exit strategiche.'
  },
  vc: {
    name: 'Venture Capital',
    description: 'Finanziamento di startup innovative in fase early-stage',
    details: 'Identificherai e finanzierai le startup del futuro, lavorando a stretto contatto con founder e innovatori.'
  },
  quant: {
    name: 'Quantitative Finance',
    description: 'Modelli matematici per trading e gestione del rischio',
    details: 'Svilupperai algoritmi di trading e modelli di pricing utilizzando matematica avanzata e programmazione.'
  },

  // Consulting subsections
  mbb: {
    name: 'Top Tier Strategy (MBB)',
    description: 'McKinsey, Bain, BCG - strategia per Fortune 500',
    details: 'Consulenza strategica di alto livello per le maggiori multinazionali e governi. Crescita rapida e network globale.'
  },
  big4: {
    name: 'Big Four Consulting',
    description: 'Deloitte, PwC, EY, KPMG - servizi integrati',
    details: 'Ampia gamma di servizi: audit, tax, advisory, digital transformation. Ottime opportunità di specializzazione.'
  },

  // Policy subsections
  diplomat: {
    name: 'Diplomatic Career',
    description: 'Carriera diplomatica in ambasciate e consolati',
    details: 'Rappresenterai il tuo paese all\'estero, gestendo relazioni bilaterali e promuovendo interessi nazionali.'
  },
  org_int: {
    name: 'International Organizations',
    description: 'ONU, UE, organismi internazionali',
    details: 'Lavorerai su temi globali: pace, sviluppo, diritti umani. Impatto su scala mondiale attraverso cooperazione multilaterale.'
  },
  policy: {
    name: 'Policy Research & Analysis',
    description: 'Think tank, ricerca e analisi di politiche pubbliche',
    details: 'Analizzerai e influenzerai politiche pubbliche attraverso ricerca e advocacy in centri studi prestigiosi.'
  },

  // Entrepreneurship subsections
  startup_tech: {
    name: 'Tech Startup Founder',
    description: 'Fondare startup tecnologiche innovative',
    details: 'Creerai prodotti tecnologici disruptive, gestirai team di sviluppo e cercherai investimenti per la crescita.'
  },
  cfo: {
    name: 'Startup CFO',
    description: 'Chief Financial Officer per startup in crescita',
    details: 'Gestirai finanze, fundraising e strategia finanziaria per startup ad alto potenziale di crescita.'
  },

  // Business subsections
  big_tech: {
    name: 'Big Tech Companies',
    description: 'FAANG/MAMAA - Google, Meta, Amazon, Apple',
    details: 'Lavorerai per i giganti tecnologici globali su prodotti utilizzati da miliardi di persone.'
  },
  pm: {
    name: 'Product Management',
    description: 'Gestione e sviluppo di prodotti digitali',
    details: 'Definirai roadmap di prodotto, lavorerai con engineering e design per creare soluzioni innovative.'
  },
  corporate: {
    name: 'Corporate Strategy',
    description: 'Strategia aziendale in grandi corporation',
    details: 'Guiderai iniziative strategiche, M&A e trasformazioni aziendali in multinazionali consolidate.'
  },

  // Academic subsections
  researcher: {
    name: 'Economic Researcher',
    description: 'Ricercatore economico accademico',
    details: 'Condurrai ricerca originale in economia, pubblicherai su riviste peer-reviewed e influenzerai il dibattito accademico.'
  },
  professor: {
    name: 'University Professor',
    description: 'Professore universitario di economia',
    details: 'Insegnerai a futuri economisti, condurrai ricerca e contribuirai alla formazione della prossima generazione.'
  },
  journalist: {
    name: 'Economic Journalist',
    description: 'Giornalista economico specializzato',
    details: 'Analizzerai e comunicherai trend economici al pubblico attraverso media tradizionali e digitali.'
  },
  analyst: {
    name: 'Policy Analyst',
    description: 'Analista di politiche economiche',
    details: 'Analizzerai l\'impatto di politiche economiche per think tank, istituzioni o organizzazioni internazionali.'
  }
};
