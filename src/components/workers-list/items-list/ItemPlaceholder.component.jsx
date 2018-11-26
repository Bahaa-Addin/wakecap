import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import scss from './ItemsList.module.scss';

import avatarIcon from '../../../assets/icons/user.svg';
import lineIcon from '../../../assets/icons/line.svg';

const ItemPlaceholder = ({classes}) => (
  <ListItem
    disableGutters
    className={scss['thread-list__item']}
  >
    <Avatar alt="placeholder" src={avatarIcon}/>
      <img src={lineIcon} alt="line" style={{
        width: '80%',
        transform: 'scaleY(.3)',
        margin: '.7em'
      }}/>
  </ListItem>
);

ItemPlaceholder.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export {ItemPlaceholder};
