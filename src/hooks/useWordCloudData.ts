import { useMemo } from 'react';
import * as d3 from 'd3';
import { SurveyResponse } from '@interfaces';

const useWordCloudData = (data: SurveyResponse[], type: 'entity' | 'theme') => {
  return useMemo(() => {
    const wordFrequency: { [key: string]: number } = {};
    data.forEach((item) => {
      const words = type === 'entity' ? item.Entities.split(' ') : item.Themes.split(' ');
      words.forEach((word) => {
        if (wordFrequency[word]) {
          wordFrequency[word]++;
        } else {
          wordFrequency[word] = 1;
        }
      });
    });

    const frequencies = Object.values(wordFrequency);
    const minFreq = Math.min(...frequencies);
    const maxFreq = Math.max(...frequencies);
    const minFontSize = 10;
    const maxFontSize = 90;

    const scale = d3.scaleLinear().domain([minFreq, maxFreq]).range([minFontSize, maxFontSize]);

    return Object.keys(wordFrequency).map((word) => ({
      text: word,
      size: scale(wordFrequency[word]),
    }));
  }, [data, type]);
};

export default useWordCloudData;
