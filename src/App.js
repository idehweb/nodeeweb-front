console.log('# App')

import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
// import routes from '#c/routes';
import store from '#c/functions/store';
import {SaveData} from '#c/functions/index';
import {useSelector} from "react-redux";
import Admin from '#c/views/Admin';
import CreatePage from '#c/views/CreatePage';
import Home from '#c/views/Home';
import Page from '#c/views/Page';
import {DefaultLayout, Nof, Nohf} from '#c/layouts/index';

const APP = ((props) => {
  let routes = []
  let robj = {
    element: Admin,
    layout: Nohf,
    exact: true,
    path: '/admin/:model',

  };
  let robj1 = {
    element: Admin,
    layout: Nohf,
    exact: true,
    path: '/admin/:model/:action',

  };
  let robj2 = {
    element: Admin,
    layout: Nohf,
    exact: true,
    path: '/admin/:model/:action/:_id',

  };
  let robj3 = {
    element: CreatePage,
    layout: Nohf,
    exact: true,
    path: '/admin/page/create-page',

  };
  let robj4 = {
    element: CreatePage,
    layout: Nohf,
    exact: true,
    path: '/admin/page/edit-page/:_id',

  };
  let robj5 = {
    element: Page,
    layout: Nohf,
    exact: true,
    path: '/page/:_id',

  };
  routes.push(robj)
  routes.push(robj1)
  routes.push(robj2)
  routes.push(robj3)
  routes.push(robj4)
  routes.push(robj5)
  const themeData = useSelector((st) => st.store.themeData);
  if (themeData && themeData.routes) {
    // routes = themeData.routes
    themeData.routes.forEach((e, j) => {
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
  }
  // if (themeData && themeData.models) {
  //   // routes = themeData.routes
  //   themeData.models.forEach((e, j) => {
  //     let robj = {
  //       element: Admin,
  //       layout: Nohf,
  //       exact: true,
  //       path: '/admin/' + e.toLowerCase(),
  //
  //     };
  //     let robj2 = {
  //       element: Admin,
  //       layout: Nohf,
  //       exact: true,
  //       path: '/admin/' + e.toLowerCase()+'/:action',
  //
  //     };
  //     let robj3 = {
  //       element: Admin,
  //       layout: Nohf,
  //       exact: true,
  //       path: '/admin/' + e.toLowerCase()+'/:action/:_id',
  //
  //     };
  //
  //     routes.push(robj);
  //     routes.push(robj2);
  //     routes.push(robj3);
  //   })
  // }
  console.log(props);
  let {t} = props;
  let {time, cardTime, homePopup} = store.getState().store;


  let now = new Date().getTime(), hours = 1, rrr = false;
  if (time == null) {

    SaveData({time: new Date().getTime()});

  }
  if (cardTime == null) {
    SaveData({cardTime: new Date().getTime()});

  }

  console.log('now-time', new Date(now), new Date(time), now - time, hours * 60 * 60 * 10 * 60 * 24);

  if ((now - time) > (hours * 60 * 60 * 10 * 60 * 24)) {
    console.log('sorry, we should show popup!');

    localStorage.removeItem('time');
    localStorage.removeItem('homePopup');
    homePopup = false;
    SaveData({time: now});

  }
  // console.log('now-cardTime', new Date(now), new Date(cardTime), now - cardTime, 60 * 60 * 10)
  // //
  // if ((now - cardTime) > 60 * 60 * 10) {
  //   console.log('sorry, we should clear card!')
  //   localStorage.removeItem('card');
  //   localStorage.removeItem('cardTime');
  //   SaveData({card: [], cardTime: now});
  //
  // }


  let [width, setValue] = useState(window.innerWidth); // integer state
  // }
  // const { homePopup } = store.getState().store;

  console.log(homePopup);

  if (!homePopup) {
    rrr = true;
    console.log('show popup');
    SaveData({homePopup: true});


  }
  const [modal, setmodal] = useState(rrr);

  const onCloseModal = () => {
    // let {modals} = this.state;
    setmodal(!modal);

  };

  const renderData = () => {
    console.log('render');
    setValue(window.innerWidth);
  };
  window.addEventListener('resize', () => {
    // width=window.innerWidth;
    if (((width < 1200 && window.innerWidth > 1200))) {
      console.log('resize', width, window.innerWidth);
      width = window.innerWidth;
      renderData();
    }
    if (((width > 1200 && window.innerWidth < 1200))) {
      console.log('resize 2', width, window.innerWidth);
      width = window.innerWidth;
      renderData();
    }

  });
  if (!themeData) {
    return <>hell</>
  }
  return (
    <div className={t('languageDir')} dir={t('languageDir')}>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<route.layout width={width} {...props}>
                <route.element/>
              </route.layout>}
            />
          ))}
        </Routes>
      </BrowserRouter>
      {/*<CustomModal onClose={() => {*/}
      {/*onCloseModal();*/}
      {/*}} open={false} className={'width50vw sdfghyjuikol kiuytgfhjuyt orangeBack'}*/}
      {/*title={'بازدیدکنندگان عزیز'}>*/}
      {/*/!*<p style={{textAlign:'center'}}>بازدیدکنندگان عزیز</p>*!/*/}
      {/*<Col><p style={{ textAlign: 'center' }}>*/}
      {/*ضمن عرض تبریک به مناسبت فرا رسیدن سال جدید و آرزوی شادکامی به اطلاع می رسانیم،*/}
      {/*ارسال سفارشات شهرستان تا ۲۴ اسفند و تهران تا ۲۸ اسفند صورت خواهد گرفت. خریدهایی که بعد از این مدت انجام شوند،*/}
      {/*بعد از تعطیلات نوروز در تاریخ ۶ فروردین ارسال خواهند شد.*/}
      {/*</p></Col>*/}
      {/*</CustomModal>*/}
    </div>
  );
});
export default withTranslation()(APP);
