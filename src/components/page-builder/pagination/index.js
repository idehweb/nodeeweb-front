import React, {useEffect, useState} from "react";

import {Col, Row} from "shards-react";
import LoadingComponent from "#c/components/components-overview/LoadingComponent";
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
import {useNavigate, useParams} from "react-router-dom";

let offset = 0
const getURIParts = (url) => {
  return new URL(url)
}
const Pagination = (props) => {
  let url = isClient ? new URL(window.location.href) : "";
  let theurl = getURIParts(url);
  let navigate = useNavigate();
  const [tracks, settracks] = useState([]);
  const [counts, setcount] = useState(0);
  const [theload, settheload] = useState(false);
  let {match, location, history, t} = props;
  let {element = {}, params = {}} = props;
  let {data = {}, settings = {}} = element;
  let {general = {}} = settings;
  let {fields = {}} = general;
  let {entity = '', customQuery, populateQuery} = fields;
  let mainParams = useParams();
  offset = url.searchParams.get("offset")
  limit = url.searchParams.get("limit")
  if (!offset) {
    offset = 0;
  }
  if (!limit) {
    limit = 32;
  }
  console.log('Pagination...', props, offset, limit)

  // let params = data;
  // if (!params.offset) {
  //   params.offset = 0
  // }
  // if (!params.limit) {
  //   params.limit = 24
  // }

  // theurl=theurl.split('/');
  // console.log('mainParams',theurl[1])

  const postCardMode = useSelector((st) => st.store.postCardMode, _.isEqual);
  let device = isClient ? (url.searchParams.get("device") || "") : "";
  let brand = isClient ? (url.searchParams.get("brand") || "") : "";
  let productCategory = isClient ? (url.searchParams.get("productCategory") || "") : "";
  offset = isClient ? (url.searchParams.get("offset") || "") : "";
  let limit = isClient ? (url.searchParams.get("limit") || "") : "";
  // console.log('general', general)
  // console.log('params', params)
  // const params = useParams();
  const loadProductItems = async (page, filter = {}) => {
    // return
    console.log('url', url)
    offset = url.searchParams.get("offset")
    if (!offset) {
      offset = 0
    }
    limit = url.searchParams.get("limit")
    if (!limit) {
      limit = 32
    }
    console.log('loadProductItems', params, offset, limit)
    // setLoadingMoreItems(true);

    // settracks([...[]]);
    settracks([])
    settheload(true)
    let query = {};
    // params = useParams();
    // console.log('customQuery', customQuery)
    if (customQuery) {
      if (typeof customQuery == 'string') {
        customQuery = JSON.parse(customQuery);
      }
      Object.keys(customQuery).forEach((item) => {
        // console.log('customQuery', customQuery)
        let main = customQuery[item];
        // console.log('main', main)
        // console.log('params._id', params._id)
        if (params._id) {
          let theVariable = params._id;
          const json2 = isStringified(theVariable);
          if (typeof json2 == "object") {
            console.log('theVariable', theVariable)
          } else {
            theVariable = JSON.stringify(theVariable)

          }
          main = main.replace('"params._id"', theVariable)
          main = main.replace("'params._id'", theVariable)
          main = main.replace('params._id', theVariable)
        }
        // console.log('item', item)
        // console.log('customQuery', customQuery)
        // console.log('customQuery[item]', customQuery[item])
        // console.log('main', main)

        function isStringified(jsonValue) { // use this function to check
          try {
            return JSON.parse(jsonValue);
          } catch (err) {
            return jsonValue;
          }
        }

        const json = isStringified(main);

        if (typeof json == "object") {
          query[item] = JSON.parse(main)
        } else {
          main = main.replaceAll(/\"/g, "")
          query[item] = (main)
        }

      })
    }
    console.log("==> loadProductItems() offset:", offset, "filter:", filter, "query:", query);
    let search = isClient ? (url.searchParams.get("search") || "") : "";

    if (search) {
      query.search = search;
    }
    if (device) {
      query.device = device;
    }
    if (brand) {
      query.brand = brand;
    }
    if (productCategory) {
      query.productCategory = productCategory;
    }
    if (query) {
      filter = JSON.stringify(query)
    }
    console.log('limit', limit, 'offset', offset)
    getEntitiesWithCount(entity || params.entity, offset, limit, "", filter, JSON.stringify(populateQuery)).then((resp) => {
      afterGetData(resp);
    });
  };

  useEffect(() => {
    console.log("\n\n\nuse effect");

    if (isClient) {
      if (url.searchParams.get("offset") != offset) {

        offset = url.searchParams.get("offset");
        loadProductItems(0);

      }

    }
  }, []);

  useEffect(() => {
    console.log("params._id");
    loadProductItems(0);
  }, [params._id]);
  //

  const handleChangePage = (event, newPage) => {
    console.clear()

    url = isClient ? new URL(window.location.href) : "";

    let mainPath = theurl.pathname.split('/');
    // console.log('mainPath', mainPath[1])
    console.log('new offset:', newPage * params.limit)
    if (isClient) {
      window.scrollTo(0, 0)
    }
    let x = `/${mainPath[1]}`;
    if (params._id) {
      x += `/${params._id}`
    }

    if (isClient) {
      offset = (url.searchParams.get("offset") || "");
      limit = (url.searchParams.get("limit") || "");
      console.log("offset:", offset, "limit:", limit)
      if (limit) {
        url.searchParams.set('limit', limit);

      } else {
        url.searchParams.set('limit', 32);
        limit = 32
      }
      if (offset) {
        url.searchParams.set('offset', newPage * limit);
      } else {
        url.searchParams.set('offset', newPage * limit);

      }

      console.log('url', url)
      console.log('full url:', url.pathname + url.search, newPage * limit)
      navigate(url.pathname + url.search)
      loadProductItems(newPage * limit)
    }

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
  console.log('offset', offset, 'limit', limit)
  if (!offset) {
    offset = 0;
  }
  if (!limit) {
    limit = 32;
  }
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
                   xs="6" className={"nbghjk post-style-" + 'list'}>
                {entity == 'post' && <BlogCard item={i} method={'list'}/>}
                {entity != 'post' && <PostCard item={i} method={'list'}/>}

              </Col>
            ))}
          </Row>
          <Row className={" p-3 productsmobile"}>
            {counts > 0 && (
              <TablePagination
                rowsPerPageOptions={[(limit), (limit * 2), (limit * 3), (limit * 4)]}
                component="div"
                count={parseInt(counts)}
                rowsPerPage={limit}
                page={parseInt(offset / limit)}
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
