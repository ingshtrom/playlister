import React from 'react';
import PropTypes from 'prop-types';
import octicons from 'octicons';

class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    className: PropTypes.string
  }

  render() {
    const { name, size, className} = this.props;

    return (
      <span
        className={className}
        style={{
          fill: 'currentColor',
          width: `${size}px`,
          height: `${size}px`,
        }}
        dangerouslySetInnerHTML={{ __html: octicons[name].toSVG({ width: size, height: size }) }}
      ></span>
    );
  }
}

export default Icon;
