
import { University } from '../types';

export const universitiesByCountry: Record<string, University[]> = {
  'USA': [
    {
      id: 'harvard',
      name: 'Harvard University',
      city: 'Cambridge, MA',
      country: 'USA',
      language: 'English',
      ranking: 1,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '~$86,000/year',
      scholarships: true,
      website: 'https://harvard.edu'
    },
    {
      id: 'stanford',
      name: 'Stanford University',
      city: 'Stanford, CA',
      country: 'USA',
      language: 'English',
      ranking: 2,
      programs: ['Innovation', 'Finance'],
      tuitionFee: '~$86,000/year',
      scholarships: true,
      website: 'https://stanford.edu'
    },
    {
      id: 'ucla',
      name: 'UCLA',
      city: 'Los Angeles, CA',
      country: 'USA',
      language: 'English',
      ranking: 3,
      programs: ['Economics', 'Business'],
      tuitionFee: '~$74,000/year',
      scholarships: true,
      website: 'https://ucla.edu'
    },
    {
      id: 'berkeley',
      name: 'UC Berkeley',
      city: 'Berkeley, CA',
      country: 'USA',
      language: 'English',
      ranking: 4,
      programs: ['Innovation', 'Sustainability'],
      tuitionFee: '~$76,000/year',
      scholarships: true,
      website: 'https://berkeley.edu'
    },
    {
      id: 'columbia',
      name: 'Columbia University',
      city: 'New York City, NY',
      country: 'USA',
      language: 'English',
      ranking: 5,
      programs: ['Finance', 'International Relations'],
      tuitionFee: '~$85,000/year',
      scholarships: true,
      website: 'https://columbia.edu'
    },
    {
      id: 'yale',
      name: 'Yale University',
      city: 'New Haven, CT',
      country: 'USA',
      language: 'English',
      ranking: 6,
      programs: ['Economics', 'Political Science'],
      tuitionFee: '~$84,000/year',
      scholarships: true,
      website: 'https://yale.edu'
    },
    {
      id: 'uchicago',
      name: 'University of Chicago',
      city: 'Chicago, IL',
      country: 'USA',
      language: 'English',
      ranking: 7,
      programs: ['Quantitative Economics', 'Finance'],
      tuitionFee: '~$85,000/year',
      scholarships: true,
      website: 'https://uchicago.edu'
    },
    {
      id: 'mit',
      name: 'MIT',
      city: 'Cambridge, MA',
      country: 'USA',
      language: 'English',
      ranking: 8,
      programs: ['Quantitative Finance', 'Entrepreneurship'],
      tuitionFee: '~$85,000/year',
      scholarships: true,
      website: 'https://mit.edu'
    },
    {
      id: 'wharton',
      name: 'Wharton School (UPenn)',
      city: 'Philadelphia, PA',
      country: 'USA',
      language: 'English',
      ranking: 9,
      programs: ['Finance', 'Management'],
      tuitionFee: '~$85,000/year',
      scholarships: true,
      website: 'https://wharton.upenn.edu'
    },
    {
      id: 'princeton',
      name: 'Princeton University',
      city: 'Princeton, NJ',
      country: 'USA',
      language: 'English',
      ranking: 10,
      programs: ['Theoretical Economics', 'Economic Policy'],
      tuitionFee: '~$79,000/year',
      scholarships: true,
      website: 'https://princeton.edu'
    },
    {
      id: 'nyu',
      name: 'New York University (NYU)',
      city: 'New York City, NY',
      country: 'USA',
      language: 'English',
      ranking: 11,
      programs: ['Finance', 'Economics'],
      tuitionFee: '~$88,000/year',
      scholarships: true,
      website: 'https://nyu.edu'
    },
    {
      id: 'bu',
      name: 'Boston University',
      city: 'Boston, MA',
      country: 'USA',
      language: 'English',
      ranking: 12,
      programs: ['Economics', 'Business'],
      tuitionFee: '~$85,000/year',
      scholarships: true,
      website: 'https://bu.edu'
    }
  ],
  'Canada': [
    {
      id: 'toronto',
      name: 'University of Toronto',
      city: 'Toronto, Ontario',
      country: 'Canada',
      language: 'English',
      ranking: 13,
      programs: ['Economics', 'Finance'],
      tuitionFee: '~$45,000/year',
      scholarships: true,
      website: 'https://utoronto.ca'
    },
    {
      id: 'mcgill',
      name: 'McGill University',
      city: 'Montreal, Quebec',
      country: 'Canada',
      language: 'English/French',
      ranking: 14,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '$30,000–$38,000/year',
      scholarships: true,
      website: 'https://mcgill.ca'
    },
    {
      id: 'ubc',
      name: 'University of British Columbia (UBC)',
      city: 'Vancouver, BC',
      country: 'Canada',
      language: 'English',
      ranking: 15,
      programs: ['Sustainable Economics', 'International Trade'],
      tuitionFee: '$30,000–$42,000/year',
      scholarships: true,
      website: 'https://ubc.ca'
    }
  ],
  'China': [
    {
      id: 'peking',
      name: 'Peking University',
      city: 'Beijing',
      country: 'China',
      language: 'Chinese/English',
      ranking: 16,
      programs: ['Economics', 'Management'],
      tuitionFee: '$20,000–$25,000/year',
      scholarships: true,
      website: 'https://english.pku.edu.cn'
    },
    {
      id: 'tsinghua',
      name: 'Tsinghua University',
      city: 'Beijing',
      country: 'China',
      language: 'Chinese/English',
      ranking: 17,
      programs: ['Business', 'Economics'],
      tuitionFee: '$20,000–$25,000/year',
      scholarships: true,
      website: 'https://tsinghua.edu.cn'
    },
    {
      id: 'fudan',
      name: 'Fudan University',
      city: 'Shanghai',
      country: 'China',
      language: 'Chinese/English',
      ranking: 18,
      programs: ['International Business', 'Finance'],
      tuitionFee: '$18,000–$22,000/year',
      scholarships: true,
      website: 'https://fudan.edu.cn'
    }
  ],
  'Japan': [
    {
      id: 'tokyo',
      name: 'University of Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      language: 'Japanese/English',
      ranking: 19,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '$10,000–$15,000/year',
      scholarships: true,
      website: 'https://u-tokyo.ac.jp'
    },
    {
      id: 'kyoto',
      name: 'Kyoto University',
      city: 'Kyoto',
      country: 'Japan',
      language: 'Japanese/English',
      ranking: 20,
      programs: ['Social Sciences', 'Political Science'],
      tuitionFee: '$10,000–$15,000/year',
      scholarships: true,
      website: 'https://kyoto-u.ac.jp'
    },
    {
      id: 'osaka',
      name: 'Osaka University',
      city: 'Osaka',
      country: 'Japan',
      language: 'Japanese/English',
      ranking: 21,
      programs: ['Economics', 'Business'],
      tuitionFee: '$10,000–$15,000/year',
      scholarships: true,
      website: 'https://osaka-u.ac.jp'
    },
    {
      id: 'hitotsubashi',
      name: 'Hitotsubashi University',
      city: 'Tokyo',
      country: 'Japan',
      language: 'Japanese/English',
      ranking: 22,
      programs: ['Commerce', 'Management'],
      tuitionFee: '$12,000–$18,000/year',
      scholarships: true,
      website: 'https://hit-u.ac.jp'
    }
  ],
  'South Korea': [
    {
      id: 'snu',
      name: 'Seoul National University (SNU)',
      city: 'Seoul',
      country: 'South Korea',
      language: 'Korean/English',
      ranking: 23,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '$10,000–$20,000/year',
      scholarships: true,
      website: 'https://snu.ac.kr'
    },
    {
      id: 'yonsei',
      name: 'Yonsei University',
      city: 'Seoul',
      country: 'South Korea',
      language: 'Korean/English',
      ranking: 24,
      programs: ['Business', 'International Studies'],
      tuitionFee: '$15,000–$20,000/year',
      scholarships: true,
      website: 'https://yonsei.ac.kr'
    }
  ],
  'Singapore': [
    {
      id: 'nus',
      name: 'National University of Singapore (NUS)',
      city: 'Singapore',
      country: 'Singapore',
      language: 'English',
      ranking: 25,
      programs: ['Economics', 'Finance', 'Management'],
      tuitionFee: '$20,000–$30,000/year',
      scholarships: true,
      website: 'https://nus.edu.sg'
    },
    {
      id: 'cityu',
      name: 'City University of Hong Kong (CityU)',
      city: 'Hong Kong',
      country: 'Singapore',
      language: 'English/Chinese',
      ranking: 26,
      programs: ['Economics', 'Business'],
      tuitionFee: '$18,000–$25,000/year',
      scholarships: true,
      website: 'https://cityu.edu.hk'
    }
  ],
  'Italy': [
    {
      id: 'bocconi',
      name: 'Bocconi University',
      city: 'Milano',
      country: 'Italy',
      language: 'English/Italian',
      ranking: 27,
      programs: ['Economics', 'Finance', 'Management'],
      tuitionFee: '€14,000–€20,000/year',
      scholarships: true,
      website: 'https://unibocconi.eu'
    },
    {
      id: 'padova',
      name: 'Università di Padova',
      city: 'Padova',
      country: 'Italy',
      language: 'Italian/English',
      ranking: 28,
      programs: ['Economics', 'Political Science'],
      tuitionFee: '€3,000–€4,000/year',
      scholarships: true,
      website: 'https://unipd.it'
    },
    {
      id: 'cafoscari',
      name: "Ca' Foscari Venezia",
      city: 'Venezia',
      country: 'Italy',
      language: 'Italian/English',
      ranking: 29,
      programs: ['International Commerce', 'European Studies'],
      tuitionFee: '€3,000–€4,000/year',
      scholarships: true,
      website: 'https://unive.it'
    },
    {
      id: 'sapienza',
      name: 'Sapienza Università di Roma',
      city: 'Roma',
      country: 'Italy',
      language: 'Italian/English',
      ranking: 30,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '€2,500–€3,500/year',
      scholarships: true,
      website: 'https://uniroma1.it'
    }
  ],
  'Portugal': [
    {
      id: 'nova',
      name: 'NOVA University Lisbon',
      city: 'Lisbona',
      country: 'Portugal',
      language: 'Portuguese/English',
      ranking: 31,
      programs: ['Economics', 'Business', 'International Relations'],
      tuitionFee: '€4,000–€7,000/year',
      scholarships: true,
      website: 'https://novaims.unl.pt'
    },
    {
      id: 'ulisboa',
      name: 'Universidade de Lisboa',
      city: 'Lisbona',
      country: 'Portugal',
      language: 'Portuguese/English',
      ranking: 32,
      programs: ['Economics', 'European Studies'],
      tuitionFee: '€1,000–€3,000/year',
      scholarships: true,
      website: 'https://ulisboa.pt'
    }
  ],
  'Spain': [
    {
      id: 'esade',
      name: 'ESADE',
      city: 'Barcellona',
      country: 'Spain',
      language: 'Spanish/English',
      ranking: 33,
      programs: ['Finance', 'Management'],
      tuitionFee: '€20,000–€28,000/year',
      scholarships: true,
      website: 'https://esade.edu'
    },
    {
      id: 'ie',
      name: 'IE University',
      city: 'Madrid',
      country: 'Spain',
      language: 'Spanish/English',
      ranking: 34,
      programs: ['Business', 'International Relations'],
      tuitionFee: '€20,000–€25,000/year',
      scholarships: true,
      website: 'https://ie.edu'
    },
    {
      id: 'uam',
      name: 'Universidad Autónoma de Madrid',
      city: 'Madrid',
      country: 'Spain',
      language: 'Spanish',
      ranking: 35,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '€1,000–€3,000/year',
      scholarships: true,
      website: 'https://uam.es'
    }
  ],
  'France': [
    {
      id: 'sciencespo',
      name: 'Sciences Po',
      city: 'Parigi',
      country: 'France',
      language: 'French/English',
      ranking: 36,
      programs: ['Political Science', 'International Relations'],
      tuitionFee: '€14,000–€20,000/year',
      scholarships: true,
      website: 'https://sciencespo.fr'
    },
    {
      id: 'essec',
      name: 'ESSEC Business School',
      city: 'Cergy',
      country: 'France',
      language: 'French/English',
      ranking: 37,
      programs: ['Finance', 'Management'],
      tuitionFee: '€15,000–€25,000/year',
      scholarships: true,
      website: 'https://essec.edu'
    },
    {
      id: 'hec',
      name: 'HEC Paris',
      city: 'Jouy-en-Josas',
      country: 'France',
      language: 'French/English',
      ranking: 38,
      programs: ['Management', 'Strategy'],
      tuitionFee: '€20,000–€30,000/year',
      scholarships: true,
      website: 'https://hec.edu'
    },
    {
      id: 'escp',
      name: 'ESCP Business School',
      city: 'Paris (Multi-campus)',
      country: 'France',
      language: 'Multiple',
      ranking: 39,
      programs: ['International Business', 'Finance'],
      tuitionFee: '€15,000–€25,000/year',
      scholarships: true,
      website: 'https://escp.eu'
    }
  ],
  'Netherlands': [
    {
      id: 'erasmus',
      name: 'Erasmus University Rotterdam',
      city: 'Rotterdam',
      country: 'Netherlands',
      language: 'English/Dutch',
      ranking: 40,
      programs: ['Finance', 'International Commerce'],
      tuitionFee: '€15,000–€20,000/year',
      scholarships: true,
      website: 'https://erasmusuniversity.nl'
    },
    {
      id: 'uva',
      name: 'University of Amsterdam (UvA)',
      city: 'Amsterdam',
      country: 'Netherlands',
      language: 'English/Dutch',
      ranking: 41,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '€10,000–€20,000/year',
      scholarships: true,
      website: 'https://uva.nl'
    },
    {
      id: 'maastricht',
      name: 'Maastricht University',
      city: 'Maastricht',
      country: 'Netherlands',
      language: 'English/Dutch',
      ranking: 42,
      programs: ['International Business', 'European Studies'],
      tuitionFee: '€12,000–€18,000/year',
      scholarships: true,
      website: 'https://maastrichtuniversity.nl'
    },
    {
      id: 'groningen',
      name: 'University of Groningen',
      city: 'Groningen',
      country: 'Netherlands',
      language: 'English/Dutch',
      ranking: 43,
      programs: ['Economics', 'Social Sciences'],
      tuitionFee: '€10,000–€15,000/year',
      scholarships: true,
      website: 'https://rug.nl'
    }
  ],
  'Belgium': [
    {
      id: 'kuleuven',
      name: 'KU Leuven',
      city: 'Leuven',
      country: 'Belgium',
      language: 'Dutch/English',
      ranking: 44,
      programs: ['Economics', 'European Studies'],
      tuitionFee: '€5,000–€9,000/year',
      scholarships: true,
      website: 'https://kuleuven.be'
    },
    {
      id: 'ghent',
      name: 'Ghent University',
      city: 'Ghent',
      country: 'Belgium',
      language: 'Dutch/English',
      ranking: 45,
      programs: ['Economics', 'Social Sciences'],
      tuitionFee: '€5,000–€9,000/year',
      scholarships: true,
      website: 'https://ugent.be'
    }
  ],
  'Switzerland': [
    {
      id: 'stgallen',
      name: 'Università di San Gallo (St. Gallen)',
      city: 'St. Gallen',
      country: 'Switzerland',
      language: 'German/English',
      ranking: 46,
      programs: ['International Management', 'Finance'],
      tuitionFee: 'CHF 20,000–25,000/year',
      scholarships: true,
      website: 'https://unisg.ch'
    },
    {
      id: 'uzh',
      name: 'Università di Zurigo',
      city: 'Zurich',
      country: 'Switzerland',
      language: 'German/English',
      ranking: 47,
      programs: ['Economics', 'Business'],
      tuitionFee: 'CHF 1,500–3,000/year',
      scholarships: true,
      website: 'https://uzh.ch'
    },
    {
      id: 'iheid',
      name: 'Graduate Institute Geneva',
      city: 'Geneva',
      country: 'Switzerland',
      language: 'English/French',
      ranking: 48,
      programs: ['International Relations', 'International Economics'],
      tuitionFee: 'CHF 20,000/year',
      scholarships: true,
      website: 'https://graduateinstitute.ch'
    }
  ],
  'Germany': [
    {
      id: 'mannheim',
      name: 'Università di Mannheim',
      city: 'Mannheim',
      country: 'Germany',
      language: 'German/English',
      ranking: 49,
      programs: ['Economics', 'Management'],
      tuitionFee: '€1,500/year',
      scholarships: true,
      website: 'https://uni-mannheim.de'
    },
    {
      id: 'lmu',
      name: 'Ludwig Maximilian University (LMU) Munich',
      city: 'Munich',
      country: 'Germany',
      language: 'German/English',
      ranking: 50,
      programs: ['Economics', 'Social Sciences'],
      tuitionFee: '€1,500/year',
      scholarships: true,
      website: 'https://en.lmu.de'
    },
    {
      id: 'goethe',
      name: 'Goethe University Frankfurt',
      city: 'Frankfurt',
      country: 'Germany',
      language: 'German/English',
      ranking: 51,
      programs: ['Economics', 'Finance'],
      tuitionFee: '€1,500/year',
      scholarships: true,
      website: 'https://goethe-university-frankfurt.de'
    }
  ],
  'Austria': [
    {
      id: 'wu',
      name: 'WU Vienna (Wirtschaftsuniversität Wien)',
      city: 'Vienna',
      country: 'Austria',
      language: 'German/English',
      ranking: 52,
      programs: ['Economics', 'Finance'],
      tuitionFee: '€1,500–€3,000/year',
      scholarships: true,
      website: 'https://wu.ac.at'
    }
  ],
  'Denmark': [
    {
      id: 'cbs',
      name: 'Copenhagen Business School (CBS)',
      city: 'Copenhagen',
      country: 'Denmark',
      language: 'Danish/English',
      ranking: 53,
      programs: ['Finance', 'Sustainable Business'],
      tuitionFee: 'Free for EU/EEA',
      scholarships: true,
      website: 'https://cbs.dk'
    }
  ],
  'Sweden': [
    {
      id: 'sse',
      name: 'Stockholm School of Economics (SSE)',
      city: 'Stockholm',
      country: 'Sweden',
      language: 'Swedish/English',
      ranking: 54,
      programs: ['Finance', 'Entrepreneurship'],
      tuitionFee: 'Free for EU/EEA',
      scholarships: true,
      website: 'https://hhs.se'
    }
  ],
  'Finland': [
    {
      id: 'helsinki',
      name: 'University of Helsinki',
      city: 'Helsinki',
      country: 'Finland',
      language: 'Finnish/English',
      ranking: 55,
      programs: ['Economics', 'Social Sciences'],
      tuitionFee: 'Free for EU/EEA',
      scholarships: true,
      website: 'https://helsinki.fi'
    }
  ],
  'Norway': [
    {
      id: 'bi',
      name: 'BI Norwegian Business School',
      city: 'Oslo',
      country: 'Norway',
      language: 'Norwegian/English',
      ranking: 56,
      programs: ['Finance', 'Management'],
      tuitionFee: '€14,000–€18,000/year',
      scholarships: true,
      website: 'https://bi.edu'
    }
  ],
  'UK': [
    {
      id: 'lse',
      name: 'London School of Economics (LSE)',
      city: 'London',
      country: 'UK',
      language: 'English',
      ranking: 57,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '£22,000–£27,000/year',
      scholarships: true,
      website: 'https://lse.ac.uk'
    },
    {
      id: 'oxford',
      name: 'University of Oxford',
      city: 'Oxford',
      country: 'UK',
      language: 'English',
      ranking: 58,
      programs: ['Economics', 'Public Policy'],
      tuitionFee: '£25,000–£35,000/year',
      scholarships: true,
      website: 'https://ox.ac.uk'
    },
    {
      id: 'cambridge',
      name: 'University of Cambridge',
      city: 'Cambridge',
      country: 'UK',
      language: 'English',
      ranking: 59,
      programs: ['Economics', 'Political Science'],
      tuitionFee: '£25,000–£35,000/year',
      scholarships: true,
      website: 'https://cam.ac.uk'
    },
    {
      id: 'warwick',
      name: 'University of Warwick',
      city: 'Coventry',
      country: 'UK',
      language: 'English',
      ranking: 60,
      programs: ['Economics', 'International Studies'],
      tuitionFee: '£20,000–£25,000/year',
      scholarships: true,
      website: 'https://warwick.ac.uk'
    },
    {
      id: 'kcl',
      name: "King's College London",
      city: 'London',
      country: 'UK',
      language: 'English',
      ranking: 61,
      programs: ['Economics', 'International Relations'],
      tuitionFee: '£20,000–£25,000/year',
      scholarships: true,
      website: 'https://kcl.ac.uk'
    }
  ],
  'Ireland': [
    {
      id: 'tcd',
      name: 'Trinity College Dublin (TCD)',
      city: 'Dublin',
      country: 'Ireland',
      language: 'English',
      ranking: 62,
      programs: ['Economics', 'International Business'],
      tuitionFee: '€16,000–€22,000/year',
      scholarships: true,
      website: 'https://tcd.ie'
    },
    {
      id: 'ucd',
      name: 'University College Dublin (UCD)',
      city: 'Dublin',
      country: 'Ireland',
      language: 'English',
      ranking: 63,
      programs: ['Economics', 'Finance'],
      tuitionFee: '€15,000–€20,000/year',
      scholarships: true,
      website: 'https://ucd.ie'
    }
  ]
};
