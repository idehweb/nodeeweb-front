import Admin from '#c/views/Admin';
import CreatePage from '#c/views/CreatePage';
import Home from '#c/views/Home';
import Login from '#c/views/Login';
import Page from '#c/views/Page';
import Profile from '#c/views/Profile';
import {DefaultLayout, Nof, Nohf} from '#c/layouts/index';
export default function createRoutes(themeRoutes) {
  let DefaultRoute= [
    {
      path: '/admin/:model',
      element: Admin,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/admin/:model/:action',
      element: Admin,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/admin/:model/:action/:_id',
      element: Admin,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/admin/page/create-page',
      element: CreatePage,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/admin/page/edit-page/:_id',
      element: CreatePage,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/page/:_id',
      element: Page,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/login',
      element: Login,
      layout: Nohf,
      exact: true,

    },
    {
      path: '/profile',
      element: Profile,
      layout: Nohf,
      exact: true,

    }
  ];

  let routes=DefaultRoute;
  themeRoutes.forEach((e, j) => {
    if (e.element == 'Admin') {
      e.element = Admin;

    }
    if (e.element == 'Home') {
      e.element = Home;

    }
    if (e.layout == 'Nohf') {
      e.layout = Nohf;

    }
    if (e.layout && e.element && e.path) {
      routes.push(e);
    }
  })
  return routes;
}

// export default DefaultRoute
