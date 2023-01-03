import React, {useEffect, useState} from "react";

import {Col, Row} from "shards-react";
import LoadingComponent from "#c/components/components-overview/LoadingComponent";
import CreateForm from "#c/components/form/CreateForm";

import {
  enableAdmin,
  enableAgent,
  enableSell,
  fetchCats,
  getEntitiesWithCount,
  getEntity,
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
import _ from "underscore";
import {useSelector} from "react-redux/es/index";
import {useNavigate, useParams} from "react-router-dom";

const getURIParts = (url) => {
  var loc = new URL(url)
  return loc
}
const Form = (props) => {
  console.log('Form...', props)
  let navigate = useNavigate();

  const [tracks, settracks] = useState([]);
  const [theformFields, setformFields] = useState([]);
  const [counts, setcount] = useState(0);
  const [theload, settheload] = useState(false);
  let {match, location, history, t, url} = props;
  let {element = {}} = props;
  let {data = {}, settings = {}} = element;
  let {general = {}} = settings;
  let {fields = {}} = general;
  let {entity = 'form', _id = ''} = fields;
  let mainParams = useParams();
  let params = data;
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
  const loadForm = async () => {

    getEntity('form', _id).then((resp) => {
      console.log('resp', resp)
      // setLoadingMoreItems(false);
      afterGetData(resp);
    });
  };

  //
  // useEffect(() => {
  //   console.log("params.offset");
  //   loadProductItems(0);
  // }, [params.offset]);

  useEffect(() => {
    // console.log("params._id");
    loadForm();
  }, []);
  //

  const afterGetData = (resp, tracks = []) => {
    // console.clear()
    console.log('afterGetData', resp, tracks)
    // let {items, count} = resp;
    // if (resp.length < 24) sethasMoreItems(false);
    // console.log("resp", resp);
    if (resp) {
      let {elements} = resp;

      let formVals = [];
      let formFields = [];
      // items.forEach((item) => {
      //   trackss.push(item);
      // });
      console.log('elements:', elements)
      elements.forEach((d) => {
        console.log('d', d)
        // formFields.push()
        let {settings = {}} = d;
        let {general = {}} = settings;
        let {fields = []} = general;
        let {name, value='', placeholder} = fields;
        formFields[name] = value;

        let lastObj = {
          type: 'string',
          label: name,
          name: name,

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            // setFields([...fields,])
            // this.state.checkOutBillingAddress.add.data[d] = text;
          },
          className: 'rtl',
          placeholder: placeholder,
          child: [],
          value: value,
        };
        if (typeof data[d] == 'object') {
          lastObj.type = 'object';

        }
        if (typeof data[d] == 'number') {
          lastObj.type = 'number';
        }
        if (typeof data[d] == 'string') {

        }
        // console.log('type of ',d,typeof data[d])
        formVals.push(lastObj)

      })
      setformFields({...formFields})
      settracks([...formVals]);
      // setcount(count);
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
  return (<div className="main-content-container fghjkjhgf ">

      <Row className={"m-0"}>
        {theload && loader}
        {!theload && <Col
          className="main-content iuytfghj pb-5 "
          lg={{size: 12}}
          md={{size: 12}}
          sm="12"
          tag="main">
          <Row className={" p-3 productsmobile"}>
            {(theformFields && tracks) && <CreateForm
              rules={{fields: tracks}}
              onSubmit={() => {
              }}
              buttons={[]}
              fields={theformFields}/>}
            {/*{JSON.stringify(tracks)}*/}

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
export default withTranslation()(Form);
