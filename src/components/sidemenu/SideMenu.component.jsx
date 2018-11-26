import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

// Material components
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import withWidth, {isWidthDown} from "@material-ui/core/withWidth";

// Portal components
import logoImage from '../../assets/images/logo.png';

// Actions
import { toggleSidenav } from '../../state/actions/index';

// Styles
import scss from './SideMenu.module.scss';

const SideMenu = (props) => {
  const {
    layout
  } = props;

   const variant = isWidthDown("sm", props.width) ? "temporary" : "persistent";

  return (
      <SwipeableDrawer
        variant={variant}
        anchor="left"
        open={layout.sidenavOpen}
        onOpen={() => {}}
        onClose={props.toggleSidenav}
        classes={{
          paper: scss[`sidemenu`]
        }}
      >
        {/* top toolbar with logo */}
        <AppBar
          color="default"
          position="static"
          className={scss["sidemenu-appbar"]}
        >
          <Toolbar>
            <img src={logoImage} className={scss['sidemenu-brand']} alt="logo" />
          </Toolbar>
        </AppBar>
        {/* main menu */}
        {props.children}
        <AppBar
          color="default"
          position="static"
        >
          <Toolbar disableGutters>
            <span className="flex" />
            <IconButton onClick={props.toggleSidenav}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </SwipeableDrawer>
  );
};

const mapStateToProps = (state) => ({
    layout: {
      sidenavOpen: state.layout.sidenavOpen,
    }
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidenav: () => dispatch(toggleSidenav())
});

SideMenu.propTypes = {
  toggleSidenav: PropTypes.func.isRequired,
  layout: PropTypes.shape({
    sidenavOpen: PropTypes.bool.isRequired
  }).isRequired,
  children: PropTypes.object.isRequired
};

const composedSideMenu = compose(
  withWidth(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideMenu);
export { composedSideMenu as SideMenu };
