import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import React from 'react';

export default function GradeCompositionCard({ gradeComposition }) {
  return (
    <div className='card '>
      <Card title='Grade composition' content='Content'>
        <div>
          <span className='font-semibold'>Grade composition name:</span>
          {gradeComposition?.name}
        </div>
        <div>
          <span className='font-semibold'>Content:</span>
          {gradeComposition?.content}
        </div>
        <div>
          <span className='font-semibold'>Scale:</span>
          {gradeComposition?.gradeScale}
        </div>
      </Card>
    </div>
  );
}

GradeCompositionCard.propTypes = {
  gradeComposition: PropTypes.object.isRequired,
};
