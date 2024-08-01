import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { useAppSelector } from '../../store/hooks';
import './WordCloud.scss';

const WordCloudComponent: React.FC<{ type: 'entity' | 'theme' }> = ({ type }) => {
  const wordCloudRef = useRef<SVGSVGElement | null>(null);
  const data = useAppSelector((state) => state.data.data);

  useEffect(() => {
    if (wordCloudRef.current) {

        d3.select(wordCloudRef.current).selectAll('*').remove();
  
      const words = data.map((item) => ({
        text: type === 'entity' ? item.Entities : item.Themes,
        size: 10 + Math.random() * 90, // You can customize the size based on frequency or other metrics
      }));

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

    // Prepare the word data for the word cloud
    // const words2 = Object.keys(wordFrequency).map((word) => ({
    //   text: word,
    //   size: 10 + wordFrequency[word] * 2, // Adjust the multiplier as needed
    // }));

    // Prepare the word data for the word cloud
    // const words = Object.keys(wordFrequency).map((word) => ({
    //     text: word,
    //     size: 10 + wordFrequency[word] * 2, // Adjust the multiplier as needed
    //     font: 'Impact',
    //     style: 'normal',
    //     weight: 'normal',
    //     rotate: Math.random() > 0.5 ? 0 : 90,
    //     padding: 5,
    //   }));

    // console.log("Word Frequency:", wordFrequency);
    // console.log("Words array:", words);
    // console.log("Words array2:", words2);

      const layout = cloud()
        .size([wordCloudRef.current.clientWidth, wordCloudRef.current.clientHeight])
        .words(words)
        .padding(5)
        .rotate(() => (Math.random() > 0.5 ? 0 : 90))
        .font('Impact')
        .fontSize((d:any) => d.size)
        .on('end', draw);

      layout.start();

      function draw(words: any[]) {
        d3.select(wordCloudRef.current)
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', (d) => `${d.size}px`)
          .style('font-family', 'Impact')
          .style('fill', (_, i) => d3.schemeCategory10[i % 10])
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text((d) => d.text);
      }
    }
  }, [data, type]);

  return (
    <div className="word-cloud">
      <svg ref={wordCloudRef}></svg>
    </div>
  );
};

export default WordCloudComponent;
