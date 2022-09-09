import React ,{useEffect} from "react";
import {
  eid,
  slide1Img,
  slide2Img,
  slide3Img,
  slide4Img,
  slide5Img,
  slideOffer1Img,
  slideOffer2Img,
  slideOffer3Img,
  slideOffer4Img,
  slideOffer5Img,
  slideOffer6Img,
  slideOffer7Img,
  slideOffer8Img,
  valentineDays
} from "#c/assets/index";
import SidebarNavItems from "#c/components/layout/MainSidebar/SidebarNavItems";

import {Col,Row} from 'shards-react';
import MainFooter from '#c/components/layout/MainFooter';

import MainNavbar from '#c/components/layout/MainNavbar/MainNavbar';
import MainContent from '#c/components/MainContent';
import MainMobileNavbar from '#c/components/layout/MainNavbar/MainMobileNavbar';
import CardSidebar from '#c/components/layout/MainSidebar/CardSidebar';
import MainSidebar from '#c/components/layout/MainSidebar/MainSidebar';
import StickyCard from '#c/components/layout/StickyCard';
import {
  enableAdmin,
  enableAgent,
  enableSell,
  fetchCats,
  fetchHome,
  getPosts,
  getPostsByCat,
  getThemeData,
  isClient,
  loadPosts,
  loadProducts,
  SaveData,
  setCountry
} from "#c/functions/index";
import ProductsSlider from "#c/components/components-overview/ProductsSlider";
import PostSlider from "#c/components/components-overview/PostSlider";
import {store} from '#c/functions/store';

import {withTranslation} from "react-i18next";
import {useSelector} from "react-redux";

store.dispatch(fetchHome());

const Home = (props) => {
  // const Recipe = React.lazy(() =>
  //     import(`../../../public_media/theme/shomeis/shomeis.json`)
  //         .catch(() => ({ default: () => <div>Not found</div> }))
  // );
  // console.log('Reci/pe',Recipe)
  // getThemeData().then(r=>{
  //     console.log('r',r)
  // })
  const themeData = useSelector((st) => st.store.themeData);
  const homeData = useSelector((st) => st.store.homeData);
  // console.log('homeDataaaaaaaaaa',homeData)
  // console.log('themeDataataaaaaaaaaa',themeData.Home.layout)
    useEffect(() => {
// console.clear();
console.log('homeData',themeData)
    }, []);
//
//     useEffect(() => {
// // console.clear();
// console.log('themeData',themeData)
//     }, [themeData]);
//   if (homeData && themeData && themeData.Home && themeData.Home.layout)
//     return (<PageBuilder {...props} elements={themeData.Home.layout} content={homeData}/>);
//   else
  if (themeData) {
    console.log('themeData', themeData, homeData)

    return <>
      {themeData.header && themeData.header.map((header, h) => {

        if (header.name === 'CardSidebar') {
          return <CardSidebar/>

        }
        if (header.name === 'MainSidebar') {
          return <MainSidebar/>

        }
        if (header.name === 'StickyCard') {
          return <StickyCard/>

        }
        if (header.name === 'MainNavbar') {
          return <MainNavbar/>

        }
        if (header.name === 'MainMobileNavbar') {
          return <MainMobileNavbar/>

        }
      })}
      <Col
        className="main-content p-0"
        lg={{size: 12, offset: 0}}
        md={{size: 12, offset: 0}}
        sm="12"
        // tag="main"
      >
        <Row className={"m-0"}>
          {/*<Col tag="aside" lg={{ size: 3 }} md={{ size: 4 }} className={"sidebar white mobilenone"}>*/}
            {/*<Row className={""}>*/}
              {/*<Col lg={{ size: 12 }} md={{ size: 12 }}>*/}
                {/*<SidebarNavItems/>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</Col>*/}

          <Col
            className="ghjhtgfrdsfg"
            lg={{ size: 12 }}
            md={{ size: 12 }}
            sm="12">
      {themeData.body && themeData.body.map((body, h) => {

        if (body.name === 'MainContent') {
          return <MainContent {...props}/>

        }
        if (body.name === 'PostSlider') {
          return   <Col><Row><PostSlider delay={2000}/></Row></Col>

        }
        // if (body.name === 'ProductsSlider') {
        //   return <ProductsSlider delay={2000}/>
        //
        // }
      })}
          </Col>
        </Row>
      </Col>
      {themeData.footer && themeData.footer.map((footer, h) => {
        if (footer.name === 'MainFooter') {
          return <MainFooter/>

        }

      })}
    </>
  } else
    return <></>
};
export const HomeServer = [
  {
    func: loadProducts,
    params: "61d58e38d931414fd78c7fca"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fbd"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fb7"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fb9"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fbc"
  },
  {
    func: loadProducts,
    params: "61d58e37d931414fd78c7fba"
  },
  {
    func: loadPosts,
    params: null
  },
  {
    func: fetchCats,
    params: null
  }];

// export const HomeServer = loadProducts;
// export const HomeServerArgument = "61d58e37d931414fd78c7fba";
// export const HomeServer = fetchData("61d58e37d931414fd78c7fba");
export default withTranslation()(Home);
