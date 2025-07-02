export interface Microarea {
  id: string;
  name: string;
  description: string;
  companies: string;
  salary: string;
}

export interface Macrocategory {
  id: string;
  name: string;
  description: string;
  microareas: Microarea[];
}

export const careerExplorationData: Macrocategory[] = [
  {
    id: 'finance',
    name: 'FINANCE',
    description: 'Il mondo della finanza è fatto per chi ama l\'analisi, la strategia e l\'impatto concreto. Che tu voglia lavorare in banca d\'investimento, in fondi di private equity o nelle startup del futuro, troverai ambienti competitivi, ritmi alti e grandi opportunità di crescita (e guadagno).',
    microareas: [
      {
        id: 'investment-banking',
        name: 'Investment Banking',
        description: 'L\'investment banking è il cuore pulsante della finanza globale. Ti occupi di operazioni ad altissimo impatto: fusioni e acquisizioni (M&A), quotazioni in borsa (IPO), ristrutturazioni finanziarie, emissioni di debito. Lavori con CEO, fondi di investimento e governi per aiutarli a prendere decisioni strategiche da miliardi. Serve rigore, resistenza mentale, capacità di analisi e una certa adrenalina per stare dietro ai ritmi: giornate lunghe, intense, a stretto contatto con team globali. Se ti piace l\'idea di avere un impatto reale e lavorare sotto pressione, è una delle carriere più formative (e remunerative) che esistano.',
        companies: 'Goldman Sachs, JP Morgan, Morgan Stanley',
        salary: '70 – 130k € + bonus'
      },
      {
        id: 'private-equity',
        name: 'Private Equity',
        description: 'Nel Private Equity entri in gioco dopo l\'acquisto di un\'azienda: la missione è semplice (sulla carta), ma potente: farla crescere, renderla più efficiente, più redditizia, e poi rivenderla con un ritorno elevato. Lavori a stretto contatto con il management delle imprese partecipate, analizzi performance, definisci piani industriali. È una carriera per chi ama l\'analisi profonda, la strategia e avere impatto reale.',
        companies: 'Blackstone, KKR, CVC',
        salary: '80–140k € + bonus'
      },
      {
        id: 'venture-capital',
        name: 'Venture Capital',
        description: 'Se ami il mondo delle start-up e ti entusiasma l\'idea di scoprire la prossima Airbnb o Uber, il Venture Capital è il tuo terreno. Investi in start-up giovani ma ad altissimo potenziale, spesso quando nessun altro ha ancora il coraggio di crederci. Non basta sapere leggere un bilancio: serve istinto per l\'innovazione, sensibilità per i trend di mercato e capacità di valutare i founder.',
        companies: 'Accel, Sequoia',
        salary: '50–90k € + bonus'
      },
      {
        id: 'hedge-fund',
        name: 'Hedge Fund',
        description: 'Lavorare in un hedge fund significa vivere nella parte più dinamica, e talvolta aggressiva, dei mercati finanziari. L\'obiettivo è generare rendimenti costanti, spesso superiori al mercato, utilizzando strategie avanzate: long/short, arbitraggio, derivati, trading algoritmico. Richiede una mente veloce, flessibilità mentale, spirito competitivo e un\'enorme passione per i mercati.',
        companies: 'Bridgewater, Citadel, Millennium',
        salary: '80–140k € + bonus'
      },
      {
        id: 'quant',
        name: 'Quant',
        description: 'Il Quant è il cervello matematico dietro le strategie di trading automatico e di gestione del rischio. Usa la statistica, l\'informatica e la finanza per costruire modelli in grado di prevedere o ottimizzare l\'andamento dei mercati. È una delle carriere più tecniche e richieste.',
        companies: 'Jane Street, Optiver, Renaissance',
        salary: '90–150k € + bonus'
      },
      {
        id: 'asset-management',
        name: 'Asset Management',
        description: 'Gestisci i risparmi e gli investimenti di clienti istituzionali e privati con l\'obiettivo di farli crescere nel tempo in modo equilibrato e sostenibile. È il mondo della pianificazione, dell\'analisi macro, della costruzione di portafogli ben bilanciati. È ideale per chi vuole lavorare nel mondo della finanza con un approccio più solido, strategico e orientato al lungo periodo.',
        companies: 'BlackRock, Vanguard, Amundi',
        salary: '50–100k € + bonus'
      }
    ]
  },
  {
    id: 'consulting',
    name: 'CONSULTING',
    description: 'Se ti piace risolvere problemi, lavorare in team e affrontare sfide sempre nuove, la consulenza è la tua palestra ideale. Dai bilanci alla strategia, ti confronterai con clienti reali, in progetti che cambiano di continuo e accelerano il tuo sviluppo professionale.',
    microareas: [
      {
        id: 'big4',
        name: 'Big 4 (Audit & Advisory)',
        description: 'Le Big 4 sono il punto di partenza ideale per chi vuole immergersi nel mondo del business a 360°. Tra revisione contabile, advisory, consulenza fiscale e tecnologica, lavori con imprese di ogni settore e dimensione, aiutandole a migliorare processi, bilanci, conformità e strategie. È il luogo perfetto per costruirsi una solida reputazione e mettere basi concrete per una carriera futura, anche in altri ambiti.',
        companies: 'Deloitte, PwC, EY, KPMG',
        salary: '30–55k € + bonus'
      },
      {
        id: 'mbb',
        name: 'MBB (Strategic Consulting)',
        description: 'Qui lavori fianco a fianco con CEO e top manager per aiutarli a risolvere problemi complessi: entrare in nuovi mercati, tagliare costi, rivoluzionare modelli di business, innovare prodotti. Servono rigore, velocità mentale, capacità analitica e leadership. Ogni progetto è una sfida diversa, ogni settimana può portarti in una città nuova.',
        companies: 'McKinsey, BCG, Bain & Company',
        salary: '55–90k € + bonus'
      }
    ]
  },
  {
    id: 'policy',
    name: 'POLICY & PUBLIC AFFAIRS',
    description: 'Vuoi contribuire al bene pubblico, influenzare decisioni politiche o rappresentare il tuo Paese? In questa area lavori in contesti internazionali, istituzionali e multilaterali, con un impatto diretto su società, economia e ambiente.',
    microareas: [
      {
        id: 'diplomatico',
        name: 'Diplomatico',
        description: 'Rappresenti la tua nazione nei rapporti con altri Paesi, negozi accordi internazionali, promuovi cultura, business e cooperazione. È una carriera per chi ha passione per le relazioni internazionali, sa comunicare, analizzare e tenere il sangue freddo anche sotto pressione. Diventare diplomatico è difficile, ma prestigioso: ti muovi tra ambasciate, consolati e sedi multilaterali, parlando con ministri, ambasciatori e leader globali.',
        companies: 'Ministero degli Esteri, Ambasciate, Consolati',
        salary: '35–70k € a seconda del ruolo'
      },
      {
        id: 'org-internazionali',
        name: 'Organizzazioni Internazionali',
        description: 'Lavori in enti che guidano l\'economia globale, proteggono i diritti umani, combattono il cambiamento climatico o migliorano la salute pubblica. Serve forte preparazione accademica, spirito internazionale e voglia di contribuire a progetti complessi che coinvolgono decine di Paesi.',
        companies: 'ONU, OCSE, FMI, Banca Mondiale',
        salary: '45–80k € (netti, esentasse)'
      },
      {
        id: 'policy-making',
        name: 'Policy Making',
        description: 'Se ti affascina capire come si crea una legge, una riforma economica o un piano d\'intervento sociale, questa è la strada. Lavori con parlamentari, enti pubblici o think tank per disegnare politiche pubbliche, basate su dati e ricerca. Serve capacità analitica, attenzione al dettaglio e forte interesse per il cambiamento sociale o economico.',
        companies: 'Parlamento, Commissione Europea, Banca d\'Italia',
        salary: '35–60k € a seconda del ruolo'
      }
    ]
  },
  {
    id: 'business',
    name: 'BUSINESS & INDUSTRIES',
    description: 'Grandi aziende e industrie innovative cercano menti brillanti per ruoli di gestione, analisi e operatività. Se vuoi vedere il risultato concreto del tuo lavoro e contribuire allo sviluppo di prodotti e servizi globali, questo è il tuo spazio.',
    microareas: [
      {
        id: 'big-tech',
        name: 'Big Tech',
        description: 'Lavorare in Big Tech significa essere al centro dell\'innovazione che cambia il mondo: AI, piattaforme digitali, social network, e-commerce, cloud computing. Puoi occuparti di marketing, product management, data analysis, HR, vendite o operazioni. È un ambiente veloce, meritocratico, pieno di talenti internazionali. Le opportunità di crescita sono enormi, così come l\'esposizione a progetti che toccano milioni (o miliardi) di persone.',
        companies: 'Google, Amazon, Meta, Microsoft',
        salary: '60–110k € + bonus'
      },
      {
        id: 'project-manager',
        name: 'Project Manager',
        description: 'Il Project Manager è il regista dietro ogni progetto complesso: coordina team, gestisce tempi, budget e obiettivi. È una figura trasversale, richiesta in ogni settore: tech, fashion, automotive, energia, consulenza. Serve leadership, capacità organizzativa, comunicazione efficace e problem solving. Se ti piace gestire, pianificare e ottenere risultati concreti, è la tua strada.',
        companies: 'Chanel, Spotify, Coca-Cola',
        salary: '40–70k € + bonus'
      },
      {
        id: 'corporate',
        name: 'Corporate (Ruoli Interni a Grandi Aziende)',
        description: 'In ambito corporate puoi occuparti di strategia aziendale, controllo di gestione, pianificazione finanziaria, sviluppo del business o operazioni. Il tuo lavoro supporta le decisioni chiave del top management e guida la crescita dell\'impresa. È una carriera solida, ideale per chi vuole combinare analisi, gestione e responsabilità concrete.',
        companies: 'Nestlé, Ferrari, LG',
        salary: '35–65k € + bonus'
      },
      {
        id: 'marketing',
        name: 'Marketing (Brand / Digital / Product)',
        description: 'Il marketing oggi è molto più che pubblicità: è strategia, dati, storytelling. In una grande azienda o multinazionale puoi occuparti di branding, campagne digitali, gestione di prodotti, analisi dei mercati o comportamento dei consumatori. È un settore per chi ha creatività, spirito analitico, capacità di comunicare bene e comprendere i bisogni delle persone. Serve anche saper lavorare con team diversi: vendite, prodotto, agenzie esterne.',
        companies: 'L\'Oréal, Procter & Gamble, Heineken',
        salary: '40–70k € + bonus (a 2–3 anni)'
      },
      {
        id: 'hr',
        name: 'HR (People & Talent Management)',
        description: 'Le risorse umane oggi sono diventate centrali. In HR ti occupi di selezione, formazione, gestione delle performance, sviluppo carriera, benessere organizzativo, relazioni sindacali e molto altro. È la funzione che conosce meglio di chiunque la cultura aziendale e lavora per renderla sostenibile, attrattiva e competitiva. Perfetta per chi ha empatia, metodo, capacità di analisi e voglia di migliorare l\'esperienza lavorativa degli altri.',
        companies: 'Luxottica, Ferrero',
        salary: '35–60k € + bonus (a 2–3 anni)'
      }
    ]
  },
  {
    id: 'entrepreneurship',
    name: 'ENTREPRENEURSHIP',
    description: 'Hai spirito di iniziativa, vuoi costruire qualcosa di tuo o guidare la crescita di un\'impresa? Dal lanciare una start-up al gestire le finanze aziendali, l\'imprenditorialità richiede visione, coraggio e capacità manageriali.',
    microareas: [
      {
        id: 'startup-founder',
        name: 'Start-up Founder',
        description: 'Essere founder significa essere visionario, leader, problem solver e manager. Parti da un\'idea e cerchi di trasformarla in una realtà che funziona, cresce e genera valore. Ogni giorno è una sfida: raccogli capitali, costruisci il prodotto, vendi, assumi, risolvi problemi. È una strada piena di rischi, ma anche quella che può cambiare radicalmente il tuo futuro.',
        companies: 'AirB&B, Uber, Glovo',
        salary: 'variabile, spesso basso all\'inizio; potenziale altissimo se ha successo.'
      },
      {
        id: 'cfo',
        name: 'CFO',
        description: 'Il CFO (Chief Financial Officer) è la figura che dà struttura finanziaria a una impresa. Gestisce il budget, i flussi di cassa, le relazioni con investitori, costruisce modelli finanziari e tiene sotto controllo ogni spesa. È una figura chiave: serve precisione, visione e molta responsabilità.',
        companies: 'Satispay, Bending Spoons',
        salary: '60–110k € + bonus'
      }
    ]
  },
  {
    id: 'academic',
    name: 'ACADEMIC & MEDIA',
    description: 'Se ti appassiona il sapere, la ricerca o il racconto dei fatti, puoi seguire la via dell\'accademia o del giornalismo. Due mondi diversi, ma uniti dalla voglia di capire, spiegare e generare impatto culturale e sociale.',
    microareas: [
      {
        id: 'ricercatore',
        name: 'Ricercatore',
        description: 'La carriera accademica è per chi vuole approfondire un tema, contribuire al sapere collettivo e formare le menti di domani. Se ami studiare, scrivere, analizzare e presentare, puoi trovare spazio in università, centri di ricerca pubblici o privati. Serve rigore, passione, metodo.',
        companies: 'Università, Centri Nazionali Ricerca',
        salary: '28–45k € dottorato'
      },
      {
        id: 'giornalista',
        name: 'Giornalista',
        description: 'Il giornalista è il ponte tra i fatti e le persone. Raccoglie informazioni, le verifica, le racconta in modo chiaro ed efficace su carta, web, radio o TV. Serve curiosità, senso critico, competenza e capacità di comunicare bene con chiunque.',
        companies: 'Il Sole 24 Ore, Repubblica, Sky TG24',
        salary: '25–50k € a seconda del contratto'
      }
    ]
  }
];