
export interface BusinessCorpusExample {
  id: string;
  title: string;
  type: 'market-report' | 'financial-statement' | 'project-plan' | 'research-document';
  description: string;
  sampleEndpoints: Array<{
    name: string;
    value: string | number;
    description: string;
  }>;
  keyConnections: Array<{
    concept: string;
    relatedDocuments: string[];
  }>;
}

export const businessCorpusExamples: BusinessCorpusExample[] = [
  {
    id: 'market-analysis-q4-2024',
    title: 'Q4 2024 Market Analysis Report',
    type: 'market-report',
    description: 'Comprehensive market analysis covering technology sector trends',
    sampleEndpoints: [
      {
        name: 'Growth_Rate_AI_Sector',
        value: 42.5,
        description: 'Annual growth rate percentage for AI sector'
      },
      {
        name: 'Market_Leaders_Count',
        value: 5,
        description: 'Number of identified market leaders'
      }
    ],
    keyConnections: [
      {
        concept: 'Artificial Intelligence',
        relatedDocuments: ['Tech Innovation Strategy 2025', 'R&D Investment Plan']
      },
      {
        concept: 'Market Share',
        relatedDocuments: ['Competitive Analysis', 'Revenue Projections']
      }
    ]
  },
  {
    id: 'financial-statement-2024',
    title: 'Annual Financial Statement 2024',
    type: 'financial-statement',
    description: 'Complete financial overview with key performance indicators',
    sampleEndpoints: [
      {
        name: 'Revenue_Growth_YoY',
        value: 18.3,
        description: 'Year-over-year revenue growth percentage'
      },
      {
        name: 'Operating_Margin',
        value: 24.7,
        description: 'Operating margin percentage'
      }
    ],
    keyConnections: [
      {
        concept: 'Profitability',
        relatedDocuments: ['Business Strategy Plan', 'Cost Optimization Report']
      },
      {
        concept: 'Cash Flow',
        relatedDocuments: ['Investment Portfolio', 'Liquidity Analysis']
      }
    ]
  },
  {
    id: 'project-roadmap-2025',
    title: 'Digital Transformation Roadmap 2025',
    type: 'project-plan',
    description: 'Strategic project plan for digital transformation initiatives',
    sampleEndpoints: [
      {
        name: 'Project_Phases_Count',
        value: 4,
        description: 'Number of major project phases'
      },
      {
        name: 'Budget_Allocation_Million',
        value: 12.5,
        description: 'Total budget allocation in millions'
      }
    ],
    keyConnections: [
      {
        concept: 'Digital Infrastructure',
        relatedDocuments: ['Technology Assessment', 'System Architecture Plan']
      },
      {
        concept: 'Change Management',
        relatedDocuments: ['Training Program', 'Stakeholder Engagement Plan']
      }
    ]
  }
];

export const getBusinessExample = (type: BusinessCorpusExample['type']): BusinessCorpusExample | undefined => {
  return businessCorpusExamples.find(example => example.type === type);
};

export const getBusinessEndpointSuggestions = (text: string): { name: string; value: string | number } => {
  // Business-specific endpoint generation logic
  const lowerText = text.toLowerCase();
  
  // Financial patterns
  if (lowerText.includes('revenue') && lowerText.includes('%')) {
    const percentMatch = text.match(/(\d+\.?\d*)%/);
    return {
      name: 'Revenue_Growth_Rate',
      value: percentMatch ? parseFloat(percentMatch[1]) : 0
    };
  }
  
  // Market analysis patterns
  if (lowerText.includes('market share')) {
    const numberMatch = text.match(/(\d+\.?\d*)/);
    return {
      name: 'Market_Share_Percentage',
      value: numberMatch ? parseFloat(numberMatch[1]) : 0
    };
  }
  
  // Project management patterns
  if (lowerText.includes('phase') || lowerText.includes('milestone')) {
    const numberMatch = text.match(/(\d+)/);
    return {
      name: 'Project_Phases_Count',
      value: numberMatch ? parseInt(numberMatch[1]) : 1
    };
  }
  
  // Generic business metric
  return {
    name: 'Business_Metric',
    value: text.length
  };
};
