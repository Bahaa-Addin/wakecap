import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withWidth from '@material-ui/core/withWidth';
import Avatar from '@material-ui/core/Avatar';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import {ItemPlaceholder} from "./ItemPlaceholder.component";
import avatarIcon from '../../../assets/icons/user.svg';

import {styles} from './items-list.styles';
import scss from './ItemsList.module.scss';

const ItemsList = (props) => {
  const {
    classes,
    selectedItem,
    list,
    width,
    onSelect,
    currentPage,
    total,
    onChangePage,
    isLoading
  } = props;

  return (
    <Drawer
      variant="persistent"
      open={(width !== 'sm' && width !== 'xs') || selectedItem === null}
      classes={{
        paper: width === 'sm' || width === 'xs' ? classes.mobileMenuPaper : classes.desktopMenuPaper,
        docked: classes.fullHeight
      }}
      style={(width === 'sm' || width === 'xs') && selectedItem ? {display: 'none'} : {}}
      anchor="left"
      ModalProps={{
        keepMounted: true
      }}
    >
      <div className={classNames(classes.drawerInner, 'hide-scrollbars')}>
        <List component="nav" className={classes.list}>
          {!isLoading
            ? list.map(item => (
            <ListItem
              disableGutters
              title={item.name}
              key={item.id}
              className={classNames(
                scss['thread-list__item'],
                item === selectedItem ? classes['thread-list__item--active'] : ''
              )}
              onClick={onSelect(item)}
            >
              <Avatar alt={item.name} src={avatarIcon}/>
              <ListItemText
                primary={item.name}
                secondary="Worker"
                classes={{
                  primary: item === selectedItem ? classes['thread-list__item__text--active'] : '',
                  secondary: classNames(
                    scss['thread-list__item__text'],
                    item === selectedItem ? classes['thread-list__item__text--active'] : ''
                  )
                }}
              />
            </ListItem>
          ))
            : [...Array(10)].map((e, i) => <ItemPlaceholder classes={classes} key={i}/>)
          }
        </List>
        <div className={scss['pagination']}>
          <Pagination onChange={onChangePage} current={currentPage} total={total}/>
        </div>
      </div>
    </Drawer>
  );
};

ItemsList.defaultProps = {
  selectedItem: null
};

ItemsList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedItem: PropTypes.shape({}),
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

const composedItemsList = compose(
  withWidth(),
  withStyles(styles, {withTheme: true})
)(ItemsList);
export {composedItemsList as ItemsList};
