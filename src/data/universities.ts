
import { University } from '../types';

export const universitiesByCountry: Record<string, University[]> = {
  'UK': [
    {
      id: 'lse',
      name: 'London School of Economics',
      city: 'London',
      country: 'UK',
      language: 'English',
      ranking: 2,
      programs: ['Economics', 'International Relations', 'International Development'],
      tuitionFee: '£25,000/year',
      scholarships: true,
      website: 'https://www.lse.ac.uk'
    },
    {
      id: 'oxford',
      name: 'University of Oxford',
      city: 'Oxford',
      country: 'UK',
      language: 'English',
      ranking: 1,
      programs: ['PPE', 'Economics', 'International Relations'],
      tuitionFee: '£28,000/year',
      scholarships: true,
      website: 'https://www.ox.ac.uk'
    }
  ],
  'USA': [
    {
      id: 'harvard',
      name: 'Harvard University',
      city: 'Cambridge, MA',
      country: 'USA',
      language: 'English',
      ranking: 3,
      programs: ['Economics', 'Government', 'International Development'],
      tuitionFee: '$54,000/year',
      scholarships: true,
      website: 'https://www.harvard.edu'
    },
    {
      id: 'georgetown',
      name: 'Georgetown University',
      city: 'Washington DC',
      country: 'USA',
      language: 'English',
      ranking: 15,
      programs: ['International Economics', 'Foreign Service', 'Public Policy'],
      tuitionFee: '$58,000/year',
      scholarships: true,
      website: 'https://www.georgetown.edu'
    }
  ],
  'France': [
    {
      id: 'sciencespo',
      name: 'Sciences Po Paris',
      city: 'Paris',
      country: 'France',
      language: 'French/English',
      ranking: 8,
      programs: ['International Relations', 'Economics', 'Public Affairs'],
      tuitionFee: '€14,000/year',
      scholarships: true,
      website: 'https://www.sciencespo.fr'
    }
  ],
  'Germany': [
    {
      id: 'hertie',
      name: 'Hertie School',
      city: 'Berlin',
      country: 'Germany',
      language: 'English',
      ranking: 12,
      programs: ['Public Policy', 'International Affairs', 'Data Science'],
      tuitionFee: '€37,000/year',
      scholarships: true,
      website: 'https://www.hertie-school.org'
    }
  ],
  'Switzerland': [
    {
      id: 'iheid',
      name: 'Graduate Institute Geneva',
      city: 'Geneva',
      country: 'Switzerland',
      language: 'English/French',
      ranking: 6,
      programs: ['International Relations', 'Development Studies', 'International Economics'],
      tuitionFee: 'CHF 4,000/year',
      scholarships: true,
      website: 'https://www.graduateinstitute.ch'
    }
  ],
  'Italy': [
    {
      id: 'bocconi',
      name: 'Bocconi University',
      city: 'Milan',
      country: 'Italy',
      language: 'English/Italian',
      ranking: 10,
      programs: ['International Economics', 'Management', 'Finance'],
      tuitionFee: '€14,000/year',
      scholarships: true,
      website: 'https://www.unibocconi.eu'
    }
  ]
};
