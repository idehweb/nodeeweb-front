import React from 'react';
import clsx from 'clsx';
import {Navbar} from 'shards-react';

import {CustomNavItem} from './NavbarNav';
// import useWindowSize from '#c/components/common/useWindowSize';

export default function MainNavbar({layout, element,style,setStyles, stickyTop = true, onChange}) {
  // const classes = clsx('main-navbar', 'bg-white', stickyTop && 'sticky-top');
  const classes = clsx('navbar', 'p-0');
  // let [width] = useWindowSize();
  let {children = []} = element;
  // console.log('children',children)

  return (
    <div className={classes} >
      <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0 top-bar-menu" style={style}>
        {(children && children instanceof Array) && children.map((ch, cx) => {
          // return child.map((ch,cx)=>{
          // console.log('ch', ch);
          let {settings={},children} = ch;
          let {general = {}} = settings;
          let {fields = {}} = general;
          let {text = '', link=''} = fields;
          let style=setStyles(fields);
          // console.log('text',text)
          // return text;
          return <CustomNavItem key={cx} children={children} setStyles={setStyles} text={text} href={link} style={style}/>
          // })
        })}
      </Navbar>
    </div>
  );
}
