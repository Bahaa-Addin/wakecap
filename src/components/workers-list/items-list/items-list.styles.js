const menuWidth = 256;

export const styles = theme => ({
  mobileMenuPaper: {
    height: '100%',
    position: 'inherit',
  },
  desktopMenuPaper: {
    position: 'relative',
    height: '100%',
    width: menuWidth,
    maxWidth: menuWidth,
    zIndex: '1'
  },
  fullHeight: {
    height: '100%'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  drawerInner: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%'
  },
  // Email List container
  'thread-list__item--active': {
    background: theme.palette.primary.light
  },
  'thread-list__item__text--active': {
    color: theme.palette.primary.contrastText
  },
  // Thread container

  // Fab button icon
  'email-compose-fab__icon': {
    color: theme.palette.secondary.contrastText
  }
});
