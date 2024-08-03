import { View } from './enums';

export const COMPONENT_TITLES: { [key in View]: string } = {
  [View.Table]: 'Survey Data Table',
  [View.SentimentDistribution]: 'Sentiment Distribution',
  [View.EmotionChart]: 'Responses Distribution by Emotion',
  [View.EntityWordCloud]: 'Entity Word Cloud',
  [View.ThemeWordCloud]: 'Theme Word Cloud',
};
