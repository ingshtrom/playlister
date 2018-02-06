import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ENTITY_TYPES } from '../constants';

class PlayList extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string.isRequired,
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(ENTITY_TYPES),
      content: PropTypes.array.isRequired
    }).isRequired
  }

  render() {
    const { currentUrl, item } = this.props;

    return (
      <div>
        <Link to={`${currentUrl}/${item.name}`}>
          {item.name}
        </Link>
      </div>
    );
  }
}

export default PlayList;

