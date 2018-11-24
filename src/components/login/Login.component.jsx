import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import compose from "recompose/compose";
import classNames from "classnames";
import {userActions} from "../../state/actions/user.actions";

import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

import {withStyles} from "@material-ui/core/styles";
import {styles} from "./login.styles";
import scss from "./Login.module.scss";

import logoImage from "../../assets/images/logo.png";

const mapStateToProps = (state) => {
  const {isLoading, login, error} = state.user;
  return {
    isLoading,
    login,
    error
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: ({email, password}) => dispatch(userActions.login({email, password})),
  userLogout: () => dispatch(userActions.logout())
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      snackMessage: "",
      open: false,
      vertical: "top",
      horizontal: "center"
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const {login, error} = this.props;
    if (login) {
      this.props.history.push("/workers");
    }
    if (error) {
      if (prevProps.error && error.message === prevProps.error.message) {
        return
      }
      this.setState({
        open: true,
        vertical: "top",
        horizontal: "center",
        snackMessage: "Email/Password is incorrect"
      });
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  loginAction = () => {
    const {userLogin} = this.props;
    const {email, password} = this.state;
    userLogin({email, password});
  };

  render() {
    const {classes, width, isLoading} = this.props;
    const panelDirection = width === "xs" ? "column" : "row";
    const { snackMessage, open, vertical, horizontal } = this.state;

    return (
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center"
        className={classes.background}
      >
        <Grid item sm={10} xs={12} className={scss.panel}>
          <Grid direction={panelDirection} container spacing={0}>
            <Grid item sm={6} xs={12}>
              <Card className={classNames(scss.card, classes["primary-card"])}>
                <CardContent className={scss["signup-content"]}>
                  <img
                    src={logoImage}
                    className={scss["signup-logo"]}
                    alt="logo"
                  />
                  <Typography variant="h5" gutterBottom>
                    Enterprise Solution To Improve Safety & Productivity On Construction Sites
                  </Typography>
                  <Typography component="p" gutterBottom>
                    Wakecap Connects & Tracks Tools, Equipment, And Most Importantly Workers At The Job Site
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Card className={scss.card}>
                <CardContent>
                  <TextField
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </CardContent>
                <CardActions className={scss["login-actions"]}>
                  <Button
                    disabled={!this.validateForm()}
                    onClick={this.loginAction}
                    color="primary"
                    variant="contained"
                  >
                    Login
                  </Button>
                  {isLoading === true && (
                    <CircularProgress className={classes.progress} size={25}/>
                  )}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{vertical, horizontal}}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={snackMessage}
        />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  login: PropTypes.bool,
  isLoading: PropTypes.bool
};

const composedLogin = compose(
  withWidth(),
  withStyles(styles, {withTheme: true}),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
export {composedLogin as Login};
