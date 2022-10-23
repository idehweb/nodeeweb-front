import React ,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'shards-react';
import {useSelector} from "react-redux";
import PageBuilder from "#c/components/page-builder/PageBuilder";
import CardSidebar from '#c/components/layout/MainSidebar/CardSidebar';


const DefaultLayout = ({children, width, noNavbar, onChange = () => null}) => {

  const themeData = useSelector((st) => st.store.themeData);
  const homeData = useSelector((st) => st.store.homeData);
  useEffect(() => {
    console.log('homeData', themeData)
  }, []);
  console.log('DefaultLayout...');
  return (

    <>
      {themeData.header && themeData.header.elements && <header className="main-header d-flex pt-3 pb-1 px-3 bg-white" key={0}>
        <PageBuilder elements={themeData.header.elements} maxWidth={themeData.header.maxWidth}/>
      </header>}
      {children}
      <CardSidebar  />

      {themeData.footer && themeData.footer.elements && <footer className="main-footer p-2 px-3 border-top" key={2}>
        <PageBuilder elements={themeData.footer.elements} maxWidth={themeData.header.maxWidth}/></footer>}

    </>

  );
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DefaultLayout;

