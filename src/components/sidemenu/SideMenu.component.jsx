import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';

// Material components
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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

  return (
      <Drawer
        variant="persistent"
        open={layout.sidenavOpen}
        onClose={props.toggleSidenav}
        classes={{
          paper: scss[`sidemenu`]
        }}
      >
        {/* top toolbar with logo */}
        <AppBar
          color="default"
          position="static"
        >
          <Toolbar>
            <img src={logoImage} className={scss['toolbar-brand']} alt="logo" />
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
      </Drawer>
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
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SideMenu);
export { composedSideMenu as SideMenu };
