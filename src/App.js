console.log('# App')
import _ from 'underscore';
import React, {useState,useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
// import {fetchTheme} from '#c/functions';

// import routes from '#c/routes';
import store from '#c/functions/store';
import {SaveData} from '#c/functions/index';
import {useSelector,useDispatch} from "react-redux";
// let theData=false;
import createRoutes from '#c/DefaultRoute';

const APP = ((props) => {
  console.log("APP");
  // const themeData = store.getState().store.themeData;

  let {t} = props,routes=[];
  const themeData = useSelector((st) => st.store.themeData, _.isEqual);
  // const dispatch = useDispatch();
  // dispatch(fetchTheme());

  // const themeData = {};
  if (themeData && themeData.routes) {
    routes=createRoutes(themeData.routes)

  }

  if (!themeData || (themeData && !themeData.models)) {
    return <></>
  }
  console.log('before #App',themeData)
  return (
    <div className={t('languageDir')} dir={t('languageDir')}>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            // console.log('route',themeData,route);
            return(
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                // element={<></>}
                // element={<route.layout width={width} {...props}>
                element={<route.layout {...props} themeData={themeData}>
                  <route.element elements={route.elements}/>
                </route.layout>}
              />
            )
          })}
        </Routes>
      </BrowserRouter>

    </div>
  );
});
export default withTranslation()(APP);
