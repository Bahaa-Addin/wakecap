import React from 'react';
import {Workers} from "../containers/workers";
import {ComingSoon} from "../components/coming-soon";

export const routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    component: (<ComingSoon />)
  },
  {
    title: "Workers",
    href: "/workers",
    component: (<Workers />)
  },
  {
    title: "Zones",
    href: "/zones",
    component: (<ComingSoon />)
  },
  {
    title: "Assign Helments",
    href: "/helmets",
    component: (<ComingSoon />)
  },
  {
    title: "Reports",
    href: "/reports",
    component: (<ComingSoon />)
  },
  {
    title: "Manage Sites",
    href: "/sites",
    component: (<ComingSoon />)
  },
  {
    title: "Settings",
    href: "/settings",
    component: (<ComingSoon />)
  },
];
