import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import {SideMenuItem} from "../sidemenu-item/SideMenuItem.component";

import {routes} from "../../constants/routes.constants";

import styles from "./navmenu.styles";

const NavMenuItem = ({classes}) => (
  <List className={classes.list}>
    {routes.map(item => (
        <SideMenuItem
          key={item.title}
          title={item.title}
          href={item.href}
        />
      )
    )}
  </List>
);

const NavMenu = ({classes}) => (
  <div className={classes.contentWrapper}>
    <div className={classes.content}>
      <NavMenuItem classes={classes}/>
    </div>
  </div>
);

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

const styledNavMenu = withStyles(styles)(NavMenu);
export {styledNavMenu as NavMenu};