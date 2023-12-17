import './style.scss';

import React from 'react';

function Loading() {
  return (
    <div className='loading'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        style={{
          margin: 'auto',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width='50px'
        height='50px'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle
          cx='50'
          cy='50'
          fill='none'
          stroke='#059bb4'
          strokeWidth='10'
          r='35'
          strokeDasharray='164.93361431346415 56.97787143782138'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='1s'
            values='0 50 50;360 50 50'
            keyTimes='0;1'
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loading;
