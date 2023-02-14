import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Button, Col, Row} from "shards-react";
import LoadingComponent from "#c/components/components-overview/LoadingComponent";

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

import Collapsable from "#c/components/Collapsable";
import {ProductsSliderServer} from "#c/components/components-overview/ProductsSlider";
import {PostSliderServer} from "#c/components/components-overview/PostSlider";
import {withTranslation} from "react-i18next";
import _ from "underscore";
import {useSelector} from "react-redux";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const getURIParts = (url) => {
  var loc = new URL(url)
  return loc
}

const Sidemenu = (props) => {
  console.log('Pagination...', props)
  let navigate = useNavigate();

  const [tracks, settracks] = useState([]);
  const [cats, setcats] = useState([]);
  const [counts, setcount] = useState(0);
  const [theload, settheload] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [theload2, settheload2] = useState(false);
  let {match, location, history, t, url} = props;
  let {element = {}, params = {}} = props;
  let {data = {}, settings = {}} = element;
  let {general = {}} = settings;
  let {fields = {}} = general;
  let {entity = '', customQuery, populateQuery} = fields;
  let mainParams = useParams();
  // let params = data;
  if (!params.offset) {
    params.offset = 0
  }
  if (!params.limit) {
    params.limit = 24
  }
  url = isClient ? new URL(window.location.href) : "";
  let theurl = getURIParts(url);
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
    console.log('customQuery', customQuery, mainParams, data)
    if (customQuery)
      Object.keys(customQuery).forEach((item) => {
        let main = customQuery[item];
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
    getEntitiesWithCount('attributes', params.offset, params.limit, "", JSON.stringify({useInFilter: true}), JSON.stringify(populateQuery)).then((resp) => {
      // setLoadingMoreItems(false);
      afterGetData(resp);
    });
  };
  const loadProductCategories = async (page, filter = {}) => {
    // return

    // setLoadingMoreItems(true);

    // settracks([...[]]);
    setcats([])
    settheload2(true)
    let query = {};
    // params = useParams();
    console.log('customQuery', customQuery, mainParams, data)
    if (customQuery)
      Object.keys(customQuery).forEach((item) => {
        let main = customQuery[item];
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
    getEntitiesWithCount('productCategory', params.offset, params.limit, "", filter, JSON.stringify(populateQuery)).then((resp) => {
      // setLoadingMoreItems(false);
      afterGetDataPC(resp);
    });
  };


  // useEffect(() => {
  //   console.log("params.offset");
  //   loadProductItems(0);
  // }, [params.offset]);

  useEffect(() => {
    console.log("params._id");
    loadProductItems(0);
    loadProductCategories(0);
  }, []);
  //

  const handleChangePage = (event, newPage) => {
    let mainPath = theurl.pathname.split('/');
    console.log('mainPath', mainPath[1])

    // theurl
    console.log('new offset:', newPage * params.limit)
    // console.log('event',event)
    // settracks([])
    // settheload(true)
    if (isClient) {
      window.scrollTo(0, 0)
    }
    let x = `/${mainPath[1]}`;
    if (params._id) {
      x += `/${params._id}`
    }
    if (params.offset) {
      x += `/${newPage * params.limit}`
    }
    if (params.limit) {
      x += `/${params.limit}`
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
  const afterGetDataPC = (resp, tracks = []) => {
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
      setcats([...trackss]);
      setcount(count);
      settheload2(false)

      // if (resp && resp.length < 1) sethasMoreItems(false);
    } else {
      // sethasMoreItems(false);
      // setLoad(false);
      settheload2(false)

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
        {!theload2 && <Col
          className=" iuytfghj "
          lg={{size: 12}}
          md={{size: 12}}
          sm="12"
          tag="main">
          <Row className={" pt-3 productsmobile"}>
            <Col lg="12"
                 md="12"
                 sm="12"
                 xs="12" className={"nbghjk post-style-"}>
              <div className={'d-flex justify-content-space-between align-items-center'}>
                <label className={'the-label-head'}>{'فیلتر ها'}</label>
                {(window && window.innerWidth < 768) && <Button className={'set-filters'} onClick={() => {
                  setOpenFilter(!openFilter)
                }}><FilterAltIcon/></Button>}
              </div>
              <hr className={'the-label-hr'}/>
            </Col>
          </Row>

        </Col>}
        {!theload && <Col
          className="main-content2 iuytfghj pb-5 "
          lg={{size: 12}}
          md={{size: 12}}
          sm="12"
          tag="main">
          {((window && window.innerWidth < 768) && openFilter) && <>
            <Collapsable defaultStatus={!(window && window.innerWidth < 768)} title={t('product category')} values={cats}
                         slug={'product-category'}/>
            {tracks && tracks.map((i, idxx) => (<Collapsable title={i.name.fa} values={i.values} slug={i.slug}/>))}
          </>}
          {(window && window.innerWidth > 767) && <>
            <Collapsable defaultStatus={!(window && window.innerWidth < 768)} title={t('product category')} values={cats}
                         slug={'product-category'}/>
            {tracks && tracks.map((i, idxx) => (<Collapsable title={i.name.fa} values={i.values} slug={i.slug}/>))}
          </>}

        </Col>}
      </Row>
      {/*{cats && JSON.stringify(cats)}*/}
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
export default withTranslation()(Sidemenu);
