import PropTypes from 'prop-types';

const SkeletonLoader = (props) => {
  const width = props.width || 'w-full';
  const height = props.height || 'h-4';
  const rounded = props.rounded || 'rounded-md';
  const className = props.className || '';

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${width} ${height} ${rounded} ${className}`}
    ></div>
  );
};

SkeletonLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  rounded: PropTypes.string,
  className: PropTypes.string
};

export default SkeletonLoader;
