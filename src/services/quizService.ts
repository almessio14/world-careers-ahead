
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseQuestion {
  id: string;
  domanda: string;
  opzione: string;
  testo_opzione: string;
  academic?: number;
  finance?: number;
  consulting?: number;
  policy?: number;
  business?: number;
  enterp?: number;
}

export interface DatabaseSecondaryQuestion {
  id: string;
  macroarea: string;
  domanda: string;
  opzione: string;
  testo_opzione: string;
  microarea_group?: string;
  IB?: number;
  PE?: number;
  VC?: number;
  HF?: number;
  Quant?: number;
  AM?: number;
  Diplom?: number;
  Org_Int?: number;
  Policy?: number;
  MBB?: number;
  Big4?: number;
  Start_up?: number;
  CFO?: number;
  Ricercatore?: number;
  Giornalista?: number;
  Big_Tech?: number;
  PM?: number;
  Corporate?: number;
}

export const fetchInitialQuestions = async () => {
  const { data, error } = await supabase
    .from('Domande Iniziali')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching initial questions:', error);
    throw error;
  }

  // Group by question ID to create question objects with options
  const questionsMap = new Map();
  
  data?.forEach((row: DatabaseQuestion) => {
    if (!questionsMap.has(row.id)) {
      questionsMap.set(row.id, {
        id: row.id,
        question: row.domanda,
        options: [],
        weights: {}
      });
    }
    
    const question = questionsMap.get(row.id);
    question.options.push(row.testo_opzione);
    
    // Create weights object for this option
    const optionWeights = {
      finance: row.finance || 0,
      consulting: row.consulting || 0,
      policy: row.policy || 0,
      entrepreneurship: row.enterp || 0,
      business: row.business || 0,
      academic: row.academic || 0
    };
    
    question.weights[row.opzione] = optionWeights;
  });

  return Array.from(questionsMap.values());
};

export const fetchSecondaryQuestions = async (macroArea: string) => {
  const { data, error } = await supabase
    .from('Domande Secondarie')
    .select('*')
    .eq('macroarea', macroArea)
    .order('id');

  if (error) {
    console.error('Error fetching secondary questions:', error);
    throw error;
  }

  // Group by question ID
  const questionsMap = new Map();
  
  data?.forEach((row: DatabaseSecondaryQuestion) => {
    if (!questionsMap.has(row.id)) {
      questionsMap.set(row.id, {
        id: row.id,
        question: row.domanda,
        options: [],
        weights: {}
      });
    }
    
    const question = questionsMap.get(row.id);
    question.options.push(row.testo_opzione);
    
    // Create weights object based on macro area
    let optionWeights = {};
    
    if (macroArea === 'finance') {
      optionWeights = {
        ib: row.IB || 0,
        pe: row.PE || 0,
        vc: row.VC || 0,
        hf: row.HF || 0,
        quant: row.Quant || 0,
        am: row.AM || 0
      };
    } else if (macroArea === 'consulting') {
      optionWeights = {
        mbb: row.MBB || 0,
        big4: row.Big4 || 0
      };
    } else if (macroArea === 'policy') {
      optionWeights = {
        diplomat: row.Diplom || 0,
        org_int: row.Org_Int || 0,
        policy: row.Policy || 0
      };
    } else if (macroArea === 'business') {
      optionWeights = {
        big_tech: row.Big_Tech || 0,
        pm: row.PM || 0,
        corporate: row.Corporate || 0
      };
    } else if (macroArea === 'entrepreneurship') {
      optionWeights = {
        startup: row.Start_up || 0,
        cfo: row.CFO || 0
      };
    } else if (macroArea === 'academic') {
      optionWeights = {
        researcher: row.Ricercatore || 0,
        journalist: row.Giornalista || 0
      };
    }
    
    question.weights[row.opzione] = optionWeights;
  });

  return Array.from(questionsMap.values());
};
