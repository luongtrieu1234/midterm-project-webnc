import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';

// eslint-disable-next-line no-unused-vars
const Loading = ({ type, color }) => (
  <ReactLoading className='' type={'spokes'} color={'#00CC00'} height={'6%'} width={'6%'} />
);

Loading.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
};

Loading.defaultProps = {
  color: '',
  type: '',
};

export default Loading;
