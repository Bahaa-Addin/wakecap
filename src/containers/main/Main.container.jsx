import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core/styles";
import withWidth, {isWidthUp, isWidthDown} from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";

import {SideMenu} from "../../components/sidemenu";
import {NavMenu} from "../../components/navmenu/NavMenu.component";
import {NavBar} from "../../components/navbar/NavBar.component";

// Actions
import {
  toggleSidenav,
  setSidenavOpen,
  workerActions,
  supervisorActions
} from "../../state/actions";

import {styles} from "./main.styles";
import scss from "./Main.module.scss";

class Main extends Component {
  // Set the initial layout state when the layout is initialised
  constructor(props) {
    super(props);
    props.setSidenavOpen(!isWidthDown("sm", props.width));
  }

  componentDidMount() {
    this.props.fetchWorkers({_page: 1});
    this.props.fetchSupervisors({_page: 1});
  }

  componentDidUpdate(prevProps) {
    if (
      isWidthDown("sm", prevProps.width) &&
      isWidthUp("md", this.props.width)
    ) {
      this.props.setSidenavOpen(true);
    } else if (
      isWidthDown("sm", this.props.width) &&
      isWidthUp("md", prevProps.width)
    ) {
      this.props.setSidenavOpen(false);
    }
  }

  render() {
    const {children, classes, layout} = this.props;

    return (
      <div
        className={classNames(scss["wrapper"], classes.wrapper)}
      >
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: layout.sidenavOpen,
          })}
        >
          <NavBar/>
        </AppBar>
        <SideMenu>
          <NavMenu/>
        </SideMenu>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: layout.sidenavOpen,
          })}
        >
          <div className={classes.drawerHeader}></div>
            <div>{children}</div>
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
  setSidenavOpen: (data) => dispatch(setSidenavOpen(data)),
  fetchWorkers: (params) => dispatch(workerActions.fetchWorkers(params)),
  fetchSupervisors: (params) => dispatch(supervisorActions.fetchSupervisors(params))
});

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  setSidenavOpen: PropTypes.func.isRequired
};

const composedMain = compose(
  withWidth(),
  withStyles(styles, {withTheme: true}),
  connect(mapStateToProps, mapDispatchToProps)
)(Main);
export {composedMain as Main};
