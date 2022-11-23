import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import store from "../functions/store";
import {withTranslation} from "react-i18next";
import {
  addBookmark,
  clearPost,
  getBlogPost,
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
import PageBuilder from "#c/components/page-builder/PageBuilder";

import {useSelector} from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// let obj = ;
// let the_id='';

const MainContent = (props) => {
  console.log("props", props);
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


  const getThePost = (_id = 'home') => {
    return new Promise(function (resolve, reject) {

      // getBlogPost(_id).then((d = {}) => {
      getPage(_id).then((d = {}) => {
        console.log("set _id to show:", d);
        if (d._id) {
          savePost({
            mainList: d.mainList,
            catChoosed: d.catChoosed,
            countryChoosed: d.countryChoosed,
            categories: d.categories,
            elements: d.elements,
            mainCategory: d.mainCategory
          });
          resolve({
            load: true,
            title: d.title,
            description: d.description,
            photos: d.photos,
            _id: d._id,
            updatedAt: d.updatedAt,
            kind: d.kind,
            elements: d.elements,
            thumbnail: d.thumbnail,
            maxWidth: d.maxWidth,
            excerpt: d.excerpt,
            backgroundColor: d.backgroundColor,
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
      // let mounted = true;
      let {_id, title} = params;

      console.log("useEffect", _id, the_id, mainId);

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
    excerpt,
    notfound,
    kind,
    maxWidth,
    backgroundColor,
    enableAdmin = false,
    views = null, elements = null
  } = state;
  if (redirect && isClient) return <Navigate to={redirect}/>;
  if (!load && isClient) return <Loading/>;
  if (load && notfound && isClient) return <div>not found</div>;
  let style = setStyles({
    backgroundColor: backgroundColor
  })
  console.log('style', style)
  // console.log("product", title, lan, encodeURIComponent(title[lan]));
  console.log('isClient', isClient);
  return (

    <PageBuilder elements={elements} kind={kind} maxWidth={maxWidth} style={style}/>
  );
}
export default withTranslation()(MainContent);
