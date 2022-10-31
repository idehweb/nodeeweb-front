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
  // theData=themeData;
  // useEffect(() => {
  //   console.log('use Effect')
  // }, [])
  // let {time, cardTime, homePopup} = store.getState().store;


  // let now = new Date().getTime(), hours = 1, rrr = false;
  // if (time == null) {
  //
  //   SaveData({time: new Date().getTime()});
  //
  // }
  // if (cardTime == null) {
  //   SaveData({cardTime: new Date().getTime()});
  //
  // }

  // console.log('now-time', new Date(now), new Date(time), now - time, hours * 60 * 60 * 10 * 60 * 24);
  //
  // if ((now - time) > (hours * 60 * 60 * 10 * 60 * 24)) {
  //   console.log('sorry, we should show popup!');
  //
  //   localStorage.removeItem('time');
  //   localStorage.removeItem('homePopup');
  //   homePopup = false;
  //   SaveData({time: now});
  //
  // }
  // console.log('now-cardTime', new Date(now), new Date(cardTime), now - cardTime, 60 * 60 * 10)
  // //
  // if ((now - cardTime) > 60 * 60 * 10) {
  //   console.log('sorry, we should clear card!')
  //   localStorage.removeItem('card');
  //   localStorage.removeItem('cardTime');
  //   SaveData({card: [], cardTime: now});
  //
  // }


  // let [width, setValue] = useState(window.innerWidth); // integer state
  // }
  // const { homePopup } = store.getState().store;

  // console.log(homePopup);

  // if (!homePopup) {
  //   rrr = true;
  //   console.log('show popup');
  //   SaveData({homePopup: true});
  //
  //
  // }
  // const [modal, setmodal] = useState(rrr);

  // const onCloseModal = () => {
  //   // let {modals} = this.state;
  //   setmodal(!modal);
  //
  // };

  // const renderData = () => {
  //   console.log('render');
  //   setValue(window.innerWidth);
  // };
  // window.addEventListener('resize', () => {
  //   // width=window.innerWidth;
  //   if (((width < 1200 && window.innerWidth > 1200))) {
  //     console.log('resize', width, window.innerWidth);
  //     width = window.innerWidth;
  //     renderData();
  //   }
  //   if (((width > 1200 && window.innerWidth < 1200))) {
  //     console.log('resize 2', width, window.innerWidth);
  //     width = window.innerWidth;
  //     renderData();
  //   }
  //
  // });
  if (!themeData || (themeData && !themeData.models)) {
    return <></>
  }
  console.log('before #App',themeData)
  // return <></>
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
