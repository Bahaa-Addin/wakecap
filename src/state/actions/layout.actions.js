export const TOGGLE_SIDENAV = "LAYOUT_TOGGLE_SIDENAV";
export const SET_SIDENAV_OPEN = "LAYOUT_SET_SIDENAV_OPEN";

export const TOGGLE_CART = "(LAYOUT) TOGGLE_TOGGLE_CART";

export const toggleSidenav = () => ({
  type: TOGGLE_SIDENAV
});

export const setSidenavOpen = data => ({
  type: SET_SIDENAV_OPEN,
  payload: data
});

