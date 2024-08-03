import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { useAppSelector } from '@store/hooks';
import useWordCloudData from '@hooks/useWordCloudData';
import './WordCloud.scss';

interface WordCloudProps {
  type: 'entity' | 'theme';
}

const WordCloud: React.FC<WordCloudProps> = ({ type }) => {
  const wordCloudRef = useRef<SVGSVGElement | null>(null);
  const data = useAppSelector((state) => state.data.data);
  const words = useWordCloudData(data, type);

  useEffect(() => {
    if (wordCloudRef.current) {
      d3.select(wordCloudRef.current).selectAll('*').remove();

      const layout = cloud()
        .size([wordCloudRef.current.clientWidth, wordCloudRef.current.clientHeight])
        .words(words)
        .padding(5)
        .rotate(() => 0)
        .font('Impact')
        .fontSize((d: any) => d.size)
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
  }, [words]);

  return (
    <div className="word-cloud">
      <svg ref={wordCloudRef}></svg>
    </div>
  );
};

export default WordCloud;
