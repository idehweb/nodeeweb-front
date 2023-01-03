import React, {useEffect, useState} from "react";

import {Col, Row} from "shards-react";
import LoadingComponent from "#c/components/components-overview/LoadingComponent";
import Sort from "#c/components/archive/Sort";
import TablePagination from '@mui/material/TablePagination';

import {
  enableAdmin,
  enableAgent,
  enableSell,
  fetchCats,
  getEntitiesWithCount,
  getPosts,
  getPostsByCat,
  isClient,
  loadPosts,
  loadProducts,
  SaveData,
  setCountry
} from "#c/functions/index";

import {ProductsSliderServer} from "#c/components/components-overview/ProductsSlider";
import {PostSliderServer} from "#c/components/components-overview/PostSlider";
import {withTranslation} from "react-i18next";
import PostCard from "#c/components/Home/PostCard";
import BlogCard from "#c/components/Home/BlogCard";
import _ from "underscore";
import {useSelector} from "react-redux/es/index";
import {useNavigate} from "react-router-dom";
import {Link, useParams} from "react-router-dom";
const getURIParts = (url) => {
  var loc = new URL(url)
  return loc
}
const Pagination = (props) => {
  console.log('Pagination...',props)
  let navigate = useNavigate();

  const [tracks, settracks] = useState([]);
  const [counts, setcount] = useState(0);
  const [theload, settheload] = useState(false);
  let {match, location, history, t, url} = props;
  let {element = {},params={}} = props;
  let {data = {}, settings = {}} = element;
  let {general = {}} = settings;
  let {fields = {}} = general;
  let {entity = '', customQuery, populateQuery} = fields;
  let mainParams = useParams();
  // let params = data;
  if(!params.offset){
    params.offset=0
  }
  if(!params.limit){
    params.limit=24
  }
  url = isClient ? new URL(window.location.href) : "";
  let theurl=getURIParts(url);
  // theurl=theurl.split('/');
  // console.log('mainParams',theurl[1])

  const postCardMode = useSelector((st) => st.store.postCardMode, _.isEqual);

  // console.log('general', general)
  // console.log('params', params)
  // const params = useParams();
  const loadProductItems = async (page, filter = {}) => {
    // return
    console.log('loadProductItems', params, params.offset)
    // setLoadingMoreItems(true);

    // settracks([...[]]);
    settracks([])
    settheload(true)
    let query = {};
    // params = useParams();
    console.log('customQuery',customQuery,mainParams,data)
    if (customQuery)
      Object.keys(customQuery).forEach((item) => {
        let main=customQuery[item];
        console.log('params._id', params._id)

        main = main.replace('params._id', JSON.stringify(params._id))
        console.log('customQuery[item]', item, customQuery, customQuery[item])
        query[item] = JSON.parse(main)
      })

    console.log("==> loadProductItems() offset:", params.offset, "filter:", filter, "query:", query);
    if (query) {
      filter = JSON.stringify(query)
    }
    // let newOffset = (await offset) + 24;
    getEntitiesWithCount(entity || params.entity, params.offset, params.limit, "", filter, JSON.stringify(populateQuery)).then((resp) => {
      // setLoadingMoreItems(false);
      afterGetData(resp);
    });
  };


  useEffect(() => {
    console.log("params.offset");
    loadProductItems(0);
  }, [params.offset]);

  useEffect(() => {
    console.log("params._id");
    loadProductItems(0);
  }, [params._id]);
  //

  const handleChangePage = (event, newPage) => {
    let mainPath=theurl.pathname.split('/');
    console.log('mainPath',mainPath[1])

    // theurl
    console.log('new offset:', newPage * params.limit)
    // console.log('event',event)
    // settracks([])
    // settheload(true)
    if(isClient){
      window.scrollTo(0,0)
    }
    let x=`/${mainPath[1]}`;
    if(params._id){
      x+=`/${params._id}`
    }
    if(params.offset){
      x+=`/${newPage * params.limit}`
    }
    if(params.limit){
      x+=`/${params.limit}`
    }
    navigate(x)
    // renewData(newPage * rowsPerPage);
    // setPage(newPage);
  };
  const handleChangeRowsPerPage = (event, newLimit) => {
    // console.log('event',event)
    console.log('new limit:', newLimit)
    // console.log('event',event)

    // renewData(newPage * rowsPerPage);
    // setPage(newPage);
  };
  const afterGetData = (resp, tracks = []) => {
    console.log('afterGetData', resp, tracks)
    let trackss = [...tracks],
      {items, count} = resp;
    // if (resp.length < 24) sethasMoreItems(false);
    // console.log("resp", resp);
    if (items && items.length) {
      items.forEach((item) => {
        trackss.push(item);
      });
      console.log('set data:', trackss)
      settracks(trackss);
      setcount(count);
      settheload(false)

      // if (resp && resp.length < 1) sethasMoreItems(false);
    } else {
      // sethasMoreItems(false);
      // setLoad(false);
      settheload(false)

    }
  };
  const loader = (
    <div className="loadNotFound loader " key={23}>
      {t("loading...")}
      <LoadingComponent height={30} width={30} type="spin" color="#3d5070"/>
    </div>
  );
  // return JSON.stringify(params)
  return (<div className="main-content-container fghjkjhgf ">

      <Row className={"m-0"}>
        {theload && loader}
        {!theload && <Col
          className="main-content iuytfghj pb-5 "
          lg={{size: 12}}
          md={{size: 12}}
          sm="12"
          tag="main">
          {/*<Sort/>*/}
          <Row className={" p-3 productsmobile"}>

            {tracks && tracks.map((i, idxx) => (
              <Col key={idxx} lg="3"
                   md="3"
                   sm="4"
                   xs="6" className={"nbghjk post-style-" + postCardMode}>
                {entity=='post' && <BlogCard item={i} method={postCardMode}/>}
                {entity!='post' && <PostCard item={i} method={postCardMode}/>}

              </Col>
            ))}
          </Row>
          <Row className={" p-3 productsmobile"}>
            {counts > 0 && (
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={parseInt(counts)}
                rowsPerPage={params.limit}
                page={parseInt(params.offset / params.limit)}
                labelRowsPerPage={t('number per row:')}
                nexticonbuttontext={t('next page')}
                previousiconbuttontext={t('previous page')}
                labelDisplayedRows={({from, to, count}) =>
                  `${from} ${t('to')} ${to === -1 ? count : to} ${t(
                    'from'
                  )} ${counts} ${t('item')}`
                }
                onPageChange={(e, newPage) => handleChangePage(e, newPage)}
                onRowsPerPageChange={(e, newLimit) => handleChangeRowsPerPage(e, newLimit)}
              />
            )}


          </Row>
        </Col>}
      </Row>
    </div>
  );
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
export default withTranslation()(Pagination);
