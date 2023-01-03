import React, {useEffect, useState} from "react";
import {Container} from "shards-react";
import {useParams} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {dFormat, PriceFormat} from "#c/functions/utils";
import MainContent from '#c/components/MainContent';

import {
  addBookmark,
  clearPost,
  getPage,
  isClient,
  loadPost,
  loveIt,
  MainUrl,
  savePost,
  setStyles
} from "#c/functions/index";
import {SnapChatIcon} from "#c/assets/index";

import Loading from "#c/components/Loading";
import store from "../functions/store";
import {useSelector} from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// let obj = ;
// let the_id='';

const Page = (props) => {
  // console.clear()
  // console.log("props", props);
  let {match, location, history, t, url} = props;

  let page = useSelector((st) => {
    // console.log("st.store", st.store.productSliderData);
    return st.store.page || [];
  });
  // window.scrollTo(0, 0);
  let params = useParams();
  let the_id = params._id;
  // let search = false;
  // let history = useNavigate();


  const [mainId, setMainId] = useState(the_id);
  const [tab, setTab] = useState("description");
  const [state, setState] = useState(isClient ? [] : (page || []));
  const [lan, setLan] = useState(store.getState().store.lan || "fa");


  const getThePost = (_id) => {
    console.log('getThePost()')
    return new Promise(function (resolve, reject) {

      getPage(_id).then((d = {}) => {
        // console.log("set _id to show:", d);
        if (d._id) {
          // savePost({
          //   mainList: d.mainList,
          //   catChoosed: d.catChoosed,
          //   countryChoosed: d.countryChoosed,
          //   categories: d.categories,
          //   maxWidth: d.maxWidth,
          //   elements: d.elements,
          //   kind: d.kind,
          //   mainCategory: d.mainCategory
          // });
          resolve({
            load: true,
            title: d.title,
            description: d.description,
            photos: d.photos,
            maxWidth: d.maxWidth,
            _id: d._id,
            updatedAt: d.updatedAt,
            kind: d.kind,
            classes: d.classes,
            elements: d.elements,
            thumbnail: d.thumbnail,
            excerpt: d.excerpt,
            views: d.views
          });
        } else {
          reject({
            load: true,
            notfound: true
          });
        }
      });
    });
  };
  if (isClient)
    useEffect(() => {
      console.log('i fire once');
      // let mounted = true;
      let {_id, title} = params;
      // console.clear()
      console.log("useEffect", _id, the_id, mainId);
      // if (_id != the_id)
      getThePost(the_id)
        .then(items => {
          // console.log('items',items,the_id);
          // if (mounted) {
          setState(items);
          if (isClient)
            window.scrollTo(0, 0);
          // }
        }).catch(e => {
        setState(e);


      });
      // return () => mounted = false;
    }, [the_id]);

  // useEffect(() => {
  //   let { _id, title } = params;
  //   console.log("useEffect", _id, the_id, mainId);
  //   // if (mainId != _id) {
  //   getThePost(_id).then(res=>setState(state => ({ ...state, ...res })));
  //   window.scrollTo(0, 0);
  //   // }
  //
  // }, [the_id]);


  let {
    load,
    title,
    description,
    photos,
    redirect,
    _id,
    thumbnail,
    kind,
    classes,
    excerpt,
    maxWidth,
    backgroundColor,
    notfound,
    enableAdmin = false,
    views = null, elements = null
  } = state;
  if (redirect && isClient) return <Navigate to={redirect}/>;
  if (!load && isClient) return <Loading/>;
  if (load && notfound && isClient) return <div>not found</div>;
  // console.log("product", title, lan, encodeURIComponent(title[lan]));
  let style = setStyles({backgroundColor});
  console.log('isClient', isClient);
  return (

    <Container className={"main-content-container p-0 pb-4 kiuytyuioiu bg-white " + classes} key={0}>

      {/*<div style={style} className={'the-body ghui'} key={1}>*/}
      <MainContent elements={elements} kind={kind} maxWidth={maxWidth} backgroundColor={backgroundColor}/>
      {/*</div>*/}

    </Container>
  );
};
export const PageServer = [
  {
    func: loadPost,
    params: "6217502008d0e437d6b4ad97"
  }
];
export default withTranslation()(Page);
