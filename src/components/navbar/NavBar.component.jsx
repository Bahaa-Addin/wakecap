import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import compose from "recompose/compose";

// Material components
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withWidth, {isWidthDown} from "@material-ui/core/withWidth";

import MenuIcon from "@material-ui/icons/Menu";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import Snackbar from "@material-ui/core/Snackbar";

// Actions
import {toggleSidenav} from "../../state/actions/layout.actions";

import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

import {getUser} from '../../helpers/index';
import {userActions} from "../../state/actions/user.actions";

import {routes} from "../../constants/routes.constants";

import {styles} from "./navbar.styles";

const setTitle = (items, currentPath) => (
  items.find(item => item.href === currentPath).title
);

class NavBar extends Component {
  state = {
    login: false,
    name: "",
    layoutAccountMenuOpen: false
  };

  componentDidMount() {
    if (localStorage.getItem("login") === "true") {
      this.setState({
        login: localStorage.getItem("login"),
        name: getUser().name
      });
    }
  }

  handleOpenAccountMenuClick = event => {
    this.setState({
      layoutAccountMenuEl: event.currentTarget,
      layoutAccountMenuOpen: true
    });
  };

  handleCloseAccountMenuClick = () => {
    this.setState({layoutAccountMenuEl: null, layoutAccountMenuOpen: false});
  };

  handleLogoutClick = event => {
    this.setState({login: false, name: ""});
    this.props.userLogout();
    this.props.history.push("/login");
  };

  render() {
    const {classes, width, layout} = this.props;

    const showBurgerMenu = isWidthDown("sm", width) || !layout.sidenavOpen;

    return (
      <div>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open sidenav"
            style={{display: showBurgerMenu ? "block" : "none"}}
            onClick={this.props.toggleSidenav}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            {setTitle(routes, this.props.location.pathname) || ""}
          </Typography>
          <span className="flex"/>

          {this.state.login === "true" && (
            <div>
              <Button
                aria-owns={
                  this.state.layoutAccountMenuEl ? "simple-menu" : null
                }
                className={classes.button}
                onClick={this.handleOpenAccountMenuClick}
                variant="outlined"
                color="default"
                style={{textTransform: "capitalize"}}
                size="small"
              >
                <AccountIcon />
                  {this.state.name}
                <ArrowDownIcon/>
              </Button>

              <Menu
                role="menu"
                anchorEl={this.state.layoutAccountMenuEl}
                open={this.state.layoutAccountMenuOpen}
                onClose={this.handleCloseAccountMenuClick}
              >
                <MenuItem
                  style={{paddingLeft: 15, paddingRight: 15}}
                  onClick={event => this.handleLogoutClick(event, "logout")}
                >
                   Logout <LogoutIcon/>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.props.alert.message === "" ? false : true}
          message={this.props.alert.message}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: {
      sidenavOpen: state.layout.sidenavOpen
    },
    cart: state.cart,
    alert: state.alert
  };
}

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userActions.logout()),
  toggleSidenav: () => dispatch(toggleSidenav()),
});

NavBar.propTypes = {
  width: PropTypes.string.isRequired,
  layout: PropTypes.shape({
    sidenavOpen: PropTypes.bool
  }).isRequired,
  toggleSidenav: PropTypes.func.isRequired,
};

const composedNavBar = compose(
  withRouter,
  withWidth(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
export {composedNavBar as NavBar};
