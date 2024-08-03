export interface SurveyResponse {
    PhrasedQuestion: string;
    Response: string;
    Sentiment: 'Positive' | 'Neutral' | 'Negative';
    Score: number;
    Polarity: number;
    Emotion: 'Happiness' | 'Sadness' | 'Anger' | 'Others';
    Entities: string;
    Themes: string;
    ActionableInsight: string;
    SemanticAnalysis: string;
    PositiveAspects: string;
    NegativeAspects: string;
  }
  
  export interface SurveyDataState {
    data: SurveyResponse[];
  }
  
  export type EmotionCount = { [key: string]: number };