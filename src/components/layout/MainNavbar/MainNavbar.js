import React from 'react';
import clsx from 'clsx';
import {Container, Navbar} from 'shards-react';

import NavbarNav from './NavbarNav';
import NavbarMenu from './NavbarMenu';
// import useWindowSize from '#c/components/common/useWindowSize';

export default function MainNavbar({layout, stickyTop = true, onChange}) {
  const classes = clsx('main-navbar', 'bg-white', stickyTop && 'sticky-top');
  // let [width] = useWindowSize();

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">

          <NavbarNav/>
          <NavbarMenu/>

        </Navbar>
      </Container>
    </div>
  );
}
