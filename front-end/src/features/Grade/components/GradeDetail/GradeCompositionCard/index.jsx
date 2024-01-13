import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import React from 'react';

export default function GradeCompositionCard(gradeComposition) {
  return (
    <div className='card flex justify-content-center'>
      <Card title='Grade composition' style={{ width: '80%' }}>
        <div>{gradeComposition?.name}</div>
        <p className='m-0'>{gradeComposition?.content}</p>
      </Card>
    </div>
  );
}

GradeCompositionCard.propTypes = {
  gradeComposition: PropTypes.object.isRequired,
};
