import React from 'react';
import {Dashboard} from "../containers/dashboard";
import {Workers} from "../containers/workers";

export const routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    component: (<Dashboard />)
  },
  {
    title: "Workers",
    href: "/workers",
    component: (<Workers />)
  },
  {
    title: "Zones",
    href: "/zones",
    component: (<div> </div>)
  },
  {
    title: "Assign Helments",
    href: "/helmets",
    component: (<div> </div>)
  },
  {
    title: "Reports",
    href: "/reports",
    component: (<div> </div>)
  },
  {
    title: "Manage Sites",
    href: "/sites",
    component: (<div> </div>)
  },
  {
    title: "Settings",
    href: "/settings",
    component: (<div> </div>)
  },
];
