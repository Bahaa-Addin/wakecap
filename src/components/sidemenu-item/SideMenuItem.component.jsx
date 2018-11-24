import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom/";
import Typography from "@material-ui/core/Typography";

import {styles} from "./sidemenu-item.styles";

const SideMenuItem = ({classes, href, title}) => (
  <ListItem
    to={href}
    component={NavLink}
    exact={true}
    activeClassName={classes.listItemActive}
    className={classes.root}
    disableGutters
  >
    <Button
      style={{justifyContent: "left"}}
      classes={{
        root: classes.listItem,
        label: classes.listItemButtonLabel
      }}
    >
      <Typography
        variant="button"
        color="inherit"
        className={classes.listItemText}
      >
        {title}
      </Typography>
    </Button>
  </ListItem>
);

SideMenuItem.defaultProps = {
  href: null,
};

SideMenuItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const styledSideMenuItem = withStyles(styles)(SideMenuItem);
export {styledSideMenuItem as SideMenuItem}
