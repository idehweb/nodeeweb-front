import React, {useEffect, useState} from "react";

import {Col, Row} from "shards-react";
import LoadingComponent from "#c/components/components-overview/LoadingComponent";
import CreateForm from "#c/components/form/CreateForm";

import {getEntity, isClient, setStyles, submitForm} from "#c/functions/index";

import {withTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const getURIParts = (url) => {
  var loc = new URL(url)
  return loc
}
const Form = (props) => {
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
  const loadForm = async () => {
    getEntity('form', _id).then((resp) => {
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

  const returnVariable = (d) => {
    let {settings = {}, children} = d;
    let {general = {}} = settings;
    let {fields = []} = general;
    let {name, label, value = '', placeholder, classes, sm, lg} = fields;
    let lastObj = {
      type: ch.name || 'string',
      label: label || name,
      name: name,

      size: {
        sm: 6,
        lg: 6,
      },
      onChange: (text) => {
        // setFields([...fields,])
        // this.state.checkOutBillingAddress.add.data[d] = text;
      },
      className: 'rtl ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : ""),
      placeholder: placeholder,
      child: [],
      children: children || [],
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
  }
  const afterGetData = (resp, tracks = []) => {
    // console.clear()
    console.log('afterGetDataafterGetData', resp, tracks)
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
        let {settings = {}, children} = d;
        let {general = {}} = settings;
        let {fields = []} = general;
        let {name, label, value = '', placeholder, classes, sm, lg,options} = fields;
        let stylee = setStyles(fields);
        formFields[name] = value;
        let theChildren = [];
        if (children) {
          children.forEach((ch) => {
            theChildren.push(lastObj)
          })
        }
        let lastObj = {
          type: d.name || 'string',
          label: label || name,
          name: name,

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            // setFields([...fields,])
            // this.state.checkOutBillingAddress.add.data[d] = text;
          },
          style : stylee,
          className: 'rtl ' + (classes ? classes.map(ob => (ob.name ? ob.name : ob)).join(" ") : ""),
          placeholder: placeholder,
          child: [],
          children: children || [],
          options: options || [],
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

            {/*{JSON.stringify(tracks)}*/}
            {/*{JSON.stringify(theformFields)}*/}
            {(theformFields && tracks) && <CreateForm
              rules={{fields: tracks}}
              onSubmit={(e) => {
                console.log('onSubmit', e)
                submitForm(_id, e).then(d => {
                  if (d.success && d.message)
                    toast(t(d.message), {
                      type: "success"
                    });
                }).catch(d => {
                  toast(t('sth wrong happened!'), {
                    type: "error"
                  });
                })
              }}
              buttons={[]}
              theFields={tracks}
              fields={theformFields}/>}

          </Row>

        </Col>}
      </Row>
    </div>
  );
};
export const HomeServer = [];
export default withTranslation()(Form);
