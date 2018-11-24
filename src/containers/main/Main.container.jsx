import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";

import { SideMenu } from "../../components/sidemenu";
import { NavMenu } from "../../components/navmenu/NavMenu.component";
import { NavBar } from "../../components/navbar/NavBar.component";

// Actions
import {
  toggleSidenav,
  setSidenavOpen } from "../../state/actions";

import { styles } from "./main.styles";
import scss from "./Main.module.scss";

class Main extends Component {
  // Set the initial layout state when the layout is initialised
  constructor(props) {
    super(props);
    props.setSidenavOpen(!isWidthDown("sm", props.width));
  }

  // Update the layout state when a going from mobile to desktop and vice versa
  componentWillReceiveProps(nextProps) {
    if (
      isWidthDown("sm", this.props.width) &&
      isWidthUp("md", nextProps.width)
    ) {
      this.props.setSidenavOpen(true);
    } else if (
      isWidthDown("sm", nextProps.width) &&
      isWidthUp("md", this.props.width)
    ) {
      this.props.setSidenavOpen(false);
    }
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div
        className={classNames(scss["wrapper"], classes.wrapper)}
      >
        <SideMenu>
          <NavMenu />
        </SideMenu>
        <main className={scss["main"]}>
          <AppBar color="default" position="static">
            <NavBar />
          </AppBar>
          <div className={scss["content-wrapper"]}>
            <div className={scss["content"]}>{children}</div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  layout: {
    sidenavOpen: state.layout.sidenavOpen
  }
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidenav: () => dispatch(toggleSidenav()),
  setSidenavOpen: (data) => dispatch(setSidenavOpen(data))
});

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  setSidenavOpen: PropTypes.func.isRequired
};

const composedMain = compose(
  withWidth(),
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Main);
export {composedMain as Main};
